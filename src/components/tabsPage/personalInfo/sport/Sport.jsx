import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Sport.module.css';
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

import { deleteSport } from '../../../../api/persona_info/sport/deleteSport';
import { updateSport } from '../../../../api/persona_info/sport/updateSport';

import list from '../../../data/kindsOfSports';


function Sport({sportSkill, setSportSkill}, props) {
    const { id } = useParams();

    const [kindsOfSport, setKindsOfSport] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            fetchListOfSport()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchKindOfSports = async () => {
      try {
        setKindsOfSport(list)
        return list;
 
      } catch (error) {
        console.error('Error fetching kinds of sport:', error);
        return [];
      }
    };

    const fetchListOfSport = async () => {
      await fetchKindOfSports();
    };
    
    // ДОБАВЛЕНИЕ ВИДА СПОРТА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        sportType: '',
        sportSkillLvl: '',
    });

    const handleAddSport = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.sport_type || !inputData.owning_lvl_sport_results) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            // Получаем название языка по его коду из объекта apiLanguages
            const sportName = kindsOfSport[inputData.sportType];

            const newSport = {
              iin: props.id,
              sportType: sportName,
              sportSkillLvl: inputData.sportSkillLvl,
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/sport-skill/', newSport, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setSportSkill(prevData => {
                    // Проверяем, что prevData является объектом и содержит sportSkills
                    if (typeof prevData === 'object' && Array.isArray(prevData.sportSkills)) {
                      return {
                        ...prevData,
                        sportSkills: [...prevData.sportSkills, newSport],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain sportSkills");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  sportType: '',
                  sportSkillLvl: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ SPORT TYPE
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteSport(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setSportSkill(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит sportSkills
              if (typeof prevData === 'object' && Array.isArray(prevData.sportSkills)) {
                return {
                  ...prevData,
                  sportSkills: prevData.sportSkills.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain sportSkills");
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
        sportType: '',
        sportSkillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataSport) => {
      
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    sportType: editedDataSport.sportType,
                    sportSkillLvl: editedDataSport.sportSkillLvl
                };

                // Преобразование названия языка в код
                updatedData.sportType = kindsOfSport[inputData.sportType];

                await updateSport(id, updatedData);

                setSportSkill(prevData => {
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
                    sportType: '',
                    sportSkillLvl: '',
                });
                console.log('Successfully updated sport type')
            } catch(error) {
                console.error('Error updating sport type:', error);
            }
        } else {
            setEditingId(id)
            const sportToEdit = sportSkill.sportSkills.find(sportType => sportType.id === id);
            if(sportToEdit) {
                setEditedData(sportToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
   
                sportType: editedData.sportType,
                sportSkillLvl: editedData.sportSkillLvl
            };

            // Преобразование названия языка в код
            updatedData.sportType = kindsOfSport[updatedData.sportType];
    
            const response = await updateSport(id, updatedData);
    
            if (response.status === 200) {
                setSportSkill((prevData) => ({
                    ...prevData,
                    sportSkills: prevData.sportSkills.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                
                // setSportSkill(prevData => {
                //     const updatedDataArray = prevData.sportSkills.map(tableData =>
                //         tableData.id === id ? { ...tableData, ...updatedData } : tableData
                //     );
    
                //     console.log('Prev Data:', prevData.sportSkills);
                //     console.log('Updated Data:', updatedData);
    
                //     return {
                //         ...prevData,
                //         sportSkills: updatedDataArray,
                //     };
                // });

                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
        } catch (error) {
            console.error('Error updating lansport typeguage:', error);
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
                            <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Отношение к спорту</p>
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
                                <form onSubmit={(e) => handleAddSport(e, id)} style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Вид спорта</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Вид спорта"
                                                name='sportType'
                                                className={cl.workerInfoSelect}
                                                value={inputData.sportType}
                                                onChange={(e) => setInputData({ ...inputData, sportType: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="">Выберите вид спорта</MenuItem>
                                                        {Object.keys(kindsOfSport).map((sportKind, index) => (
                                                          <MenuItem key={index} value={sportKind}>
                                                            {kindsOfSport[sportKind]}
                                                          </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Степень владения</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="	Степень владения"
                                                name='sportSkillLvl'
                                                className={cl.workerInfoSelect}
                                                value={inputData.sportSkillLvl}
                                                onChange={(e) => setInputData({ ...inputData, sportSkillLvl: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="">Выберите степень владения</MenuItem>
                                                    <MenuItem value="Любитель">Любитель</MenuItem>
                                                    <MenuItem value="Первый спортивный разряд">Первый спортивный разряд</MenuItem>
                                                    <MenuItem value="Второй спортивный разряд">Второй спортивный разряд</MenuItem>
                                                    <MenuItem value="Третий спортивный разряд">Третий спортивный разряд</MenuItem>
                                                    <MenuItem value="Кандидат мастера спорта">Кандидат мастера спорта</MenuItem>
                                                    <MenuItem value="Мастер спорта">Мастер спорта</MenuItem>   
                                                </Select>
                                            </FormControl>
                                        </Box>
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
                                                    <TableCell>Вид спорта</TableCell>
                                                    <TableCell>Степень владения</TableCell>
                                                    <TableCell>Действие</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {sportSkill && sportSkill.sportSkills && sportSkill.sportSkills.length > 0 ? (
                                                        sportSkill.sportSkills .map((d, i) => (
                                                            <TableRow key={i}>
                                                                <TableCell>  
                                                                    {editingId === d.id ? (
                                                                        <Box>
                                                                            {/* <label className={cl.label}>Должность</label> */}
                                                                            <FormControl size="small" fullWidth>
                                                                                <InputLabel id="demo-simple-select-label">Вид спорта</InputLabel>
                                                                                <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                label="Вид спорта"
                                                                                name='sportType'
                                                                                className={cl.workerInfoSelect}
                                                                                value={inputData.sportType}
                                                                                onChange={(e) => setInputData({ ...inputData, sportType: e.target.value })}
                                                                                
                                                                                >
                                                                                    <MenuItem value="">Выберите вид спорта</MenuItem>
                                                                                    {Object.keys(kindsOfSport).map((sportKind, index) => (
                                                                                    <MenuItem key={index} value={sportKind}>
                                                                                        {kindsOfSport[sportKind]}
                                                                                    </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Box>
                                                                        
                                                                    ) : (
                                                                        d.sportType
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>  
                                                                    {editingId === d.id ? (
                                                                        <Box>
                                                                        {/* <label className={cl.label}>Должность</label> */}
                                                                        <FormControl size="small" fullWidth>
                                                                            <InputLabel id="demo-simple-select-label">Степень владения</InputLabel>
                                                                            <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            label="Степень владения"
                                                                            name='sportSkillLvl'
                                                                            className={cl.workerInfoSelect}
                                                                            value={inputData.sportSkillLvl}
                                                                            onChange={(e) => setInputData({ ...inputData, sportSkillLvl: e.target.value })}
                                                                            
                                                                            >
                                                                                <MenuItem value="">Выберите степень владения</MenuItem>
                                                                                <MenuItem value="Любитель">Любитель</MenuItem>
                                                                                <MenuItem value="Первый спортивный разряд">Первый спортивный разряд</MenuItem>
                                                                                <MenuItem value="Второй спортивный разряд">Второй спортивный разряд</MenuItem>
                                                                                <MenuItem value="Третий спортивный разряд">Третий спортивный разряд</MenuItem>
                                                                                <MenuItem value="Кандидат мастера спорта">Кандидат мастера спорта</MenuItem>
                                                                                <MenuItem value="Мастер спорта">Мастер спорта</MenuItem>  
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>
                                                                    ) : (
                                                                        d.sportSkillLvl
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

export default Sport;