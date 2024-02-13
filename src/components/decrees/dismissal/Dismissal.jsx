import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './Dismissal.module.css';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import searchIcon from '../../../assets/icons/search.svg';
import Checkbox from '@mui/material/Checkbox';

function Dismissal() {
    const [formData, setFormData] = useState({
        persons: [],
        decreeDate: '',
    });

    const [foundPersons, setFoundPersons] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ showClearBtn, setShowClearBtn ] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState([]);

    const handleFormSubmit = async () => {
        try {
            if (!formData.persons.length || !formData.decreeDate) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            };

            // Modify the structure of persons array
            const modifiedPersons = formData.persons.map(personId => ({ personId }));

            const requestData = {
                ...formData,
                persons: modifiedPersons,
            };

            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/generate-firing-decree/', requestData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob'
            });

            console.log(response.data)
            console.log('Response Data Type:', typeof response.data);
            if (response.status != 400) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Создание URL для скачивания файла
                const url = window.URL.createObjectURL(blob);

                // Создание ссылки для скачивания файла
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'document.docx'); // Имя файла, которое будет использоваться при скачивании

                // Добавление ссылки на страницу
                document.body.appendChild(link);

                // Симуляция клика по ссылке для запуска скачивания файла
                link.click();

                // Удаление ссылки после завершения скачивания
                document.body.removeChild(link);

                // Освобождение ресурсов
                window.URL.revokeObjectURL(url);
                NotificationManager.success('Документ успешно создан', 'Успех', 3000);
            }
            
            
          
            } 
        catch (error) {
            console.log(error)
            // if (error.response && error.response.status === 400) {
            //     console.log('Response Data Type:', typeof error.response.data);
            //     const errorMessage = error.response.data.error || 'Неизвестная ошибка';
            //     NotificationManager.error(errorMessage, 'Ошибка', 3000);
            // } else {
            //     NotificationManager.error('Произошла ошибка', 'Ошибка', 3000);
            // }

            if (error.response && error.response.status === 400) {
                console.log('Response Data Type:', typeof error.response.data); // Verify that it's a Blob
                
                // Read the Blob data as a string
                const reader = new FileReader();
                reader.onload = function() {
                    try {
                        // Parse the string data as JSON
                        const jsonData = JSON.parse(reader.result);
                        console.log('Parsed JSON Data:', jsonData);
            
                        // Now you can access the JSON data and handle it accordingly
                        const errorMessage = jsonData.error || 'Неизвестная ошибка';
                        NotificationManager.error(errorMessage, 'Ошибка', 3000);
                    } catch (parseError) {
                        console.error('Error parsing JSON:', parseError);
                        NotificationManager.error('Ошибка при обработке ответа от сервера', 'Ошибка', 3000);
                    }
                };
                reader.onerror = function() {
                    console.error('Error reading the Blob data');
                    NotificationManager.error('Ошибка при чтении ответа от сервера', 'Ошибка', 3000);
                };
                reader.readAsText(error.response.data); // Read the Blob as text
            } else {
                NotificationManager.error('Произошла ошибка', 'Ошибка', 3000);
            }
            
        }
    };

    // useEffect(() => {
    //     // Update formData when selectedPersonIds change
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         personId: selectedPersonIds.length > 0 ? Number(selectedPersonIds[selectedPersonIds.length - 1]) : 0,
    //     }));
    // }, [selectedPersonIds]);

    const handleInputChange = async (event) => {
        const inputValue = event.target.value;
        setSearchText(inputValue);
        setShowClearBtn(inputValue !== '');

        // console.log("inputValue", inputValue)
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search_persons/?q=`, {
                params: {
                    q: inputValue,
                },
            });
    
            // Handle the data returned from the server
            const data = response.data;
            setFoundPersons(data.persons);
            setShowResults(true);
            setShowResults(foundPersons.length > 0);
        } catch (error) {
            console.log()
            console.error('Error fetching data:', error);
        }
        
        // You can choose to setShowResults(false) when inputValue is empty or handle it differently based on your requirements
        if (inputValue === '') {
            setShowResults(false);
        } else {
            setShowResults(true);
        }
    };


    const handleCheckboxChange = (personId) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            persons: formData.persons.includes(personId)
                ? formData.persons.filter(id => id !== personId)
                : [...formData.persons, personId]
        }));

        // Обновленный обработчик изменения чекбокса
        if (selectedPersons.includes(personId)) {
            setSelectedPersons(selectedPersons.filter(id => id !== personId));
        } else {
            setSelectedPersons([...selectedPersons, personId]);
        }
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleClearClick = () => {
        setSearchText('');
        setShowClearBtn(false);
        setShowResults(false);
    };

    return (
        <Paper  elevation={3} className={cl.appointmentForm} style={{ marginTop: '80px' }}>
            <div>
                <p className={cl.headline}>Приказ об увольнении</p>  
            </div>
        
            <div className={cl.form}>
                <div className={cl.row}>
                    <div>
                        <div className={cl.searchWrapper}>
                            <img src={searchIcon} alt="searchIcon" className={cl.searchIcon} />
                            <input 
                                type="text" 
                                className={cl.search__input}
                                placeholder='Поиск'
                                value={searchText}
                                onChange={handleInputChange}
                                onKeyPress={handleInputChange}
                            />
                            {showClearBtn && (
                                <button className={cl.clearBtn} onClick={handleClearClick}>
                                    &#x2715;
                                </button>
                            )}
                        </div>
                        {showResults && (
                            <div className={cl.search_wrapper}>
                                {foundPersons.length > 0 ? (
                                    foundPersons.map(person => (
                                        <div key={person.id} className={cl.search_list}>
                                            <div className={`${cl.search_row} ${cl.hoverEffect}`}>
                                                <div className={cl.search_data}>
                                                    <img
                                                        src={`data:image/jpeg;base64,${person.photo}`}
                                                        alt="Person"
                                                        className={cl.profilePic}
                                                    />
                                                    <label style={{ fontSize: '16px' }}>{`${person.firstName} ${person.surname} ${person.patronymic}`}</label>
                                                </div>
                                                <Checkbox
                                                    {...label}
                                                    value={person.id}
                                                    onChange={() => handleCheckboxChange(person.id)} 
                                                    // checked={selectedPersonIds.includes(person.id)}
                                                    checked={formData.persons.includes(person.id)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={cl.noResults}>
                                        Нет совпадений
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    {formData.persons.length > 0 && (
                        <Paper className={cl.selectedPersonWrapper}>
                            <p className={cl.selectedPersonsText}>Выбранные люди:</p>
                            {formData.persons.map(personId => {
                                const person = foundPersons.find(person => person.id === personId);
                                if (person) {
                                    return (
                                        <div key={personId} className={cl.selectedPersons}>
                                            {`${person.firstName} ${person.surname} ${person.patronymic}`}
                                            <Checkbox
                                                type="checkbox"
                                                checked={true}
                                                onChange={() => handleCheckboxChange(personId)}
                                            />
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </Paper>
                    )}
                </div>

        
                
                <div className={cl.row}>
                    <div>
                    <label className={cl.label}>Дата приказа</label>
                        <TextField 
                            sx={{ minWidth: 480 }}
                            id="outlined-basic" 
                            // label="Дата приказа" 
                            variant="outlined"  
                            size="small"
                            type='date'
                            value={formData.decreeDate}
                            onChange={(e) => setFormData({ ...formData, decreeDate: e.target.value })}
                        />
                    </div>
                </div>
                
                
            </div>
            <Button variant="contained" style={{ marginTop: '40px' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
            <NotificationContainer />
        </Paper>
    )

};

export default Dismissal;