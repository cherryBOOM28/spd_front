import React, { useState, useEffect } from 'react';
import Button from '../../../UI/button/Button';
import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './Autobiography.module.css';

import { updateAutobiography } from '../../../../api/staff_info/autobiography/updateAutobiography';

function Autobiography({ autobiographyInfo, setAutobiographyInfo }) {
    const { id } = useParams();
    const [personnelData, setPersonnelData] = useState([]); // Данные из бэка
    const [bioId, setBioId] = useState(null)
    const [editingId, setEditingId] = useState(null);

    const firstBioText = autobiographyInfo?.autobiographies?.length > 0 ? autobiographyInfo.autobiographies[0]?.autobiographyText : '';

    useEffect(() => {
        fetchData() 
    }, [])
    
    
    const fetchData = async () => {
        try {
            // GET PERSONAL DATA
            const response = await getStaffInfo(id);
            // console.log(response.data)
            setPersonnelData(response.data.autobiography);
            setBioId(response.data.autobiography.id)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    // EDIT
    const [editedData, setEditedData] = useState({
        autobiographyText: '',
    });

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  autobiographyText: editedTableData.autobiographyText,
                };

                // console.log("updatedData", {updatedData});

                await updateAutobiography(id, updatedData);

                setAutobiographyInfo(prevData => {
                    return prevData.map(tableData => {
                        if (tableData.id === id) {
                            return { ...tableData, ...updatedData };
                        }
                        return tableData;
                    });
                });
                // console.log(updatedData)

                setEditingId(null);
                setEditedData({
                    id: id,
                    autobiographyText: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = autobiographyInfo.autobiographies.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
            // console.log(personnelData)
        }
    };

    // СОХРАНИТЬ ИЗМЕНЕНИЯ
    const handleSaveEdit = async (id) => {
    
            try {
                const updatedData = {
                  id: id,
                  personId: editedData.id,
                  autobiographyText: editedData.autobiographyText,
                };

                // console.log("updatedData", {updatedData});

                const response = await updateAutobiography(id, updatedData);

                if (response.status === 200) {
                    setAutobiographyInfo((prevData) => ({
                        ...prevData,
                        autobiographies: prevData.autobiographies.map((tableData) =>
                            tableData.id === id ? updatedData : tableData
                        ),
                    }));
                    setEditingId(null); // Завершаем режим редактирования
                    console.log("Successfully updated table data");
                } else {
                    console.error("Error updating table data");
                }
                // console.log(updatedData)
                // console.log('Successfully updated table data')
            } catch(error) {
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
                        <div className={cl.wrapper} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Автобиография</p>
                            <div className={cl.relativesActionBtns} style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                {!editingId && (
                                    <div className={cl.actionBtn} onClick={() => handleEdit(id)}>
                                        &#9998;
                                    </div>
                                )}

                                {editingId && (
                                    <>
                                        <div onClick={() => handleSaveEdit(id)} className={cl.actionBtn}>
                                            &#10003; 
                                        </div>
                                        <div className={cl.actionBtn} onClick={handleCancelEdit}>
                                            &#x2715; 
                                        </div>
                                        
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className={cl.workerBlock}>
                        {editingId ? (
                            
                            <input
                                type="text"
                                name='autobiographyText'
                                className={cl.workerInfo}
                                value={editedData.autobiographyText}
                                onChange={(e) => setEditedData({ ...editedData, autobiographyText: e.target.value })}
                            />
                           
                        ) : (
                            <p className={cl.workerInfoText}>
                                {firstBioText}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Autobiography;