// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import cl from './MilitaryRank.module.css';

// import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
// import { updateMilitaryRank } from '../../../../api/staff_info/military_rank/updateMilitaryRank';


// function MilitaryRank(props) {
//     const { id } = useParams();

//     const [personnelData, setPersonnelData] = useState({
//         "military_rank": []
//     }); // Данные из бэка

//     // eslint-disable-next-line
//     useEffect(() => {
//         fetchData()
//     }, [])

//     const fetchData = async () => {
//         try {
//             // GET Academic degree info
//             const newDataResponse = await getStaffInfo(id);
//             // console.log(newDataResponse.data)
//             setPersonnelData(newDataResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }

//     // ДОБАВЛЕНИЕ 
//      // eslint-disable-next-line
//     const [inputData, setInputData] = useState({
//         military_rank: '',
//         received_date: '',
//         type_of_receipt: '',
//         position: ''
//     });

//     // EDIT
//     const [editedData, setEditedData] = useState({
//         military_rank: '',
//         received_date: '',
//         type_of_receipt: '',
//         position: ''
//     });

//     const [editingId, setEditingId] = useState(null);

//     const handleEdit = async (id, editedNewData) => {
//         if(editingId === id) {
//             try {
//                 const updatedData = {
//                     id: id,
//                     iin: props.id,
//                     military_rank: editedNewData.military_rank,
//                     received_date: editedNewData.received_date,
//                     type_of_receipt: editedNewData.type_of_receipt,
//                     position: editedNewData.position
//                 };

//                 await updateMilitaryRank(id, updatedData);
//                 // console.log(updatedData)

//                 setPersonnelData(prevData => {
//                     return prevData.map(data => {
//                         if(data.iin === id) {
//                             return {...data, ...updatedData}
//                         }
//                         return data;
//                     })
//                 });

//                 setEditingId(null);
//                 setEditedData({
//                     id: id,
//                     military_rank: '',
//                     received_date: '',
//                     type_of_receipt: '',
//                     position: ''
//                 });
//                 // console.log('Successfully updated academic degree')
//             } catch(error) {
//                 console.error('Error updating academic degree:', error);
//             }
//         } else {
//             setEditingId(id);
//             const dataToEdit = personnelData.military_rank.find(data => data.id === id);
//             if(dataToEdit) {
//                 setEditedData(dataToEdit);
//             };
//         }
//     };

//     const handleSaveEdit = async (id) => {
//         try {
//             const updatedData = {
//                 id: id,
//                 iin: props.id,
//                 military_rank: editedData.military_rank,
//                 received_date: editedData.received_date,
//                 type_of_receipt: editedData.type_of_receipt,
//                 position: editedData.position
//             };
//             // console.log(id);
    
//             const response = await updateMilitaryRank(id, updatedData);
    
//             if (response === 200) {
//                 setPersonnelData((prevData) =>
//                 prevData.map((data) => (data.id === id ? updatedData : data))
//                 );
//                 setEditingId(null); // Завершаем режим редактирования
//                 // console.log('Successfully updated academic degree');
//             } else {
//                 console.log('Error updating academic degree');
//             }
//             window.location.reload();
//             // console.log(updatedData)
//         } catch (error) {
//             console.error('Error updating academic degree:', error);
//         }
//     };

//     const handleCancelEdit = () => {
//         setEditingId(null);
//         setEditedData({});
//     };
    

//     return (
//     <div className={cl.personalWrapper}>
//         <div className={cl.container}>
//             <div className={cl.totalInfoWrapper}>
//                 <div className={cl.totalInfoContent}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
//                         <p className={cl.workerCapitalName}>Звания</p>
//                     </div>
//                 </div>
//                 <div>
//                     {personnelData.military_rank.map((d, i) => (
//                         <div key={i} className={cl.workerBlock}>
//                             <div className={cl.column}>
                            
//                                 <div className={cl.rows}>
//                                     <label className={cl.label}>Звание</label>
//                                     {editingId === d.id ? 
//                                         <select
//                                         className={cl.workerInfoSelect}
//                                         value={editedData.military_rank} 
//                                         onChange={(e) => setEditedData({ ...editedData, military_rank: e.target.value })}
//                                          >
//                                             <option value="">Выберите звание</option>
//                                             <option value="Рядовой">Рядовой</option>
//                                             <option value="Ефрейтор">Ефрейтор</option>
//                                             <option value="Младший сержант">Младший сержант	</option>
//                                             <option value="Сержант">Сержант</option>
//                                             <option value="Старший сержант">Старший сержант	</option>
//                                             <option value="Сержант третьего класса">Сержант третьего класса</option>
//                                             <option value="Сержант второго класса">Сержант второго класса</option>
//                                             <option value="Сержант первого класса">Сержант первого класса</option>
//                                             <option value="Штаб-сержант">Штаб-сержант</option>
//                                             <option value="Мастер-сержант">Мастер-сержант</option>
//                                             <option value="Лейтенант">Лейтенант</option>
//                                             <option value="Старший лейтенант">Старший лейтенант	</option>
//                                             <option value="Капитан">Капитан</option>
//                                             <option value="Майор">Майор</option>
//                                             <option value="Подполковник">Подполковник</option>
//                                             <option value="Полковник">Полковник</option>
//                                             <option value="Генерал-майор">Генерал-майор</option>
//                                             <option value="Генерал-лейтенант">Генерал-лейтенант	</option>
//                                             <option value="Генерал-полковник">Генерал-полковник</option>
//                                             <option value="Генерал армии">Генерал армии</option>  
//                                     </select> : 
//                                         <p className={cl.workerInfoP}>{d.military_rank}</p>  
//                                     }
//                                 </div>
//                                 <div className={cl.rows}>
//                                     <label className={cl.label}>Дата получения</label>
//                                     {editingId === d.id ?  (
//                                         <div className={cl.datePickerContainer}>
//                                             <input
//                                                 type="date"
//                                                 className={cl.workerInfo}
//                                                 value={editedData.received_date || ''}
//                                                 onChange={(e) => {
//                                                     const newData = e.target.value;
//                                                     setEditedData((prevData) => ({
//                                                         ...prevData,
//                                                         received_date: newData,
//                                                     }));
//                                                 }}
//                                             />
//                                         </div>
//                                     ) : (
//                                         <p className={cl.workerInfo}>{d.received_date}</p>
//                                     )}
//                                 </div>
                   
//                             </div>
//                             <div className={cl.column}>
//                                 <div className={cl.rows}>
//                                     <label className={cl.label}>Должность</label>
//                                     {editingId === d.id ? (
//                                         <input
//                                             className={cl.workerInfo}
//                                             type="text"
//                                             name="position"
//                                             value={editedData.position} 
//                                             onChange={(e) => setEditedData({ ...editedData, position: e.target.value })}
//                                         />
//                                     ) : (

//                                         <p className={cl.workerInfo}>{d.position}</p>
//                                     )}
//                                 </div>
//                                 <div className={cl.rows}>
//                                     <label className={cl.label}>Вид поручения</label>
//                                     {editingId === d.id ? (
//                                         <input
//                                             className={cl.workerInfo}
//                                             type="text"
//                                             name="type_of_receipt"
//                                             value={editedData.type_of_receipt} 
//                                             onChange={(e) => setEditedData({ ...editedData, type_of_receipt: e.target.value })}
//                                         />
//                                     ) : (

//                                         <p className={cl.workerInfo}>{d.type_of_receipt}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className={cl.relativesActionBtns} style={{marginBottom: '20px'}}>
//                                 {editingId === d.id ? (
//                                     <>
//                                         <div onClick={() => handleSaveEdit(d.id)}>&#10003;</div>
//                                         <div onClick={handleCancelEdit}>&#x2715;</div>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <div onClick={() => handleEdit(d.id)}>&#9998;</div>
                                        
//                                     </>
//                                 )}
//                             </div>
//                         </div>
                        
//                     ))}
//                 </div>
       
//             </div>
        
//         </div>
//     </div>
//     );
// }

// export default MilitaryRank;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './MilitaryRank.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { updateStaffInfo } from '../../../../api/staff_info/updateStaffInfo'; 
import { deleteMilitaryRank } from '../../../../api/staff_info/military_rank/deleteMilitaryRank';
import { updateMilitaryRank } from '../../../../api/staff_info/military_rank/updateMilitaryRank';

function MilitaryRank(props) {
    // const iin = props.iin;
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "military_rank": []
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
        military_rank: '',
        received_date: '',
        type_of_receipt: '',
        position: '',

    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                iin: props.id,
                military_rank: inputData.military_rank,
                received_date: inputData.received_date,
                type_of_receipt: inputData.type_of_receipt,
                position: inputData.position
            };
          
            const body =  { "military_rank": [newData] };
            console.log("body", body);

            const response = await axios.post('http://localhost:8000/staff_info/create/', body);
            

            if (response.status === 201) {
                const updatedPersonnelData = {
                    ...personnelData,
                    military_rank: [
                        ...personnelData.military_rank,
                        newData
                    ]
                };

                setPersonnelData(updatedPersonnelData);
                setInputData({
                    iin: id,
                    military_rank: '',
                    received_date: '',
                    type_of_receipt: '',
                    position: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            const response = await deleteMilitaryRank(id)
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
        military_rank: '',
        received_date: '',
        type_of_receipt: '',
        position: '',

    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    military_rank: editedTableData.military_rank,
                    received_date: editedTableData.received_date,
                    type_of_receipt: editedTableData.type_of_receipt,
                    position: editedTableData.position
                };

                await updateMilitaryRank(id, updatedData);

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
                    military_rank: '',
                    received_date: '',
                    type_of_receipt: '',
                    position: '',
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
                military_rank: editedData.military_rank,
                received_date: editedData.received_date,
                type_of_receipt: editedData.type_of_receipt,
                position: editedData.position
       
            };
            // console.log(id);
    
            const response = await updateMilitaryRank(id, updatedData);
    
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
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Звания</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить звание</Button>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <select
                                            className={cl.workerInfoSelect}
                                            value={inputData.military_rank} 
                                            onChange={(e) => setInputData({ ...inputData, military_rank: e.target.value })}
                                         >
                                            <option value="">Выберите звание</option>
                                            <option value="Рядовой">Рядовой</option>
                                            <option value="Ефрейтор">Ефрейтор</option>
                                            <option value="Младший сержант">Младший сержант	</option>
                                            <option value="Сержант">Сержант</option>
                                            <option value="Старший сержант">Старший сержант	</option>
                                            <option value="Сержант третьего класса">Сержант третьего класса</option>
                                            <option value="Сержант второго класса">Сержант второго класса</option>
                                            <option value="Сержант первого класса">Сержант первого класса</option>
                                            <option value="Штаб-сержант">Штаб-сержант</option>
                                            <option value="Мастер-сержант">Мастер-сержант</option>
                                            <option value="Лейтенант">Лейтенант</option>
                                            <option value="Старший лейтенант">Старший лейтенант	</option>
                                            <option value="Капитан">Капитан</option>
                                            <option value="Майор">Майор</option>
                                            <option value="Подполковник">Подполковник</option>
                                            <option value="Полковник">Полковник</option>
                                            <option value="Генерал-майор">Генерал-майор</option>
                                            <option value="Генерал-лейтенант">Генерал-лейтенант	</option>
                                            <option value="Генерал-полковник">Генерал-полковник</option>
                                            <option value="Генерал армии">Генерал армии</option>  
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            value={inputData.received_date || ''}
                                            onChange={(e) => {
                                                const newData = e.target.value;
                                                setInputData((prevData) => ({
                                                    ...prevData,
                                                    received_date: newData,
                                                }));
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="type_of_receipt"
                                            value={inputData.type_of_receipt}
                                            onChange={(e) => setInputData({ ...inputData, type_of_receipt: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="position"
                                            value={inputData.position}
                                            onChange={(e) => setInputData({ ...inputData, position: e.target.value })}
                                        />
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
                            <td>Звание</td>
                            <td>Дата получения звания</td>
                            <td>Вид поручения</td>
                            <td>Должность</td>
                            <td>Следующая дата получения</td>
                            <td>Следующее звание</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {personnelData.military_rank.map((d, i) => (
                            <tr key={i}>
                                <td>
                                {editingId === d.id ? (
                                        <select
                                            className={cl.selectRelative_type}
                                            value={editedData.military_rank}
                                            onChange={(e) => setEditedData({ ...editedData, military_rank: e.target.value })}
                                        >
                                            <option value="">Выберите звание</option>
                                            <option value="Рядовой">Рядовой</option>
                                            <option value="Ефрейтор">Ефрейтор</option>
                                            <option value="Младший сержант">Младший сержант	</option>
                                            <option value="Сержант">Сержант</option>
                                            <option value="Старший сержант">Старший сержант	</option>
                                            <option value="Сержант третьего класса">Сержант третьего класса</option>
                                            <option value="Сержант второго класса">Сержант второго класса</option>
                                            <option value="Сержант первого класса">Сержант первого класса</option>
                                            <option value="Штаб-сержант">Штаб-сержант</option>
                                            <option value="Мастер-сержант">Мастер-сержант</option>
                                            <option value="Лейтенант">Лейтенант</option>
                                            <option value="Старший лейтенант">Старший лейтенант	</option>
                                            <option value="Капитан">Капитан</option>
                                            <option value="Майор">Майор</option>
                                            <option value="Подполковник">Подполковник</option>
                                            <option value="Полковник">Полковник</option>
                                            <option value="Генерал-майор">Генерал-майор</option>
                                            <option value="Генерал-лейтенант">Генерал-лейтенант	</option>
                                            <option value="Генерал-полковник">Генерал-полковник</option>
                                            <option value="Генерал армии">Генерал армии</option>  
                                        </select>
                                    ) : (
                                        d.military_rank
                                )}
                                </td>
                                <td>
                                    {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Дата приказа"
                                                name='received_date'
                                                value={editedData.received_date || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setEditedData((prevData) => ({
                                                        ...prevData,
                                                        received_date: newDate,
                                                    }));
                                                }}
                                                />
                                        </div>
                                    ) : (
                                        d.received_date
                                        )}
                                </td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='type_of_receipt' value={editedData.type_of_receipt} onChange={(e) => setEditedData({ ...editedData, type_of_receipt: e.target.value })} /> : d.type_of_receipt}</td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='position' value={editedData.position} onChange={(e) => setEditedData({ ...editedData, position: e.target.value })} /> : d.position}</td>
                                <td>
                                    {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Дата приказа"
                                                name='promotion_date'
                                                value={editedData.promotion_date || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setEditedData((prevData) => ({
                                                        ...prevData,
                                                        promotion_date: newDate,
                                                    }));
                                                }}
                                                />
                                        </div>
                                    ) : (
                                        d.promotion_date
                                        )}
                                </td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='next_military_rank' value={editedData.next_military_rank} onChange={(e) => setEditedData({ ...editedData, next_military_rank: e.target.value })} /> : d.next_military_rank}</td>

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

export default MilitaryRank;