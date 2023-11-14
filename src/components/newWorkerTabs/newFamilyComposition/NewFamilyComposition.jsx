import React, { useState } from 'react';
import cl from './NewFamilyComposition.module.css'
import Button from '../../UI/button/Button';
import { useForm } from '../formProvider/FormProvider';

const NewFamilyComposition = (props) => {
    const { family_compositions, setFamilyCompositions } = useForm();

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
        relative_type: "",
        fio: "",
        rel_iin: "",
        birth_date_family: "",
        job_place: "",
    });

    console.log("inputData", inputData);

    const handleAddFamilyMember = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.relative_type || !inputData.fio || !inputData.rel_iin || !inputData.birth_date_family || !inputData.job_place) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newFamily = {
                relative_type: inputData.relative_type,
                fio: inputData.fio,
                rel_iin: inputData.rel_iin,
                birth_date_family: inputData.birth_date_family,
                job_place: inputData.job_place
            };
            // setEducation(prevRecords => [...prevRecords, newEducation]);
            setFamilyCompositions((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newFamily];
                return updatedArray;
                });

            setInputData({
                relative_type: "",
                fio: "",
                rel_iin: "",
                birth_date_family: "",
                job_place: "",
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        relative_type: "",
        fio: "",
        rel_iin: "",
        birth_date_family: "",
        job_place: "",
    });

    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.personalWrapper}>
        <div className={cl.container}>
            <div className={cl.totalInfoWrapper}>
                <div className={cl.totalInfoContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <p className={cl.workerCapitalName}>Состав семьи</p>
                    </div>
                </div>
            </div>
            <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                <div>
                    <div>
                    <form onSubmit={handleAddFamilyMember} style={{ marginTop: '10px' }}>  
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <select
                                            className={cl.formInput}
                                            value={inputData.relative_type}
                                            onChange={(e) => setInputData({ ...inputData, relative_type: e.target.value })}
                                        >
                                            <option value="">Выберите тип родственника</option>
                                            <option value="супруг/супруга">супруг/супруга</option>
                                            <option value="сын/дочь">сын/дочь</option>
                                            <option value="мать/отец">мать/отец</option>
                                            <option value="брат/сестра">брат/сестра</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="ФИО"
                                            name='fio'
                                            value={inputData.fio}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="number"
                                                className={cl.formInput}
                                                name='rel_iin'
                                                placeholder="ИИН родственника"
                                                value={inputData.rel_iin}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                name='birth_date_family'
                                                placeholder="Дата рождения"
                                                value={inputData.birth_date_family || ''}
                                                onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                birth_date_family: newDate,
                                                }));
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            name='job_place'
                                            placeholder="Место работы"
                                            value={inputData.job_place}
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
                                        <td>Степень родства</td>
                                        <td>ФИО</td>
                                        <td>ИИН</td>
                                        <td>Дата рождения</td>
                                        <td>Место работы</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {family_compositions.slice(1).map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        name='relative_type'
                                                        value={editedData.relative_type}
                                                        onChange={(e) => setEditedData({ ...editedData, relative_type: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип родственника</option>
                                                        <option value="супруг/супруга">супруг/супруга</option>
                                                        <option value="сын/дочь">сын/дочь</option>
                                                        <option value="мать/отец">мать/отец</option>
                                                        <option value="брат/сестра">брат/сестра</option>
                                                    </select>
                                                ) : (
                                                    d.relative_type
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='fio' value={editedData.fio} onChange={(e) => setEditedData({ ...editedData, fio: e.target.value })} /> : d.fio}</td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput} name='rel_iin'  value={editedData.rel_iin} onChange={(e) => setEditedData({ ...editedData, rel_iin: e.target.value })} /> : d.rel_iin}</td>
                                            <td>
                                                {editingId === d.id ? (
                                                <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        name='birth_date_family'
                                                        placeholder="Дата рождения"
                                                        value={editedData.birth_date_family || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setEditedData((prevData) => ({
                                                            ...prevData,
                                                            birth_date_family: newDate,
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                d.birth_date_family
                                            )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput} name='job_place' value={editedData.job_place} onChange={(e) => setEditedData({ ...editedData, job_place: e.target.value })} /> : d.job_place}</td>
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

export default NewFamilyComposition;