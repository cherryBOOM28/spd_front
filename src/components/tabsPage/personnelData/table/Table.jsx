import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Table.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { deleteSickLeaves } from '../../../../api/staff_info/sick_leaves/deleteSickLeaves';
import { updateSickLeaves } from '../../../../api/staff_info/sick_leaves/updateSickLeaves';

function Table({ sickLeavesInfo, setSickLeavesInfo }) {
    const { id } = useParams();


    // TABLE DATA
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sickDocNumber: '',
        sickDocDate: '',
    });

    // Добавление данных
    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                sickDocNumber: inputData.sickDocNumber,
                sickDocDate: inputData.sickDocDate,
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/sick-leave/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setSickLeavesInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит sickLeaves
                    if (typeof prevData === 'object' && Array.isArray(prevData.sickLeaves)) {
                      return {
                        ...prevData,
                        sickLeaves: [...prevData.sickLeaves, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain sickLeaves");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    sickDocNumber: '',
                    sickDocDate: '',
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
            await deleteSickLeaves(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setSickLeavesInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит sickLeaves
              if (typeof prevData === 'object' && Array.isArray(prevData.sickLeaves)) {
                return {
                  ...prevData,
                  sickLeaves: prevData.sickLeaves.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain sickLeaves");
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
        sickDocNumber: '',
        sickDocDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    // Начало редактирования
    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    sickDocNumber: editedTableData.sickDocNumber,
                    sickDocDate: editedTableData.sickDocDate,
                };

                await updateSickLeaves(id, updatedData);

                setSickLeavesInfo(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.iin === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    sickDocNumber: '',
                    sickDocDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = sickLeavesInfo.sickLeaves.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    // Сохранение изменении
    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                sickDocNumber: editedData.sickDocNumber,
                sickDocDate: editedData.sickDocDate,
            };
            // console.log(id);
    
            const response = await updateSickLeaves(id, updatedData);
    
            if (response.status === 200) {
                setSickLeavesInfo((prevData) => ({
                    ...prevData,
                    sickLeaves: prevData.sickLeaves.map((tableData) =>
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
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Больничные листы</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить больничный лист</Button>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер приказа"
                                            value={inputData.sickDocNumber}
                                            onChange={(e) => setInputData({ ...inputData, sickDocNumber: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            value={inputData.sickDocDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                sickDocDate: newDate,
                                                }));
                                            }}
                                        />
                                        </div>
                                    </td>
                                    <td><Button type="submit">Добавить</Button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </form>
                )}
            </div>
            <div>
                <table className={cl.customTable} style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <td>Номер приказа</td>
                            <td>Дата приказа</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {sickLeavesInfo && sickLeavesInfo.sickLeaves && sickLeavesInfo.sickLeaves.map((d, i) => (
                            <tr key={i}>
                                <td>{editingId === d.id ? <input type="number" className={cl.editInput} name='sickDocNumber' value={editedData.sickDocNumber} onChange={(e) => setEditedData({ ...editedData, sickDocNumber: e.target.value })} /> : d.sickDocNumber}</td>
                                <td>
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            name='sickDocDate'
                                            value={editedData.sickDocDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setEditedData((prevData) => ({
                                                ...prevData,
                                                sickDocDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                ) : (
                                    d.sickDocDate
                                )}
                                </td>
                                <td className={cl.relativesActionBtns} style={{}}>
                                    {editingId === d.id ? (
                                        <>
                                            <div onClick={() => handleSaveEdit(d.id)}>&#10003;</div>
                                            <div onClick={handleCancelEdit}>&#x2715;</div>
                                        </>
                                    ) : (
                                        <>
                                            <div onClick={() => handleEdit(d.id)}>&#9998;</div>
                                            <div onClick={() => handleDelete(d.id)}>Удалить</div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default Table;