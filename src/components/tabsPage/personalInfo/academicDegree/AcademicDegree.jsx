import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './AcademicDegree.module.css';
import axios from 'axios';
import Button from '../../../UI/button/Button';
import Cookies from 'js-cookie';

import { deleteAcademicDegree } from '../../../../api/persona_info/academic_degree/deleteAcademicDegree';
import { updateAcademicDegree } from '../../../../api/persona_info/academic_degree/updateAcademicDegree';

function AcademicDegree({academicDegree, setAcademicDegree}, props) {
    const { id } = useParams();

    // ДОБАВЛЕНИЕ УЧЕНОЙ СТЕПЕНИ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const handleAddDegree = async (e, id) => {
        e.preventDefault(); // предотвращаем отправку формы по умолчанию
        try {
            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.orfanization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              personId: id,
              academicPlace: inputData.academicPlace,
              academicDegree: inputData.academicDegree,
              academicDiplomaNumber: inputData.academicDiplomaNumber,
              academicDiplomaDate: inputData.academicDiplomaDate,
            };

            // console.log(
            //     { newData },
            //     {id}
            // )

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/academic-degree/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setAcademicDegree(prevData => {
                    // Проверяем, что prevData является объектом и содержит academicDegrees
                    if (typeof prevData === 'object' && Array.isArray(prevData.academicDegrees)) {
                      return {
                        ...prevData,
                        academicDegrees: [...prevData.academicDegrees, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain academicDegrees");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    academicPlace: '',
                    academicDegree: '',
                    academicDiplomaNumber: '',
                    academicDiplomaDate: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ ACADEMIC DEGREE
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteAcademicDegree(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setAcademicDegree(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит academicDegrees
              if (typeof prevData === 'object' && Array.isArray(prevData.academicDegrees)) {
                return {
                  ...prevData,
                  academicDegrees: prevData.academicDegrees.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain academicDegrees");
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
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  academicPlace: editedTableData.academicPlace,
                  academicDegree: editedTableData.academicDegree,
                  academicDiplomaNumber: editedTableData.academicDiplomaNumber,
                  academicDiplomaDate: editedTableData.academicDiplomaDate,
                };

                // console.log("updatedData", {updatedData});

                await updateAcademicDegree(id, updatedData);

                setAcademicDegree(prevData => {
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
                    academicPlace: '',
                    academicDegree: '',
                    academicDiplomaNumber: '',
                    academicDiplomaDate: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = academicDegree.academicDegrees.find(tableData => tableData.id === id);
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
                academicPlace: editedData.academicPlace,
                academicDegree: editedData.academicDegree,
                academicDiplomaNumber: editedData.academicDiplomaNumber,
                academicDiplomaDate: editedData.academicDiplomaDate,
            };
            // console.log("personId", id);
            // console.log("updatedData", {updatedData});

    
            const response = await updateAcademicDegree(id, updatedData);
  
            if (response.status === 200) {
                setAcademicDegree((prevData) => ({
                    ...prevData,
                    academicDegrees: prevData.academicDegrees.map((tableData) =>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Ученые степени </p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить ученую степень </Button>
                            {showForm && (
                                <form onSubmit={(e) => handleAddDegree(e, id)} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Учебное заведение "
                                                        value={inputData.academicPlace}
                                                        onChange={(e) => setInputData({ ...inputData, academicPlace: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.academicDegree}
                                                        onChange={(e) => setInputData({ ...inputData, academicDegree: e.target.value })}
                                                    >
                                                        <option value="">Ученая степень</option>
                                                        <option value="Бакалавр">Бакалавр</option>
                                                        <option value="Магистр">Магистр</option>
                                                        <option value="Кандидат">Кандидат наук</option>
                                                        <option value="Доктор">Доктор наук</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cl.formInput}
                                                        placeholder="Номер диплома"
                                                        value={inputData.academicDiplomaNumber}
                                                        onChange={(e) => setInputData({ ...inputData, academicDiplomaNumber: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата диплома"
                                                        value={inputData.academicDiplomaDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            academicDiplomaDate: newDate,
                                                            }));
                                                        }}
                                                    />
                                                    </div>
                                                </td>
                                                <td><Button type="submit" className={cl.submitBtn} >Добавить</Button></td>
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
                                        <td>Учебное заведение </td>
                                        <td>Вид образования</td>
                                        <td>Номер диплома</td>
                                        <td>Дата диплома</td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {academicDegree && academicDegree.academicDegrees && academicDegree.academicDegrees.map((d, i) => (
                                        <tr key={i}>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.academicPlace} onChange={(e) => setEditedData({ ...editedData, academicPlace: e.target.value })} /> : d.academicPlace}</td>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.academicDegree}
                                                        onChange={(e) => setEditedData({ ...editedData, academicDegree: e.target.value })}
                                                    >
                                                         <option value="">Ученая степень</option>
                                                        <option value="Бакалавр">Бакалавр</option>
                                                        <option value="Магистр">Магистр</option>
                                                        <option value="Кандидат">Кандидат наук</option>
                                                        <option value="Доктор">Доктор наук</option>
                                                    </select>
                                                ) : (
                                                    d.academicDegree
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.academicDiplomaNumber} onChange={(e) => setEditedData({ ...editedData, academicDiplomaNumber: e.target.value })} /> : d.academicDiplomaNumber}</td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder="Дата диплома"
                                                            value={editedData.academicDiplomaDate || ''}
                                                            onChange={(e) => {
                                                                const newDate = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                ...prevData,
                                                                academicDiplomaDate: newDate,
                                                                }));
                                                            }}
                                                        />

                                                    </div>
                                                ) : (
                                                    d.academicDiplomaDate
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
            </div>
        </div>
    );
}

export default AcademicDegree;