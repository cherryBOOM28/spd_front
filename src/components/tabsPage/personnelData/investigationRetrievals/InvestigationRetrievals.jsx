import React, { useState } from 'react';
import axios from 'axios';
import cl from './InvestigationRetrievals.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { deleteInvestigation_retrievals } from '../../../../api/staff_info/investigation_retrievals/deleteInvestigation_retrievals';
import { updateInvestigation_retrievals } from '../../../../api/staff_info/investigation_retrievals/updateInvestigation_retrievals';

function InvestigationRetrievals({ investigationsInfo, setInvestigationsInfo }) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });

    // Добавление данных
    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.order_type_investigation || !inputData.order_doc_numb || !inputData.order_date_investigation) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                investigation_decree_type: inputData.investigation_decree_type,
                investigation_decree_number: inputData.investigation_decree_number,
                investigation_date: inputData.investigation_date,
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/investigation/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setInvestigationsInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит investigations
                    if (typeof prevData === 'object' && Array.isArray(prevData.investigations)) {
                      return {
                        ...prevData,
                        investigations: [...prevData.investigations, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain investigations");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    investigation_decree_type: '',
                    investigation_decree_number: '',
                    investigation_date: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            console.log(newData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteInvestigation_retrievals(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setInvestigationsInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит investigations
              if (typeof prevData === 'object' && Array.isArray(prevData.investigations)) {
                return {
                  ...prevData,
                  investigations: prevData.investigations.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain investigations");
                return prevData; // возвращаем prevData без изменений
              }
            });
        
            console.log("Successfully deleted");
          } catch (error) {
            console.error("Error deleting data in table:", error);
        }
    }
    
    // EDIT
    const [editedData, setEditedData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });
    
    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    investigation_decree_type: editedTableData.investigation_decree_type,
                    investigation_decree_number: editedTableData.investigation_decree_number,
                    investigation_date: editedTableData.investigation_date,
                };

                await updateInvestigation_retrievals(id, updatedData);

                setInvestigationsInfo(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.iin === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    investigation_decree_type: '',
                    investigation_decree_number: '',
                    investigation_date: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = investigationsInfo.investigations.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                investigation_decree_type: editedData.investigation_decree_type,
                investigation_decree_number: editedData.investigation_decree_number,
                investigation_date: editedData.investigation_date,
            };
            // console.log(id);
    
            const response = await updateInvestigation_retrievals(id, updatedData);
    
            if (response.status === 200) {
                setInvestigationsInfo((prevData) => ({
                    ...prevData,
                    investigations: prevData.investigations.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };

    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;


    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex',  alignItems: 'center', gap: '20px',  marginTop: '40px' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Служебные расследования, взыскания</p>
                <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                    {icon}
                </IconButton>
            </div>
        </div>
        <div>
            <div>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <Box>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth style={{ marginTop: '18px' }} >
                                    <InputLabel id="demo-simple-select-label">Тип приказа</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Тип приказа"
                                    name='investigation_decree_type'
                                    className={cl.workerInfoSelect}
                                    value={inputData.investigation_decree_type}
                                    onChange={(e) => setInputData({ ...inputData, investigation_decree_type: e.target.value })}
                                    >
                                        <MenuItem value="">Выберите вид взыскания</MenuItem>
                                        <MenuItem value="Замечания">Замечания</MenuItem>
                                        <MenuItem value="Выговор">Выговор</MenuItem>
                                        <MenuItem value="Строгий выговор">Строгий выговор</MenuItem>
                                        <MenuItem value="Неполное служебное соответствие">Неполное служебное соответствие</MenuItem>
                                        <MenuItem value="Увольнение">Увольнение</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                style={{ marginTop: '18px' }}
                                label="Номер приказа" 
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                type="text"
                                className={cl.workerInfoText}
                                value={inputData.investigation_decree_number}
                                onChange={(e) => setInputData({ ...inputData, investigation_decree_number: e.target.value })}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата приказа</label>
                                <TextField 
                                    id="outlined-basic" 
                                    // label="Дата поступления" 
                                    variant="outlined"  
                                    size="small"
                                    type="date" 
                                    className={cl.workerInfoText}
                                    // placeholder="Дата поступления"
                                    value={inputData.investigation_date || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setInputData((prevWorker) => ({
                                        ...prevWorker,
                                        investigation_date: newDate,
                                        }));
                                    }}
                                />
                            </div>
                            <Button variant="contained" type="submit" className={cl.submitBtn} >Добавить</Button>
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
                                    <TableCell>Тип приказа</TableCell>
                                    <TableCell>Номер приказа</TableCell>
                                    <TableCell>Дата приказа</TableCell>
                                    <TableCell>Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {investigationsInfo && investigationsInfo.investigations && investigationsInfo.investigations.length > 0 ? (
                                    investigationsInfo.investigations.map((d, i) => (
                                    <TableRow key={i}>
                                        <TableCell>  
                                            {editingId === d.id ? (
                                                <Box>
                                                    {/* <label className={cl.label}>Должность</label> */}
                                                    <FormControl size="small" fullWidth style={{ marginTop: '18px' }} >
                                                        <InputLabel id="demo-simple-select-label">Тип приказа</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Тип приказа"
                                                        name='investigation_decree_type'
                                                        className={cl.workerInfoSelect}
                                                        value={editedData.investigation_decree_type}
                                                        onChange={(e) => setEditedData({ ...editedData, investigation_decree_type: e.target.value })}
                                                        >
                                                            <MenuItem value="">Выберите вид взыскания</MenuItem>
                                                            <MenuItem value="Замечания">Замечания</MenuItem>
                                                            <MenuItem value="Выговор">Выговор</MenuItem>
                                                            <MenuItem value="Строгий выговор">Строгий выговор</MenuItem>
                                                            <MenuItem value="Неполное служебное соответствие">Неполное служебное соответствие</MenuItem>
                                                            <MenuItem value="Увольнение">Увольнение</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            ) : (
                                                d.investigation_decree_type
                                            )}
                                        </TableCell>
                                        <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} name='investigation_decree_number' value={editedData.investigation_decree_number} onChange={(e) => setEditedData({ ...editedData, investigation_decree_number: e.target.value })} /> : d.investigation_decree_number}</TableCell>
                                        <TableCell>
                                        {editingId === d.id ? (
                                            <div className={cl.datePickerContainer}>
                                                <input
                                                    type="date"
                                                    className={cl.formInput}
                                                    value={editedData.investigation_date || ''}
                                                    onChange={(e) =>
                                                        setEditedData((prevWorker) => ({
                                                        ...prevWorker,
                                                        investigation_date: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            d.investigation_date
                                        )}
                                        </TableCell>
                                        <TableCell className={cl.relativesActionBtns} style={{}}>
                                            {editingId === d.id ? (
                                                <div>
                                                    <IconButton className={cl.iconBtn} onClick={() => handleSaveEdit(d.id)}><FaCheck color=' #1565C0' /></IconButton>
                                                    <IconButton className={cl.iconBtn} onClick={handleCancelEdit}><IoClose /></IconButton>
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
                </Paper>
            </div>
        </div>
        </div>
    );
}

export default InvestigationRetrievals;