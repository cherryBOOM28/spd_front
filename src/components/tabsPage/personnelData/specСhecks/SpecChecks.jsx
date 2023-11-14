import React, { useEffect, useState } from 'react';
import cl from './SpecChecks.module.css';
import { useParams } from 'react-router-dom';
import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { updateSpecCheck } from '../../../../api/staff_info/spec_checks/updateSpecCheck';


function SpecChecks(props) {
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "spec_checks": []
    });

    useEffect(() => {
        fetchData()
    }, [])

        const fetchData = async () => {
            try {
                // GET PERSONAL DATA
                const response = await getStaffInfo(id) 
                setPersonnelData(response.data);
                // console.log(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    const [editing, setEditing] = useState(false);
    const [editedWorker, setEditedWorker] = useState({
        doc_number: '',
        doc_date: '',
    });

    // TABLE DATA

    // EDIT
    const [editedData, setEditedData] = useState({
        doc_number: '',
        doc_date: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    doc_number: editedTableData.doc_number,
                    doc_date: editedTableData.doc_date,
                };

                await updateSpecCheck(id, updatedData);

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
                    doc_number: '',
                    doc_date: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = personnelData.spec_checks.find(tableData => tableData.id === id);
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
                doc_number: editedData.doc_number,
                doc_date: editedData.doc_date,
            };
            // console.log(id);
            // console.log(updatedData)
    
            const response = await updateSpecCheck(id, updatedData);
    
            if (response === 200) {
                setPersonnelData((prevData) =>
                    prevData.map((tableData) => (tableData.id === id ? updatedData : tableData))
                );
                setEditingId(null); // Завершаем режим редактирования
 
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
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName}>Спец проверка</p>
                            
                        </div>
                    </div>
                    <div>
                        {personnelData.spec_checks.map((d, i) => (
                            <div key={i} className={cl.workerBlock}>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Номер документа</label>
                                        {editingId === d.id ? 
                                            <input 
                                                type="number" 
                                                className={cl.workerInfo} 
                                                name='doc_number' 
                                                value={editedData.doc_number} 
                                                onChange={(e) => setEditedData({ ...editedData, doc_number: e.target.value })} 
                                            /> : 
                                            <p className={cl.workerInfoP}>{d.doc_number}</p>      
                                        }
                                    </div>
                                </div>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Дата окончания</label>
                                        {editingId === d.id ? 
                                            <div className={cl.datePickerContainer}>
                                            <input
                                                    type="date"
                                                    className={cl.workerInfo}
                                                    placeholder='Дата окончания'
                                                    value={editedData.doc_date || ''}
                                                    onChange={(e) => {
                                                        const newData = e.target.value;
                                                        setEditedData((prevData) => ({
                                                            ...prevData,
                                                            doc_date: newData,
                                                        }));
                                                    }}
                                                />
                                                
                                            </div> : 
                                            <p className={cl.workerInfoP}>{d.doc_date}</p>           
                                        }
                                    </div>
                                </div>
                                <div className={cl.relativesActionBtns} style={{marginTop: '22px'}}>
                                    {editingId === d.id ? (
                                        <>
                                            <div onClick={() => handleSaveEdit(d.id)}>&#10003;</div>
                                            <div onClick={handleCancelEdit}>&#x2715;</div>
                                        </>
                                    ) : (
                                        <>
                                            <div onClick={() => handleEdit(d.id)}>&#9998;</div>
                                            
                                        </>
                                    )}
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default SpecChecks;

