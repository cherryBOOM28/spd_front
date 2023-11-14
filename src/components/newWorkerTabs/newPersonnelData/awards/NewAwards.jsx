import React, { useState } from 'react';
import cl from './NewAwards.module.css';
import Button from '../../../../components/UI/button/Button';

import { useForm } from '../../formProvider/FormProvider';


function NewAwards(props) {
    const {awards, setAwards} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        awards_type: '',
        awards_doc_numb: '',
        awards_date: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            if (!inputData.awards_type || !inputData.awards_doc_numb) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newData = {
                awards_type: inputData.awards_type,
                awards_doc_numb: inputData.awards_doc_numb,
                awards_date: inputData.awards_date,
            };

            setAwards((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

      
            setInputData({
                awards_type: '',
                awards_doc_numb: '',
                awards_date: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        awards_type: '',
        awards_doc_numb: '',
        awards_date: '',
    });

    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null); 




    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Награды</p>
            </div>
        </div>
        <div>
            <div>
                <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                    <table className={cl.customTable}>
                        <tbody >
                            <tr>
                                <td>
                                    <select
                                        className={cl.formInput}
                                        value={inputData.awards_type}
                                        name='awards_type'
                                        onChange={(e) => setInputData({ ...inputData, awards_type: e.target.value })}
                                    >
                                        <option value="">Выберите тип награды</option>
                                        <option value="награда1">награда</option>
                                        <option value="награда2">награда2</option>
                                        <option value="награда3">награда3</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={cl.formInput}
                                        placeholder="Номер приказа"
                                        name='awards_doc_numb'
                                        value={inputData.awards_doc_numb}
                                        onChange={(e) => setInputData({ ...inputData, awards_doc_numb: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <div className={cl.datePickerContainer}>

                                    <input
                                        type="date"
                                        className={cl.formInput}
                                        placeholder="Дата приказа"
                                        name='awards_date'
                                        value={inputData.awards_date || ''}
                                        onChange={(e) => {
                                            const newDate = e.target.value;
                                            setInputData((prevWorker) => ({
                                            ...prevWorker,
                                            awards_date: newDate,
                                            }));
                                        }}
                                    />
                                    </div>
                                </td>
                                <td><Button type="submit" onClick={handleShowForm}>Добавить</Button></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </form>
                {showForm && (
                        <div>
                        <table className={cl.customTable} style={{ marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <td>Тип награды</td>
                                    <td>Номер приказа</td>
                                    <td>Дата приказа</td>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {awards.slice(1).map((d, i) => (
                                    <tr key={i}>
                                        <td>  
                                            {editingId === d.id ? (
                                                <select
                                                    className={cl.selectRelative_type}
                                                    value={editedData.awards_type}
                                                    name='awards_type'
                                                    onChange={(e) => setEditedData({ ...editedData, awards_type: e.target.value })}
                                                >
                                                    <option value="">Выберите тип награды</option>
                                                    <option value="награда1">награда</option>
                                                    <option value="награда2">награда2</option>
                                                    <option value="награда3">награда3</option>
                                                </select>
                                            ) : (
                                                d.awards_type
                                            )}
                                        </td>
                                        <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.awards_doc_numb} onChange={(e) => setEditedData({ ...editedData, awards_doc_numb: e.target.value })} /> : d.awards_doc_numb}</td>
                                        <td>
                                        {editingId === d.id ? (
                                            <div className={cl.datePickerContainer}>
                                                <input
                                                    type="date"
                                                    className={cl.formInput}
                                                    name='awards_date'
                                                    value={editedData.awards_date || ''}
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
                                            d.awards_date
                                        )}
                                        </td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
          
        </div>
    </div>
    );
}

export default NewAwards;