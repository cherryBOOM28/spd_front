import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './AcademicDegree.module.css';
import axios from 'axios';
import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteAcademicDegree } from '../../../../api/persona_info/academic_degree/deleteAcademicDegree';
import { updateAcademicDegree } from '../../../../api/persona_info/academic_degree/updateAcademicDegree';

function AcademicDegree(props) {
    const { id } = useParams();

    const [academicDegree, setAcademicDegree] = useState({
        "academic_degree": []
    }); // Данные из бэка

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET Academic degree info
            const academivDegreeResponse = await getPersonalInfo(id);
            setAcademicDegree(academivDegreeResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // ДОБАВЛЕНИЕ УЧЕНОЙ СТЕПЕНИ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        education_place_academic: '',
        academic_degree: '',
        diploma_number_academic: '',
        diploma_date: ''
    });

    const handleAddDegree = async (e, id) => {
        e.preventDefault();
        try {
            if (!inputData.education_place_academic || !inputData.academic_degree || !inputData.diploma_number_academic || !inputData.diploma_date) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newAcademicDegree = {
                iin: props.id,
                education_place_academic: inputData.education_place_academic,
                academic_degree: inputData.academic_degree,
                diploma_number_academic: inputData.diploma_number_academic,
                diploma_date: inputData.diploma_date
            };

            const body = {"academic_degree": [newAcademicDegree]};

            const response = await axios.post('http://localhost:8000/personal_info/create/', body);

            if (response.status === 201) {
                const updatedAcademicDegree = {
                    ...academicDegree,
                        academic_degree: [
                        ...academicDegree.academic_degree,
                        newAcademicDegree
                    ]
                };

                setAcademicDegree(updatedAcademicDegree);
                setInputData({
                    iin: id,
                    education_place_academic: '',
                    academic_degree: '',
                    diploma_number_academic: '',
                    diploma_date: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding education');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ ACADEMIC DEGREE
    const handleDelete = async (id) => {
        try {
            const response = await deleteAcademicDegree(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setAcademicDegree(prevDegree => prevDegree.filter(degree => degree.id !== id));
                // console.log("Successfully deleted");
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
        education_place_academic: '',
        academic_degree: '',
        diploma_number_academic: '',
        diploma_date: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataDegree) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    education_place_academic: editedDataDegree.education_place_academic,
                    academic_degree: editedDataDegree.academic_degree,
                    diploma_number_academic: editedDataDegree.diploma_number_academic,
                    diploma_date: editedDataDegree.diploma_date
                };

                await updateAcademicDegree(id, updatedData);
                // console.log(updatedData)

                setAcademicDegree(prevDegree => {
                    return prevDegree.map(degree => {
                        if(degree.iin === id) {
                            return {...degree, ...updatedData}
                        }
                        return degree;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    education_place_academic: '',
                    academic_degree: '',
                    diploma_number_academic: '',
                    diploma_date: ''
                });
                // console.log('Successfully updated academic degree')
            } catch(error) {
                console.error('Error updating academic degree:', error);
            }
        } else {
            setEditingId(id);
            const degreeToEdit = academicDegree.academic_degree.find(degree => degree.id === id);
            if(degreeToEdit) {
                setEditedData(degreeToEdit);
            };
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                education_place_academic: editedData.education_place_academic,
                academic_degree: editedData.academic_degree,
                diploma_number_academic: editedData.diploma_number_academic,
                diploma_date: editedData.diploma_date
            };
            // console.log(id);
    
            const response = await updateAcademicDegree(id, updatedData);
    
            if (response === 200) {
                setAcademicDegree((prevDegree) =>
                prevDegree.map((degree) => (degree.id === id ? updatedData : degree))
                );
                setEditingId(null); // Завершаем режим редактирования
                // console.log('Successfully updated academic degree');
            } else {
                console.log('Error updating academic degree');
            }
            window.location.reload();
            // console.log(updatedData)
        } catch (error) {
            console.error('Error updating academic degree:', error);
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
                                <form onSubmit={handleAddDegree} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Учебное заведение "
                                                        value={inputData.education_place_academic}
                                                        onChange={(e) => setInputData({ ...inputData, education_place_academic: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.academic_degree}
                                                        onChange={(e) => setInputData({ ...inputData, academic_degree: e.target.value })}
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
                                                        value={inputData.diploma_number_academic}
                                                        onChange={(e) => setInputData({ ...inputData, diploma_number_academic: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата диплома"
                                                        value={inputData.diploma_date || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            diploma_date: newDate,
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
                                    {academicDegree.academic_degree.map((d, i) => (
                                        <tr key={i}>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.education_place_academic} onChange={(e) => setEditedData({ ...editedData, education_place_academic: e.target.value })} /> : d.education_place_academic}</td>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.academic_degree}
                                                        onChange={(e) => setEditedData({ ...editedData, academic_degree: e.target.value })}
                                                    >
                                                         <option value="">Ученая степень</option>
                                                        <option value="Бакалавр">Бакалавр</option>
                                                        <option value="Магистр">Магистр</option>
                                                        <option value="Кандидат">Кандидат наук</option>
                                                        <option value="Доктор">Доктор наук</option>
                                                    </select>
                                                ) : (
                                                    d.academic_degree
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.diploma_number_academic} onChange={(e) => setEditedData({ ...editedData, diploma_number_academic: e.target.value })} /> : d.diploma_number_academic}</td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder="Дата диплома"
                                                            value={editedData.diploma_date || ''}
                                                            onChange={(e) => {
                                                                const newDate = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                ...prevData,
                                                                diploma_date: newDate,
                                                                }));
                                                            }}
                                                        />

                                                    </div>
                                                ) : (
                                                    d.diploma_date
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