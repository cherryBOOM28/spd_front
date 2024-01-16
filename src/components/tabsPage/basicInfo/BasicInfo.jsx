import React, { useState } from 'react';
import axios from 'axios';
import cl from './BasicInfo.module.css';
import { Button,TextField, Paper, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Cookies from 'js-cookie';


function BasicInfo({  photo, person, setPerson, birthInfo, setBirthInfo, gender, setGender }) {
  const [editing, setEditing] = useState(false);

  const [editedPerson, setEditedPerson] = useState({
    id: person.id,
    firstName: person.firstName,
    surname: person.surname,
    patronymic: person.patronymic,
    nationality: person.nationality,
    iin: person.iin
  });
  
  const [editedGender, setEditedGender] = useState({
    id: gender.id,
    genderName: gender.genderName
  });

  const [editedBirthInfo, setEditedBirthInfo] = useState({
    id: birthInfo.id,
    birth_date: birthInfo.birth_date,
    country: birthInfo.country,
    city: birthInfo.city,
    region: birthInfo.region
  });

  // ИЗМЕНИТЬ ПОЛЯ
  const handleEditClick = () => {
    setEditing(true);
    // Initialize editedWorker with the worker's current data
    setEditedPerson({
      firstName: person.firstName,
      surname: person.surname,
      patronymic: person.patronymic,
      nationality: person.nationality,
      iin: person.iin,
    });

    setEditedGender({
      genderName: gender.genderName,
    });

    setEditedBirthInfo({
      birth_date: birthInfo.birth_date,
      country: birthInfo.country,
      city: birthInfo.city,
      region: birthInfo.region
    });
  };

  // СОХРАНИТЬ ИЗМЕНЕНИЯ
  const handleSaveClick = async () => {
  try {
    const accessToken = Cookies.get('jwtAccessToken');
    // Update person information
    const personResponse = await axios.patch(`http://localhost:8000/api/v1/person/${person.id}/`, editedPerson, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!personResponse.data) {
      // Handle error response for person update
      console.error('Failed to update person information');
      return;
    }

    // Update gender information
    const genderResponse = await axios.patch(`http://localhost:8000/api/v1/gender/${gender.id}/`, editedGender, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!genderResponse.data) {
      // Handle error response for gender update
      console.error('Failed to update gender information');
      return;
    }

    // Update birth info information
    const birthInfoResponse = await axios.patch(`http://localhost:8000/api/v1/birth-info/${birthInfo.id}/`, editedBirthInfo, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!birthInfoResponse.data) {
      // Handle error response for birth info update
      console.error('Failed to update birth info information');
      return;
    }

    // Update the state with the edited data 
    setPerson(personResponse.data);
    setGender(genderResponse.data);
    setBirthInfo(birthInfoResponse.data);
    setEditing(false);
   
  } catch (error) {
    console.error('Error:', error);
  }
  };

  // ИЗМЕНЕНИЯ В INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleInputChangeBirth = (e) => {
    const { name, value } = e.target;
    setEditedBirthInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    // Отменяем редактирование
    setEditing(false);
  };

  if (person && gender && birthInfo) {
    return (
      <div className={cl.info__block} style={{ display: 'flex' }}>
          <img src={`data:image/jpeg;base64,${photo.photoBinary}`} alt="worker" className={cl.workerImg} />

          <div className={cl.blocks}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                <p className={cl.workerCapitalName}>{person.firstName}</p>
                <p className={cl.workerCapitalName}>{person.surname}</p>
                <p className={cl.workerCapitalName}>{person.patronymic}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                {!editing ? (
                  <Button className={cl.actionBtn} onClick={handleEditClick} style={{ textTransform: 'none' }}>
                    &#9998; Редактировать
                  </Button>
                ) : (

                  <div style={{ display: 'flex', gap: '10px' }}> 
                    <Button onClick={handleSaveClick} className={cl.actionBtn} style={{ textTransform: 'none' }}>
                      Сохранить
                    </Button>
                    <Button className={cl.actionBtn} onClick={handleCancelClick} style={{ textTransform: 'none' }}>Отмена</Button>
                  </div>
                )}
              </div>
            </div>
              
              <div className={cl.workerBlock}>
                  <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Имя</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField 
                              id="outlined-basic" 
                              label="Имя" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='firstName'
                              className={cl.workerInfoText}
                              value={editedPerson.firstName}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{person.firstName}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Фамилия</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="Фамилия" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='surname'
                              className={cl.workerInfoText}
                              value={editedPerson.surname}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{person.surname}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Отчество</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="Отчество" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='patronymic'
                              className={cl.workerInfoText}
                              value={editedPerson.patronymic}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{person.patronymic}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Пол</label>
                        {editing ? (
                          <div className={cl.datePickerContainer} >
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Пол"
                                  name='genderName'
                                  className={cl.workerInfoSelect}
                                  value={editedGender.genderName}
                                  onChange={(e) => setEditedGender({ ...editedGender, genderName: e.target.value })}
                                >
                                  <MenuItem value="">Выберите пол</MenuItem>
                                  <MenuItem value="Женский">Женский</MenuItem>
                                  <MenuItem value="Мужской">Мужской</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{gender.genderName}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Национальность</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="Национальность" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='nationality'
                              className={cl.workerInfoText}
                              value={editedPerson.nationality}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{person.nationality}</Paper>
                        )}
                    </div>
  
                  </div>
                  <div className={cl.column}>
                    <div className={cl.rows}>
                      <label className={cl.label}>Дата рождения</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <TextField
                            id="outlined-basic" 
                            label="Дата рождения" 
                            variant="outlined" 
                            size="small"
                            type="date"
                            name='birth_date'
                            className={cl.workerInfoText}
                            value={editedBirthInfo.birth_date || ''}
                            onChange={(e) =>
                              setEditedBirthInfo((prevWorker) => ({
                                ...prevWorker,
                                birth_date: e.target.value,
                              }))
                            }
                          />
                        
                        </div>
                      ) : (
                        <Paper className={cl.workerInfo}>{birthInfo.birth_date}</Paper>
                      )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Страна рождения</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="Страна рождения" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='country'
                              className={cl.workerInfoText}
                              value={editedBirthInfo.country}
                              onChange={handleInputChangeBirth}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{birthInfo.country}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Город рождения</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="Город рождения" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='city'
                              className={cl.workerInfoText}
                              value={editedBirthInfo.city}
                              onChange={handleInputChangeBirth}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{birthInfo.city}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Регион рождения</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="Регион рождения" 
                              variant="outlined" 
                              size="small"
                              type="text"
                              name='region'
                              className={cl.workerInfoText}
                              value={editedBirthInfo.region}
                              onChange={handleInputChangeBirth}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{birthInfo.region}</Paper>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>ИИН</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <TextField
                              id="outlined-basic" 
                              label="ИИН" 
                              variant="outlined" 
                              size="small"
                              type="number"
                              name='iin'
                              className={cl.workerInfoText}
                              value={editedPerson.iin}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <Paper className={cl.workerInfo}>{person.iin}</Paper>
                        )}
                    </div>
  
                  </div>
              </div>
              
          </div>
      </div>
    )
  } else return null;
}

export default BasicInfo;