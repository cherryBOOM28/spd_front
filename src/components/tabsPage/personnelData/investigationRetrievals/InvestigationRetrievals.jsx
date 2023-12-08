import React, { useState } from 'react';
import axios from 'axios';
import cl from './InvestigationRetrievals.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { deleteInvestigation_retrievals } from '../../../../api/staff_info/investigation_retrievals/deleteInvestigation_retrievals';
import { updateInvestigation_retrievals } from '../../../../api/staff_info/investigation_retrievals/updateInvestigation_retrievals';

function InvestigationRetrievals({ investigationsInfo, setInvestigationsInfo }) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });

    // Добавление данных
    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.order_type_investigation || !inputData.order_doc_numb || !inputData.order_date_investigation) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                investigation_decree_type: inputData.investigation_decree_type,
                investigation_decree_number: inputData.investigation_decree_number,
                investigation_date: inputData.investigation_date,
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/investigation/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setInvestigationsInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит investigations
                    if (typeof prevData === 'object' && Array.isArray(prevData.investigations)) {
                      return {
                        ...prevData,
                        investigations: [...prevData.investigations, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain investigations");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    investigation_decree_type: '',
                    investigation_decree_number: '',
                    investigation_date: '',
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
            await deleteInvestigation_retrievals(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setInvestigationsInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит investigations
              if (typeof prevData === 'object' && Array.isArray(prevData.investigations)) {
                return {
                  ...prevData,
                  investigations: prevData.investigations.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain investigations");
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
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });
    
    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    investigation_decree_type: editedTableData.investigation_decree_type,
                    investigation_decree_number: editedTableData.investigation_decree_number,
                    investigation_date: editedTableData.investigation_date,
                };

                await updateInvestigation_retrievals(id, updatedData);

                setInvestigationsInfo(prevData => {
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
                    investigation_decree_type: '',
                    investigation_decree_number: '',
                    investigation_date: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = investigationsInfo.investigations.find(tableData => tableData.id === id);
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
                investigation_decree_type: editedData.investigation_decree_type,
                investigation_decree_number: editedData.investigation_decree_number,
                investigation_date: editedData.investigation_date,
            };
            // console.log(id);
    
            const response = await updateInvestigation_retrievals(id, updatedData);
    
            if (response.status === 200) {
                setInvestigationsInfo((prevData) => ({
                    ...prevData,
                    investigations: prevData.investigations.map((tableData) =>
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
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Служебные расследования, взыскания</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить расследованиe/взыскание</Button>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <select
                                            className={cl.formInput}
                                            value={inputData.investigation_decree_type}
                                            onChange={(e) => setInputData({ ...inputData, investigation_decree_type: e.target.value })}
                                        >
                                            <option value="">Выберите вид взыскания</option>
                                            <option value="Замечания">Замечания</option>
                                            <option value="Выговор">Выговор</option>
                                            <option value="Строгий выговор">Строгий выговор</option>
                                            <option value="Неполное служебное соответствие">Неполное служебное соответствие</option>
                                            <option value="Увольнение">Увольнение</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер приказа"
                                            value={inputData.investigation_decree_number}
                                            onChange={(e) => setInputData({ ...inputData, investigation_decree_number: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>

                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            value={inputData.investigation_date || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                investigation_date: newDate,
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
                            <td>Тип приказа</td>
                            <td>Номер приказа</td>
                            <td>Дата приказа</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {investigationsInfo && investigationsInfo.investigations && investigationsInfo.investigations.map((d, i) => (
                            <tr key={i}>
                                <td>  
                                    {editingId === d.id ? (
                                        <select
                                            className={cl.selectRelative_type}
                                            value={editedData.investigation_decree_type}
                                            onChange={(e) => setEditedData({ ...editedData, investigation_decree_type: e.target.value })}
                                        >
                                            <option value="">Выберите вид взыскания</option>
                                            <option value="замечания">Замечания</option>
                                            <option value="Выговор">Выговор</option>
                                            <option value="Строгий выговор">Строгий выговор</option>
                                            <option value="Неполное служебное соответствие">Неполное служебное соответствие</option>
                                            <option value="Увольнение">Увольнение</option>
                                        </select>
                                    ) : (
                                        d.investigation_decree_type
                                    )}
                                </td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='investigation_decree_number' value={editedData.investigation_decree_number} onChange={(e) => setEditedData({ ...editedData, investigation_decree_number: e.target.value })} /> : d.investigation_decree_number}</td>
                                <td>
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            value={editedData.investigation_date || ''}
                                            onChange={(e) =>
                                                setEditedData((prevWorker) => ({
                                                ...prevWorker,
                                                investigation_date: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    d.investigation_date
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

export default InvestigationRetrievals;