// import React, { useEffect, useState } from 'react';
// import cl from './Attestations.module.css';
// import { useParams } from 'react-router-dom';

// import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
// import { updateAttestations } from '../../../../api/staff_info/attestations/updateAttestations';

// function Attestations(props) {
//     const { id } = useParams();

//     const [personnelData, setPersonnelData] = useState({
//         "attestations": []
//     });

//     useEffect(() => {
//         fetchData()
//     }, [])

//         const fetchData = async () => {
//             try {
//                 // GET PERSONAL DATA
//                 const response = await getStaffInfo(id) 
//                 setPersonnelData(response.data);
//                 // console.log(response.data)
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         }
//     const [editing, setEditing] = useState(false);
//     const [editedWorker, setEditedWorker] = useState({
//         attestation_result: '',
//         last_attestation_date: '',
//         next_attestation_date: '',
//     });

//     // TABLE DATA

//     // EDIT
//     const [editedData, setEditedData] = useState({
//         attestation_result: '',
//         last_attestation_date: '',
//         next_attestation_date: '',
//     });

//     const [editingId, setEditingId] = useState(null);

//     const handleEdit = async (id, editedTableData) => {
//         if(editingId === id) {
//             try {
//                 const updatedData = {
//                     id: id,
//                     iin: props.id,
//                     attestation_result: editedTableData.attestation_result,
//                     last_attestation_date: editedTableData.last_attestation_date,
//                     next_attestation_date: editedTableData.next_attestation_date
//                 };

//                 await updateAttestations(id, updatedData);

//                 setPersonnelData(prevData => {
//                     return prevData.map(tableData => {
//                         if(tableData.iin === id) {
//                             return {...tableData, ...updatedData}
//                         }
//                         return tableData;
//                     })
//                 });

//                 setEditingId(null);
//                 setEditedData({
//                     id: id,
//                     attestation_result: '',
//                     last_attestation_date: '',
//                     next_attestation_date: '',
//                 });
//                 // console.log('Successfully updated table data')
//             } catch(error) {
//                 console.error('Error updating table data:', error);
//             }
//         } else {
//             setEditingId(id)
//             const dataToEdit = personnelData.attestations.find(tableData => tableData.id === id);
//             if(dataToEdit) {
//                 setEditedData(dataToEdit);
//             }
//         }
//     };

//     const handleSaveEdit = async (id) => {
//         try {
//             const updatedData = {
//                 id: id,
//                 iin: props.id,
//                 attestation_result: editedData.attestation_result,
//                 last_attestation_date: editedData.last_attestation_date,
//                 next_attestation_date: editedData.next_attestation_date
//             };
    
//             const response = await updateAttestations(id, updatedData);
    
//             if (response === 200) {
//                 setPersonnelData((prevData) =>
//                     prevData.map((tableData) => (tableData.id === id ? updatedData : tableData))
//                 );
//                 setEditingId(null); // Завершаем режим редактирования
 
//             } else {
//                 console.log('Error updating table data');
//             }
//             window.location.reload();
//         } catch (error) {
//             console.error('Error updating table data:', error);
//         }
//     };

//     const handleCancelEdit = () => {
//         setEditingId(null);
//         setEditedData({});
//     };

    
    
//     return (
//         <div className={cl.personalWrapper}>
//             <div className={cl.container}>
//                 <div className={cl.totalInfoWrapper}>
//                     <div className={cl.totalInfoContent}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
//                             <p className={cl.workerCapitalName}>Аттестация</p>
//                         </div>
//                     </div>
//                     <div>
//                         {personnelData.attestations.map((d, i) => (
//                             <div key={i} className={cl.workerBlock}>
//                                 <div className={cl.column}>
//                                     <div className={cl.rows}>
//                                         <label className={cl.label}>Номер документа</label>
//                                         {editingId === d.id ? 
//                                             <input 
//                                                 type="text" 
//                                                 className={cl.workerInfo} 
//                                                 name='doc_number' 
//                                                 value={editedData.attestation_result} 
//                                                 onChange={(e) => setEditedData({ ...editedData, attestation_result: e.target.value })} 
//                                             /> : 
//                                             <p className={cl.workerInfoP}>{d.attestation_result}</p>      
//                                         }
//                                     </div>
//                                     <div className={cl.rows}>
//                                         <label className={cl.label}>Дата окончания</label>
//                                         {editingId === d.id ? 
//                                             <div className={cl.datePickerContainer}>
//                                                 <input
//                                                     type="date"
//                                                     className={cl.workerInfo}
//                                                     placeholder='Дата прохождения'
//                                                     value={editedData.last_attestation_date || ''}
//                                                     onChange={(e) => {
//                                                         const newData = e.target.value;
//                                                         setEditedData((prevData) => ({
//                                                             ...prevData,
//                                                             last_attestation_date: newData,
//                                                         }));
//                                                     }}
//                                                 />
                                             
//                                             </div> : 
//                                             <p className={cl.workerInfoP}>{d.last_attestation_date}</p>           
//                                         }
//                                     </div>
//                                 </div>
//                                 <div className={cl.column}>
//                                     <div className={cl.rows}>
//                                         <label className={cl.label}>Дата окончания</label>
//                                         {editingId === d.id ? 
//                                             <div className={cl.datePickerContainer}>
//                                                 <input
//                                                     type="date"
//                                                     className={cl.workerInfo}
//                                                     placeholder='Дата следующей аттестации'
//                                                     value={editedData.next_attestation_date || ''}
//                                                     onChange={(e) => {
//                                                         const newData = e.target.value;
//                                                         setEditedData((prevData) => ({
//                                                             ...prevData,
//                                                             next_attestation_date: newData,
//                                                         }));
//                                                     }}
//                                                 />
                                             
//                                             </div> : 
//                                             <p className={cl.workerInfoP}>{d.next_attestation_date}</p>           
//                                         }
//                                     </div>
//                                 </div>
//                                 <div className={cl.relativesActionBtns} style={{marginBottom: '20px'}}>
//                                     {editingId === d.id ? (
//                                         <>
//                                             <div onClick={() => handleSaveEdit(d.id)}>&#10003;</div>
//                                             <div onClick={handleCancelEdit}>&#x2715;</div>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <div onClick={() => handleEdit(d.id)}>&#9998;</div>
                                            
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
                            
//                         ))}
//                     </div>
           
//                 </div>
            
//             </div>
//         </div>
//     );
// }

// export default Attestations;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Attestations.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { deleteAttestations } from '../../../../api/staff_info/attestations/deleteAttestations';
import { updateAttestations } from '../../../../api/staff_info/attestations/updateAttestations';

function Attestations({ attestationInfo }, props) {
    // const iin = props.iin;
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "attestations": []
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
        attestation_result: '',
        last_attestation_date: '',
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
                attestation_result: inputData.attestation_result,
                last_attestation_date: inputData.last_attestation_date,
            };
          
            const body =  { "attestations": [newData] };

            const response = await axios.post('http://localhost:8000/staff_info/create/', body);

            if (response.status === 201) {
                const updatedPersonnelData = {
                    ...personnelData,
                    attestations: [
                        ...personnelData.attestations,
                        newData
                    ]
                };

                setPersonnelData(updatedPersonnelData);
                setInputData({
                    iin: id,
                    attestation_result: '',
                    last_attestation_date: '',
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
            const response = await deleteAttestations(id)
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
        attestation_result: '',
        last_attestation_date: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    attestation_result: editedTableData.attestation_result,
                    last_attestation_date: editedTableData.last_attestation_date,
                };

                await updateAttestations(id, updatedData);

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
                    attestation_result: '',
                    last_attestation_date: '',
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
                attestation_result: editedData.attestation_result,
                last_attestation_date: editedData.last_attestation_date,
            };
            // console.log(id);
    
            const response = await updateAttestations(id, updatedData);
    
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
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Аттестация</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить аттестацию</Button>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            name='attestation_result'
                                            placeholder="Результат аттестации"
                                            value={inputData.attestation_result}
                                            onChange={(e) => setInputData({ ...inputData, attestation_result: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            name='last_attestation_date'
                                            value={inputData.last_attestation_date || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                last_attestation_date: newDate,
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
                            <td>Результат аттестации</td>
                            <td>Последняя дата аттестации</td>
                            <td>Следующая дата аттестации</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {attestationInfo && attestationInfo.attestations && attestationInfo.attestations.map((d, i) => (
                            <tr key={i}>
                                <td>{editingId === d.id ? 
                                    <input 
                                        type="text" 
                                        className={cl.editInput} 
                                        name='attResult' 
                                        value={editedData.attResult} 
                                        onChange={(e) => setEditedData({ ...editedData, attResult: e.target.value })} 
                                    /> : d.attResult}
                                </td>
                                <td>
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            name='lastAttDate'
                                            value={editedData.lastAttDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setEditedData((prevData) => ({
                                                ...prevData,
                                                lastAttDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                ) : (
                                    d.lastAttDate
                                )}
                                
                                </td>
                                <td>{d.nextAttDateMin}
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

export default Attestations;