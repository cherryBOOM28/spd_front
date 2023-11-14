import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Awards.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { deleteAward } from '../../../../api/staff_info/awards/deleteAward';
import { updateAward } from '../../../../api/staff_info/awards/updateAward';

function Awards(props) {
    // const iin = props.iin;
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "awards": []
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
        awards_type: '',
        awards_doc_numb: '',
        awards_date: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            if (!inputData.awards_type || !inputData.awards_doc_numb || !inputData.awards_date) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newData = {
                iin: props.id,
                awards_type: inputData.awards_type,
                awards_doc_numb: inputData.awards_doc_numb,
                awards_date: inputData.awards_date,
            };
          
            const body =  { "awards": [newData] };
            console.log(body)

            const response = await axios.post('http://localhost:8000/staff_info/create/', body);

            if (response.status === 201) {
                const updatedPersonnelData = {
                    ...personnelData,
                    awards: [
                        ...personnelData.awards,
                        newData
                    ]
                };

                setPersonnelData(updatedPersonnelData);
                setInputData({
                    iin: id,
                    awards_type: '',
                    awards_doc_numb: '',
                    awards_date: '',
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
            const response = await deleteAward(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setPersonnelData(prevData => prevData.filter(tableData => tableData.id !== id));
                // console.log("Successfully deleted");
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
        awards_type: '',
        awards_doc_numb: '',
        awards_date: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    awards_type: editedTableData.awards_type,
                    awards_doc_numb: editedTableData.awards_doc_numb,
                    awards_date: editedTableData.awards_date,
                };

                await updateAward(id, updatedData);

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
                    awards_type: '',
                    awards_doc_numb: '',
                    awards_date: '',
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
                awards_type: editedData.awards_type,
                awards_doc_numb: editedData.awards_doc_numb,
                awards_date: editedData.awards_date,
            };
            // console.log(id);
    
            const response = await updateAward(id, updatedData);
    
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
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Награды</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить награду</Button>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <select
                                            className={cl.formInput}
                                            value={inputData.awards_type}
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
                            <td>Тип награды</td>
                            <td>Номер приказа</td>
                            <td>Дата приказа</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {personnelData.awards.map((d, i) => (
                            <tr key={i}>
                                <td>  
                                    {editingId === d.id ? (
                                        <select
                                            className={cl.selectRelative_type}
                                            value={editedData.awards_type}
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
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='awards_doc_numb' value={editedData.awards_doc_numb} onChange={(e) => setEditedData({ ...editedData, awards_doc_numb: e.target.value })} /> : d.awards_doc_numb}</td>
                                <td>
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            value={editedData.awards_date || ''}
                                            onChange={(e) =>
                                                setEditedData((prevWorker) => ({
                                                ...prevWorker,
                                                awards_date: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    d.awards_date
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

export default Awards;