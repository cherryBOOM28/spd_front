import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import cl from './Appointment.module.css'
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
import ListItemText from '@mui/material/ListItemText';


function Appointment() {
    const [formData, setFormData] = useState({
        personId: '',
        decreeDate: '',
        monthCount: 0,
        base: '',
        appointmentType: ''
    });

    const [foundPersons, setFoundPersons] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ showClearBtn, setShowClearBtn ] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedPersonIds, setSelectedPersonIds] = useState([]);


    const base = [
        'представление',
        'рапорт',
        'заявление',
        'протокол и докладная записка',
    ];

    const appointmentType = [
        'Впервые принятый',
        'Вновь принятый'
    ];

    const handleFormSubmit = async () => {
        try {
            if (!formData.personId || !formData.decreeDate || !formData.base || !formData.appointmentType) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            };

            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/generate-appointment-decree/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            console.log(response.json)

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.docx'); // Set the desired file name with the correct extension
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            // console.log("formData", formData)
        } 
        catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.error || 'Неизвестная ошибка';
                NotificationManager.error(errorMessage, 'Ошибка', 3000);
            } else {
                NotificationManager.error('Произошла ошибка', 'Ошибка', 3000);
            }
        }
    };

    useEffect(() => {
        // Update formData when selectedPersonIds change
        setFormData((prevFormData) => ({
            ...prevFormData,
            personId: selectedPersonIds.length > 0 ? Number(selectedPersonIds[selectedPersonIds.length - 1]) : 0,
        }));
    }, [selectedPersonIds]);

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
        setSelectedPersonIds((prevSelectedPersonIds) => {
            const isSelected = prevSelectedPersonIds.includes(personId);
    
            // If checkbox is checked, add the personId to selectedPersonIds
            // If checkbox is unchecked, remove the personId from selectedPersonIds
            const updatedSelectedPersonIds = isSelected
                ? prevSelectedPersonIds.filter((id) => id !== personId)
                : [...prevSelectedPersonIds, personId];
    
            // Update the selectedPersonIds state
            setFormData((prevFormData) => ({
                ...prevFormData,
                personId: Number(personId),
            }));
    
            console.log("Selected Person IDs:", updatedSelectedPersonIds);
            return updatedSelectedPersonIds;
        });
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
                <p className={cl.headline}>Приказ о назначении</p>  
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
                                                    checked={selectedPersonIds.includes(person.id)}
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
                            <InputLabel id="demo-simple-select-label">Тип назначения</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Тип назначения"
                            value={formData.appointmentType}
                            onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                            >
                                {appointmentType.map((type) => (
                                    <MenuItem key={type} value={type}>
                                    {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                
                <div className={cl.row}>
                    {formData.appointmentType === 'Впервые принятый' && (
                        <div>
                           
                            <TextField 
                                sx={{ minWidth: 480 }}
                                id="outlined-basic" 
                                label="Срок испытательного периода" 
                                variant="outlined"  
                                size="small"
                                value={formData.monthCount}
                                onChange={(e) => setFormData({ ...formData, monthCount: e.target.value })}
                            />
                        </div>
                    )}
                </div>
                <div className={cl.row}>
                    <div>
                    <label className={cl.label}>Срок испытательного периода</label>
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
                    <Box sx={{ minWidth: 480 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Oснование</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Oснование"
                            value={formData.base}
                            onChange={(e) => setFormData({ ...formData, base: e.target.value })}
                            >
                                {base.map((base) => (
                                    <MenuItem key={base} value={base}>
                                    {base}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                
                
            </div>
            <Button variant="contained" style={{ marginTop: '40px' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
            <NotificationContainer />
        </Paper>
    )
}

export default Appointment;
