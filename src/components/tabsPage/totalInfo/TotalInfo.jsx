import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './TotalInfo.module.css';
import Button from '../../UI/button/Button';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


function TotalInfo({ person, identityCardInfo, setIdentityCardInfo, residentInfo, setResidentInfo }) {
  const { id } = useParams();
  console.log("id", id);

  console.log('editedIdentityCard.id:', identityCardInfo.id);
  
  const [editing, setEditing] = useState(false);
  // Initialize states properly
  const [editedIdentityCard, setEditedIdentityCard] = useState({
    id: identityCardInfo.id, 
    identityCardNumber: identityCardInfo.identityCardNumber || '', // Make sure to handle undefined values
    issuedBy: identityCardInfo.issuedBy || '',
    dateOfIssue: identityCardInfo.dateOfIssue || '',
    personId: identityCardInfo.personId,
  });
  
  const [editedResident, setEditedResident] = useState({
    id: residentInfo.id,  
    resCountry: residentInfo.resCountry || '',
    resRegion: residentInfo.resRegion || '',
    resCity: residentInfo.resCity || '',
    personId: residentInfo.personId,
  });
  
  const handleEditClick = () => {
    setEditing(true);
  };
  
  useEffect(() => {

    console.log('editedIdentityCard.id:', identityCardInfo.id);
    console.log('editedResident.id:', editedResident.id);
  })
  

  const handleSaveClick = async () => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const identityCardUrl = `http://localhost:8000/api/v1/identity-card-info/${editedIdentityCard.id}/`;
      const residentInfoUrl = `http://localhost:8000/api/v1/residentinfo/${editedResident.id}/`;

      console.log('Before API call - editedResident:', editedResident);

      const [identityCardResponse, residentInfoResponse] = await Promise.all([
        axios.patch(identityCardUrl, editedIdentityCard, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }),
        axios.patch(residentInfoUrl, editedResident, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }),
      ]);
      
      const updatedIdentityCardInfo = identityCardResponse.data;
      console.log(updatedIdentityCardInfo)
      const updatedResidentInfo = residentInfoResponse.data;
      
      setIdentityCardInfo(updatedIdentityCardInfo);
      setResidentInfo(updatedResidentInfo);
      
      setEditing(false);


  
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    // You can call handleSaveClick when the component mounts or based on specific conditions
    handleSaveClick();
  }, [/* Add dependencies that trigger the effect */]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedIdentityCard((prevIdentityCard) => ({
      ...prevIdentityCard,
      [name]: value,
    }));
  };

  const handleInputChangeResident = (e) => {
    const { name, value } = e.target;
    setEditedResident((prevIdentityCard) => ({
      ...prevIdentityCard,
      [name]: value,
    }));
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
                            value={editedIdentityCard.identityCardNumber}
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
                          value={editedIdentityCard.dateOfIssue || ''}
                          onChange={(e) =>
                            setEditedIdentityCard((prevIdentityCard) => ({
                              ...prevIdentityCard,
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
                            value={editedIdentityCard.issuedBy}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{identityCardInfo.issuedBy}</p>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>ПИН</label>
                      <p className={cl.workerInfo}>{person.pin}</p>
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
                            value={editedResident.resCountry}
                            onChange={handleInputChangeResident}
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
                            value={editedResident.resCity}
                            onChange={handleInputChangeResident}
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
                            value={editedResident.resRegion}
                            onChange={handleInputChangeResident}
                          />
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{residentInfo.resRegion}</p>
                      )}
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TotalInfo;