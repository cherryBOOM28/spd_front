import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField ,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {Button} from '@mui/material';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './NextAttestations.module.css';
import { AiFillPrinter } from 'react-icons/ai';

const NextAttestations = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };
  
    const handleSubmit = async () => {
        if (startDate && endDate) {
          try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/close_attestations/?startDate=${startDate}&endDate=${endDate}`);            setData(response.data.data);
          } catch (error) {
            console.error('Ошибка при получении данных:', error);
          } finally {
            setLoading(false);
          }
        } else {
            NotificationManager.error('Выберите дату перед отправкой запроса', 'Ошибка', 2000);
            console.log('Выберите дату перед отправкой запроса.');
        }
    };

    const handleDownloadExcel = () => {
        if (startDate && endDate) {
            window.location.href = `http://127.0.0.1:8000/api/v1/close_attestations_download/?startDate=${startDate}&endDate=${endDate}`;
        } else {
            NotificationManager.error('Выберите дату перед скачиванием файла', 'Ошибка', 2000);
            console.log('Выберите дату перед скачиванием файла.');
        }
    };
  
    useEffect(() => {
    }, []);

    const handleRowClick = (id) => {
        navigate(`/${id}`);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
  
    return (
    <div className={cl.wrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label htmlFor="datePicker" style={{ marginRight: '12px' }}>Начальная дата</label>
                    <TextField
                        type="date"
                        id="startDatePicker"
                        size='small'
                        className={cl.workerInfo}
                        value={startDate}
                        onChange={handleStartDateChange}
                        // label="Начальная дата"
                        required
                    />

                    <label htmlFor="datePicker" style={{ marginRight: '12px' }}>Конечная дата</label>
                    <TextField
                        type="date"
                        id="endDatePicker"
                        size='small'
                        className={cl.workerInfo}
                        value={endDate}
                        onChange={handleEndDateChange}
                        // label="Конечная дата"
                        required
                    />
                    </div>
            </div>
            <div style={{ display: 'flex',  gap: "10px"  }}>
                <Button variant="contained" onClick={handleSubmit} style={{ height: '34.5px', textTransform: 'none', backgroundColor: '#1B3884'  }}>Найти</Button>
                <Button variant="contained" onClick={handleDownloadExcel} style={{ display: 'flex', gap: "10px", height: '34.5px', textTransform: 'none', backgroundColor: '#1B3884'  }}>
                    Excel
                    <AiFillPrinter style={{ fontSize: '16px' }} />
                </Button>
            </div>
        </div>

        <TableContainer component={Paper} style={{ marginTop: '40px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Имя</TableCell>
                    <TableCell>Фамилия</TableCell>
                    <TableCell>Отчество</TableCell>
                    <TableCell>Должность</TableCell>
                    <TableCell>Отдел</TableCell>
                    <TableCell>Последняя дата аттестации</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} align="center">Загрузка...</TableCell>
                    </TableRow>
                    ) : data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={9} align="center">Ничего не найдено</TableCell>
                    </TableRow>
                    ) : (
                    data.map((row, index) => (
                        <TableRow key={index} onClick={() => handleRowClick(row.id)}>
                        <TableCell>
                            <img
                            src={`data:image/jpeg;base64,${row.photo}`}
                            alt={`${row.firstName} ${row.lastName}`}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.patronymic}</TableCell>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.lastAttDate}</TableCell>

                        </TableRow>
                    ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        {/* Добавлено уведомление */}
        <NotificationContainer />
    </div>
    );
};
  
export default NextAttestations;
