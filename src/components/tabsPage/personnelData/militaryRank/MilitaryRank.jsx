import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './MilitaryRank.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';

import { getStaffInfo } from '../../../../api/staff_info/getStaffInfo';
import { updateStaffInfo } from '../../../../api/staff_info/updateStaffInfo'; 
import { deleteMilitaryRank } from '../../../../api/staff_info/military_rank/deleteMilitaryRank';
import { updateMilitaryRank } from '../../../../api/staff_info/military_rank/updateMilitaryRank';

function MilitaryRank({ rankInfo, militaryRank }, props) {
    // const iin = props.iin;
    const { id } = useParams();

    const [editing, setEditing] = useState(false);
    const [editedWorker, setEditedWorker] = useState({
        rankTitle: '',
        receivedType: '',
        receivedDate: '',
        nextPromotionDateInDays: '',
    });
  
    useEffect(() => {
      // console.log(person.firstName);
      if (militaryRank && rankInfo && editedWorker) {
        // Initialize editedWorker with the worker's current data
        setEditedWorker({
          item: id,
          rankTitle: militaryRank.rankTitle,
          nextPromotionDateInDays: rankInfo.nextPromotionDateInDays,
          receivedType: rankInfo.receivedType,
          receivedDate: rankInfo.receivedDate,
        });
      }
    }, []);  
    
    // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
    };

    const handleCancelClick = () => {
        // Отменяем редактирование
        setEditing(false);
    };

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
        <div className={cl.workerBlock}>
                  <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Поручение</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='receivedType'
                              className={cl.workerInfo}
                              value={editedWorker.receivedType}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{rankInfo.receivedType}</p>
                        )}
                    </div>
                    
                    <div className={cl.rows}>
                        <label className={cl.label}>Звание</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                           <select
                            name='rankTitle'
                            className={cl.workerInfoSelect}
                            value={editedWorker.rankTitle}
                            onChange={(e) => setEditedWorker({ ...editedWorker, rankTitle: e.target.value })}
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
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{militaryRank.rankTitle}</p>
                        )}
                    </div>
                    
  
                  </div>
                  <div className={cl.column}>
                    <div className={cl.rows}>
                      <label className={cl.label}>Дата получения</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="date"
                            name='receivedDate'
                            className={cl.workerInfo}
                            value={editedWorker.receivedDate || ''}
                            onChange={(e) =>
                              setEditedWorker((prevWorker) => ({
                                ...prevWorker,
                                receivedDate: e.target.value,
                              }))
                            }
                          />
                        
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{rankInfo.receivedDate}</p>
                      )}
                    </div>
                    
                   
                   
                    
  
                  </div>
              </div>
    </div>
    );
}

export default MilitaryRank;