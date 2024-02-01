import React, { useState } from 'react';
import cl from './ClassCategories.module.css';
import { useParams } from 'react-router-dom';

import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';

import { updateClassCategories } from '../../../../api/staff_info/class_categories/updateClassCategories';

import Cookies from 'js-cookie';
import axios from 'axios';


function ClassCategories({ classCategoriesInfo, setClassCategoriesInfo }, props) {
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "class_categories": []
    });

    // TABLE DATA
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;

    const [inputData, setInputData] = useState({
        categoryType: '',
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
                categoryType: inputData.categoryType,
            };
          
            // console.log(
            //     { newData },
            //     {id}
            // )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/class-category/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            if (response.status === 201) {
                const addedData = {
                    ...newData,
                    classCategories: response.data.nextAttDateMin,
                };
                setClassCategoriesInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит classCategories
                    if (typeof prevData === 'object' && Array.isArray(prevData.classCategories)) {
                      return {
                        ...prevData,
                        classCategories: [...prevData.classCategories, addedData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain classCategories");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    categoryType: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        categoryType: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    categoryType: editedTableData.categoryType,
                };

                await updateClassCategories(id, updatedData);

                setPersonnelData(prevData => {
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
                    categoryType: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = classCategoriesInfo.classCategories.find(tableData => tableData.id === id);
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
                categoryType: editedData.categoryType,
            };
            // console.log(id);
            // console.log(updatedData)
    
            const response = await updateClassCategories(id, updatedData);
    
            if (response.status === 200) {
                setClassCategoriesInfo((prevData) => ({
                    ...prevData,
                    classCategories: prevData.classCategories.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                // console.log("Successfully updated table data");
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

    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Классные категории </p>
                            <IconButton onClick={handleShowForm} aria-label="toggle-form">
                                {icon}
                            </IconButton>
                        </div>
                    </div>
                    <div>
                        {showForm && (
                            <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                                <div className={cl.workerBlock}>
                                    <div className={cl.column}>
                                        <div className={cl.rows}>
                                            <label className={cl.label}>Номер документа</label>
                                            <Box>
                                                {/* <label className={cl.label}>Должность</label> */}
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Классные категории</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Классные категории"
                                                    name='categoryType'
                                                    className={cl.workerInfoSelect}
                                                    value={inputData.categoryType}
                                                    onChange={(e) => setInputData({ ...inputData, categoryType: e.target.value })}
                                                    >
                                                        <MenuItem value="">Выберите категорию</MenuItem>
                                                        <MenuItem value="Спец 2 категории">Специалист 2 категории</MenuItem>
                                                        <MenuItem value="Спец 1 категории">Специалист 1 категории</MenuItem>
                                                        <MenuItem value="Наставник">Наставник</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </div>
                                <Button type="submit"  variant="contained" size="small" style={{ marginTop: '25px' }}>Добавить</Button>
                            </div>
                            
                            
                            </form>
                        )}
                    </div>
                    <div>
                        {classCategoriesInfo && classCategoriesInfo.classCategories && classCategoriesInfo.classCategories.map((d, i) => (
                            <div key={i} className={cl.workerBlock}>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Классные категория</label>
                                        {editingId === d.id ? 
                                        <Box>
                                        {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Классные категории</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Классные категории"
                                                name='categoryType'
                                                className={cl.workerInfoSelect}
                                                value={editedData.categoryType}
                                            onChange={(e) => setEditedData({ ...editedData, categoryType: e.target.value })}
                                                >
                                                    <MenuItem value="">Выберите категорию</MenuItem>
                                                    <MenuItem value="Спец 2 категории">Специалист 2 категории</MenuItem>
                                                    <MenuItem value="Спец 1 категории">Специалист 1 категории</MenuItem>
                                                    <MenuItem value="Наставник">Наставник</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                            : 
                                            // <p className={cl.workerInfoP}>{d.categoryType}</p>
                                            <Paper className={cl.workerInfoP}>{d.categoryType}</Paper>      
                                        }
                                    </div>
                                </div>
                           
                                <div className={cl.relativesActionBtns} style={{marginTop: '22px'}}>
                                    {editingId === d.id ? (
                                        <div>
                                            <IconButton className={cl.iconBtn} onClick={() => handleSaveEdit(d.id)}><FaCheck color=' #1565C0' /></IconButton>
                                            <IconButton className={cl.iconBtn} onClick={handleCancelEdit}><IoClose /></IconButton>
                                        </div>
                                    ) : (
                                        <>
                                            <IconButton className={cl.iconBtn} onClick={() => handleEdit(d.id)}><MdEdit /></IconButton>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default ClassCategories;

