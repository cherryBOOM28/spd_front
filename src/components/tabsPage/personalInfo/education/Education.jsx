import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Education.module.css';
import axios from 'axios';
import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteEducation } from '../../../../api/persona_info/educations/deleteEducation';
import { updateEducation } from '../../../../api/persona_info/educations/updateEducation';

function Education(props) {
    const { id } = useParams();

    const [education, setEducation] = useState({
        "educations" : []
    }); // Данные из бэка

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET Education info
            // console.log("educationResponse ID", id)
            const educationResponse = await getPersonalInfo(id);
            setEducation(educationResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // ДОБАВЛЕНИЕ ДАННЫХ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        education_type: '',
        education_place: '',
        education_date_in: '',
        education_date_out: '',
        education_speciality: '',
        diploma_number: ''
    });

    const handleAddEducation = async (e) => {
        e.preventDefault();
        try {
            console.log(inputData)
            if (!inputData.education_type || !inputData.education_place || !inputData.education_date_in || !inputData.education_date_out || !inputData.education_speciality || !inputData.diploma_number) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newEducation = {
                iin: props.id,
                education_type: inputData.education_type,
                education_place: inputData.education_place,
                education_date_in: inputData.education_date_in,
                education_date_out: inputData.education_date_out,
                education_speciality: inputData.education_speciality,
                diploma_number: inputData.diploma_number
            };

            // console.log(
            //     { 'education': [newEducation] }
            // )

            const body = { "educations": [newEducation] }

            const response = await axios.post('http://localhost:8000/personal_info/create/', body);

            if (response.status === 201) {
                const updatedEducation = {
                    ...education,
                    educations: [
                        ...education.educations,
                        newEducation
                    ]
                };

                setEducation(updatedEducation);
                setInputData({
                    iin: id,
                    education_type: '',
                    education_place: '',
                    education_date_in: '',
                    education_date_out: '',
                    education_speciality: '',
                    diploma_number: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding education');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ EDUCATION
    const handleDelete = async (id) => {
        try {
            const response = await deleteEducation(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setEducation(prevEducation => prevEducation.filter(educationType => educationType.id !== id));
                console.log("Successfully deleted");
            } else {
                console.log("Error deleting education type");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        education_type: '',
        education_place: '',
        education_date_in: '',
        education_date_out: '',
        education_speciality: '',
        diploma_number: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataEdu) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    education_type: editedDataEdu.education_type,
                    education_place: editedDataEdu.education_place,
                    education_date_in: editedDataEdu.education_date_in,
                    education_date_out: editedDataEdu.education_date_out,
                    education_speciality: editedDataEdu.education_speciality,
                    diploma_number: editedDataEdu.diploma_number
                };

                await updateEducation(id, updatedData);

                setEducation(prevEducation => {
                    return prevEducation.map(educationType => {
                        if(educationType.iin === id) {
                            return {...educationType, ...editedDataEdu}
                        }
                        return educationType;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    education_type: '',
                    education_place: '',
                    education_date_in: '',
                    education_date_out: '',
                    education_speciality: '',
                    diploma_number: ''
                });
                console.log('Successfully updated education')
            } catch(error) {
                console.error('Error updating education:', error);
            }
        } else {
            setEditingId(id)
            const educationToEdit = education.educations.find(educationType => educationType.id === id);
            if(educationToEdit) {
                setEditedData(educationToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                education_type: editedData.education_type,
                education_place: editedData.education_place,
                education_date_in: editedData.education_date_in,
                education_date_out: editedData.education_date_out,
                education_speciality: editedData.education_speciality,
                diploma_number: editedData.diploma_number
            };
            console.log(id);
    
            const response = await updateEducation(id, updatedData);
    
            if (response === 200) {
                setEducation((prevEducation) =>
                prevEducation.map((educationType) => (educationType.id === id ? updatedData : educationType))
                );
                setEditingId(null); // Завершаем режим редактирования
                console.log('Successfully updated education');
            } else {
                console.log('Error updating education');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating education:', error);
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
                                <form onSubmit={handleAddEducation} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.education_type}
                                                        onChange={(e) => setInputData({ ...inputData, education_type: e.target.value })}
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
                                                        value={inputData.education_place}
                                                        onChange={(e) => setInputData({ ...inputData, education_place: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input 
                                                        type="date" 
                                                        className={cl.formInput}
                                                        placeholder="Дата поступления"
                                                        value={inputData.education_date_in || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                                ...prevWorker,
                                                                education_date_in: newDate,
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
                                                        value={inputData.education_date_out || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                                ...prevWorker,
                                                                education_date_out: newDate,
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
                                                        value={inputData.education_speciality}
                                                        onChange={(e) => setInputData({ ...inputData, education_speciality: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cl.formInput}
                                                        placeholder="Номер диплома"
                                                        value={inputData.diploma_number}
                                                        onChange={(e) => setInputData({ ...inputData, diploma_number: e.target.value })}
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
                                    {education.educations.map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.education_type}
                                                        onChange={(e) => setEditedData({ ...editedData, education_type: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип образования</option>
                                                        <option value="Высшее">Высшее</option>
                                                        <option value="Магистратура">Магистратура</option>
                                                    </select>
                                                ) : (
                                                    d.education_type
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.education_place} onChange={(e) => setEditedData({ ...editedData, education_place: e.target.value })} /> : d.education_place}</td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input 
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder='Дата поступления'
                                                            value={editedData.education_date_in || ''}
                                                            onChange={(e) => {
                                                                const newData = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    education_date_in: newData,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    d.education_date_in
                                                )}
                                            </td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input 
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder='Дата окончания'
                                                            value={editedData.education_date_out || ''}
                                                            onChange={(e) => {
                                                                const newData = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    education_date_out: newData,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    d.education_date_out
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.education_speciality} onChange={(e) => setEditedData({ ...editedData, education_speciality: e.target.value })} /> : d.education_speciality}</td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.diploma_number} onChange={(e) => setEditedData({ ...editedData, diploma_number: e.target.value })} /> : d.diploma_number}</td>
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