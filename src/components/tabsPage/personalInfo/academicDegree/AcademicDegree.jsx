import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './AcademicDegree.module.css';
import axios from 'axios';
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

import { deleteAcademicDegree } from '../../../../api/persona_info/academic_degree/deleteAcademicDegree';
import { updateAcademicDegree } from '../../../../api/persona_info/academic_degree/updateAcademicDegree';

function AcademicDegree({academicDegree, setAcademicDegree}, props) {
    const { id } = useParams();

    // ДОБАВЛЕНИЕ УЧЕНОЙ СТЕПЕНИ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const handleAddDegree = async (e, id) => {
        e.preventDefault(); // предотвращаем отправку формы по умолчанию
        try {
            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.orfanization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              personId: id,
              academicPlace: inputData.academicPlace,
              academicDegree: inputData.academicDegree,
              academicDiplomaNumber: inputData.academicDiplomaNumber,
              academicDiplomaDate: inputData.academicDiplomaDate,
            };

            // console.log(
            //     { newData },
            //     {id}
            // )

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/academic-degree/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setAcademicDegree(prevData => {
                    // Проверяем, что prevData является объектом и содержит academicDegrees
                    if (typeof prevData === 'object' && Array.isArray(prevData.academicDegrees)) {
                      return {
                        ...prevData,
                        academicDegrees: [...prevData.academicDegrees, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain academicDegrees");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    academicPlace: '',
                    academicDegree: '',
                    academicDiplomaNumber: '',
                    academicDiplomaDate: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ ACADEMIC DEGREE
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteAcademicDegree(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setAcademicDegree(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит academicDegrees
              if (typeof prevData === 'object' && Array.isArray(prevData.academicDegrees)) {
                return {
                  ...prevData,
                  academicDegrees: prevData.academicDegrees.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain academicDegrees");
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
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  academicPlace: editedTableData.academicPlace,
                  academicDegree: editedTableData.academicDegree,
                  academicDiplomaNumber: editedTableData.academicDiplomaNumber,
                  academicDiplomaDate: editedTableData.academicDiplomaDate,
                };

                // console.log("updatedData", {updatedData});

                await updateAcademicDegree(id, updatedData);

                setAcademicDegree(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.id === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });
                // console.log(updatedData)

                setEditingId(null);
                setEditedData({
                    id: id,
                    academicPlace: '',
                    academicDegree: '',
                    academicDiplomaNumber: '',
                    academicDiplomaDate: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = academicDegree.academicDegrees.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
            // console.log(personnelData)
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                academicPlace: editedData.academicPlace,
                academicDegree: editedData.academicDegree,
                academicDiplomaNumber: editedData.academicDiplomaNumber,
                academicDiplomaDate: editedData.academicDiplomaDate,
            };
            // console.log("personId", id);
            // console.log("updatedData", {updatedData});

    
            const response = await updateAcademicDegree(id, updatedData);
  
            if (response.status === 200) {
                setAcademicDegree((prevData) => ({
                    ...prevData,
                    academicDegrees: prevData.academicDegrees.map((tableData) =>
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
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex',  alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Ученые степени</p>
                            <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                                {icon}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                            {showForm && (
                                <form onSubmit={(e) => handleAddDegree(e, id)} style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <TextField
                                            id="outlined-basic" 
                                            label="Учебное заведение" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            value={inputData.academicPlace}
                                            onChange={(e) => setInputData({ ...inputData, academicPlace: e.target.value })}
                                        />
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Вид образования</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Вид образования"
                                                name='academicDegree'
                                                className={cl.workerInfoSelect}
                                                value={inputData.academicDegree}
                                                onChange={(e) => setInputData({ ...inputData, academicDegree: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="">Ученая степень</MenuItem>
                                                    <MenuItem value="Бакалавр">Бакалавр</MenuItem>
                                                    <MenuItem value="Магистр">Магистр</MenuItem>
                                                    <MenuItem value="Кандидат">Кандидат наук</MenuItem>
                                                    <MenuItem value="Доктор">Доктор наук</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Button variant="contained" type="submit" className={cl.submitBtn} >Добавить</Button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <TextField
                                            style={{ marginTop: '25px' }}
                                            id="outlined-basic" 
                                            label="Номер диплома" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            value={inputData.academicDiplomaNumber}
                                            onChange={(e) => setInputData({ ...inputData, academicDiplomaNumber: e.target.value })}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                            <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата поступления</label>
                                            <TextField
                                            id="outlined-basic" 
                                            variant="outlined"  
                                            size="small"
                                            type="date"
                                            className={cl.workerInfoText}
                                            value={inputData.academicDiplomaDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                academicDiplomaDate: newDate,
                                                }));
                                            }}
                                            />
                                       </div>
                                        
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
                                                <TableCell>Учебное заведение </TableCell>
                                                <TableCell>Ученая степень</TableCell>
                                                <TableCell>Номер диплома</TableCell>
                                                <TableCell>Дата диплома</TableCell>
                                                <TableCell>Действие</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {academicDegree && academicDegree.academicDegrees && academicDegree.academicDegrees.length > 0 ? (
                                                academicDegree.academicDegrees.map((d, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.academicPlace} onChange={(e) => setEditedData({ ...editedData, academicPlace: e.target.value })} /> : d.academicPlace}</TableCell>
                                                        <TableCell>  
                                                            {editingId === d.id ? (
                                                                <Box>
                                                                {/* <label className={cl.label}>Должность</label> */}
                                                                <FormControl size="small" fullWidth>
                                                                    <InputLabel id="demo-simple-select-label">Ученая степень</InputLabel>
                                                                    <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Ученая степень"
                                                                    name='academicDegree'
                                                                    className={cl.selectRelative_type}
                                                                    value={editedData.academicDegree}
                                                                    onChange={(e) => setEditedData({ ...editedData, academicDegree: e.target.value })}
                                                                    
                                                                    >
                                                                        <MenuItem value="">Ученая степень</MenuItem>
                                                                        <MenuItem value="Бакалавр">Бакалавр</MenuItem>
                                                                        <MenuItem value="Магистр">Магистр</MenuItem>
                                                                        <MenuItem value="Кандидат">Кандидат наук</MenuItem>
                                                                        <MenuItem value="Доктор">Доктор наук</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            ) : (
                                                                d.academicDegree
                                                            )}
                                                        </TableCell>
                                                        <TableCell>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.academicDiplomaNumber} onChange={(e) => setEditedData({ ...editedData, academicDiplomaNumber: e.target.value })} /> : d.academicDiplomaNumber}</TableCell>
                                                        <TableCell>
                                                            {editingId === d.id ? (
                                                                <div className={cl.datePickerContainer}>
                                                                    <input
                                                                        type="date"
                                                                        className={cl.formInput}
                                                                        placeholder="Дата диплома"
                                                                        value={editedData.academicDiplomaDate || ''}
                                                                        onChange={(e) => {
                                                                            const newDate = e.target.value;
                                                                            setEditedData((prevData) => ({
                                                                            ...prevData,
                                                                            academicDiplomaDate: newDate,
                                                                            }));
                                                                        }}
                                                                    />

                                                                </div>
                                                            ) : (
                                                                d.academicDiplomaDate
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
            </div>
        </div>
    );
}

export default AcademicDegree;