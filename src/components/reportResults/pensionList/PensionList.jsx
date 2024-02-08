import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './PensionList.module.css';
import { AiFillPrinter } from 'react-icons/ai';

const PensionList = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };
  
    const handleSubmit = async () => {
        if (selectedDate) {
          try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/pension-list-view/?date=${selectedDate}`);
            setData(response.data.data);
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
        if (selectedDate) {
            window.location.href = `http://127.0.0.1:8000/api/v1/pension-list-download/?date=${selectedDate}`;
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


  
    return (
    <div className={cl.wrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="datePicker" style={{ marginRight: '12px' }}>Выберите дату:</label>
                <TextField
                    type="date"
                    id="datePicker"
                    size='small'
                    className={cl.workerInfo}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div style={{ display: 'flex',  gap: "10px"  }}>
                <Button variant="contained" onClick={handleSubmit} style={{ height: '34.5px', textTransform: 'none' }}>Найти</Button>
                <Button variant="contained" onClick={handleDownloadExcel} style={{ display: 'flex', gap: "10px", height: '34.5px', textTransform: 'none' }}>
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
                    <TableCell>Звание</TableCell>
                    <TableCell>Возраст</TableCell>
                    <TableCell>Дата выхода на пенсию</TableCell>

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
                        <TableCell>{row.currentRank}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.pensionDate}</TableCell>
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
  
export default PensionList;
