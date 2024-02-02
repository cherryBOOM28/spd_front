import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './Autobiography.module.css';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { FaCheck } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";


import { updateAutobiography } from '../../../../api/staff_info/autobiography/updateAutobiography';

function Autobiography({ autobiographyInfo, setAutobiographyInfo }) {
    const { id } = useParams();
    const [editingId, setEditingId] = useState(null);

    const firstBioText = autobiographyInfo?.autobiographies?.length > 0 ? autobiographyInfo.autobiographies[0]?.autobiographyText : '';

    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;

    const [inputData, setInputData] = useState({
        autobiographyText: '',
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
                autobiographyText: inputData.autobiographyText,
            };
          
            // console.log(
            //     { newData },
            //     {id}
            // )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/autobiography/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            if (response.status === 201) {
                const addedData = {
                    ...newData,
                    autobiographies: response.data.autobiographies,
                };
                setAutobiographyInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит autobiographies
                    if (typeof prevData === 'object' && Array.isArray(prevData.autobiographies)) {
                      return {
                        ...prevData,
                        autobiographies: [...prevData.autobiographies, addedData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain autobiographies");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    autobiographyText: '',
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
        autobiographyText: firstBioText ,
    });

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  autobiographyText: editedTableData.autobiographyText,
                };

                // console.log("updatedData", {updatedData});

                await updateAutobiography(id, updatedData);

                setAutobiographyInfo(prevData => {
                    return prevData.map(tableData => {
                        if (tableData.id === id) {
                            return { ...tableData, ...updatedData };
                        }
                        return tableData;
                    });
                });
                // console.log(updatedData)

                setEditingId(null);
                setEditedData({
                    id: id,
                    autobiographyText: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = autobiographyInfo.autobiographies.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
            // console.log(personnelData)
        }
    };

    // СОХРАНИТЬ ИЗМЕНЕНИЯ
    const handleSaveEdit = async (id) => {
    
            try {
                const updatedData = {
                  id: id,
                  personId: editedData.id,
                  autobiographyText: editedData.autobiographyText,
                };

                // console.log("updatedData", {updatedData});

                const response = await updateAutobiography(id, updatedData);

                if (response.status === 200) {
                    setAutobiographyInfo((prevData) => ({
                        ...prevData,
                        autobiographies: prevData.autobiographies.map((tableData) =>
                            tableData.id === id ? updatedData : tableData
                        ),
                    }));
                    setEditingId(null); // Завершаем режим редактирования
                    console.log("Successfully updated table data");
                } else {
                    console.error("Error updating table data");
                }
                // console.log(updatedData)
                // console.log('Successfully updated table data')
            } catch(error) {
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
                        <div className={cl.wrapper} style={{ display: 'flex',  alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Автобиография</p>
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
                                            <textarea 
                                                type="text" 
                                                className={cl.workerInfoText} 
                                                name='autobiographyText' 
                                                value={inputData.autobiographyText}
                                                onChange={(e) => setInputData({ ...inputData, autobiographyText: e.target.value })}
                                            /> 
                                        </div>
                                    </div>
                                    <Button type="submit"  variant="contained" size="small" style={{ height: '32px', marginTop: '25px' }}>Добавить</Button>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className={cl.workerBlock}>
                        {autobiographyInfo && autobiographyInfo.autobiographies && autobiographyInfo.autobiographies.length > 0 ? (
                            editingId ? (
                                <textarea
                                    type="text"
                                    name='autobiographyText'
                                    className={cl.workerInfo}
                                    value={editedData.autobiographyText}
                                    onChange={(e) => setEditedData({ ...editedData, autobiographyText: e.target.value })}
                                />
                            ) : (
                                <Paper className={cl.workerInfoText}>
                                    {firstBioText}
                                </Paper>
                            )
                        ) : (
                            <div className={cl.alert}>
                                <FiAlertCircle style={{ color: '#1565C0', fontSize: '22px' }} />
                                <p className={cl.alert_text}>Нет доступных записей</p>
                            </div>
                        )}
                        {autobiographyInfo && autobiographyInfo.autobiographies && autobiographyInfo.autobiographies.length > 0 && (
                            <div className={cl.relativesActionBtns} style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                {!editingId && (
                                    <div className={cl.actionBtn} onClick={() => handleEdit(id)}>
                                        &#9998;
                                    </div>
                                )}
                                {editingId && (
                                    <>
                                        <IconButton className={cl.iconBtn}  onClick={() => handleSaveEdit(id)}><FaCheck color=' #1565C0' /></IconButton>
                                        <IconButton className={cl.iconBtn} onClick={handleCancelEdit}><IoClose /></IconButton>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Autobiography;