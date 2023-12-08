import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Courses.module.css';
import axios from 'axios';
import Button from '../../../UI/button/Button';
import Cookies from 'js-cookie';

import { deleteCourse } from '../../../../api/persona_info/courses/deleteCourse';
import { updateCourse } from '../../../../api/persona_info/courses/updateCourse';

function Courses({ course, setCourse }, props) {
    const { id } = useParams();


    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.course_type || !inputData.course_organization || !inputData.course_start_date || !inputData.course_end_date || !inputData.document_type || !inputData.course_name) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newCourse = {
                personId: id,
                courseName: inputData.courseName,
                courseType: inputData.courseType,
                courseOrg: inputData.courseOrg,
                startDate: inputData.startDate,
                endDate: inputData.endDate,
                documentType: inputData.documentType
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/course/', newCourse, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setCourse(prevData => {
                    // Проверяем, что prevData является объектом и содержит courses
                    if (typeof prevData === 'object' && Array.isArray(prevData.courses)) {
                      return {
                        ...prevData,
                        courses: [...prevData.courses, newCourse],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain courses");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  courseName: '',
                  courseType: '',
                  courseOrg: '',
                  startDate: '',
                  endDate: '',
                  documentType: ''
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
            await deleteCourse(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setCourse(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит courses
              if (typeof prevData === 'object' && Array.isArray(prevData.courses)) {
                return {
                  ...prevData,
                  courses: prevData.courses.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain courses");
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
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    courseName: editedTableData.courseName,
                    courseType: editedTableData.courseType,
                    courseOrg: editedTableData.courseOrg,
                    startDate: editedTableData.startDate,
                    endDate: editedTableData.endDate,
                    documentType: editedTableData.documentType,
                };

                // console.log("updatedData", {updatedData});

                await updateCourse(id, updatedData);

                setCourse(prevData => {
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
                    courseName: '',
                    courseType: '',
                    courseOrg: '',
                    startDate: '',
                    endDate: '',
                    documentType: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = course.courses.find(tableData => tableData.id === id);
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
                courseName: editedData.courseName,
                courseType: editedData.courseType,
                courseOrg: editedData.courseOrg,
                startDate: editedData.startDate,
                endDate: editedData.endDate,
                documentType: editedData.documentType,
            };
            // console.log(id);
    
            const response = await updateCourse(id, updatedData);
  
            if (response.status === 200) {
                setCourse((prevData) => ({
                    ...prevData,
                    courses: prevData.courses.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
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
                                <form onSubmit={(e) => handleAddCourse(e, id)} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.courseType}
                                                        onChange={(e) => setInputData({ ...inputData, courseType: e.target.value })}
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
                                                        value={inputData.courseOrg}
                                                        onChange={(e) => setInputData({ ...inputData, courseOrg: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата начала"
                                                        value={inputData.startDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            startDate: newDate,
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
                                                        value={inputData.endDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            endDate: newDate,
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
                                                        value={inputData.documentType}
                                                        onChange={(e) => setInputData({ ...inputData, documentType: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Название курса"
                                                        value={inputData.courseName}
                                                        onChange={(e) => setInputData({ ...inputData, courseName: e.target.value })}
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