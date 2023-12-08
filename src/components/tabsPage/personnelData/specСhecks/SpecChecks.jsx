import React, { useState } from 'react';
import cl from './SpecChecks.module.css';
import { useParams } from 'react-router-dom';
import { updateSpecCheck } from '../../../../api/staff_info/spec_checks/updateSpecCheck';


function SpecChecks({ specCheckInfo, setSpecCheckInfo }) {
    const { id } = useParams();


    // EDIT
    const [editedData, setEditedData] = useState({
        docNumber: '',
        docDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    docNumber: editedTableData.docNumber,
                    docDate: editedTableData.docDate,
                };

                await updateSpecCheck(id, updatedData);

                setSpecCheckInfo(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.id === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    docNumber: '',
                    docDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = specCheckInfo.specChecks.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                docNumber: editedData.docNumber,
                docDate: editedData.docDate,
            };
            // console.log(id);
            // console.log(updatedData)
    
            const response = await updateSpecCheck(id, updatedData);
    
            if (response.status === 200) {
                setSpecCheckInfo((prevData) => ({
                    ...prevData,
                    specChecks: prevData.specChecks.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
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
                        {specCheckInfo && specCheckInfo.specChecks && specCheckInfo.specChecks.map((d, i) => (
                            <div key={i} className={cl.workerBlock}>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Номер документа</label>
                                        {editingId === d.id ? 
                                            <input 
                                                type="number" 
                                                className={cl.workerInfo} 
                                                name='docNumber' 
                                                value={editedData.docNumber} 
                                                onChange={(e) => setEditedData({ ...editedData, docNumber: e.target.value })} 
                                            /> : 
                                            <p className={cl.workerInfoP}>{d.docNumber}</p>      
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
                                                    value={editedData.docDate || ''}
                                                    onChange={(e) => {
                                                        const newData = e.target.value;
                                                        setEditedData((prevData) => ({
                                                            ...prevData,
                                                            docDate: newData,
                                                        }));
                                                    }}
                                                />
                                                
                                            </div> : 
                                            <p className={cl.workerInfoP}>{d.docDate}</p>           
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

