import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './RankUp.module.css'
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import searchIcon from '../../../assets/icons/search.svg';


function RankUp() {
    const [formData, setFormData] = useState({
        personId: '',
        newRank: '',
        rankUpDate: '',
    });

    const [militaryRanksList, setMilitaryRanksList] = useState([]);
    const [foundPersons, setFoundPersons] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ showClearBtn, setShowClearBtn ] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleFormSubmit = async () => {
        console.log("handleFormSubmit is called");console.log('Form Data:', formData);
        
        try {
            if (!formData.personId || !formData.newRank || !formData.rankUpDate ) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            };
            // console.log("formData before axios request:", formData);
            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post(' http://127.0.0.1:8000/api/v1/generate-rankup-decree/', formData, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob', // Set the response type to blob
            });

            console.log("formData after axios request:", formData);
 

            // console.log("Server Response", response);

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
            // console.log("formData after download:", formData);
            } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        axios.get(`http://127.0.0.1:8000/api/v1/military-rank`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                setMilitaryRanksList(response.data);
                // console.log(response.data)
            })
            .catch(error => {
                console.log("Error main departments", error)
            })
            
    }, []); 

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
        } catch (error) {
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
        // Update personId in the formData state
        setFormData({
            ...formData,
            personId: Number(personId),
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
                <p className={cl.headline}>Приказ о присвоении звания</p>  
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
                        {foundPersons.map(person => (
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
                                    <Checkbox {...label}  
                                    value={person.id}
                                        onChange={() => handleCheckboxChange(person.id)} />
                                    {/* <input
                                        type="checkbox"
                                        className={cl.customCheckbox}
                                        value={person.id}
                                        onChange={() => handleCheckboxChange(person.id)}
                                    /> */}
                                </div>
                            </div>
                        ))}
                    </div>
                    )}

                </div>
                 
            <Box sx={{ minWidth: 290, marginTop: 2 }}>
                <FormControl size="small" fullWidth>
                    <InputLabel id="rank-label">Звание</InputLabel>
                    <Select
                        labelId="rank-label"
                        id="rank-select"
                        label="Звание"
                        value={formData.newRank}
                        onChange={(e) => setFormData({ ...formData, newRank: e.target.value })}
                    >
                        {militaryRanksList.map((rank) => (
                            <MenuItem key={rank.id} value={rank.rankTitle}>
                                {rank.rankTitle}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <TextField 
                type='date'
                id="outlined-basic" 
                // label="Дата присвоения" 
                variant="outlined"  
                size="small"
                value={formData.rankUpDate}
                onChange={(e) => setFormData({ ...formData, rankUpDate: e.target.value })}
            />
            </div>
            <Button variant="contained" style={{ marginTop: '40px' }} onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
            <NotificationContainer />
      </Paper>
    )
}

export default RankUp;
