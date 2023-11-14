import React, { useState } from 'react';
import cl from './NewSickLeaves.module.css';
import Button from '../../../../components/UI/button/Button';
import { useForm } from '../../formProvider/FormProvider';


function NewSickLeaves(props) {

    const {sick_leaves, setSick_leaves} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sick_doc_numb: '',
        sick_doc_date: '',
    });

    const [editedData, setEditedData] = useState({
        sick_doc_numb: '',
        sick_doc_date: '',
    });


    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // Генерируем уникальный id

            if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newData = {
                sick_doc_numb: inputData.sick_doc_numb,
                sick_doc_date: inputData.sick_doc_date,
            };

            setSick_leaves((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

            // console.log(
            //     { 'data': [newData] }
            // )

        } catch (error) {
            console.error('Error:', error);
        }
    };


    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null); 

    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Больничные листы</p>
            </div>
        </div>
        <div>
            <div>
                <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер приказа"
                                            value={inputData.sick_doc_numb}
                                            onChange={(e) => setInputData({ ...inputData, sick_doc_numb: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            value={inputData.sick_doc_date || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                sick_doc_date: newDate,
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
                                <td>Номер приказа</td>
                                <td>Дата приказа</td>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {sick_leaves.slice(1).map((d, i) => (
                                <tr key={i}>
                                    <td>{editingId === d.id ? <input type="number" className={cl.editInput} value={editedData.sick_doc_numb} onChange={(e) => setEditedData({ ...editedData, sick_doc_numb: e.target.value })} /> : d.sick_doc_numb}</td>
                                    <td>
                                    {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Дата приказа"
                                                value={editedData.sick_doc_date || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setEditedData((prevData) => ({
                                                    ...prevData,
                                                    sick_doc_date: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        d.sick_doc_date
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

export default NewSickLeaves;