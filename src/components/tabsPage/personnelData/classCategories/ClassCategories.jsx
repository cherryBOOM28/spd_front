import React, { useEffect, useState } from 'react';
import cl from './ClassCategories.module.css';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { updateClassCategories } from '../../../../api/staff_info/class_categories/updateClassCategories';


function ClassCategories({ classCategoriesInfo, setClassCategoriesInfo }, props) {
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


    // TABLE DATA

    // EDIT
    const [editedData, setEditedData] = useState({
        categoryType: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    categoryType: editedTableData.categoryType,
                };

                await updateClassCategories(id, updatedData);

                setPersonnelData(prevData => {
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
                    categoryType: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = classCategoriesInfo.classCategories.find(tableData => tableData.id === id);
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
                categoryType: editedData.categoryType,
            };
            // console.log(id);
            // console.log(updatedData)
    
            const response = await updateClassCategories(id, updatedData);
    
            if (response.status === 200) {
                setClassCategoriesInfo((prevData) => ({
                    ...prevData,
                    classCategories: prevData.classCategories.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                // console.log("Successfully updated table data");
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

