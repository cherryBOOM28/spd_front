import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Table.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { deleteSickLeaves } from '../../../../api/staff_info/sick_leaves/deleteSickLeaves';
import { updateSickLeaves } from '../../../../api/staff_info/sick_leaves/updateSickLeaves';

function Table(props) {
    // const iin = props.iin;
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "sick_leaves": []
    }); // Данные из бэка

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET PERSONAL DATA
            const response = await getStaffInfo(id) 
            setPersonnelData(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // TABLE DATA

    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sick_doc_numb: '',
        sick_doc_date: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newData = {
                iin: props.id,
                sick_doc_numb: inputData.sick_doc_numb,
                sick_doc_date: inputData.sick_doc_date,
            };
          
            const body =  { "sick_leaves": [newData] };

            const response = await axios.post('http://localhost:8000/staff_info/create/', body);

            if (response.status === 201) {
                const updatedPersonnelData = {
                    ...personnelData,
                    sick_leaves: [
                        ...personnelData.sick_leaves,
                        newData
                    ]
                };

                setPersonnelData(updatedPersonnelData);
                setInputData({
                    iin: id,
                    sick_doc_numb: '',
                    sick_doc_date: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            console.log(newData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            const response = await deleteSickLeaves(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setPersonnelData(prevData => prevData.filter(tableData => tableData.id !== id));
                console.log("Successfully deleted");
            } else {
                console.log("Error deleting data in table");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        sick_doc_numb: '',
        sick_doc_date: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    sick_doc_numb: editedTableData.sick_doc_numb,
                    sick_doc_date: editedTableData.sick_doc_date,
                };

                await updateSickLeaves(id, updatedData);

                setPersonnelData(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.iin === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    sick_doc_numb: '',
                    sick_doc_date: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = personnelData.sick_leaves.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                sick_doc_numb: editedData.sick_doc_numb,
                sick_doc_date: editedData.sick_doc_date,
            };
            // console.log(id);
    
            const response = await updateSickLeaves(id, updatedData);
    
            if (response === 200) {
                setPersonnelData((prevData) =>
                    prevData.map((tableData) => (tableData.id === id ? updatedData : tableData))
                );
                setEditingId(null); // Завершаем режим редактирования
                // console.log('Successfully updated table data');
            } else {
                console.log('Error updating table data');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };

    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Больничные листы</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить больничный лист</Button>
                {showForm && (
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
                                    <td><Button type="submit">Добавить</Button></td>
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
                            <td>Номер приказа</td>
                            <td>Дата приказа</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {personnelData.sick_leaves.map((d, i) => (
                            <tr key={i}>
                                <td>{editingId === d.id ? <input type="number" className={cl.editInput} name='sick_doc_numb' value={editedData.sick_doc_numb} onChange={(e) => setEditedData({ ...editedData, sick_doc_numb: e.target.value })} /> : d.sick_doc_numb}</td>
                                <td>
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            name='sick_doc_date'
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
    );
}

export default Table;