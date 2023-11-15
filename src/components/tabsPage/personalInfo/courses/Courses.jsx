import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Courses.module.css';
import axios from 'axios';
import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteCourse } from '../../../../api/persona_info/courses/deleteCourse';
import { updateCourse } from '../../../../api/persona_info/courses/updateCourse';

function Courses({ course }, props) {
    const { id } = useParams();

    const [courses, setCourses] = useState({
        "courses": []
    }); // Данные из бэка

    // eslint-disable-next-line
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET Education info
            const coursesResponse = await getPersonalInfo(id);
            setCourses(coursesResponse.data);
            // console.log(coursesResponse)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        course_type: '',
        course_organization: '',
        course_start_date: '',
        course_end_date: '',
        document_type: '',
        course_name: ''
    });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            if (!inputData.course_type || !inputData.course_organization || !inputData.course_start_date || !inputData.course_end_date || !inputData.document_type || !inputData.course_name) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newCourse = {
                iin: props.id,
                course_type: inputData.course_type,
                course_organization: inputData.course_organization,
                course_start_date: inputData.course_start_date,
                course_end_date: inputData.course_end_date,
                document_type: inputData.document_type,
                course_name: inputData.course_name
            };

            // console.log(
            //     { 'courses': [newCourse] }
            // )

            const body = { "courses": [newCourse] };

            const response = await axios.post('http://localhost:8000/personal_info/create/', body);

            if (response === 201) {
                const updatedCourse = {
                    ...courses,
                    courses: [
                        ...courses.courses,
                        newCourse
                    ]
                };

                setCourses(updatedCourse);
                setInputData({
                    course_type: '',
                    course_organization: '',
                    course_start_date: '',
                    course_end_date: '',
                    document_type: '',
                    course_name: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding courses');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ EDUCATION
    const handleDelete = async (id) => {
        try {
            const response = await deleteCourse(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setCourses(prevCourse => prevCourse.filter(courseType => courseType.id !== id));
                // console.log("Successfully deleted");
            } else {
                console.log("Error deleting courses type");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        course_type: '',
        course_organization: '',
        course_start_date: '',
        course_end_date: '',
        document_type: '',
        course_name: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataCourse) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    course_type: editedDataCourse.course_type,
                    course_organization: editedDataCourse.course_organization,
                    course_start_date: editedDataCourse.course_start_date,
                    course_end_date: editedDataCourse.course_end_date,
                    document_type: editedDataCourse.document_type,
                    course_name: editedDataCourse.course_name
                };

                await updateCourse(id, updatedData);

                setCourses(prevCourse => {
                    return prevCourse.map(courseType => {
                        if(courseType.iin === id) {
                            return {...courseType, ...editedDataCourse}
                        }
                        return courseType;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    course_type: '',
                    course_organization: '',
                    course_start_date: '',
                    course_end_date: '',
                    document_type: '',
                    course_name: ''
                });
                // console.log('Successfully updated course')
            } catch(error) {
                console.error('Error updating course:', error);
            }
        } else {
            setEditingId(id)
            const courseToEdit = courses.courses.find(courseType => courseType.id === id);
            if(courseToEdit) {
                setEditedData(courseToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                course_type: editedData.course_type,
                course_organization: editedData.course_organization,
                course_start_date: editedData.course_start_date,
                course_end_date: editedData.course_end_date,
                document_type: editedData.document_type,
                course_name: editedData.course_name
            };
            // console.log(id);
    
            const response = await updateCourse(id, updatedData);
    
            if (response === 200) {
                setCourses((prevCourse) =>
                prevCourse.map((courseType) => (courseType.id === id ? updatedData : courseType))
                );
                setEditingId(null); // Завершаем режим редактирования
                // console.log('Successfully updated course');
            } else {
                console.log('Error updating course');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating course:', error);
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
                            <p className={cl.workerCapitalName}>Курсы подготовки и повышения квалификаций</p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить курс</Button>
                            {showForm && (
                                <form onSubmit={handleAddCourse} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.course_type}
                                                        onChange={(e) => setInputData({ ...inputData, course_type: e.target.value })}
                                                    >
                                                        <option value="">Выберите переподготовки</option>
                                                        <option value="Повышение">Повышение</option>
                                                        <option value="Подготовка">Подготовка</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Учебное заведение "
                                                        value={inputData.course_organization}
                                                        onChange={(e) => setInputData({ ...inputData, course_organization: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата начала"
                                                        value={inputData.course_start_date || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            course_start_date: newDate,
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
                                                        value={inputData.course_end_date || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            course_end_date: newDate,
                                                            }));
                                                        }}
                                                    />
                                                    </div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Вид документа"
                                                        value={inputData.document_type}
                                                        onChange={(e) => setInputData({ ...inputData, document_type: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Название курса"
                                                        value={inputData.course_name}
                                                        onChange={(e) => setInputData({ ...inputData, course_name: e.target.value })}
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
                                        <td>Название курса</td>
                                        <td>Вид переподготовки</td>
                                        <td>Учебное заведение </td>
                                        <td>Дата начала</td>
                                        <td>Дата окончания</td>
                                        <td>Вид документа</td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {course && course.courses && course.courses.map((d, i) => (
                                        <tr key={i}>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.courseName} onChange={(e) => setEditedData({ ...editedData, courseName: e.target.value })} /> : d.courseName}</td>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.courseType}
                                                        onChange={(e) => setEditedData({ ...editedData, courseType: e.target.value })}
                                                    >
                                                        <option value="">Выберите переподготовки</option>
                                                        <option value="Повышение">Повышение</option>
                                                        <option value="Подготовка">Подготовка</option>
                                                    </select>
                                                ) : (
                                                    d.courseType
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.courseOrg} onChange={(e) => setEditedData({ ...editedData, courseOrg: e.target.value })} /> : d.courseOrg}</td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                        <input
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder="Дата начала"
                                                            value={editedData.startDate || ''}
                                                            onChange={(e) => {
                                                                const newDate = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                ...prevData,
                                                                startDate: newDate,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    d.startDate
                                                )}
                                            </td>
                                            <td>
                                                {editingId === d.id ? (
                                                    <div className={cl.datePickerContainer}>
                                                         <input
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder="Дата окончания"
                                                            value={editedData.endDate || ''}
                                                            onChange={(e) => {
                                                                const newDate = e.target.value;
                                                                setEditedData((prevData) => ({
                                                                ...prevData,
                                                                endDate: newDate,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    d.endDate
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.documentType} onChange={(e) => setEditedData({ ...editedData, documentType: e.target.value })} /> : d.documentType}</td>
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

export default Courses;