import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Awards.module.css';
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

import { deleteAward } from '../../../../api/staff_info/awards/deleteAward';
import { updateAward } from '../../../../api/staff_info/awards/updateAward';

function Awards({ rewardsInfo, setRewardsInfo }, props) {
    // const iin = props.iin;
    const { id } = useParams();


    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        rewardType: '',
        rewardDocNumber: '',
        rewardDate: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.awards_type || !inputData.awards_doc_numb || !inputData.awards_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                rewardType: inputData.rewardType,
                rewardDocNumber: inputData.rewardDocNumber,
                rewardDate: inputData.rewardDate,
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/reward/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setRewardsInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит rewards
                    if (typeof prevData === 'object' && Array.isArray(prevData.rewards)) {
                      return {
                        ...prevData,
                        rewards: [...prevData.rewards, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain rewards");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    rewardType: '',
                    rewardDocNumber: '',
                    rewardDate: '',
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
            await deleteAward(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setRewardsInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит rewards
              if (typeof prevData === 'object' && Array.isArray(prevData.rewards)) {
                return {
                  ...prevData,
                  rewards: prevData.rewards.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain rewards");
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
        rewardType: '',
        rewardDocNumber: '',
        rewardDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    rewardType: editedTableData.rewardType,
                    rewardDocNumber: editedTableData.rewardDocNumber,
                    rewardDate: editedTableData.rewardDate,
                };

                await updateAward(id, updatedData);

                setRewardsInfo(prevData => {
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
                    rewardType: '',
                    rewardDocNumber: '',
                    rewardDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = rewardsInfo.rewards.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                rewardType: editedData.rewardType,
                rewardDocNumber: editedData.rewardDocNumber,
                rewardDate: editedData.rewardDate,
            };
            // console.log(id);
    
            const response = await updateAward(id, updatedData);
  
            if (response.status === 200) {
                setRewardsInfo((prevData) => ({
                    ...prevData,
                    rewards: prevData.rewards.map((tableData) =>
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
                <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Награды</p>
                <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                    {icon}
                </IconButton>
            </div>
        </div>
        <div>
            <div>
                {showForm && (
                    <form onSubmit={handleAddNewData}>
                        <div style={{ display: 'flex', gap: '10px'}}>
                            <Box style={{ marginTop: '18px' }}>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Тип награды</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Тип награды"
                                    name='rewardType'
                                    className={cl.workerInfoSelect}
                                    value={inputData.rewardType}
                                    onChange={(e) => setInputData({ ...inputData, rewardType: e.target.value })}
                                    >
                                    <MenuItem value="">Выберите тип награды</MenuItem>
                                    <MenuItem value="Благодарность">Благодарность </MenuItem>
                                    <MenuItem value="Грамота">Грамота </MenuItem>
                                    <MenuItem value=" Почетная грамота"> Почетная грамота</MenuItem>
                                    <MenuItem value="Нагрудной знак">Нагрудной знак - Қаржылық мониторинг органдарының үздігі </MenuItem>
                                    <MenuItem value="Медаль ">Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</MenuItem>
                                    <MenuItem value=" Мінсіз қызметі үшін ІІІ дәрежелі">Мінсіз қызметі үшін ІІІ дәрежелі</MenuItem>
                                    <MenuItem value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</MenuItem>
                                    <MenuItem value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</MenuItem>
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
                                value={inputData.rewardDocNumber}
                                onChange={(e) => setInputData({ ...inputData, rewardDocNumber: e.target.value })}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата приказа</label>
                                <TextField
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                type="date"
                                className={cl.workerInfoText}
                                value={inputData.rewardDate || ''}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setInputData((prevWorker) => ({
                                    ...prevWorker,
                                    rewardDate: newDate,
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
                                    <TableCell>Тип награды</TableCell>
                                    <TableCell>Номер приказа</TableCell>
                                    <TableCell>Дата приказа</TableCell>
                                    <TableCell>Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rewardsInfo && rewardsInfo.rewards && rewardsInfo.rewards.length > 0 ? (
                                    rewardsInfo.rewards.map((d, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {editingId === d.id ? (
                                                <Box style={{ marginTop: '18px' }}>
                                                {/* <label className={cl.label}>Должность</label> */}
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Тип награды</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Тип награды"
                                                    name='rewardType'
                                                    className={cl.workerInfoSelect}
                                                    value={editedData.rewardType}
                                                    onChange={(e) => setEditedData({ ...editedData, rewardType: e.target.value })}
                                                    >
                                                    <MenuItem value="">Выберите тип награды</MenuItem>
                                                    <MenuItem value="Благодарность">Благодарность </MenuItem>
                                                    <MenuItem value="Грамота">Грамота </MenuItem>
                                                    <MenuItem value=" Почетная грамота"> Почетная грамота</MenuItem>
                                                    <MenuItem value="Нагрудной знак">Нагрудной знак - Қаржылық мониторинг органдарының үздігі </MenuItem>
                                                    <MenuItem value="Медаль ">Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</MenuItem>
                                                    <MenuItem value=" Мінсіз қызметі үшін ІІІ дәрежелі">Мінсіз қызметі үшін ІІІ дәрежелі</MenuItem>
                                                    <MenuItem value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</MenuItem>
                                                    <MenuItem value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            ) : (
                                                d.rewardType
                                            )}
                                        </TableCell>
                                        <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} name='rewardDocNumber' value={editedData.rewardDocNumber} onChange={(e) => setEditedData({ ...editedData, awards_dorewardDocNumberc_numb: e.target.value })} /> : d.rewardDocNumber}</TableCell>
                                        <TableCell>
                                            {editingId === d.id ? (
                                                <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        value={editedData.rewardDate || ''}
                                                        onChange={(e) =>
                                                            setEditedData((prevWorker) => ({
                                                            ...prevWorker,
                                                            rewardDate: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                d.rewardDate
                                            )}
                                        </TableCell>
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
                                    </TableRow>
                                ))
                                ): (
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

export default Awards;