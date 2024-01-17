import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './Transfer.module.css'
import searchIcon from '../../../assets/icons/search.svg';
import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


function Transfer() {
    const [formData, setFormData] = useState({
        personId: '',
        newPosition: '',
        newDepartment: '',
        decreeDate: '',
        base: '',
    });

    const [selectedPersonIds, setSelectedPersonIds] = useState([]);
    const [foundPersons, setFoundPersons] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ showClearBtn, setShowClearBtn ] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [departmentsList, setDepartmentsList] = useState([]);
    const [positionsList, setPositionsList] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        axios.get(`http://127.0.0.1:8000/api/v1/department`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                setDepartmentsList(response.data);
                // console.log(response.data)
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
                console.log(response.data)
            })
            .catch(error => {
                console.log("Error fetching positions", error);
            });
        }
    }, [selectedDepartmentId]);

    const base = [
        'представление',
        'рапорт'
    ]

    const handleFormSubmit = async () => {
        console.log("handleFormSubmit is called");console.log('Form Data:', formData);
        
        try {
            if (!formData.personId || !formData.newPosition || !formData.newDepartment || !formData.base) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            };
            // console.log("formData before axios request:", formData);
            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post(' http://127.0.0.1:8000/api/v1/generate-transfer-decree/', formData, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                },
                // responseType: 'blob', // Set the response type to blob
            });

            // console.log("formData after axios request:", formData);
 

            console.log("Server Response", response);

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
            NotificationManager.success('Документ успешно создан', 'Успех', 3000);
            // console.log("formData after download:", formData);
            } catch (error) {
            // console.error('Error submitting form:', error);

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
                <p className={cl.headline}>Приказ о перемещении</p>  
            </div>
            <div className={cl.form} >
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
                    <Box sx={{ minWidth: 290 }}>
                        {/* <label className={cl.label}>Должность</label> */}
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Департамент</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Департамент"
                            // value={formData.newDepartment}
                            value={selectedDepartmentId}
                            onChange={(e) => {
                                const selectedDepartment = departmentsList.find(dep => dep.id === e.target.value);
                                setSelectedDepartmentId(e.target.value);
                                setFormData({ ...formData, newDepartment: selectedDepartment?.DepartmentName || '' });
                                // console.log("Selected Department ID:", e.target.value);
                            }}
                            >
                                {departmentsList.map((department) => (
                                <MenuItem key={department.id} value={department.id}>
                                {department.DepartmentName}
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 290 }}>
                        {/* <label className={cl.label}>Должность</label> */}
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Должность</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Должность"
                            value={formData.newPosition}
                            onChange={(e) => setFormData({ ...formData, newPosition: e.target.value })}
                            
                            >
                                {positionsList.map((position) => (
                                    <MenuItem key={position.id} value={position.positionTitle}>
                                    {position.positionTitle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
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
                    <Box sx={{ minWidth: 290 }}>
                        {/* <label className={cl.label}>Должность</label> */}
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
            <Button variant="contained" style={{ marginTop: '40px' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
            <NotificationContainer />
      </Paper>
    )
}

export default Transfer;
