import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Education.module.css';
import axios from 'axios';
import Button from '../../../UI/button/Button';
import Cookies from 'js-cookie';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteEducation } from '../../../../api/persona_info/educations/deleteEducation';
import { updateEducation } from '../../../../api/persona_info/educations/updateEducation';

function Education({ education, setEducation }) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ ДАННЫХ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        educationType: '',
        educationPlace: '',
        educationDateIn: '',
        educationDateOut: '',
        speciality: '',
        diplomaNumber: ''
    });

    const handleAddEducation = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.education_type || !inputData.education_place || !inputData.education_date_in || !inputData.education_date_out || !inputData.education_speciality || !inputData.diploma_number) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newEducation = {
                personId: id,
                educationType: inputData.educationType,
                educationPlace: inputData.educationPlace,
                educationDateIn: inputData.educationDateIn,
                educationDateOut: inputData.educationDateOut,
                speciality: inputData.speciality,
                diplomaNumber: inputData.diplomaNumber
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/education/', newEducation, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setEducation(prevData => {
                    // Проверяем, что prevData является объектом и содержит educations
                    if (typeof prevData === 'object' && Array.isArray(prevData.educations)) {
                      return {
                        ...prevData,
                        educations: [...prevData.educations, newEducation],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain educations");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  educationType: '',
                  educationPlace: '',
                  educationDateIn: '',
                  educationDateOut: '',
                  speciality: '',
                  diplomaNumber: ''
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
            await deleteEducation(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setEducation(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит educations
              if (typeof prevData === 'object' && Array.isArray(prevData.educations)) {
                return {
                  ...prevData,
                  educations: prevData.educations.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain educations");
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
        id: '',
        educationType: '',
        educationPlace: '',
        educationDateIn: '',
        educationDateOut: '',
        speciality: '',
        diplomaNumber: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataEdu) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  educationType: inputData.educationType,
                  educationPlace: inputData.educationPlace,
                  educationDateIn: inputData.educationDateIn,
                  educationDateOut: inputData.educationDateOut,
                  speciality: inputData.speciality,
                  diplomaNumber: inputData.diplomaNumber

                };

                // console.log("updatedData", {updatedData});

                await updateEducation(id, updatedData);

                setEducation(prevData => {
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
                    educationType: '',
                    educationPlace: '',
                    educationDateIn: '',
                    educationDateOut: '',
                    speciality: '',
                    diplomaNumber: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = education.educations.find(tableData => tableData.id === id);
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
                educationType: editedData.educationType,
                educationPlace: editedData.educationPlace,
                educationDateIn: editedData.educationDateIn,
                educationDateOut: editedData.educationDateOut,
                speciality: editedData.speciality,
                diplomaNumber: editedData.diplomaNumber,
            };
            // console.log("personId", id);
            // console.log("updatedData", {updatedData});

    
            const response = await updateEducation(id, updatedData);
  
            if (response.status === 200) {
                setEducation((prevData) => ({
                    ...prevData,
                    educations: prevData.educations.map((tableData) =>
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
    

    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Образование</p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить образование</Button>
                            {showForm && (
                                <form onSubmit={(e) => handleAddEducation(e, id)} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.educationType}
                                                        onChange={(e) => setInputData({ ...inputData, educationType: e.target.value })}
                                                    >
                                                        <option value="">Вид образование</option>
                                                        <option value="Бакалавр">Высшее</option>
                                                        <option value="Магистратура">Магистратура</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Учебное заведение "
                                                        value={inputData.educationPlace}
                                                        onChange={(e) => setInputData({ ...inputData, educationPlace: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input 
                                                        type="date" 
                                                        className={cl.formInput}
                                                        placeholder="Дата поступления"
                                                        value={inputData.educationDateIn || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                                ...prevWorker,
                                                                educationDateIn: newDate,
                                                            }));
                                                        }}
                                                    />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input 
                                                        type="date" 
                                                        className={cl.formInput}
                                                        placeholder="Дата окончания"
                                                        value={inputData.educationDateOut || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                                ...prevWorker,
                                                                educationDateOut: newDate,
                                                            }));
                                                        }}
                                                    /> 
                                                    </div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Специальность"
                                                        value={inputData.speciality}
                                                        onChange={(e) => setInputData({ ...inputData, speciality: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cl.formInput}
                                                        placeholder="Номер диплома"
                                                        value={inputData.diplomaNumber}
                                                        onChange={(e) => setInputData({ ...inputData, diplomaNumber: e.target.value })}
                                                    />
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
                                        <td>Вид образования</td>
                                        <td>Учебное заведение </td>
                                        <td>Дата поступления</td>
                                        <td>Дата окончания</td>
                                        <td>Специальность</td>
                                        <td>Номер диплома</td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {education && education.educations && education.educations.map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.educationType}
                                                        onChange={(e) => setEditedData({ ...editedData, educationType: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип образования</option>
                                                        <option value="Высшее">Высшее</option>
                                                        <option value="Магистратура">Магистратура</option>
                                                    </select>
                                                ) : (
                                                    d.educationType
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.educationPlace} onChange={(e) => setEditedData({ ...editedData, educationPlace: e.target.value })} /> : d.educationPlace}</td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input 
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder='Дата поступления'
                                                            value={editedData.educationDateIn || ''}
                                                            onChange={(e) => {
                                                                const newData = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    educationDateIn: newData,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    d.educationDateIn
                                                )}
                                            </td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input 
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder='Дата окончания'
                                                            value={editedData.educationDateOut || ''}
                                                            onChange={(e) => {
                                                                const newData = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    educationDateOut: newData,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    d.educationDateOut
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.speciality} onChange={(e) => setEditedData({ ...editedData, speciality: e.target.value })} /> : d.speciality}</td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.diplomaNumber} onChange={(e) => setEditedData({ ...editedData, diplomaNumber: e.target.value })} /> : d.diplomaNumber}</td>
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

export default Education;