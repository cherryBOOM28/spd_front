import React, { useEffect, useState } from 'react';
import cl from './ClassCategories.module.css';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { updateClassCategories } from '../../../../api/staff_info/class_categories/updateClassCategories';


function ClassCategories({ classCategoriesInfo }, props) {
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState({
        "class_categories": []
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
        category_type: '',
    });

    // TABLE DATA

    // EDIT
    const [editedData, setEditedData] = useState({
        category_type: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    category_type: editedTableData.category_type,
                };

                await updateClassCategories(id, updatedData);

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
                    category_type: '',
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
                category_type: editedData.category_type,
            };
            // console.log(id);
            // console.log(updatedData)
    
            const response = await updateClassCategories(id, updatedData);
    
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Классные категории </p>
                            
                        </div>
                    </div>
                    <div>
                        {classCategoriesInfo && classCategoriesInfo.classCategories && classCategoriesInfo.classCategories.map((d, i) => (
                            <div key={i} className={cl.workerBlock}>
                                <div className={cl.column}>
                                    <div className={cl.rows}>
                                        <label className={cl.label}>Классные категория</label>
                                        {editingId === d.id ? 
                                           <select
                                           className={cl.selectRelative_type}
                                            value={editedData.categoryType}
                                            onChange={(e) => setEditedData({ ...editedData, categoryType: e.target.value })}
                                            >
                                                <option value="">Выберите категорию</option>
                                                <option value="Спец 2 категории">Специалист 2 категории</option>
                                                <option value="Спец 1 категории">Специалист 1 категории</option>
                                                <option value="Наставник">Наставник</option>
                                            </select>  
                                            : 
                                            <p className={cl.workerInfoP}>{d.categoryType}</p>      
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

export default ClassCategories;

