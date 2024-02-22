import React, { useState } from 'react';
import axios from 'axios';
import cl from './Attestations.module.css';
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { FaCheck } from "react-icons/fa6";

import { deleteAttestations } from '../../../../api/staff_info/attestations/deleteAttestations';
import { updateAttestations } from '../../../../api/staff_info/attestations/updateAttestations';

function Attestations({ attestationInfo, setAttestationInfo }) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        attResult: '',
        lastAttDate: '',
        nextAttDateMin: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                attResult: inputData.attResult,
                lastAttDate: inputData.lastAttDate,
            };
          
            console.log(
                { newData },
                {id}
            )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/attestation/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            if (response.status === 201) {
                const addedData = {
                    ...newData,
                    nextAttDateMin: response.data.nextAttDateMin,
                };
                setAttestationInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит attestations
                    if (typeof prevData === 'object' && Array.isArray(prevData.attestations)) {
                      return {
                        ...prevData,
                        attestations: [...prevData.attestations, addedData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain attestations");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    attResult: '',
                    lastAttDate: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteAttestations(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setAttestationInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит attestations
              if (typeof prevData === 'object' && Array.isArray(prevData.attestations)) {
                return {
                  ...prevData,
                  attestations: prevData.attestations.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain attestations");
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
        attResult: '',
        lastAttDate: '',
        lastAttDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    attResult: editedTableData.attResult,
                    lastAttDate: editedTableData.lastAttDate,
                };

                await updateAttestations(id, updatedData);

                setAttestationInfo(prevData => {
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
                    attResult: '',
                    lastAttDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = attestationInfo.attestations.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                attResult: editedData.attResult,
                lastAttDate: editedData.lastAttDate,
            };
            // console.log(id);
           
    
            const response = await updateAttestations(id, updatedData);
    
            if (response.status === 200) {
                const updatedDataWithNextAttDateMin = {
                    ...updatedData,
                    nextAttDateMin: response.data.nextAttDateMin,
                };
                setAttestationInfo(prevData => {
                    const updatedDataArray = prevData.attestations.map(tableData =>
                        tableData.id === id ? { ...tableData, ...updatedDataWithNextAttDateMin } : tableData
                    );
    
                    console.log('Prev Data:', prevData.attestations);
                    console.log('Updated Data:', updatedData);
    
                    return {
                        ...prevData,
                        attestations: updatedDataArray,
                    };
                });

               
                
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
            <div style={{ display: 'flex',  alignItems: 'center', gap: '20px' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Аттестация</p>
                <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                    {icon}
                </IconButton>
            </div>
        </div>
        <div>
            <div>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <div className={cl.wrapper}>
                            <Box>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Результат аттестации</InputLabel>
                                    <Select
                                    className={cl.formInput}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Результат аттестации"
                                    placeholder="Результат аттестации"
                                    name='attResult'
                                    value={inputData.attResult}
                                    onChange={(e) => setInputData({ ...inputData, attResult: e.target.value })}
                                    
                                    >
                                        <MenuItem value="">Выберите результат</MenuItem>
                                        <MenuItem value="Соответствует">Соответствует</MenuItem>
                                        <MenuItem value="Не соответствует"> Не соответствует</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField 
                                type="date"
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                name='lastAttDate'
                                className={cl.workerInfo}
                                value={inputData.lastAttDate || ''}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setInputData((prevWorker) => ({
                                    ...prevWorker,
                                    lastAttDate: newDate,
                                    }));
                                }}
                            />
                            <Button type="submit"  variant="contained">Добавить</Button>
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
                                    <TableCell>Результат аттестации</TableCell>
                                    <TableCell>Последняя дата  аттестации</TableCell>
                                    <TableCell>Следующая дата аттестации</TableCell>
                                    <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {attestationInfo && attestationInfo.attestations && attestationInfo.attestations.length > 0 ? (
                        attestationInfo.attestations.map((d, i) => (
                            <TableRow  key={i}>
                                <TableCell >  
                                    {editingId === d.id ? (
                                        <select
                                            className={cl.selectRelative_type}
                                            value={editedData.attResult}
                                            onChange={(e) => setEditedData({ ...editedData, attResult: e.target.value })}
                                        >
                                            <option value="">Выберите результат</option>
                                            <option value="Соответствует">Соответствует</option>
                                            <option value="Не соответствует"> Не соответствует</option>
                                        </select>
                                    ) : (
                                        d.attResult
                                    )}
                                </TableCell >
                                 <TableCell >
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            name='lastAttDate'
                                            value={editedData.lastAttDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setEditedData((prevData) => ({
                                                ...prevData,
                                                lastAttDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                ) : (
                                    d.lastAttDate
                                )}
                                </TableCell >
                                <TableCell >{d.nextAttDateMin}
                                </TableCell >
                                <TableCell  className={cl.relativesActionBtns} style={{}}>
                                    {editingId === d.id ? (
                                        <div>
                                            <IconButton className={cl.iconBtn} onClick={() => handleSaveEdit(d.id)}><FaCheck color=' #1B3884' /></IconButton>
                                            <IconButton className={cl.iconBtn} onClick={handleCancelEdit}><IoClose /></IconButton>
                                        </div>
                                    ) : (
                                        <>
                                            <IconButton className={cl.iconBtn} onClick={() => handleEdit(d.id)}><MdEdit /></IconButton>
                                            <IconButton className={cl.iconBtn} onClick={() => handleDelete(d.id)}><FaTrash /></IconButton>
                                        </>
                                    )}
                                </TableCell >
                            </TableRow >
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

export default Attestations;