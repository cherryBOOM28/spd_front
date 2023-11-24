import React, { useState } from 'react';
import cl from './NewEducation.module.css'
import Button from '../../UI/button/Button';
import { useForm } from '../formProvider/FormProvider';


const NewEducation = (props) => {

    const { education, setEducation } = useForm();

  // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };       

    // ДОБАВЛЕНИЕ ДАННЫХ
    const [showForm, setShowForm] = useState(true);

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
                educationType: inputData.educationType,
                educationPlace: inputData.educationPlace,
                educationDateIn: inputData.educationDateIn,
                educationDateOut: inputData.educationDateOut,
                speciality: inputData.speciality,
                diplomaNumber: inputData.diplomaNumber
            };
            // setEducation(prevRecords => [...prevRecords, newEducation]);
            setEducation((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newEducation];
                return updatedArray;
                });

            

            setInputData({
                educationType: '',
                educationPlace: '',
                educationDateIn: '',
                educationDateOut: '',
                speciality: '',
                diplomaNumber: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                    <form onSubmit={handleAddEducation} style={{ marginTop: '10px' }}>  
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
                                            name='educationPlace'
                                            value={inputData.educationPlace}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                        <input 
                                            type="date" 
                                            className={cl.formInput}
                                            placeholder="Дата поступления"
                                            value={inputData.educationDateIn || ''}
                                            name='educationDateIn'
                                            onChange={handleInputChange}
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
                                            name='educationDateOut'
                                            onChange={handleInputChange}
                                        /> 
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="Специальность"
                                            value={inputData.speciality}
                                            name='speciality'
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер диплома"
                                            value={inputData.diplomaNumber}
                                            name='diplomaNumber'
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    
                                    <td><Button className={cl.submitBtn}  onClick={handleShowForm}>Добавить</Button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </form>
                        {showForm && (
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
                                        {/* <td>Действие</td> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {education.slice(1).map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === i ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.educationType}
                                                        onChange={(e) => setEditedData({ ...editedData, educationType: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип образования</option>
                                                        <option value="Бакалавр">Высшее</option>
                                                        <option value="Магистратура">Магистратура</option>
                                                    </select>
                                                ) : (
                                                    d.educationType
                                                )}
                                            </td>
                                            <td>{editingId === i ? <input type="text" className={cl.editInput} value={editedData.educationPlace} onChange={(e) => setEditedData({ ...editedData, educationPlace: e.target.value })} /> : d.educationPlace}</td>
                                            <td>
                                                {editingId === i ? (
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
                                                {editingId === i ? (
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
                                            <td>{editingId === i ? <input type='text' className={cl.editInput}  value={editedData.speciality} onChange={(e) => setEditedData({ ...editedData, speciality: e.target.value })} /> : d.speciality}</td>
                                            <td>{editingId === i ? <input type='number' className={cl.editInput}  value={editedData.diplomaNumber} onChange={(e) => setEditedData({ ...editedData, diplomaNumber: e.target.value })} /> : d.diplomaNumber}</td>
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

export default NewEducation;