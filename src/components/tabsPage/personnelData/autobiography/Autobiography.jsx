import React, { useState, useEffect } from 'react';
import Button from '../../../UI/button/Button';
import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './Autobiography.module.css';

function Autobiography({ autobiographyInfo }) {
    const { id } = useParams();

    const [personnelData, setPersonnelData] = useState([]); // Данные из бэка
    const [bioId, setBioId] = useState(null)

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

      // СОХРАНИТЬ ИЗМЕНЕНИЯ
    const handleSaveClick = async () => {
        try {
            const updatedData = {
                autobiography: {
                    id: bioId,
                    autobiography: editedWorker.autobiography, 
                },
            };
    
            //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.patch(`http://localhost:8000/staff_info/update/`, updatedData, bioId);
            // console.log(response.data)
    
            if (response.status === 200) {
                setEditing(false);
                window.location.reload();
            } else {
                console.error('Error saving data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  
    const [editing, setEditing] = useState(false);
    const [editedWorker, setEditedWorker] = useState({ 
        autobiography: '',
    });
  
    // ИЗМЕНИТЬ ПОЛЯ
    const handleEditClick = () => {
      setEditing(true);
      // Initialize editedWorker with the worker's current data
        setEditedWorker({
            autobiography: personnelData.autobiography,
      });
    };
  
    // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
    };


    const handleCancelEdit = () => {
        setEditing(null);
        // setEditedData({});
    };

    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div className={cl.wrapper} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Автобиография</p>
                            <div className={cl.relativesActionBtns} style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                {!editing && (
                                    <div className={cl.actionBtn} onClick={handleEditClick}>
                                        &#9998;
                                    </div>
                                )}

                                {editing && (
                                    <>
                                        <div onClick={handleSaveClick} className={cl.actionBtn}>
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
                        {editing ? (
                            
                            <input
                                type="text"
                                name='autobiography'
                                className={cl.workerInfo}
                                value={editedWorker.autobiography}
                                onChange={handleInputChange}
                            />
                           
                        ) : (
                            <p className={cl.workerInfoText}></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Autobiography;