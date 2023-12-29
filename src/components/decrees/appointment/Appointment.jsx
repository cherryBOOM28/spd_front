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
import ListItemText from '@mui/material/ListItemText';


function Appointment() {
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        patronymic: '',
        gender: '',
        position: '',
        department: '',
        monthCount: 0,
        base: '',
    });

    const [departmentsList, setDepartmentsList] = useState([]);
    const [positionsList, setPositionsList] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

    const base = [
        'представление',
        'рапорт',
        'заявление',
        'протокол и докладная записка',
    ];

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
                // console.log(response.data)
            })
            .catch(error => {
                console.log("Error fetching positions", error);
            });
        }
    }, [selectedDepartmentId]);

    const handleFormSubmit = async () => {
        try {
            if (!formData.firstName || !formData.surname || !formData.patronymic || !formData.gender || !formData.department || !formData.position | !formData.monthCount | !formData.base) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            };

            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/generate-appointment-decree/', formData, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob', // Set the response type to blob
            });

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
            } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Paper  elevation={3} className={cl.appointmentForm} style={{ marginTop: '80px' }}>
            <div>
                <p className={cl.headline}>Приказ о назначении</p>  
            </div>
        
            <div className={cl.form}>
                <div className={cl.row}>
                    <div>
                        {/* <label className={cl.label}>Имя</label> */}
                        {/* <input
                            type="text"
                            placeholder="Имя"
                            className={cl.workerInfo}
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        /> */}
                        <TextField 
                            id="outlined-basic" 
                            label="Имя" 
                            variant="outlined"  
                            size="small"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div>
                        {/* <label className={cl.label}>Фамилия</label> */}
                        {/* <input
                            type="text"
                            placeholder="Фамилия"
                            className={cl.workerInfo}
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        /> */}
                        <TextField 
                            id="outlined-basic" 
                            label="Фамилия" 
                            variant="outlined"  
                            size="small"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        />
                    </div>
                </div>
                <div className={cl.row}>
                    <div>
                        {/* <label className={cl.label}>Отчество</label>
                        <input
                            type="text"
                            placeholder="Отчество"
                            name='patronymic'
                            className={cl.workerInfo}
                            value={formData.patronymic}
                            onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                        /> */}
                        <TextField 
                            id="outlined-basic" 
                            label="Отчество" 
                            variant="outlined"  
                            size="small"
                            value={formData.patronymic}
                            onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                        />
                    </div>
                    <div>
                        {/* <label className={cl.label}>Пол</label>
                        <select
                            name='gender'
                            placeholder="Пол"
                            className={cl.workerInfoSelect}
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                            <option value="">Выберите пол</option>
                            <option value="Женский">Женский</option>
                            <option value="Мужской">Мужской</option>
                        </select> */}
                        <Box sx={{ minWidth: 223 }}>
                        {/* <label className={cl.label}>Должность</label> */}
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Пол"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            
                            >
                                <MenuItem value="Женский">Женский</MenuItem>
                                <MenuItem value="Мужской">Мужской</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    </div>
                </div>
                <div className={cl.row}>
                    <div>
                        {/* <label className={cl.label}>Должность</label>
                        <select
                            value={formData.position}
                            className={cl.workerInfoSelect}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            >
                            <option value="" disabled>Выберите должность</option>
                            {positionsList.map((position) => (
                                <option key={position} value={position}>
                                {position}
                                </option>
                            ))}
                        </select> */}
                        <Box sx={{ minWidth: 480 }}>
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
                                setFormData({ ...formData, department: selectedDepartment?.DepartmentName || '' });
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
                       
                    </div>
                    <div>
                        {/* <label className={cl.label}>Департамент</label>
                        <select
                            value={formData.department}
                            className={cl.workerInfoSelect}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                            <option value="" disabled>Выберите департамент</option>
                            {departmentsList.map((department) => (
                                <option key={department} value={department}>
                                {department}
                                </option>
                            ))}
                        </select> */}
                        
                    </div>
                </div>
                <div className={cl.row}>
                    {/* <Box sx={{ minWidth: 480 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Департамент</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Департамент"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            
                            >
                                {departmentsList.map((department) => (
                                    <MenuItem key={department} value={department}>
                                    {department}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box> */}
              
                        <Box sx={{ minWidth: 480 }}>
                        {/* <label className={cl.label}>Должность</label> */}
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Должность</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Должность"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            
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
                <div className={cl.row}>
                    <div>
                        {/* <label className={cl.label}>Срок испытательного периода</label>
                        <input
                            type="number"
                            placeholder="Срок испытательного периода"
                            className={cl.workerInfoSelect}
                            value={formData.monthCount}
                            onChange={(e) => setFormData({ ...formData, monthCount: e.target.value })}
                            style={{ width: '270px', height: '28px' }}
                        /> */}
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
                    <div>
                        {/* <label className={cl.label}>Oснование</label>
                        <select
                            value={formData.base}
                            className={cl.workerInfoSelect}
                            onChange={(e) => setFormData({ ...formData, base: e.target.value })}
                            >
                            <option value="" disabled>Выберите основание</option>
                            {base.map((base) => (
                                <option key={base} value={base}>
                                {base}
                                </option>
                            ))}
                        </select> */}
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
