import React, { useState } from 'react';
import cl from './SpecChecks.module.css';
import { useParams } from 'react-router-dom';
import { updateSpecCheck } from '../../../../api/staff_info/spec_checks/updateSpecCheck';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button, Paper } from '@mui/material';
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";


function SpecChecks({ specCheckInfo, setSpecCheckInfo }) {
    const { id } = useParams();

    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;

    const [inputData, setInputData] = useState({
        docNumber: '',
        docDate: '',
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
                docNumber: inputData.docNumber,
                docDate: inputData.docDate,
            };
          
            console.log(
                { newData },
                {id}
            )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/spec-check/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            if (response.status === 201) {
                const addedData = {
                    ...newData,
                    specChecks: response.data.nextAttDateMin,
                };
                setSpecCheckInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит attestations
                    if (typeof prevData === 'object' && Array.isArray(prevData.specChecks)) {
                      return {
                        ...prevData,
                        specChecks: [...prevData.specChecks, addedData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain attestations");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    docNumber: '',
                    docDate: '',
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
        docNumber: '',
        docDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    docNumber: editedTableData.docNumber,
                    docDate: editedTableData.docDate,
                };

                await updateSpecCheck(id, updatedData);

                setSpecCheckInfo(prevData => {
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
                    docNumber: '',
                    docDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = specCheckInfo.specChecks.find(tableData => tableData.id === id);
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
                docNumber: editedData.docNumber,
                docDate: editedData.docDate,
            };
            // console.log(id);
            // console.log(updatedData)
    
            const response = await updateSpecCheck(id, updatedData);
    
            if (response.status === 200) {
                setSpecCheckInfo((prevData) => ({
                    ...prevData,
                    specChecks: prevData.specChecks.map((tableData) =>
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

    
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px'}}>
                            <p className={cl.workerCapitalName}>Спец проверка</p>
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
                                            <TextField 
                                                type="number"
                                                id="outlined-basic" 
                                                variant="outlined"  
                                                size="small"
                                                className={cl.workerInfo}
                                                name='docNumber' 
                                                value={inputData.docNumber}
                                                onChange={(e) => setInputData({ ...inputData, docNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Дата окончания</label>
                                            <div className={cl.datePickerContainer}>
                                                <TextField 
                                                    type="date"
                                                    id="outlined-basic" 
                                                    variant="outlined"  
                                                    size="small"
                                                    name='docDate'
                                                    className={cl.workerInfo}
                                                    placeholder='Дата окончания'
                                                    value={inputData.docDate || ''}
                                                    onChange={(e) => {
                                                        const newDate = e.target.value;
                                                        setInputData((prevWorker) => ({
                                                        ...prevWorker,
                                                        docDate: newDate,
                                                        }));
                                                    }}
                                                />
                                            </div> 
                                    </div>
                                </div>
                                <Button type="submit"  variant="contained" style={{  marginTop: '25px' }}>Добавить</Button>
                            </div>
                            
                            
                            </form>
                        )}
                    </div>
                    <div>
                        {specCheckInfo && specCheckInfo.specChecks && specCheckInfo.specChecks.map((d, i) => (
                            <div key={i} className={cl.workerBlock}>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Номер документа</label>
                                        {editingId === d.id ? 
                                            <TextField 
                                                type="number"
                                                id="outlined-basic" 
                                                variant="outlined"  
                                                size="small"
                                                className={cl.workerInfo}
                                                name='docNumber' 
                                                value={editedData.docNumber} 
                                                onChange={(e) => setEditedData({ ...editedData, docNumber: e.target.value })} 
                                            />
                                            : 
                                            <Paper className={cl.workerInfoP}>{d.docNumber}</Paper>      
                                        }
                                    </div>
                                </div>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Дата окончания</label>
                                        {editingId === d.id ? 
                                            <div className={cl.datePickerContainer}>
                                            <TextField 
                                                 type="date"
                                                id="outlined-basic" 
                                                variant="outlined"  
                                                size="small"
                                                className={cl.workerInfo}
                                                name='docDate' 
                                                value={editedData.docDate || ''}
                                                onChange={(e) => {
                                                    const newData = e.target.value;
                                                    setEditedData((prevData) => ({
                                                        ...prevData,
                                                        docDate: newData,
                                                    }));
                                                }}
                                            />
                                            </div> : 
                                            <Paper className={cl.workerInfoP}>{d.docDate}</Paper>      
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

export default SpecChecks;

