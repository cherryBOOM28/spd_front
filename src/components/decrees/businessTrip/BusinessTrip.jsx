import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './BusinessTrip.module.css'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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

function BusinessTrip(props) {
    // сохраняется введенные данные
    const [formData, setFormData] = useState({
        decreeDate: '',
        bases: [],
        forms: [{ personId: null, departure: '', startDate: '', endDate: '', choice: '', transport: ''}]
    });

    // поиск
    const [foundPersons, setFoundPersons] = useState(Array(formData.forms.length).fill([]));
    const [searchTexts, setSearchTexts] = useState(Array(formData.forms.length).fill(''));
    const [showClearBtnArray, setShowClearBtnArray] = useState(Array(formData.forms.length).fill(false));
    const [showResultsArray, setShowResultsArray] = useState(Array(formData.forms.length).fill(false));
    const [selectedDepartments, setSelectedDepartments] = useState(Array(formData.forms.length).fill(''));

    const [departmentsList, setDepartmentsList] = useState([]);

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
            
    }, []); 

    // для создания новой формы
    const createNewForm = () => {
        setFormData(prevState => ({
            ...prevState,
            forms: [
                ...prevState.forms,
                {
                    personId: '',
                    departure: '',
                    startDate: '',
                    endDate: '',
                    choice: '',
                    transport: ''
                }
            ]
        }));
    };
    
    const handleChange = (event) => {
        // Формируем массив объектов с ключом "base"
        const selectedBases = event.target.value.map((base) => ({ base }));
        setFormData({ ...formData, bases: selectedBases }); // Обновляем состояние base
    };

    const handleFormSubmit = async () => {
        console.log("handleFormSubmit is called");console.log('Form Data:', formData);
        
            try {
            // Check if any form fields are empty
            if (formData.forms.some(form => !form.personId || !form.departure || !form.startDate || !form.endDate || !form.choice || !form.transport)) {
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

            // console.log("formData before axios request:", formData);
            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post(' http://127.0.0.1:8000/api/v1/generate-rankup-decree/', sendData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob'
            });

            console.log("formData after axios request:", formData);
 
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

            } catch (error) {
            console.error('Error submitting form:', error);

            // if (error.response && error.response.status === 400) {
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

    // Функция для обновления даты присвоения звания в форме по указанному индексу
    const handleStartDateChange = (index, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, startDate: newValue } : form)
        }));
    };
    
    const handleEndDateChange = (index, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, endDate: newValue } : form)
        }));
    };

    const handlePositionChange = (event, index) => {
        const selectedDepartment = event.target.value; // Получаем значение выбранного департамента из события изменения
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, departure: selectedDepartment } : form)
        }));
    };
    
    

    const [choice, setChoice] = useState(''); // Состояние для выбора варианта
    const handleChangeRadio = (event, index) => {
        const value = event.target.value; // Получаем значение из события
        // Обновляем formData с выбранным значением choice в форме по указанному индексу
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, choice: value } : form)
        }));
    };
    
    
    
    
    
    
    const transportType = [
        'қызметтік автокөлігімен',
        'теміржол көлігімен',
        '«Тальго» жүрдек поездімен',
    ];

    const [selectedReceivedType, setSelectedReceivedType] = useState('');
    const handleReceivedTypeChange = (event, index) => {
        const { value } = event.target;
        setSelectedReceivedType(value);
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, transport: value } : form)
        }));
    };

    return (
        <div>
             <div  elevation={3} className={cl.appointmentForm} style={{ marginTop: '80px' }}>
                <div>
                    <p className={cl.headline}>Приказ о командировке</p>  
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
                                    <div className={cl.search_wrapper}>
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
                                    value={form.departure}
                                    onChange={(event) => handlePositionChange(event, index)} 
                                
                                    >
                                        {departmentsList.map((department) => (
                                        <MenuItem key={department.id} value={department.DepartmentName}>
                                            {department.DepartmentName}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        
                        <div className={cl.row} style={{ marginBottom: '20px' }}>
                            <TextField
                            type='date'
                                sx={{ minWidth: 480 }}
                                id={`monthCount-${index}`}
                                // label="Дата присвоения"
                                variant="outlined"
                                size="small"
                                value={form.startDate}
                                // Используем handleRankUpDateChange для обработки изменений даты
                                onChange={(e) => handleStartDateChange(index, e.target.value)}
                            />
                        </div>

                        <div className={cl.row} style={{ marginBottom: '20px' }}>
                            <TextField
                            type='date'
                                sx={{ minWidth: 480 }}
                                id={`monthCount-${index}`}
                                // label="Дата присвоения"
                                variant="outlined"
                                size="small"
                                value={form.endDate}
                                // Используем handleRankUpDateChange для обработки изменений даты
                                onChange={(e) => handleEndDateChange(index, e.target.value)}
                            />
                        </div>

                        <div className={cl.row} style={{ marginBottom: '20px' }}>
                        <RadioGroup
                            aria-label="choice"
                            name="choice"
                            value={form.choice} // Используем значение из состояния формы
                            onChange={(event) => handleChangeRadio(event, index)} // Передаем событие и индекс
                        >
                            <div style={{ display: 'flex' }}>
                            <FormControlLabel
                                value="жолды есепке алғанда"
                                control={<Radio />}
                                label="жолды есепке алғанда"
                                checked={form.choice === "жолды есепке алғанда"} // Добавьте это условие
                                onChange={(event) => handleChangeRadio(event, index)}
                            />
                            <FormControlLabel
                                value="жолды есепке алмағанда"
                                control={<Radio />}
                                label="жолды есепке алмағанда"
                                checked={form.choice === "жолды есепке алмағанда"} // Добавьте это условие
                                onChange={(event) => handleChangeRadio(event, index)}
                            />
                            </div>
                        </RadioGroup>
                        </div>

                        <div className={cl.row} style={{ marginBottom: '20px' }}>
                            <Box sx={{ minWidth: 480 }}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="rank-label">Транспорт</InputLabel>
                                    <Select
                                        labelId="rank-label"
                                        id="rank-select"
                                        label="Транспорт"
                                        value={form.transport}
                                        onChange={e => handleReceivedTypeChange(e, index)}
                                    >
                                        {transportType.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    
                        

                        <div style={{ display: 'flex', justifyContent: 'center' }} className={cl.formWrapper}>
                            <IconButton onClick={() => handleDeleteForm(index)} className={cl.deleteBtn}>
                                <MdDelete style={{ color: '#D32F2F' }} />
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
    );
}

export default BusinessTrip;