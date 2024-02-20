import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './LaborActivity.module.css';
import Cookies from 'js-cookie';

import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';

import Modal from '../../UI/modal/Modal';

import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { TextField, Paper, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';

import { MdFileDownload } from "react-icons/md";

import { deleteWorkingHistory } from '../../../api/working_history/deleteWorkingHistory';
import { UpdateWorkingHistory } from '../../../api/working_history/updateWorkingHistory';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function LaborActivity({ workingHistory, setWorkingHistory }) {
    const { id } = useParams();
    // console.log(`id: ${id}`);

    useEffect(() => {
        // Your asynchronous operations or API calls
        console.log('Component is re-rendering with updated workingHistory:', workingHistory);
    }, [workingHistory]);

    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
        personType: '',
        personSubType: ''
    });

    // Добавление данных
    const handleAddNewData = async (e, id) => {
        e.preventDefault();
        // console.log("Current id:", id); 
        try {
            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.orfanization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              personId: id,
              positionName: inputData.positionName,
              startDate: inputData.startDate,
              endDate: inputData.endDate,
              department: inputData.department,
              organizationName: inputData.organizationName,
              organizationAddress: inputData.organizationAddress,
              personType: inputData.personType,
              personSubType: inputData.personSubType,
            };

            // console.log(
            //     { newData },
            //     {id}
            // )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/working-history/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setWorkingHistory(prevData => {
                    // Проверяем, что prevData является объектом и содержит workingHistories
                    if (typeof prevData === 'object' && Array.isArray(prevData.workingHistories)) {
                      return {
                        ...prevData,
                        workingHistories: [...prevData.workingHistories, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain workingHistories");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  positionName: '',
                  startDate: '',
                  endDate: '',
                  department: '',
                  organizationName: '',
                  organizationAddress: '',
                  personType: '',
                  personSubType: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            window.location.reload();
            NotificationManager.success('Данные сохранились!', 'Успех', 3000)

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteWorkingHistory(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setWorkingHistory(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит workingHistories
              if (typeof prevData === 'object' && Array.isArray(prevData.workingHistories)) {
                return {
                  ...prevData,
                  workingHistories: prevData.workingHistories.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain workingHistories");
                return prevData; // возвращаем prevData без изменений
              }
            });
            window.location.reload();
            // console.log("Successfully deleted");
          } catch (error) {
            console.error("Error deleting data in table:", error);
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
        personType: '',
        personSubType: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        const selectedRow = workingHistory.workingHistories.find(row => row.id === id);
        setEditedData(selectedRow);
        setIsModalOpen(true);
    
        try {
            const updatedData = {
                id: id,
                personId: id,
                positionName: editedTableData.positionName,
                startDate: editedTableData.startDate,
                endDate: editedTableData.endDate,
                department: editedTableData.department,
                organizationName: editedTableData.organizationName,
                organizationAddress: editedTableData.organizationAddress,
                isPravoOhranka: editedTableData.isPravoOhranka,
                HaveCoefficient: editedTableData.HaveCoefficient,
                personType:  editedTableData.personType,
                personSubType:  editedTableData.personSubType,
            };
    
            await UpdateWorkingHistory(id, updatedData);
    
            setWorkingHistory(prevData => {
                return prevData.map(tableData => {
                    if(tableData.id === id) {
                        return {...tableData, ...updatedData}
                    }
                    return tableData;
                })
            });
    
            setEditingId(null);
            setEditedData({
                id: id,
                positionName: '',
                startDate: '',
                endDate: '',
                department: '',
                organizationName: '',
                organizationAddress: '',
                isPravoOhranka: '',
                HaveCoefficient: '',
                personType: '',
                personSubType: ''
            });
        } catch(error) {
            console.error('Error updating table data:', error);
        }
    };
    


    const handleSaveEdit = async (id) => {
        id = editedData.id; // Преобразуем переменную id в число
        console.log("Type of id:", typeof id);
        console.log("ID переданный в handleSaveEdit:", id);
        try {
            const updatedData = {
                id: editedData.id,
                personId: editedData.personId,
                positionName: editedData.positionName,
                startDate: editedData.startDate,
                endDate: editedData.endDate,
                department: editedData.department,
                organizationName: editedData.organizationName,
                organizationAddress: editedData.organizationAddress,
                HaveCoefficient: editedData.HaveCoefficient || false,
                isPravoOhranka: editedData.isPravoOhranka || false,
                // isPravoOhranka: editedData.isPravoOhranka,
                // HaveCoefficient: editedData.HaveCoefficient,
                personType: editedData.personType,
                personSubType: editedData.personSubType,
            };

            // Check if overall_experience is defined before adding to updatedData
            if (editedData.overall_experience !== undefined) {
                updatedData.overall_experience = {
                    years: editedData.overall_experience.years || 0,
                    months: editedData.overall_experience.months || 0,
                    days: editedData.overall_experience.days || 0,
                };
            }

            // Check if pravo_experience is defined before adding to updatedData
            if (editedData.pravo_experience !== undefined) {
                updatedData.pravo_experience = {
                    years: editedData.pravo_experience.years || 0,
                    months: editedData.pravo_experience.months || 0,
                    days: editedData.pravo_experience.days || 0,
                };
            }

            // console.log("personId", id);
            console.log("updatedData", {updatedData});
            console.log('Overall Experience:', updatedData.overall_experience);
            console.log('Pravo Experience:', updatedData.pravo_experience);
            console.log('editedData:', editedData);


            
            
            const response = await UpdateWorkingHistory(id, updatedData);
            console.log('Before API Call - workingHistory:', workingHistory);
            // console.log('After API Call - response:', response.data);
            console.log('After API Call - workingHistory:', workingHistory);
            
            console.log("Response from server:", response);
  
            if (response.status === 200) {
                setWorkingHistory((prevData) => ({
                    ...prevData,
                    workingHistories: prevData.workingHistories.map((tableData) =>
                        tableData.id === id 
                        ? {
                            ...tableData,
                            overall_experience: {
                                years: updatedData.overall_experience?.years,
                                months: updatedData.overall_experience?.months,
                                days: updatedData.overall_experience?.days,
                            },
                            pravo_experience: {
                                years: updatedData.pravo_experience?.years,
                                months: updatedData.pravo_experience?.months,
                                days: updatedData.pravo_experience?.days,
                            },
                          }
                        : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
            // console.log(updatedData);
            window.location.reload();
            NotificationManager.success('Данные изменились!', 'Успех', 3000)
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
        setIsModalOpen(false); 
    };

    const handleDownload = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/generate_work_reference/${id}/`, {
            responseType: 'arraybuffer', // Указываем, что ожидаем бинарные данные
          });
    
          // Создаем объект Blob из полученных данных
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
          // Создаем ссылку для скачивания файла
          const url = window.URL.createObjectURL(blob);
    
          // Создаем временную ссылку, добавляем атрибуты и эмулируем клик
          const a = document.createElement('a');
          a.href = url;
          a.download = 'work_reference.docx';
          document.body.appendChild(a);
          a.click();
    
          // Освобождаем ресурсы
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch (error) {
          console.error('Ошибка при скачивании файла', error);
        }
    };

    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;

    
    // Опции для personSubType в зависимости от выбранного значения в personType
    const subTypeOptions = {
        "Впервые назначенный": [
        "Академия правоохранительных органов",
        "В особом порядке",
        "Военнослужащие"
        ],
        "Бывший сотрудник правоохранительного органа": [
        "Органы внутренних дел",
        "Органы прокуратуры",
        "Антикоррупционные службы",
        "Органы национальной безопасности",
        "Служба гос охраны",
        "Органы по фин мониторингу"
        ],
        "Откомандирован из другого правоохранительного органа": [
        "Органы внутренних дел",
        "Органы прокуратуры",
        "Антикоррупционные службы",
        "Органы национальной безопасности",
        "Служба гос охраны",
        "Органы по фин мониторингу"
        ]
    };

    return (
        <div className={cl.totalInfoWrapper}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex',  alignItems: 'center', gap: '20px' }}>
                    <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Трудовая деятельность</p>
                    <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                        {icon}
                    </IconButton>
                </div>
                <Button onClick={handleDownload}  style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}> <MdFileDownload style={{ fontSize: '19px' }} /> Скачать данные</Button>
            </div>
        </div>
        <div>
            <div>
                {showForm && (
                    <form onSubmit={(e) => handleAddNewData(e, id)} style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Начало периода</label>
                                <TextField
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                type="date"
                                className={cl.workerInfoText}
                                value={inputData.startDate || ''}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setInputData((prevWorker) => ({
                                    ...prevWorker,
                                    startDate: newDate,
                                    }));
                                }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Конец периода</label>
                                <TextField
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                type="date"
                                className={cl.workerInfoText}
                                value={inputData.endDate || ''}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setInputData((prevWorker) => ({
                                    ...prevWorker,
                                    endDate: newDate,
                                    }));
                                }}
                                />
                            </div>
                        
                            <Button variant="contained" type="submit" className={cl.submitBtn} >Добавить</Button>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <TextField
                                style={{ marginTop: '25px' }}
                                id="outlined-basic" 
                                label="Должность" 
                                variant="outlined"  
                                size="small"
                                type="text"
                                className={cl.workerInfoText}
                                value={inputData.positionName}
                                onChange={(e) => setInputData({ ...inputData, positionName: e.target.value })}
                            />
                            <TextField
                                style={{ marginTop: '25px' }}
                                id="outlined-basic" 
                                label="Подразделение" 
                                variant="outlined"  
                                size="small"
                                type="text"
                                className={cl.workerInfoText}
                                value={inputData.department}
                                onChange={(e) => setInputData({ ...inputData, department: e.target.value })}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <TextField
                                style={{ marginTop: '25px' }}
                                id="outlined-basic" 
                                label="Учреждение" 
                                variant="outlined"  
                                size="small"
                                type="text"
                                className={cl.workerInfoText}
                                value={inputData.organizationName}
                                onChange={(e) => setInputData({ ...inputData, organizationName: e.target.value })}
                            />
                            <TextField
                                style={{ marginTop: '25px' }}
                                id="outlined-basic" 
                                label="Местонахождение организации" 
                                variant="outlined"  
                                size="small"
                                type="text"
                                className={cl.workerInfoText}
                                value={inputData.organizationAddress}
                                onChange={(e) => setInputData({ ...inputData, organizationAddress: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px', marginBottom: '50px' }}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Тип сотрудника</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Тип сотрудника"
                                    name='personType'
                                    className={cl.workerInfoSelect}
                                    value={inputData.personType}
                                    onChange={(e) => {
                                        const selectedType = e.target.value;
                                        const updatedSubTypes = subTypeOptions[selectedType] || [];
                                        setInputData({ ...inputData, personType: selectedType, personSubType: "", personSubTypes: updatedSubTypes });
                                        }}
                                    >
                                    <MenuItem value="">Выберите тип сотрудника</MenuItem>
                                    <MenuItem value="Впервые назначенный">Впервые назначенный</MenuItem>
                                    <MenuItem value="Бывший сотрудник правоохранительного органа"> Бывший сотрудник правоохранительного органа</MenuItem>
                                    <MenuItem value="Откомандирован из другого правоохранительного органа">Откомандирован из другого правоохранительного органа</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Подтип сотрудника</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Подтип сотрудника"
                                    name='personSubType'
                                    className={cl.workerInfoSelect}
                                    value={inputData.personSubType}
                                    onChange={(e) => setInputData({ ...inputData, personSubType: e.target.value })}
                                    >
                                    <MenuItem value="">Выберите подтип сотрудника</MenuItem>
                                    {inputData.personSubTypes && inputData.personSubTypes.map((subType, index) => (
                                        <MenuItem key={index} value={subType}>{subType}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </form>
                )}
            </div>
            <div>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Начало периода</TableCell>
                                <TableCell>Конец периода </TableCell>
                                <TableCell>Подразделение</TableCell>
                                <TableCell>Должность</TableCell>
                                <TableCell>Учреждение</TableCell>
                                <TableCell>Местонахожден. организации</TableCell>
                                <TableCell>Коэфициент</TableCell>
                                <TableCell>Правохран. орган</TableCell>
                                <TableCell>Тип сотрудника</TableCell>
                                <TableCell>Подтип сотрудника</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workingHistory && workingHistory.workingHistories && workingHistory.workingHistories.length > 0 ? (
                                workingHistory.workingHistories.map((d, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Начало периода"
                                                        name='startDate'
                                                        value={editedData.startDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setEditedData((prevData) => ({
                                                            ...prevData,
                                                            startDate: newDate,
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                d.startDate
                                            )} */}
                                            {d.startDate}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Конец периода"
                                                        name='endDate'
                                                        value={editedData.endDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setEditedData((prevData) => ({
                                                            ...prevData,
                                                            endDate: newDate,
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                d.endDate
                                            )} */}
                                            {d.endDate}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='department' 
                                                    value={editedData.department} 
                                                    onChange={(e) => setEditedData({ ...editedData, department: e.target.value })} 
                                                />
                                            ) : (
                                                d.department
                                            )} */}
                                            { d.department}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='positionName' 
                                                    value={editedData.positionName} 
                                                    onChange={(e) => setEditedData({ ...editedData, positionName: e.target.value })} 
                                                />
                                            ) : (
                                                d.positionName
                                            )} */}
                                            {d.positionName}
                                        </TableCell>

                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='organizationName' 
                                                    value={editedData.organizationName} 
                                                    onChange={(e) => setEditedData({ ...editedData, organizationName: e.target.value })} 
                                                />
                                            ) : (
                                                d.organizationName
                                            )} */}
                                            {d.organizationName}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='organizationAddress' 
                                                    value={editedData.organizationAddress} 
                                                    onChange={(e) => setEditedData({ ...editedData, organizationAddress: e.target.value })} 
                                                />
                                            ) : (
                                                d.organizationAddress
                                            )} */}
                                            {d.organizationAddress}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <input
                                                type="checkbox"
                                                name="HaveCoefficient"
                                                checked={editedData.HaveCoefficient || false}
                                                onChange={(e) =>
                                                    setEditedData((prevData) => ({
                                                    ...prevData,
                                                    HaveCoefficient: e.target.checked,
                                                    }))
                                                }
                                                />
                                            ) : (
                                                d.HaveCoefficient ? "Да" : "Нет"
                                            )} */}
                                            { d.HaveCoefficient ? "Да" : "Нет"}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <input
                                                type="checkbox"
                                                name="isPravoOhranka"
                                                checked={editedData.isPravoOhranka || false}
                                                onChange={(e) =>
                                                    setEditedData((prevData) => ({
                                                    ...prevData,
                                                    isPravoOhranka: e.target.checked,
                                                    }))
                                                }
                                                />
                                            ) : (
                                                d.isPravoOhranka ? "Да" : "Нет"
                                            )} */}
                                            { d.isPravoOhranka ? "Да" : "Нет"}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                  <InputLabel id="demo-simple-select-label">Тип сотрудника</InputLabel>
                                                  <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Тип сотрудника"
                                                    name='personType'
                                                    className={cl.workerInfoSelect}
                                                    value={editedData.personType}
                                                    onChange={(e) => {
                                                        const selectedType = e.target.value;
                                                        const updatedSubTypes = subTypeOptions[selectedType] || [];
                                                        setEditedData({ ...editedData, personType: selectedType, personSubType: "", personSubTypes: updatedSubTypes });
                                                      }}
                                                  >
                                                    <MenuItem value="">Выберите тип сотрудника</MenuItem>
                                                    <MenuItem value="Впервые назначенный">Впервые назначенный</MenuItem>
                                                    <MenuItem value="Бывший сотрудник правоохранительного органа"> Бывший сотрудник правоохранительного органа</MenuItem>
                                                    <MenuItem value="Откомандирован из другого правоохранительного органа">Откомандирован из другого правоохранительного органа</MenuItem>

                                                  </Select>
                                                </FormControl>
                                              </Box>
                                            ) : (
                                                d.personType
                                            )} */}
                                            {d.personType}
                                        </TableCell>
                                        <TableCell>
                                            {/* {editingId === d.id ? (
                                                <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                  <InputLabel id="demo-simple-select-label">Подтип сотрудника</InputLabel>
                                                  <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Подтип сотрудника"
                                                    name='personSubType'
                                                    className={cl.workerInfoSelect}
                                                    value={editedData.personSubType}
                                                    onChange={(e) => setEditedData({ ...editedData, personSubType: e.target.value })}
                                                  >
                                                    <MenuItem value="">Выберите подтип сотрудника</MenuItem>
                                                    {editedData.personSubTypes && editedData.personSubTypes.map((subType, index) => (
                                                        <MenuItem key={index} value={subType}>{subType}</MenuItem>
                                                    ))}
                                                  </Select>
                                                </FormControl>
                                              </Box>
                                            ) : (
                                                d.personSubType
                                            )} */}
                                            {d.personSubType}
                                        </TableCell>
                                        <TableCell className={cl.relativesActionBtns} >
                                            {editingId === d.id ? (
                                                <div>
                                                    <IconButton className={cl.iconBtn} onClick={() => handleEdit(d.id)}><MdEdit /></IconButton>
                                                    <IconButton className={cl.iconBtn} onClick={() => handleDelete(d.id)}><FaTrash /></IconButton>
                                                </div>
                                            ) : (
                                                <>
                                                    <IconButton className={cl.iconBtn} onClick={() => handleEdit(d.id)}><MdEdit /></IconButton>
                                                    <IconButton className={cl.iconBtn} onClick={() => handleDelete(d.id)}><FaTrash /></IconButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        Нет данных
                                    </TableCell>
                                </TableRow>
                            )}


                        </TableBody>
                    </Table>
                </TableContainer>
                {isModalOpen && editedData && (
                    <Modal visible={isModalOpen} setVisible={setIsModalOpen} className={cl.myModal}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '8px' }}>
                                <MdEdit style={{ fontSize: '18px' }} />
                                <h1 className={cl.headline}>Трудовая деятельность</h1>
                            </div>
                            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Начало периода</label>
                                    <TextField
                                            type="date"
                                            size='small'
                                            className={cl.workerInfoText}
                                            placeholder="Начало периода"
                                            name='startDate'
                                            value={editedData.startDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setEditedData((prevData) => ({
                                                ...prevData,
                                                startDate: newDate,
                                                }));
                                            }}
                                        />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Конец периода</label>
                                    <TextField
                                        type="date"
                                        className={cl.workerInfoText}
                                        placeholder="Конец периода"
                                        name='endDate'
                                        size='small'
                                        value={editedData.endDate || ''}
                                        onChange={(e) => {
                                            const newDate = e.target.value;
                                            setEditedData((prevData) => ({
                                            ...prevData,
                                            endDate: newDate,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Подразделение</label>
                                    <TextField size='small' type="text" className={cl.workerInfoText} name='department' value={editedData.department} onChange={(e) => setEditedData({ ...editedData, department: e.target.value })} /> 
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Должность</label>
                                    <TextField size='small' type="text" className={cl.workerInfoText} name='positionName' value={editedData.positionName} onChange={(e) => setEditedData({ ...editedData, positionName: e.target.value })} /> 
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Учреждение</label>
                                    <TextField size='small' type="text" className={cl.workerInfoText} name='organizationName' value={editedData.organizationName} onChange={(e) => setEditedData({ ...editedData, organizationName: e.target.value })} /> 
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Местонахождение организации</label>
                                    <TextField size='small' type="text" className={cl.workerInfoText} name='organizationAddress' value={editedData.organizationAddress} onChange={(e) => setEditedData({ ...editedData, organizationAddress: e.target.value })} /> 
                                </div>
                            </div>
                                    
                            <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Коэфициент</label>
                                    <input
                                    type="checkbox"
                                    name="HaveCoefficient"
                                    checked={editedData.HaveCoefficient || false}
                                    onChange={(e) =>
                                        setEditedData((prevData) => ({
                                        ...prevData,
                                        HaveCoefficient: e.target.checked,
                                        }))
                                    }
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Правохран. орган</label>
                                    <input
                                    type="checkbox"
                                    name="isPravoOhranka"
                                    checked={editedData.isPravoOhranka || false}
                                    onChange={(e) =>
                                        setEditedData((prevData) => ({
                                        ...prevData,
                                        isPravoOhranka: e.target.checked,
                                        }))
                                    }
                                    />
                                </div>
                            </div>
                                    
                            <div  style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Тип сотрудника</label>
                                    <div className={cl.selectContainer}>
                                        <select
                                            style={{ width: '134%' }}
                                            id="personType"
                                            name="personType"
                                            value={editedData.personType}
                                            className={cl.workerInfoSelect}
                                            onChange={(e) => {
                                                const selectedType = e.target.value;
                                                const updatedSubTypes = subTypeOptions[selectedType] || [];
                                                setEditedData({ ...editedData, personType: selectedType, personSubType: "", personSubTypes: updatedSubTypes });
                                            }}
                                        >
                                            <option value="">Выберите тип сотрудника</option>
                                            <option value="Впервые назначенный">Впервые назначенный</option>
                                            <option value="Бывший сотрудник правоохранительного органа">Бывший сотрудник правоохранительного органа</option>
                                            <option value="Откомандирован из другого правоохранительного органа">Откомандирован из другого правоохранительного органа</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '8px' }}>
                                    <label style={{ fontSize: '14px', color: '#4B4B4B', marginLeft: '2px' }}>Подтип сотрудника</label>
                                    <div>
                                        <div style={{ minWidth: '120px' }}>
                                            <select
                                                id="demo-simple-select"
                                                name='personSubType'
                                                className={cl.workerInfoSelect}
                                                value={editedData.personSubType}
                                                onChange={(e) => setEditedData({ ...editedData, personSubType: e.target.value })}
                                            >
                                                <option value="">Выберите подтип сотрудника</option>
                                                {editedData.personSubTypes && editedData.personSubTypes.map((subType, index) => (
                                                    <option key={index} value={subType}>{subType}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                    
                                <div className={cl.relativesActionBtns} style={{ marginTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                        <Button variant="contained" style={{ width: '300px' }} onClick={handleSaveEdit}>Сохранить</Button>
                                        <Button variant="outlined" style={{  width: '300px' }} onClick={handleCancelEdit}>Отменить</Button>
                                    </div>
                                </div>

                        </div>
                        
                  
                    </Modal>
                )}
            </Paper>

            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Общий стаж</TableCell>
                                <TableCell>Стаж в правохранительных органах</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workingHistory && workingHistory.workingHistories && workingHistory.workingHistories
                            .filter((d) =>  d.overall_experience || d.pravo_experience)
                            .map((d, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                    {d.overall_experience && (
                                        <div className={cl.experience}>
                                            <p>Год:  {d.overall_experience.years}</p>
                                            <p>Месяц: {d.overall_experience.months}</p>
                                            <p>День: {d.overall_experience.days}</p>
                                        </div>
                                    )}
                                    </TableCell>
                                    <TableCell>
                                        {d.pravo_experience && (
                                            <div className={cl.experience}>
                                            <p>Год:  {d.pravo_experience.years}</p>
                                                <p>Месяц: {d.pravo_experience.months}</p>
                                                <p>День: {d.pravo_experience.days}</p>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            </div>
        </div>
    </div>
    );
}

export default LaborActivity;