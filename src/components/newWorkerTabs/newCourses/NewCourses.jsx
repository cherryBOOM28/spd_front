import React, {useState} from 'react';
import cl from './NewCourses.module.css';
import Button from '../../UI/button/Button';
import { useForm } from '../formProvider/FormProvider';

const NewCourses = (props) => {
    // const { id } = useParams();

    const {courses, setCourses} = useForm();

    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(true);

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

            console.log(inputData)
            if (!inputData.course_type || !inputData.course_organization || !inputData.course_start_date || !inputData.course_end_date || !inputData.document_type || !inputData.course_name) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newCourse = {
                // iin: id,
                course_type: inputData.course_type,
                course_organization: inputData.course_organization,
                course_start_date: inputData.course_start_date,
                course_end_date: inputData.course_end_date,
                document_type: inputData.document_type,
                course_name: inputData.course_name
            };

            // setCourses(prevRecords => [...prevRecords, newCourse]);

            setCourses((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newCourse];
                return updatedArray;
              });

            // console.log(
            //     { 'courses': [newCourse] }
            // )

            // const response = await axios.post('http://localhost:3001/courses', newCourse);

            // if (response.status === 201) {
            //     setCourses(prevRecords => [...prevRecords, newCourse]);
            //     setInputData({
            //         course_type: '',
            //         course_organization: '',
            //         course_start_date: '',
            //         course_end_date: '',
            //         document_type: '',
            //         course_name: ''
            //     });
            //     handleShowForm(false)
            // } else {
            //     console.error('Error adding courses');
            // }
            setInputData({
                course_type: '',
                course_organization: '',
                course_start_date: '',
                course_end_date: '',
                document_type: '',
                course_name: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ EDUCATION
    // const handleDelete = async (id) => {
    //     try {
    //         const response = await deletePersonalInfo(id)
    //         if (response.status === 200) {
    //             // Успешно удалено, теперь обновляем состояние
    //             setCourses(prevCourse => prevCourse.filter(courseType => courseType.id !== id));
    //             console.log("Successfully deleted");
    //         } else {
    //             console.log("Error deleting courses type");
    //         }
         
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        course_type: '',
        course_organization: '',
        course_start_date: '',
        course_end_date: '',
        document_type: '',
        course_name: ''
    });

    const [editingId, setEditingId] = useState(null);

    // const handleEdit = async (id, editedDataCourse) => {
    //     if(editingId === id) {
    //         try {
    //             const updatedData = {
    //                 iin: id,
    //                 course_type: editedDataCourse.course_type,
    //                 course_organization: editedDataCourse.course_organization,
    //                 course_start_date: editedDataCourse.course_start_date,
    //                 course_end_date: editedDataCourse.course_end_date,
    //                 document_type: editedDataCourse.document_type,
    //                 course_name: editedDataCourse.course_name
    //             };

    //             await getPersonalInfo(id, updatedData);

    //             setCourses(prevCourse => {
    //                 return prevCourse.map(courseType => {
    //                     if(courseType.id === id) {
    //                         return {...courseType, ...editedDataCourse}
    //                     }
    //                     return courseType;
    //                 })
    //             });

    //             setEditingId(null);
    //             setEditedData({
    //                 id: id,
    //                 course_type: '',
    //                 course_organization: '',
    //                 course_start_date: '',
    //                 course_end_date: '',
    //                 document_type: '',
    //                 course_name: ''
    //             });
    //             console.log('Successfully updated course')
    //         } catch(error) {
    //             console.error('Error updating course:', error);
    //         }
    //     } else {
    //         setEditingId(id)
    //         const courseToEdit = courses.find(courseType => courseType.id === id);
    //         if(courseToEdit) {
    //             setEditedData(courseToEdit);
    //         }
    //     }
    // };

    // const handleSaveEdit = async (id) => {
    //     try {
    //         const updatedData = {
    //             iin: id,
    //             course_type: editedData.course_type,
    //             course_organization: editedData.course_organization,
    //             course_start_date: editedData.course_start_date,
    //             course_end_date: editedData.course_end_date,
    //             document_type: editedData.document_type,
    //             course_name: editedData.course_name
    //         };
    //         console.log(id);
    
    //         const response = await updatePersonalInfo(id, updatedData);
    
    //         if (response.status === 200) {
    //             setCourses((prevCourse) =>
    //             prevCourse.map((courseType) => (courseType.id === id ? updatedData : courseType))
    //             );
    //             setEditingId(null); // Завершаем режим редактирования
    //             console.log('Successfully updated course');
    //         } else {
    //             console.log('Error updating course');
    //         }
    //     } catch (error) {
    //         console.error('Error updating course:', error);
    //     }
    // };

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
                        {/* <Button onClick={handleShowForm}>Добавить курс</Button> */}
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
                                                
                                                <td><Button type="submit" className={cl.submitBtn} onClick={handleShowForm}>Добавить</Button></td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </form>
                                {showForm && (
                                <div>
                                <table className={cl.customTable} style={{ marginTop: '20px' }}>
                                    <thead>
                                        <tr>
                                            <td>Вид переподготовки</td>
                                            <td>Учебное заведение </td>
                                            <td>Дата начала</td>
                                            <td>Дата окончания</td>
                                            <td>Вид документа</td>
                                            <td>Название курса</td>
                                            {/* <td>Действие</td> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.slice(1).map((d, i) => (
                                            <tr key={i}>
                                                <td>  
                                                    {editingId === d.id ? (
                                                        <select
                                                            className={cl.selectRelative_type}
                                                            value={editedData.course_type}
                                                            onChange={(e) => setEditedData({ ...editedData, course_type: e.target.value })}
                                                        >
                                                            <option value="">Выберите переподготовки</option>
                                                            <option value="Повышение">Повышение</option>
                                                            <option value="Подготовка">Подготовка</option>
                                                        </select>
                                                    ) : (
                                                        d.course_type
                                                    )}
                                                </td>
                                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.course_organization} onChange={(e) => setEditedData({ ...editedData, course_organization: e.target.value })} /> : d.course_organization}</td>
                                                <td>
                                                    {editingId === d.id ? (
                                                        <div className={cl.datePickerContainer}>
                                                            <input
                                                                type="date"
                                                                className={cl.formInput}
                                                                placeholder="Дата начала"
                                                                value={editedData.course_start_date || ''}
                                                                onChange={(e) => {
                                                                    const newDate = e.target.value;
                                                                    setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    course_start_date: newDate,
                                                                    }));
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        d.course_start_date
                                                    )}
                                                </td>
                                                <td>
                                                    {editingId === d.id ? (
                                                        <div className={cl.datePickerContainer}>
                                                             <input
                                                                type="date"
                                                                className={cl.formInput}
                                                                placeholder="Дата окончания"
                                                                value={editedData.course_end_date || ''}
                                                                onChange={(e) => {
                                                                    const newDate = e.target.value;
                                                                    setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    course_end_date: newDate,
                                                                    }));
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        d.course_end_date
                                                    )}
                                                </td>
                                                <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.document_type} onChange={(e) => setEditedData({ ...editedData, document_type: e.target.value })} /> : d.document_type}</td>
                                                <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.course_name} onChange={(e) => setEditedData({ ...editedData, course_name: e.target.value })} /> : d.course_name}</td>
                                                {/* <td className={cl.relativesActionBtns} style={{}}>
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
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            )}
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCourses;