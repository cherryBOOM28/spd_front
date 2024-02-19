import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import cl from './Transfer.module.css'
import { FormControl, MenuItem, OutlinedInput, Select, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import searchIcon from '../../../assets/icons/search.svg';
import Checkbox from '@mui/material/Checkbox';
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";


function Transfer() {
    // сохраняется введенные данные
    const [formData, setFormData] = useState({
        decreeDate: '',
        bases: [],
        forms: [{ personId: null, newPosition: '', newDepartment: ''}]
    })

    const [departmentsList, setDepartmentsList] = useState([]);
    const [positionsList, setPositionsList] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');


    // поиск
    const [foundPersons, setFoundPersons] = useState(Array(formData.forms.length).fill([]));
    const [searchTexts, setSearchTexts] = useState(Array(formData.forms.length).fill(''));
    const [showClearBtnArray, setShowClearBtnArray] = useState(Array(formData.forms.length).fill(false));
    const [showResultsArray, setShowResultsArray] = useState(Array(formData.forms.length).fill(false));

    
    // для создания новой формы
    const createNewForm = () => {
        // Get the selected department based on selectedDepartmentId
        const selectedDepartment = departmentsList.find(dep => dep.id === selectedDepartmentId);

        // Get the selected position based on formData.newPosition
        const selectedPosition = positionsList.find(position => position.positionTitle === formData.newPosition);

        // Create a new form with the selected position information
        const newForm = {
            personId: null, // Assuming personId is not provided initially
            newPosition: selectedPosition ? selectedPosition.positionTitle : '', // Set the position title if it exists
            newDepartment: selectedDepartment ? selectedDepartment.department : '' // Set the department name if it exists
        };

        setFormData(prevState => ({
            ...prevState,
            forms: [
                ...prevState.forms,
                newForm
            ]
        }));
    };

    const handleChange = (event) => {
        // Формируем массив объектов с ключом "base"
        const selectedBases = event.target.value.map((base) => ({ base }));
        setFormData({ ...formData, bases: selectedBases }); // Обновляем состояние base
    };



    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        axios.get(`http://127.0.0.1:8000/api/v1/department`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                setDepartmentsList(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log("Error main departments", error)
            })
            
    }, []); // Пустой массив зависимостей гарантирует, что запрос будет выполнен только один раз при монтировании

    useEffect(() => {
        if (selectedDepartmentId !== null) {
            const accessToken = Cookies.get('jwtAccessToken');
            axios.get(`http://127.0.0.1:8000/api/v1/positions_departments/${selectedDepartmentId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
            .then(response => {
                setPositionsList(response.data.positions);
                console.log("DepartmentId:", selectedDepartmentId); // Выводим id департамента в консоль
                console.log("Positions:", response.data.positions);
            })
            .catch(error => {
                console.log("Error fetching positions", error);
            });
        }
    }, [selectedDepartmentId]);

    // Добавляем обработчик изменения значения для селекта департамента
   // Обработчик изменения значения для селекта департамента
    const handleDepartmentChange = (event, index) => {
        const newSelectedDepartmentId = event.target.value;
        const newSelectedDepartmentName = departmentsList.find(dep => dep.id === newSelectedDepartmentId)?.DepartmentName || ''; // Получаем название департамента по айди
        setSelectedDepartmentId(prevState => {
            const newState = [...prevState];
            newState[index] = newSelectedDepartmentId;
            return newState;
        });
        setFormData(prevState => {
            const newForms = [...prevState.forms];
            newForms[index].newDepartment = newSelectedDepartmentName; // Сохраняем название департамента в форме
            return { ...prevState, forms: newForms };
        });
    };

    // Добавляем обработчик изменения значения для селекта должности
    const handlePositionChange = (event, index) => {
        const newPosition = event.target.value;
        setFormData(prevState => {
            const newForms = [...prevState.forms];
            newForms[index].newPosition = newPosition;
            return { ...prevState, forms: newForms };
        });
    };


    const handleFormSubmit = async () => {
        console.log("handleFormSubmit is called");console.log('Form Data:', formData);
        
        try {
            // Check if any form fields are empty
            if (formData.forms.some(form => !form.personId || !form.newPosition || !form.newDepartment)) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, заполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            }
            console.log("formData before axios request:", formData);

            const sendData = {
                decreeDate: formData.decreeDate,
                bases: formData.bases,
                forms: formData.forms,
            };


            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post(' http://127.0.0.1:8000/api/v1/generate-transfer-decree/', sendData, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob', // Set the response type to blob
            });

            // console.log("formData after axios request:", formData);
 

            if (response.status !== 400) {
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

            } catch (error) {
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


    // поиск
    const handleInputChange = async (event, formIndex) => {
        const inputValue = event.target.value;
        setSearchTexts(prevSearchTexts => {
            const updatedSearchTexts = [...prevSearchTexts];
            updatedSearchTexts[formIndex] = inputValue;
            return updatedSearchTexts;
        });
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search_persons/?q=`, {
                params: {
                    q: inputValue,
                },
            });
    
            // Handle the data returned from the server
            const data = response.data;
            setFoundPersons(prevFoundPersons => {
                const updatedFoundPersons = [...prevFoundPersons];
                updatedFoundPersons[formIndex] = data.persons;
                return updatedFoundPersons;
            });
            setShowResultsArray(prevShowResultsArray => {
                const updatedShowResultsArray = [...prevShowResultsArray];
                updatedShowResultsArray[formIndex] = data.persons.length > 0; // Показывать результаты только если они есть
                return updatedShowResultsArray;
            });
            setShowClearBtnArray(prevShowClearBtnArray => {
                const updatedShowClearBtnArray = [...prevShowClearBtnArray];
                updatedShowClearBtnArray[formIndex] = inputValue !== '';
                return updatedShowClearBtnArray;
            });
        } catch (error) {
            console.log()
            console.error('Error fetching data:', error);
        }
    };


    // для чекбоксов внутри поиска
    const handleCheckboxChange = (personId, formIndex) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            forms: prevFormData.forms.map((form, index) => {
                if (index === formIndex) {
                    return { ...form, personId: personId };
                }
                return form;
            })
        }));
    };
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    // для чистки поля поиска
    const handleClearClick = (formIndex) => {
        setSearchTexts(prevSearchTexts => {
            const updatedSearchTexts = [...prevSearchTexts];
            updatedSearchTexts[formIndex] = '';
            return updatedSearchTexts;
        });
        setShowClearBtnArray(prevShowClearBtnArray => {
            const updatedShowClearBtnArray = [...prevShowClearBtnArray];
            updatedShowClearBtnArray[formIndex] = false;
            return updatedShowClearBtnArray;
        });
        setShowResultsArray(prevShowResultsArray => {
            const updatedShowResultsArray = [...prevShowResultsArray];
            updatedShowResultsArray[formIndex] = false;
            return updatedShowResultsArray;
        });
        setFoundPersons(prevFoundPersonss => {
            const updatedFoundPersonss = [...prevFoundPersonss];
            updatedFoundPersonss[formIndex] = [];
            return updatedFoundPersonss;
        });
    };

    // удаление формы
    const handleDeleteForm = (index) => {
        const updatedForms = [...formData.forms];
        updatedForms.splice(index, 1);
        setFormData({ ...formData, forms: updatedForms });
    };


    return (
        <div>
            <div  elevation={3} className={cl.appointmentForm} style={{ marginTop: '80px' }}>
                <div>
                    <p className={cl.headline}>Приказ о перемещении</p>  
                </div>
            
                <div className={cl.form}>
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

                    <div className={cl.row}>
                        <FormControl sx={{ width: 480 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Основание</InputLabel>
                            <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            size='middle'
                            value={formData.bases ? formData.bases.map((item) => item.base) : []} // Check if formData.bases is defined before mapping // Преобразуем массив объектов в массив строк
                            onChange={handleChange}
                            input={<OutlinedInput label="Основание" />}
                            renderValue={(selected) => selected.join(', ')}
                            >
                            {['представление', 'рапорт', 'заявление', 'протокол'].map((base) => (
                                <MenuItem key={base} value={base}>
                                 <Checkbox checked={formData.bases ? formData.bases.some((item) => item.base === base) : false} /> {/* Проверяем, есть ли выбранный элемент в массиве объектов */}
                                <ListItemText primary={base} />
                                </MenuItem>
                            ))}
                                </Select>
                        </FormControl>
                    </div>
                </div>
            </div>

            {formData.forms.map((form, index) => (
                <Paper className={cl.formStyle} key={index}>
                
                    <div >
                        <div className={cl.row} style={{ marginBottom: '20px' }}>
                            <div>
                                <div className={cl.searchWrapper}>
                                    <img src={searchIcon} alt="searchIcon" className={cl.searchIcon} />
                                    <input 
                                        type="text" 
                                        className={cl.search__input}
                                        placeholder='Поиск'
                                        value={searchTexts[index]}
                                        onChange={event => handleInputChange(event, index)}
                                        onKeyPress={event => handleInputChange(event, index)}
                                    />
                                    {showClearBtnArray[index] && (
                                        <button className={cl.clearBtn} onClick={() => handleClearClick(index)}>
                                            &#x2715;
                                        </button>
                                    )}
                                </div>
                                {showResultsArray[index] && (
                                    <div className={`${cl.search_wrapper} ${cl.results_scrollable}`}>
                                        {foundPersons[index].length > 0 ? (
                                            foundPersons[index].map(person => (
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
                                                            onChange={() => handleCheckboxChange(person.id, index)} 
                                                            checked={form.personId === person.id}
                                                            // checked={formData.persons.includes(person.id)}
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

                        <div className={cl.row} style={{ marginBottom: '20px' }}>
                            <Box sx={{ minWidth: 480 }}>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Департамент</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Департамент"
                                    // value={formData.newDepartment}
                                    value={selectedDepartmentId[index]}
                                    onChange={(event) => handleDepartmentChange(event, index)} // Добавляем индекс формы
                             
                                    >
                                        {departmentsList.map((department) => (
                                        <MenuItem key={department.id} value={department.id}>
                                            {department.DepartmentName}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    
                        <div className={cl.row}>
                            <Box sx={{ minWidth: 480 }}>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Должность</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Должность"
                                    value={form.newPosition}
                                    onChange={(event) => handlePositionChange(event, index)} // Добавляем индекс формы
                               
                                    
                                    >
                                        {positionsList.map((position) => (
                                            <MenuItem key={position.id} value={position.positionTitle}>
                                            {position.positionTitle}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        

                        <div style={{ display: 'flex', justifyContent: 'center' }} className={cl.formWrapper}>
                            <IconButton onClick={() => handleDeleteForm(index)} className={cl.deleteBtn}>
                                <MdDelete style={{ color: '#D32F2F', marginTop: '15px' }} />
                            </IconButton>
                        </div>
                       
                    </div>
                </Paper>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={createNewForm} color="primary" aria-label="add an alarm">
                    <FaPlus />
                </IconButton>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" style={{ marginTop: '40px' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default Transfer;
