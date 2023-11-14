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
                // console.log(inputData)
                if (!inputData.education_type || !inputData.education_place || !inputData.education_date_in || !inputData.education_date_out || !inputData.education_speciality || !inputData.diploma_number) {
                    alert('Пожалуйста, заполните все поля!');
                    return;
                }
    
                const newEducation = {
                    education_type: inputData.education_type,
                    education_place: inputData.education_place,
                    education_date_in: inputData.education_date_in,
                    education_date_out: inputData.education_date_out,
                    education_speciality: inputData.education_speciality,
                    diploma_number: inputData.diploma_number
                };
                // setEducation(prevRecords => [...prevRecords, newEducation]);
                setEducation((prevArray) => {
                    // Create a new array by copying the previous array and adding a new element
                    const updatedArray = [...prevArray, newEducation];
                    return updatedArray;
                  });

                
    
                setInputData({
                    education_type: '',
                    education_place: '',
                    education_date_in: '',
                    education_date_out: '',
                    education_speciality: '',
                    diploma_number: ''
                })
            } catch (error) {
                console.error('Error:', error);
            }
        };

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
                                            name='education_place'
                                            value={inputData.education_place}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                        <input 
                                            type="date" 
                                            className={cl.formInput}
                                            placeholder="Дата поступления"
                                            value={inputData.education_date_in || ''}
                                            name='education_date_in'
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
                                            value={inputData.education_date_out || ''}
                                            name='education_date_out'
                                            onChange={handleInputChange}
                                        /> 
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="Специальность"
                                            value={inputData.education_speciality}
                                            name='education_speciality'
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер диплома"
                                            value={inputData.diploma_number}
                                            name='diploma_number'
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
                                                        value={editedData.education_type}
                                                        onChange={(e) => setEditedData({ ...editedData, education_type: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип образования</option>
                                                        <option value="Бакалавр">Высшее</option>
                                                        <option value="Магистратура">Магистратура</option>
                                                    </select>
                                                ) : (
                                                    d.education_type
                                                )}
                                            </td>
                                            <td>{editingId === i ? <input type="text" className={cl.editInput} value={editedData.education_place} onChange={(e) => setEditedData({ ...editedData, education_place: e.target.value })} /> : d.education_place}</td>
                                            <td>
                                                {editingId === i ? (
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
                                                {editingId === i ? (
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
                                            <td>{editingId === i ? <input type='text' className={cl.editInput}  value={editedData.education_speciality} onChange={(e) => setEditedData({ ...editedData, education_speciality: e.target.value })} /> : d.education_speciality}</td>
                                            <td>{editingId === i ? <input type='number' className={cl.editInput}  value={editedData.diploma_number} onChange={(e) => setEditedData({ ...editedData, diploma_number: e.target.value })} /> : d.diploma_number}</td>
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