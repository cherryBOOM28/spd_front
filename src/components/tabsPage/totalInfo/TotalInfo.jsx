import React, { useState } from 'react';
import axios from 'axios';
import cl from './TotalInfo.module.css';
import Cookies from 'js-cookie';
import { Button,TextField, Paper, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';



function TotalInfo({ person, identityCardInfo, setIdentityCardInfo, residentInfo, setResidentInfo }) {
  // const { id } = useParams();
  // console.log("id", id);

  const [editing, setEditing] = useState(false);
  // Initialize states properly
  const [editedIdentityCard, setEditedIdentityCard] = useState({
    id: identityCardInfo.id,
    identityCardNumber: identityCardInfo.identityCardNumber,
    issuedBy: identityCardInfo.issuedBy,
    dateOfIssue: identityCardInfo.dateOfIssue,
  });
  const [editedResident, setEditedResident] = useState({
    id: residentInfo.id,
    resCountry: residentInfo.resCountry,
    resCity: residentInfo.resCity,
    resRegion: residentInfo.resRegion,
  });
  
  const handleEditClick = () => {
    // При нажатии "Редактировать" используйте текущие данные из состояний identityCardInfo и residentInfo
    setEditedIdentityCard({
      identityCardNumber: identityCardInfo.identityCardNumber,
      issuedBy: identityCardInfo.issuedBy,
      dateOfIssue: identityCardInfo.dateOfIssue,
    });
    setEditedResident({
      resCountry: residentInfo.resCountry,
      resCity: residentInfo.resCity,
      resRegion: residentInfo.resRegion,
    });
  
    setEditing(true);
  };

  const handleSaveClick = async (id) => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      // Update identity card information
      const identityCardResponse = await axios.patch(`http://localhost:8000/api/v1/identity-card-info/${identityCardInfo.id}/`, editedIdentityCard, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
  
      if (!identityCardResponse.data) {
        // Handle error response for identity card update
        console.error('Failed to update identity card information');
        return;
      }
  
      // Update resident information
      const residentResponse = await axios.patch(`http://localhost:8000/api/v1/residentinfo/${residentInfo.id}/`, editedResident, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
  
      if (!residentResponse.data) {
        // Handle error response for resident update
        console.error('Failed to update resident information');
        return;
      }
  
      // Update the state with the edited data for both identity card and resident
      setIdentityCardInfo(identityCardResponse.data);
      setResidentInfo(residentResponse.data);
      setEditing(false); // Set editing to false after successful save
    } catch (error) {
      // Handle any unexpected errors
      console.error('An error occurred while saving data:', error);
    }
  };
  

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
    if (editing) {
      setEditedIdentityCard({
        identityCardNumber: identityCardInfo.identityCardNumber,
        issuedBy: identityCardInfo.issuedBy,
        dateOfIssue: identityCardInfo.dateOfIssue,
      });
      setEditedResident({
        resCountry: residentInfo.resCountry,
        resCity: residentInfo.resCity,
        resRegion: residentInfo.resRegion,
      });
    }

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
                    <Button className={cl.actionBtn} onClick={handleEditClick} style={{ textTransform: 'none', color: '#1b3884' }}>
                      &#9998; Редактировать
                    </Button>
                  ) : (

                    <div style={{ display: 'flex', gap: '10px' }}> 
                      <Button onClick={handleSaveClick} className={cl.actionBtn} style={{ textTransform: 'none', color: '#1b3884' }}>
                        Сохранить
                      </Button>
                      <Button className={cl.actionBtn} onClick={handleCancelClick} style={{ textTransform: 'none', color: '#1b3884' }}>Отмена</Button>
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
                          <TextField
                            id="outlined-basic" 
                            label="Номер удостоверения" 
                            variant="outlined" 
                            size="small"
                            type="number"
                            className={cl.workerInfoText}
                            name='identityCardNumber'
                            value={editedIdentityCard.identityCardNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <Paper className={cl.workerInfo}>{identityCardInfo.identityCardNumber}</Paper>
                      )}
                  </div>
                  <div className={cl.rows}>
                    <label className={cl.label}>Дата выдачи</label>
                    {editing ? (
                      <div className={cl.datePickerContainer}>
                        <TextField
                          id="outlined-basic" 
                          label="Дата выдачи" 
                          variant="outlined" 
                          size="small"
                          type="date"
                          name='dateOfIssue'
                          className={cl.workerInfoText}
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
                      <Paper className={cl.workerInfo}>{identityCardInfo.dateOfIssue}</Paper>
                    )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Выдан</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <TextField
                            id="outlined-basic" 
                            label="Выдан" 
                            variant="outlined" 
                            size="small"
                            type="text"
                            name='issuedBy'
                            className={cl.workerInfoText}
                            value={editedIdentityCard.issuedBy}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <Paper className={cl.workerInfo}>{identityCardInfo.issuedBy}</Paper>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>ПИН</label>
                      <Paper className={cl.workerInfo}>{person.pin}</Paper>
                  </div>
                </div>
                <div className={cl.column}>
                  <div className={cl.rows}>
                      <label className={cl.label}>Страна прожвания</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <TextField
                            id="outlined-basic" 
                            label="Страна прожвания" 
                            variant="outlined" 
                            size="small"
                            type="text"
                            name='resCountry'
                            className={cl.workerInfoText}
                            value={editedResident.resCountry}
                            onChange={handleInputChangeResident}
                          />
                        </div>
                      ) : (
                        <Paper className={cl.workerInfo}>{residentInfo.resCountry}</Paper>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Город прожвания</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <TextField
                            id="outlined-basic" 
                            label="Город прожвания" 
                            variant="outlined" 
                            size="small"
                            type="text"
                            name='resCity'
                            className={cl.workerInfoText}
                            value={editedResident.resCity}
                            onChange={handleInputChangeResident}
                          />
                        </div>
                      ) : (
                        <Paper className={cl.workerInfo}>{residentInfo.resCity}</Paper>
                      )}
                  </div>
                  <div className={cl.rows}>
                      <label className={cl.label}>Регион проживания</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <TextField
                            id="outlined-basic" 
                            label="Регион прожвания" 
                            variant="outlined" 
                            size="small"
                            type="text"
                            name='resRegion'
                            className={cl.workerInfoText}
                            value={editedResident.resRegion}
                            onChange={handleInputChangeResident}
                          />
                        </div>
                      ) : (
                        <Paper className={cl.workerInfo}>{residentInfo.resRegion}</Paper>
                      )}
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TotalInfo;