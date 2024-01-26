import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Language.module.css';
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

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteLanguages } from '../../../../api/persona_info/languages/deleteLanguages';
import { updateLanguages } from '../../../../api/persona_info/languages/updateLanguages';

import list from '../../../data/languages';

function Language({ languageSkill, setLanguageSkill }, props) {

    const { id } = useParams();
    const [apiLanguages, setApiLanguages] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            fetchApiLanguages()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchLanguagesFromApi = async () => {
      try {
        const lang_name = Object.values(list)
        setApiLanguages(list)
        return list;
 
      } catch (error) {
        console.error('Error fetching API languages:', error);
        return [];
      }
    };

    const fetchApiLanguages = async () => {
      await fetchLanguagesFromApi();
    };
    

    // ДОБАВЛЕНИЕ ЯЗЫКА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
        langName: '',
        skillLvl: '',
    });

    const handleAddLanguage = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.language_name || !inputData.owning_lvl_language) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            // Получаем название языка по его коду из объекта apiLanguages
            const languageName = apiLanguages[inputData.langName];

            const newLanguage = {
                personId: id,
                langName: languageName,
                skillLvl: inputData.skillLvl,
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/language-skill/', newLanguage, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setLanguageSkill(prevData => {
                    // Проверяем, что prevData является объектом и содержит languageSkills
                    if (typeof prevData === 'object' && Array.isArray(prevData.languageSkills)) {
                      return {
                        ...prevData,
                        languageSkills: [...prevData.languageSkills, newLanguage],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain languageSkills");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  langName: '',
                  skillLvl: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ ЯЗЫКА
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteLanguages(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setLanguageSkill(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит languageSkills
              if (typeof prevData === 'object' && Array.isArray(prevData.languageSkills)) {
                return {
                  ...prevData,
                  languageSkills: prevData.languageSkills.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain languageSkills");
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
        langName: '',
        skillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
      
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  langName: editedTableData.langName,
                  skillLvl: editedTableData.skillLvl
                };

                // console.log("updatedData", {updatedData});

                await updateLanguages(id, updatedData);

                setLanguageSkill(prevData => {
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
                    langName: '',
                    skillLvl: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = languageSkill.languageSkills.find(tableData => tableData.id === id);
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
                langName: editedData.langName,
                skillLvl: editedData.skillLvl,
            };
          
            // Преобразование названия языка в код
            updatedData.langName = apiLanguages[updatedData.langName];
    
            const response = await updateLanguages(id, updatedData);
  
            if (response.status === 200) {
                setLanguageSkill((prevData) => ({
                    ...prevData,
                    languageSkills: prevData.languageSkills.map((tableData) =>
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
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex',  alignItems: 'center', gap: '20px',  marginTop: '40px' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Владения языками</p>
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
                                <form onSubmit={(e) => handleAddLanguage(e, id)} style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Язык</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Язык"
                                                name='langName'
                                                className={cl.workerInfoSelect}
                                                value={inputData.langName}
                                                onChange={(e) => setInputData({ ...inputData, langName: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="">Выберите язык</MenuItem>
                                                        {Object.keys(apiLanguages).map((languageName, index) => (
                                                          <MenuItem key={index} value={languageName}>
                                                            {apiLanguages[languageName]}
                                                          </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Уровень владения языком</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Уровень владения языком"
                                                name='skillLvl'
                                                className={cl.workerInfoSelect}
                                                value={inputData.skillLvl}
                                                onChange={(e) => setInputData({ ...inputData, skillLvl: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="">Выберите уровень владения</MenuItem>
                                                    <MenuItem value="со словарем">Со словарем</MenuItem>
                                                    <MenuItem value="начальный">Начальный</MenuItem>
                                                    <MenuItem value="ниже среднего">Ниже среднего</MenuItem>
                                                    <MenuItem value="средний">Средний</MenuItem>
                                                    <MenuItem value="начальный">Выше среднего</MenuItem>
                                                    <MenuItem value="продвинутый">Продвинутый</MenuItem>
                                                    <MenuItem value="профессиональный">Профессиональный уровень владения</MenuItem>
                                                    <MenuItem value="родной">Родной</MenuItem>
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
                                                <TableCell>Язык</TableCell>
                                                <TableCell>Уровень владения языком </TableCell>
                                                <TableCell>Действие</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {languageSkill && languageSkill.languageSkills && languageSkill.languageSkills.length > 0 ? (
                                                    languageSkill.languageSkills.map((d, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell>  
                                                                {editingId === d.id ? (
                                                                    <Box>
                                                                        {/* <label className={cl.label}>Должность</label> */}
                                                                        <FormControl size="small" fullWidth>
                                                                            <InputLabel id="demo-simple-select-label">Язык</InputLabel>
                                                                            <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            label="Язык"
                                                                            name='langName'
                                                                            className={cl.workerInfoSelect}
                                                                            value={editedData.langName}
                                                                            onChange={(e) => setEditedData({ ...editedData, langName: e.target.value })}
                                                                            
                                                                            >
                                                                                <MenuItem value="">Выберите тип образования</MenuItem>
                                                                                {Object.keys(apiLanguages).map((languageCode) => (
                                                                                <MenuItem key={languageCode} value={languageCode}>
                                                                                    {apiLanguages[languageCode]}
                                                                                </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>
                                                                    
                                                                ) : (
                                                                    d.langName
                                                                )}
                                                            </TableCell>
                                                            <TableCell>  
                                                                {editingId === d.id ? (
                                                                    <Box>
                                                                    {/* <label className={cl.label}>Должность</label> */}
                                                                    <FormControl size="small" fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">	Уровень владения языком</InputLabel>
                                                                        <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        label="	Уровень владения языком"
                                                                        name='skillLvl'
                                                                        className={cl.workerInfoSelect}
                                                                        value={editedData.skillLvl}
                                                                        onChange={(e) => setEditedData({ ...editedData, skillLvl: e.target.value })}
                                                                        
                                                                        >
                                                                            <MenuItem value="">Выберите уровень владения</MenuItem>
                                                                            <MenuItem value="со словарем">Со словарем</MenuItem>
                                                                            <MenuItem value="начальный">Начальный</MenuItem>
                                                                            <MenuItem value="ниже среднего">Ниже среднего</MenuItem>
                                                                            <MenuItem value="средний">Средний</MenuItem>
                                                                            <MenuItem value="начальный">Выше среднего</MenuItem>
                                                                            <MenuItem value="продвинутый">Продвинутый</MenuItem>
                                                                            <MenuItem value="профессиональный">Профессиональный уровень владения</MenuItem>
                                                                            <MenuItem value="родной">Родной</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                                ) : (
                                                                    d.skillLvl
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

export default Language;