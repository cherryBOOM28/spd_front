import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import cl from './Vacation.module.css'
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function Vacation() {
    // сохраняется введенные данные
    const [formData, setFormData] = useState({
        decreeDate: '',
        bases: [],
        forms: [{ personId: null, otpuskType: '', startDate: '', endDate: '', benefitChoice: '', priority: ''}]
    });


    const otpuskType = [
        'Отпуск',
        'Отпуск Кратко',
        'Отпуск Отзыв',
    ];


    const [selectedOtpuskType, setSelectedOtpuskType] = useState('');
    const handleOtpuskTypeChange = (event) => {
        setSelectedOtpuskType(event.target.value);
    };

    // поиск
    const [foundPersons, setFoundPersons] = useState(Array(formData.forms.length).fill([]));
    const [searchTexts, setSearchTexts] = useState(Array(formData.forms.length).fill(''));
    const [showClearBtnArray, setShowClearBtnArray] = useState(Array(formData.forms.length).fill(false));
    const [showResultsArray, setShowResultsArray] = useState(Array(formData.forms.length).fill(false));

    const [priorityData, setPriorityData] = useState(null);

    const handleChange = (event) => {
        // Формируем массив объектов с ключом "base"
        const selectedBases = event.target.value.map((base) => ({ base }));
        setFormData({ ...formData, bases: selectedBases }); // Обновляем состояние base
    };

    // выбор даты для отпуска
    const handleDateChange = async (event, formIndex, dateType) => {
        // В зависимости от значения dateType выбираем, записываем ли мы начальную дату (startDate) или конечную дату (endDate)
        const selectedDate = event.target.value; // Получаем выбранную дату

        // Получаем personId из состояния formData по индексу формы
        const personId = formData.forms[formIndex].personId;

        setFormData(prevFormData => {
            const updatedForms = [...prevFormData.forms];
            if (dateType === 'startDate') {
                updatedForms[formIndex].startDate = selectedDate;
            } else if (dateType === 'endDate') {
                updatedForms[formIndex].endDate = selectedDate;
            }
            return { ...prevFormData, forms: updatedForms };
        });

        const queryParams = {
            personId: personId,
            startDate: formData.forms[formIndex].startDate, // Получаем начальную дату из формы
            endDate: formData.forms[formIndex].endDate // Получаем конечную дату из формы
        };


        // Проверяем выбранный personId и даты в консоли
        console.log('Выбранный personId:', personId);
        console.log('Выбранная дата начала:', queryParams.startDate);
        console.log('Выбранная дата окончания:', queryParams.endDate);

    
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/get-vacation-days/', {
                params: queryParams // Передаем параметры запроса в виде объекта
            });
            setPriorityData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };
    

    // для создания новой формы
    const createNewFormOtpusk = () => {
        setFormData(prevState => ({
            ...prevState,
            forms: [
                ...prevState.forms,
                {
                    personId: '',
                    otpuskType: '',
                    startDate: '',
                    endDate: '',
                    benefitChoice: '',
                    priority: ''
                }
            ]
        }));
    };

    const createNewFormKratko = () => {
        setFormData(prevState => ({
            ...prevState,
            forms: [
                ...prevState.forms,
                {
                    personId: '',
                    otpuskType: '',
                    startDate: '',
                    endDate: '',
                }
            ]
        }));
    };

    const createNewFormOtziv = () => {
        setFormData(prevState => ({
            ...prevState,
            forms: [
                ...prevState.forms,
                {
                    personId: '',
                    otpuskType: '',
                    otzivDate: '',
                }
            ]
        }));
    };



    const handleFormSubmit = async () => {
        try {
            // if (!formData.personId  || !formData.decreeDate || !formData.endDate || !formData.startDate || !formData.otpuskType || !formData.benefitChoice || !formData.priority) {
            //     // Show a warning notification
            //     NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
            //     return; // Stop form submission
            // };

            let sendData = {};

            if (formData.otpuskType === 'Отпуск') {
                sendData = {
                    bases: formData.bases,
                    decreeDate: formData.decreeDate,
                    forms: formData.forms.map(form => ({
                        personId: form.personId,
                        startDate: form.startDate,
                        endDate: form.endDate,
                        otpuskType: 'Отпуск',
                        benefitChoice: form.benefitChoice,
                        priority: form.priority
                    }))
                    // Добавьте другие поля для отпуска кратко
                };
            } else if (formData.otpuskType === 'Отпуск Кратко') {
                sendData = {
                    bases: formData.bases,
                    decreeDate: formData.decreeDate,
                    forms: formData.forms.map(form => ({
                        personId: form.personId,
                        startDate: form.startDate,
                        endDate: form.endDate,
                        otpuskType: 'Отпуск Кратко'
                    }))
                    // Добавьте другие поля для отпуска кратко
                };
            } 

            console.log("formData before axios request:", sendData);


            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/generate-otpusk-decree/', sendData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob'
            });
            console.log(response.json)

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

    const handleFormSubmitOtziv = async () => {
        try {
            // if (!formData.personId  || !formData.decreeDate || !formData.endDate || !formData.startDate || !formData.otpuskType || !formData.benefitChoice || !formData.priority) {
            //     // Show a warning notification
            //     NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
            //     return; // Stop form submission
            // };


            let   sendDataOtziv = {
                    bases: formData.bases,
                    decreeDate: formData.decreeDate,
                    forms: formData.forms.map(form => ({
                        personId: form.personId,
                        otzivDate: form.otzivDate,
                        otpuskType: 'Отпуск Отзыв'
                    }))}

            console.log("formData before axios request:", formData);
            console.log("formData before axios request:", sendDataOtziv);



            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/generate-otpusk-otziv/', sendDataOtziv, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob'
            });
            console.log(response.json)

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
    const handleDeleteFormOtpuskKratko = (index) => {
        const updatedForms = [...formData.forms];
        updatedForms.splice(index, 1);
        setFormData({ ...formData, forms: updatedForms });
    };

    const handleDeleteFormOtpuskOtzyv = (index) => {
        const updatedForms = [...formData.forms];
        updatedForms.splice(index, 1);
        setFormData({ ...formData, forms: updatedForms });
    };

    const handleDeleteFormOtpusk = (index) => {
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

    const handleStartDateChangeOtziv = (index, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, otzivDate: newValue } : form)
        }));
    };

    const handleChangeRadio = (event, index) => {
        const value = event.target.value; // Получаем значение из события
        // Обновляем formData с выбранным значением choice в форме по указанному индексу
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, benefitChoice: value } : form)
        }));
    };

    const [selectedReceivedType, setSelectedReceivedType] = useState('');
    const handleReceivedTypeChange = (event, index) => {
        const { value } = event.target;
    
        // Обновляем formData с выбранным значением priority в форме по указанному индексу
        setFormData(prevState => ({
            ...prevState,
            forms: prevState.forms.map((form, i) => i === index ? { ...form, priority: value } : form)
        }));
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
                    <p className={cl.headline}>Приказ  об отпуске</p>  
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

                    <div className={cl.row}>
                        <Box sx={{ minWidth: 480 }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Вид отпуска</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Вид отпуска"
                                value={selectedOtpuskType}
                                // Обработчик изменений пуст, чтобы ничего не отправлять
                                onChange={handleOtpuskTypeChange}
                                >
                                <MenuItem value={'отпуск'}>Отпуск</MenuItem>
                                <MenuItem value={'отпуск кратко'}>Отпуск кратко</MenuItem>
                                <MenuItem value={'отпуск отзыв'}>Отпуск отзыв</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
            </div>
        
            <div className={cl.form}>

                {selectedOtpuskType === 'отпуск кратко' && (
                    <div>
                        {formData.forms.map((form, index) => (
                            <Paper className={cl.formStyle} key={index}>

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

                            <div className={cl.row}>
                                <Box sx={{ minWidth: 480 }}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Вид отпуска</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Вид отпуска"
                                        value={formData.otpuskType}
                                        onChange={(e) => setFormData({ ...formData, otpuskType: e.target.value })}
                                        >
                                            <MenuItem value="Отпуск Кратко">Отпуск Кратко</MenuItem>
                                            {/* {otpuskType.map((otpuskType) => (
                                                <MenuItem key={otpuskType} value={otpuskType}>
                                                {otpuskType}
                                                </MenuItem>
                                            ))} */}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
    
                            <div className={cl.row}>
                                <div>
                                    <label className={cl.label}>Дата начало</label>
                                    <TextField
                                        sx={{ minWidth: 480 }}
                                        id="outlined-basic" 
                                        // label="Дата приказа" 
                                        variant="outlined"  
                                        size="small"
                                        type='date'
                                        value={form.startDate}
                                        onChange={(e) => handleStartDateChange(index, e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={cl.row}>
                                <div>
                                    <label className={cl.label}>Дата конца</label>
                                    <TextField
                                        sx={{ minWidth: 480 }}
                                        id="outlined-basic" 
                                        // label="Дата приказа" 
                                        variant="outlined"  
                                        size="small"
                                        type='date'
                                        value={form.endDate}
                                        onChange={(e) => handleEndDateChange(index, e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }} className={cl.formWrapper}>
                                <IconButton onClick={() => handleDeleteFormOtpuskKratko(index)} className={cl.deleteBtn}>
                                    <MdDelete style={{ color: '#D32F2F' }} />
                                </IconButton>

                                <IconButton onClick={createNewFormKratko} style={{ color: '#1b3884' }} color="primary" aria-label="add an alarm">
                                    <FaPlus />
                                </IconButton>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#1b3884' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
                            </div>
                            <NotificationContainer />
    
                            </Paper>
                        ))}
                    </div>
                )}
            
                {selectedOtpuskType === 'отпуск' && (
                    <div>
                        {formData.forms.map((form, index) => (
                            <Paper className={cl.formStyle} key={index}>

                        
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

                            <Box sx={{ minWidth: 480 }}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Вид отпуска</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Вид отпуска"
                                    value={formData.otpuskType}
                                    onChange={(e) => setFormData({ ...formData, otpuskType: e.target.value })}
                                    >
                                        <MenuItem value="Отпуск">Отпуск</MenuItem>
                                        {/* {otpuskType.map((otpuskType) => (
                                            <MenuItem key={otpuskType} value={otpuskType}>
                                            {otpuskType}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                                </FormControl>
                            </Box>
    
                            <div className={cl.row}>
                                <div>
                                    <label className={cl.label}>Дата начало</label>
                                    <TextField
                                        sx={{ minWidth: 480 }}
                                        id="outlined-basic" 
                                        // label="Дата приказа" 
                                        variant="outlined"  
                                        size="small"
                                        type='date'
                                        value={formData.startDate}
                                        onChange={(e) => handleDateChange(e, index, 'startDate')}
                                    />
                                </div>
                            </div>

                            <div className={cl.row}>
                                <div>
                                    <label className={cl.label}>Дата конца</label>
                                    <TextField
                                        sx={{ minWidth: 480 }}
                                        id="outlined-basic" 
                                        // label="Дата приказа" 
                                        variant="outlined"  
                                        size="small"
                                        type='date'
                                        value={formData.endDate}
                                        onChange={(e) => handleDateChange(e, index, 'endDate')}
                                    />
                                </div>
                            </div>

                            <Box sx={{ minWidth: 480 }}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Использовать</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Использовать"
                                        value={form.priority}
                                        onChange={e => handleReceivedTypeChange(e, index)}
                                    >
                                        {/* <MenuItem value="Календарные дни">{`Календарные дни - ${priorityData.vacation_basic_days}`}</MenuItem>
                                        <MenuItem value="Отпускные дни за выслуги лет">{`Отпускные дни за выслуги лет - ${priorityData.vacation_exp_days}`}</MenuItem> */}

                                        {(priorityData && priorityData.vacation_basic_days) ? (
                                            <MenuItem value="Календарные дни">{`Календарные дни - ${priorityData.vacation_basic_days}`}</MenuItem>
                                        ) : null}
                                        {(priorityData && priorityData.vacation_exp_days) ? (
                                            <MenuItem value="Отпускные дни за выслуги лет">{`Отпускные дни за выслуги лет - ${priorityData.vacation_exp_days}`}</MenuItem>
                                        ) : null}
                                        {(priorityData && priorityData.priorityField === "No need") && (
                                            <MenuItem value="">Нет данных</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>


                            <div className={cl.row} style={{ marginBottom: '20px' }}>
                                <RadioGroup
                                    aria-label="benefitChoice"
                                    name="benefitChoice"
                                    value={form.benefitChoice} // Используем значение из состояния формы
                                    onChange={(event) => handleChangeRadio(event, index)} // Передаем событие и индекс
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <FormControlLabel
                                        value="С пособием"
                                        control={<Radio />}
                                        label="С пособием"
                                        checked={form.benefitChoice === "С пособием"} // Добавьте это условие
                                        onChange={(event) => handleChangeRadio(event, index)}
                                    />
                                    <FormControlLabel
                                        value="Без пособия"
                                        control={<Radio />}
                                        label="Без пособия"
                                        checked={form.benefitChoice === "Без пособия"} // Добавьте это условие
                                        onChange={(event) => handleChangeRadio(event, index)}
                                    />
                                    </div>
                                </RadioGroup>
                            </div>

                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }} className={cl.formWrapper}>
                                <IconButton onClick={() => handleDeleteForm(index)} className={cl.deleteBtn}>
                                    <MdDelete style={{ color: '#D32F2F' }} />
                                </IconButton>

                                <IconButton onClick={createNewFormOtpusk} style={{ color: '#1b3884' }} color="primary" aria-label="add an alarm">
                                    <FaPlus />
                                </IconButton>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#1b3884' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
                            </div>

                            </Paper>
                        ))}
                    </div>
                )}
               
                
                {selectedOtpuskType === 'отпуск отзыв' && (
                    <div>
                        {formData.forms.map((form, index) => (
                            <Paper className={cl.formStyle} key={index}>

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

                            <div className={cl.row}>
                                <Box sx={{ minWidth: 480 }}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Вид отпуска</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Вид отпуска"
                                        value={formData.otpuskType}
                                        onChange={(e) => setFormData({ ...formData, otpuskType: e.target.value })}
                                        >
                                             <MenuItem value="Отпуск">Отпуск Отзыв</MenuItem>
                                            {/* {otpuskType.map((otpuskType) => (
                                                <MenuItem key={otpuskType} value={otpuskType}>
                                                {otpuskType}
                                                </MenuItem>
                                            ))} */}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
    
                            <div className={cl.row}>
                                <div>
                                    <label className={cl.label}>Дата отзыва</label>
                                    <TextField
                                        sx={{ minWidth: 480 }}
                                        id="outlined-basic" 
                                        // label="Дата приказа" 
                                        variant="outlined"  
                                        size="small"
                                        type='date'
                                        value={form.otzivDate}
                                        onChange={(e) => handleStartDateChangeOtziv(index, e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }} className={cl.formWrapper}>
                                <IconButton onClick={() => handleDeleteFormOtpuskOtzyv(index)} className={cl.deleteBtn}>
                                    <MdDelete style={{ color: '#D32F2F' }} />
                                </IconButton>

                                <IconButton onClick={createNewFormOtziv} style={{ color: '#1b3884' }} color="primary" aria-label="add an alarm">
                                    <FaPlus />
                                </IconButton>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#1b3884' }} onClick={handleFormSubmitOtziv} className={cl.btn}>Получить приказ</Button>
                            </div>
                            <NotificationContainer />
    
                            </Paper>
                        ))}
                    </div>
                )}
                
            </div>
            {/* <Button variant="contained" style={{ marginTop: '40px' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button> */}
            <NotificationContainer />
        </div>
    )


};

export default Vacation;