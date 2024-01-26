import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Courses.module.css';
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

import { deleteCourse } from '../../../../api/persona_info/courses/deleteCourse';
import { updateCourse } from '../../../../api/persona_info/courses/updateCourse';

function Courses({ course, setCourse }, props) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.course_type || !inputData.course_organization || !inputData.course_start_date || !inputData.course_end_date || !inputData.document_type || !inputData.course_name) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newCourse = {
                personId: id,
                courseName: inputData.courseName,
                courseType: inputData.courseType,
                courseOrg: inputData.courseOrg,
                startDate: inputData.startDate,
                endDate: inputData.endDate,
                documentType: inputData.documentType
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/course/', newCourse, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setCourse(prevData => {
                    // Проверяем, что prevData является объектом и содержит courses
                    if (typeof prevData === 'object' && Array.isArray(prevData.courses)) {
                      return {
                        ...prevData,
                        courses: [...prevData.courses, newCourse],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain courses");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  courseName: '',
                  courseType: '',
                  courseOrg: '',
                  startDate: '',
                  endDate: '',
                  documentType: ''
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
            await deleteCourse(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setCourse(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит courses
              if (typeof prevData === 'object' && Array.isArray(prevData.courses)) {
                return {
                  ...prevData,
                  courses: prevData.courses.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain courses");
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
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    courseName: editedTableData.courseName,
                    courseType: editedTableData.courseType,
                    courseOrg: editedTableData.courseOrg,
                    startDate: editedTableData.startDate,
                    endDate: editedTableData.endDate,
                    documentType: editedTableData.documentType,
                };

                // console.log("updatedData", {updatedData});

                await updateCourse(id, updatedData);

                setCourse(prevData => {
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
                    courseName: '',
                    courseType: '',
                    courseOrg: '',
                    startDate: '',
                    endDate: '',
                    documentType: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = course.courses.find(tableData => tableData.id === id);
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
                courseName: editedData.courseName,
                courseType: editedData.courseType,
                courseOrg: editedData.courseOrg,
                startDate: editedData.startDate,
                endDate: editedData.endDate,
                documentType: editedData.documentType,
            };
            // console.log(id);
    
            const response = await updateCourse(id, updatedData);
  
            if (response.status === 200) {
                setCourse((prevData) => ({
                    ...prevData,
                    courses: prevData.courses.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
        } catch (error) {
            console.error('Error updating course:', error);
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
                        <div style={{ display: 'flex',  alignItems: 'center', gap: '20px',  marginTop: '40px' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Курсы подготовки и повышения квалификаций</p>
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
                                <form onSubmit={(e) => handleAddCourse(e, id)} style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Вид переподготовки</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Вид переподготовки"
                                                name='courseType'
                                                className={cl.workerInfoSelect}
                                                value={inputData.courseType}
                                                onChange={(e) => setInputData({ ...inputData, courseType: e.target.value })}
                                                >
                                                    <MenuItem value="Повышение">Повышение</MenuItem>
                                                    <MenuItem value="Подготовка">Подготовка</MenuItem>
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
                                            value={inputData.courseOrg}
                                            onChange={(e) => setInputData({ ...inputData, courseOrg: e.target.value })}
                                        />
                                        <Button variant="contained" type="submit" className={cl.submitBtn} >Добавить</Button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                       <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                            <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата начала</label>
                                            <TextField 
                                                id="outlined-basic" 
                                                // label="Дата поступления" 
                                                variant="outlined"  
                                                size="small"
                                                type="date" 
                                                className={cl.workerInfoText}
                                                // placeholder="Дата поступления"
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
                                       <div style={{ display: 'flex', flexDirection: 'column', gap: '5px',  marginTop: '8px' }}>
                                        <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата окончания</label>
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
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <TextField
                                            id="outlined-basic" 
                                            label="Название курса" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            value={inputData.courseName}
                                            onChange={(e) => setInputData({ ...inputData, courseName: e.target.value })}
                                        />
                                        <TextField
                                            id="outlined-basic" 
                                            label="Вид документа" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            value={inputData.documentType}
                                            onChange={(e) => setInputData({ ...inputData, documentType: e.target.value })}
                                        />
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
                                                <TableCell>Название курса</TableCell>
                                                <TableCell>Вид переподготовки</TableCell>
                                                <TableCell>Учебное заведение </TableCell>
                                                <TableCell>Дата начала</TableCell>
                                                <TableCell>Дата окончания</TableCell>
                                                <TableCell>Вид документа</TableCell>
                                                <TableCell>Действие</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {course && course.courses && course.courses.length > 0 ? (
                                                course.courses.map((d, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.courseName} onChange={(e) => setEditedData({ ...editedData, courseName: e.target.value })} /> : d.courseName}</TableCell>
                                                    <TableCell>  
                                                        {editingId === d.id ? (
                                                            <Box>
                                                            <FormControl size="small" fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Вид переподготовки</InputLabel>
                                                                <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Вид переподготовки"
                                                                name='courseType'
                                                                className={cl.workerInfoSelect}
                                                                value={editedData.courseType}
                                                                onChange={(e) => setEditedData({ ...editedData, courseType: e.target.value })}
                                                                >
                                                                    <MenuItem value="">Выберите вид переподготовки</MenuItem>
                                                                    <MenuItem value="Повышение">Повышение</MenuItem>
                                                                    <MenuItem value="Подготовка">Подготовка</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                        ) : (
                                                            d.courseType
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.courseOrg} onChange={(e) => setEditedData({ ...editedData, courseOrg: e.target.value })} /> : d.courseOrg}</TableCell>
                                                    <TableCell>
                                                        {editingId === d.id ? (
                                                            <div className={cl.datePickerContainer}>
                                                                <input
                                                                    type="date"
                                                                    className={cl.formInput}
                                                                    placeholder="Дата начала"
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
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {editingId === d.id ? (
                                                            <div className={cl.datePickerContainer}>
                                                                <input
                                                                    type="date"
                                                                    className={cl.formInput}
                                                                    placeholder="Дата окончания"
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
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.documentType} onChange={(e) => setEditedData({ ...editedData, documentType: e.target.value })} /> : d.documentType}</TableCell>
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

export default Courses;