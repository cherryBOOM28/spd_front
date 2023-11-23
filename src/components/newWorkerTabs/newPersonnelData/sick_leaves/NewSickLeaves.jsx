import React, { useState } from 'react';
import cl from './NewSickLeaves.module.css';
import Button from '../../../../components/UI/button/Button';
import { useForm } from '../../formProvider/FormProvider';


function NewSickLeaves(props) {

    const {sickLeavesInfo, setSickLeavesInfo} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sickDocNumber: '',
        sickDocDate: '',
    });

    const [editedData, setEditedData] = useState({
        sickDocNumber: '',
        sickDocDate: '',
    });


    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                sickDocNumber: inputData.sickDocNumber,
                sickDocDate: inputData.sickDocDate,
            };

            setSickLeavesInfo((prevArray) => {
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
                                            name='sickDocNumber'
                                            value={inputData.sickDocNumber}
                                            onChange={(e) => setInputData({ ...inputData, sickDocNumber: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            name='sickDocDate'
                                            placeholder="Дата приказа"
                                            value={inputData.sickDocDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                sickDocDate: newDate,
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
                            {sickLeavesInfo.slice(1).map((d, i) => (
                                <tr key={i}>
                                    <td>{editingId === d.id ? <input type="number" className={cl.editInput} value={editedData.sickDocNumber} onChange={(e) => setEditedData({ ...editedData, sickDocNumber: e.target.value })} /> : d.sickDocNumber}</td>
                                    <td>
                                    {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                name='sickDocDate'
                                                placeholder="Дата приказа"
                                                value={editedData.sickDocDate || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setEditedData((prevData) => ({
                                                    ...prevData,
                                                    sickDocDate: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        d.sickDocDate
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