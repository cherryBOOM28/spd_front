import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './TotalInfo.module.css';
import Button from '../../UI/button/Button';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


function TotalInfo({ person, identityCardInfo, residentInfo }) {
  const { id } = useParams();

  // const id = props.id;

  const [personnelData, setPersonnelData] = useState([]); // Данные из бэка

  // СОХРАНИТЬ ИЗМЕНЕНИЯ
  // const handleSaveClick = async () => {
  // try { 
  //     let newJsonEdited = Object.keys(editedWorker).reduce((result, key) => {
  //         if (editedWorker[key] !== personnelData[key]) {
  //             result[key] = editedWorker[key];
  //         }
  //         return result;
  //     }, {});
  //     console.log(newJsonEdited)
     
  //     //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     const response = await axios.patch(`http://localhost:8000/api/v1/person/${id}/`, editedWorker, id);
   

  //     if (response.status === 200) {
  //         setEditing(false);
  //         window.location.reload();
  //     } else {
  //         console.error('Error saving data');
  //     }
  // } catch (error) {
  //     console.error('Error:', error);
  // }
  // };

  const handleSaveClick = async () => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
  
      // Обновление данных в таблице "identityCardInfo"
      const identityCardInfoUpdateData = {
        id: identityCardInfo.id,
        identityCardNumber: identityCardInfo.identityCardNumber,
        dateOfIssue: identityCardInfo.dateOfIssue,
        issuedBy: identityCardInfo.issuedBy,
      }
  
      const identityCardUpdateResponse = await axios.patch(`http://localhost:8000/api/v1/person/${id}/`, identityCardInfoUpdateData, {
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      // Обновление данных в таблице "residentInfo"
      const residentInfoUpdateData = {
        gender: {
          id: residentInfo.id,
          resCountry: residentInfo.resCountry,
          resCity: residentInfo.resCity,
          resRegion: residentInfo.resRegion,
        }
      };
      
      const residentInfoResponse = await axios.patch(`http://localhost:8000/api/v1/person/${id}/`, residentInfoUpdateData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      // Обновление данных в таблице "person"
      const personUpdateData = {
        pin: person.pin
      };
      
      const personUpdateResponse = await axios.patch(`http://localhost:8000/api/v1/birth-info/${id}/`, personUpdateData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
    
      // После успешного обновления всех таблиц, можно выполнить дополнительные действия
      if (personUpdateResponse.status === 200 && identityCardUpdateResponse.status === 200 && residentInfoResponse.status === 200) {
        setEditing(false);
        
        // window.location.reload();
      } else {
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [editing, setEditing] = useState(false);
  const [editedWorker, setEditedWorker] = useState({
    id: person.id,
    identityCardNumber: '',
    dateOfIssue: '',
    issuedBy: '',
    resCountry: '',
    resCity: '',
    resRegion: '',
  });

  // ИЗМЕНИТЬ ПОЛЯ
  const handleEditClick = () => {
    setEditing(true);
    // Initialize editedWorker with the worker's current data
    setEditedWorker({
      id: person.id,
      identityCardNumber: identityCardInfo.identityCardNumber,
      dateOfIssue: identityCardInfo.dateOfIssue,
      issuedBy: identityCardInfo.issuedBy,
      resCountry: residentInfo.resCountry,
      resCity: residentInfo.resCity,
      resRegion: residentInfo.resRegion,
      // phone_number: personnelData.phone_number,
      pin: person.pin,
    });
};

  // ИЗМЕНЕНИЯ В INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
  };

  const handleCancelClick = () => {
    // Отменяем редактирование
    setEditing(false);
  };

  return (
    <div className={cl.info__block}>
        <div className={cl.blocks}>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <p className={cl.workerCapitalName}>Контактная информация</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                  {!editing ? (
                    <Button className={cl.actionBtn} onClick={handleEditClick}>
                      &#9998; Редактировать
                    </Button>
                  ) : (

                    <div style={{ display: 'flex', gap: '10px' }}> 
                      <Button onClick={handleSaveClick} className={cl.actionBtn}>
                        Сохранить
                      </Button>
                      <Button className={cl.actionBtn} onClick={handleCancelClick}>Отмена</Button>
                    </div>
                  )}
                </div>
              </div>
          </div>
            
            <div className={cl.workerBlock}>
                <div className={cl.column}>
                  <div className={cl.rows}>
                      <label className={cl.label}>Номер удостоверения</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="number"
                            className={cl.workerInfo}
                            name='identityCardNumber'
                            value={editedWorker.identityCardNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{identityCardInfo.identityCardNumber}</p>
                      )}
                  </div>
                  <div className={cl.rows}>
                    <label className={cl.label}>Дата выдачи</label>
                    {editing ? (
                      <div className={cl.datePickerContainer}>
                        <input
                          type="date"
                          name='dateOfIssue'
                          className={cl.workerInfo}
                          value={editedWorker.dateOfIssue || ''}
                          onChange={(e) =>
                            setEditedWorker((prevWorker) => ({
                              ...prevWorker,
                              dateOfIssue: e.target.value,
                            }))
                          }
                        />
                      
                      </div>
                    ) : (
                      <p className={cl.workerInfo}>{identityCardInfo.dateOfIssue}</p>
                    )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Выдан</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="text"
                            name='issuedBy'
                            className={cl.workerInfo}
                            value={editedWorker.issuedBy}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{identityCardInfo.issuedBy}</p>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>ПИН</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="text"
                            name='pin'
                            className={cl.workerInfo}
                            value={editedWorker.pin}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{person.pin}</p>
                      )}
                  </div>
                </div>
                <div className={cl.column}>
                  <div className={cl.rows}>
                      <label className={cl.label}>Страна прожвания</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="text"
                            name='resCountry'
                            className={cl.workerInfo}
                            value={editedWorker.resCountry}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{residentInfo.resCountry}</p>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Город прожвания</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="text"
                            name='resCity'
                            className={cl.workerInfo}
                            value={editedWorker.resCity}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{residentInfo.resCity}</p>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Регион проживания</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="text"
                            name='resRegion'
                            className={cl.workerInfo}
                            value={editedWorker.resRegion}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{residentInfo.resRegion}</p>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Номер телефона</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="number"
                            name='phone_number'
                            className={cl.workerInfo}
                            value={editedWorker.phone_number}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{person.iin}</p>
                      )}
                  </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default TotalInfo;