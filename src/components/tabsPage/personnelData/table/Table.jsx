import React, { useState } from 'react';
import axios from 'axios';
import cl from './Table.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';

import { Button, TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { deleteSickLeaves } from '../../../../api/staff_info/sick_leaves/deleteSickLeaves';
import { updateSickLeaves } from '../../../../api/staff_info/sick_leaves/updateSickLeaves';

function TableSickLeaves({ sickLeavesInfo, setSickLeavesInfo }) {
    const { id } = useParams();


    // TABLE DATA
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        sickDocNumber: '',
        sickDocDate: '',
    });

    // Добавление данных
    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                sickDocNumber: inputData.sickDocNumber,
                sickDocDate: inputData.sickDocDate,
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/sick-leave/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setSickLeavesInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит sickLeaves
                    if (typeof prevData === 'object' && Array.isArray(prevData.sickLeaves)) {
                      return {
                        ...prevData,
                        sickLeaves: [...prevData.sickLeaves, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain sickLeaves");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    sickDocNumber: '',
                    sickDocDate: '',
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
            await deleteSickLeaves(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setSickLeavesInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит sickLeaves
              if (typeof prevData === 'object' && Array.isArray(prevData.sickLeaves)) {
                return {
                  ...prevData,
                  sickLeaves: prevData.sickLeaves.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain sickLeaves");
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
        sickDocNumber: '',
        sickDocDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    // Начало редактирования
    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    sickDocNumber: editedTableData.sickDocNumber,
                    sickDocDate: editedTableData.sickDocDate,
                };

                await updateSickLeaves(id, updatedData);

                setSickLeavesInfo(prevData => {
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
                    sickDocNumber: '',
                    sickDocDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = sickLeavesInfo.sickLeaves.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    // Сохранение изменении
    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                sickDocNumber: editedData.sickDocNumber,
                sickDocDate: editedData.sickDocDate,
            };
            // console.log(id);
    
            const response = await updateSickLeaves(id, updatedData);
    
            if (response.status === 200) {
                setSickLeavesInfo((prevData) => ({
                    ...prevData,
                    sickLeaves: prevData.sickLeaves.map((tableData) =>
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
                <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Больничные листы</p>
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
                            <TextField
                                style={{ marginTop: '17px' }}
                                label="Номер приказа" 
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                type="text"
                                className={cl.workerInfoText}
                                value={inputData.sickDocNumber}
                                onChange={(e) => setInputData({ ...inputData, sickDocNumber: e.target.value })}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', }}>
                                <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата приказа</label>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"  
                                    size="small"
                                    type="date"
                                    className={cl.workerInfoText}
                                    value={inputData.sickDocDate || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setInputData((prevWorker) => ({
                                        ...prevWorker,
                                        sickDocDate: newDate,
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
                                    <TableCell>Номер приказа</TableCell>
                                    <TableCell>Дата приказа</TableCell>
                                    <TableCell>Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sickLeavesInfo && sickLeavesInfo.sickLeaves && sickLeavesInfo.sickLeaves.length > 0 ? (
                                    sickLeavesInfo.sickLeaves.map((d, i) => (
                                    <tr key={i}>
                                        <TableCell>{editingId === d.id ? <input type="number" className={cl.editInput} name='sickDocNumber' value={editedData.sickDocNumber} onChange={(e) => setEditedData({ ...editedData, sickDocNumber: e.target.value })} /> : d.sickDocNumber}</TableCell>
                                        <TableCell>
                                        {editingId === d.id ? (
                                            <div className={cl.datePickerContainer}>
                                                <input
                                                    type="date"
                                                    className={cl.formInput}
                                                    placeholder="Дата приказа"
                                                    name='sickDocDate'
                                                    value={editedData.sickDocDate || ''}
                                                    onChange={(e) => {
                                                        const newDate = e.target.value;
                                                        setEditedData((prevData) => ({
                                                        ...prevData,
                                                        sickDocDate: newDate,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            d.sickDocDate
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
                                    </tr>
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

export default TableSickLeaves;