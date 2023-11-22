import React, {useState} from 'react';
import cl from './NewCourses.module.css';
import Button from '../../UI/button/Button';
import { useForm } from '../formProvider/FormProvider';

const NewCourses = (props) => {
    // const { id } = useParams();

    const {course, setCourse} = useForm();

    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(true);

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

            // console.log(inputData)
            // if (!inputData.course_type || !inputData.course_organization || !inputData.course_start_date || !inputData.course_end_date || !inputData.document_type || !inputData.course_name) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newCourse = {
                // iin: id,
                courseName: inputData.courseName,
                courseType: inputData.courseType,
                courseOrg: inputData.courseOrg,
                startDate: inputData.startDate,
                endDate: inputData.endDate,
                documentType: inputData.documentType
            };

            // setCourses(prevRecords => [...prevRecords, newCourse]);

            setCourse((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newCourse];
                return updatedArray;
            });

     
            setInputData({
                courseName: '',
                courseType: '',
                courseOrg: '',
                startDate: '',
                endDate: '',
                documentType: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [editedData, setEditedData] = useState({
        id: '',
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const [editingId, setEditingId] = useState(null);

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
                                        {course.slice(1).map((d, i) => (
                                            <tr key={i}>
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
                                                                    const newDate = e.endDate.value;
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
                                                <td>{editingId === d.id ? <input type='text' className={cl.editInput}  value={editedData.courseName} onChange={(e) => setEditedData({ ...editedData, courseName: e.target.value })} /> : d.courseName}</td>
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