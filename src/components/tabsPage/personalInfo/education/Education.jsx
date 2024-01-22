import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Education.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteEducation } from '../../../../api/persona_info/educations/deleteEducation';
import { updateEducation } from '../../../../api/persona_info/educations/updateEducation';

function Education({ education, setEducation }) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ ДАННЫХ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        educationType: '',
        educationPlace: '',
        educationDateIn: '',
        educationDateOut: '',
        speciality: '',
        diplomaNumber: ''
    });

    const handleAddEducation = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.education_type || !inputData.education_place || !inputData.education_date_in || !inputData.education_date_out || !inputData.education_speciality || !inputData.diploma_number) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newEducation = {
                personId: id,
                educationType: inputData.educationType,
                educationPlace: inputData.educationPlace,
                educationDateIn: inputData.educationDateIn,
                educationDateOut: inputData.educationDateOut,
                speciality: inputData.speciality,
                diplomaNumber: inputData.diplomaNumber
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/education/', newEducation, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setEducation(prevData => {
                    // Проверяем, что prevData является объектом и содержит educations
                    if (typeof prevData === 'object' && Array.isArray(prevData.educations)) {
                      return {
                        ...prevData,
                        educations: [...prevData.educations, newEducation],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain educations");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  educationType: '',
                  educationPlace: '',
                  educationDateIn: '',
                  educationDateOut: '',
                  speciality: '',
                  diplomaNumber: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ EDUCATION
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteEducation(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setEducation(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит educations
              if (typeof prevData === 'object' && Array.isArray(prevData.educations)) {
                return {
                  ...prevData,
                  educations: prevData.educations.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain educations");
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
        id: '',
        educationType: '',
        educationPlace: '',
        educationDateIn: '',
        educationDateOut: '',
        speciality: '',
        diplomaNumber: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataEdu) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  educationType: inputData.educationType,
                  educationPlace: inputData.educationPlace,
                  educationDateIn: inputData.educationDateIn,
                  educationDateOut: inputData.educationDateOut,
                  speciality: inputData.speciality,
                  diplomaNumber: inputData.diplomaNumber

                };

                // console.log("updatedData", {updatedData});

                await updateEducation(id, updatedData);

                setEducation(prevData => {
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
                    educationType: '',
                    educationPlace: '',
                    educationDateIn: '',
                    educationDateOut: '',
                    speciality: '',
                    diplomaNumber: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = education.educations.find(tableData => tableData.id === id);
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
                educationType: editedData.educationType,
                educationPlace: editedData.educationPlace,
                educationDateIn: editedData.educationDateIn,
                educationDateOut: editedData.educationDateOut,
                speciality: editedData.speciality,
                diplomaNumber: editedData.diplomaNumber,
            };
            // console.log("personId", id);
            // console.log("updatedData", {updatedData});

    
            const response = await updateEducation(id, updatedData);
  
            if (response.status === 200) {
                setEducation((prevData) => ({
                    ...prevData,
                    educations: prevData.educations.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
            // console.log(updatedData);
            // window.location.reload();
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
                <div className={cl.totalInfoWrapper}  style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex',  alignItems: 'center', gap: '20px' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Образование</p>
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
                                <form onSubmit={(e) => handleAddEducation(e, id)} style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Вид образования</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Вид образования"
                                                name='attResult'
                                                className={cl.workerInfoSelect}
                                                value={inputData.educationType}
                                                onChange={(e) => setInputData({ ...inputData, educationType: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="Бакалавр">Высшее</MenuItem>
                                                    <MenuItem value="Магистратура">Магистратура</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <TextField
                                            label="Учебное заведение" 
                                            id="outlined-basic" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            value={inputData.educationPlace}
                                            onChange={(e) => setInputData({ ...inputData, educationPlace: e.target.value })}
                                        />
                                        <Button variant="contained" type="submit" className={cl.submitBtn} >Добавить</Button>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                       <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                            <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата поступления</label>
                                            <TextField 
                                                id="outlined-basic" 
                                                // label="Дата поступления" 
                                                variant="outlined"  
                                                size="small"
                                                type="date" 
                                                className={cl.workerInfoText}
                                                // placeholder="Дата поступления"
                                                value={inputData.educationDateIn || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                        ...prevWorker,
                                                        educationDateIn: newDate,
                                                    }));
                                                }}
                                            />
                                       </div>
                                       <div style={{ display: 'flex', flexDirection: 'column', gap: '5px',  marginTop: '8px' }}>
                                        <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата окончания</label>
                                            <TextField 
                                                id="outlined-basic" 
                                                variant="outlined"  
                                                size="small"
                                                type="date" 
                                                className={cl.workerInfoText}
                                                value={inputData.educationDateOut || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                        ...prevWorker,
                                                        educationDateOut: newDate,
                                                    }));
                                                }}
                                            /> 
                                       </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <TextField
                                            id="outlined-basic" 
                                            label="Специальность" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            value={inputData.speciality}
                                            onChange={(e) => setInputData({ ...inputData, speciality: e.target.value })}
                                        />
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Вид обучения</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Вид обучения"
                                                name='attResult'
                                                className={cl.workerInfoSelect}
                                                value={inputData.educationForm}
                                                onChange={(e) => setInputData({ ...inputData, educationForm: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="Очное">Очное</MenuItem>
                                                    <MenuItem value="Заочное">Заочное</MenuItem>
                                                    <MenuItem value="Дистанционное">Дистанционное</MenuItem>
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
                                                <TableCell>Вид образования</TableCell>
                                                <TableCell>Учебное заведение</TableCell>
                                                <TableCell>Дата поступления</TableCell>
                                                <TableCell>Дата окончания</TableCell>
                                                <TableCell>Специальность</TableCell>
                                                <TableCell>Вид обучения</TableCell>
                                                <TableCell>Действие</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {education && education.educations && education.educations.length > 0 ? (
                                                education.educations.map((d, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>  
                                                            {editingId === d.id ? (
                                                                 <Box>
                                                                    {/* <label className={cl.label}>Должность</label> */}
                                                                    <FormControl size="small" fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">Вид образования</InputLabel>
                                                                        <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        label="Вид образования"
                                                                        name='attResult'
                                                                        className={cl.workerInfoSelect}
                                                                        value={editedData.educationType}
                                                                        onChange={(e) => setEditedData({ ...editedData, educationType: e.target.value })}
                                                                        >
                                                                            <MenuItem value="Бакалавр">Высшее</MenuItem>
                                                                            <MenuItem value="Магистратура">Магистратура</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                                
                                                            ) : (
                                                                d.educationType
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.educationPlace} onChange={(e) => setEditedData({ ...editedData, educationPlace: e.target.value })} /> : d.educationPlace}
                                                        </TableCell>
                                                        <TableCell>
                                                            {editingId === d.id ? (
                                                                <div className={cl.datePickerContainer}>
                                                                    <input 
                                                                        type="date"
                                                                        className={cl.formInput}
                                                                        placeholder='Дата поступления'
                                                                        value={editedData.educationDateIn || ''}
                                                                        onChange={(e) => {
                                                                            const newData = e.target.value;
                                                                            setEditedData((prevData) => ({
                                                                                ...prevData,
                                                                                educationDateIn: newData,
                                                                            }));
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                d.educationDateIn
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {editingId === d.id ? (
                                                                <div className={cl.datePickerContainer}>
                                                                    <input 
                                                                        type="date"
                                                                        className={cl.formInput}
                                                                        placeholder='Дата окончания'
                                                                        value={editedData.educationDateOut || ''}
                                                                        onChange={(e) => {
                                                                            const newData = e.target.value;
                                                                            setEditedData((prevData) => ({
                                                                                ...prevData,
                                                                                educationDateOut: newData,
                                                                            }));
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                d.educationDateOut
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.speciality} onChange={(e) => setEditedData({ ...editedData, speciality: e.target.value })} /> : d.speciality}
                                                        </TableCell>
                                                        <TableCell>
                                                            {editingId === d.id ? (
                                                                <Box>
                                                                    {/* <label className={cl.label}>Должность</label> */}
                                                                    <FormControl size="small" fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">Вид обучения</InputLabel>
                                                                        <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        label="Вид обучения"
                                                                        name='educationForm'
                                                                        className={cl.selectRelative_type}
                                                                        value={editedData.educationForm}
                                                                        onChange={(e) => setEditedData({ ...editedData, educationForm: e.target.value })}
                                                                        
                                                                        >
                                                                            <MenuItem value="Очное">Очное</MenuItem>
                                                                            <MenuItem value="Заочное">Заочное</MenuItem>
                                                                            <MenuItem value="Дистанционное">Дистанционное</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                            ) : (
                                                                d.educationForm
                                                            )}
                                                            
                                                        </TableCell>
                                                        <TableCell  className={cl.relativesActionBtns} style={{}}>
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
                                                        </TableCell >
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

export default Education;