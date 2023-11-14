import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './BasicInfo.module.css';
import { useParams } from 'react-router-dom';
import Button from '../../UI/button/Button';
import defaultPic from '../../../assets/images/default.jpeg';
import Cookies from 'js-cookie';


function BasicInfo({  person, birthInfo, gender }) {
    
  const { id } = useParams();
  // console.log(`id: ${id}`);
  

  const [personnelData, setPersonnelData] = useState([]); // Данные из бэка
  const [photo, setPhoto] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedWorker, setEditedWorker] = useState({
    firstName: '',
    surname: '',
    patronymic: '',
    nationality: '',
    iin: '',
    genderName: '',
    birth_date: '',
    country: '',
    city: '',
    region: '',
  });

  useEffect(() => {
    // console.log(person.firstName);
    if (person && gender && birthInfo  &&  editedWorker) {
      // Initialize editedWorker with the worker's current data
      setEditedWorker({
        item: id,
        firstName: person.firstName,
        surname: person.surname,
        patronymic: person.patronymic,
        nationality: person.nationality,
        iin: person.iin,
        genderName: gender.genderName,
        birth_date: birthInfo.birth_date,
        country: birthInfo.country,
        city: birthInfo.city,
        region: birthInfo.region,
      });
    }
  }, []);
  



  // СОХРАНИТЬ ИЗМЕНЕНИЯ
  // const handleSaveClick = async () => {
  // try {
  //     let newJsonEdited = Object.keys(editedWorker).reduce((result, key) => {
  //         if (editedWorker[key] !== person[key]) {
  //             result[key] = editedWorker[key];
  //         }
  //         return result;
  //     }, {});
  //     console.log("newJsonEdited", newJsonEdited)

  //     //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     const accessToken = Cookies.get('jwtAccessToken');
  //     const response = await axios.patch(`http://localhost:8000/api/v1/person/${id}`, newJsonEdited, id, 
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //       }
  //     });

  //     console.log("response", response);


  //     if (response.status === 200) {
  //         setEditing(false);
  //         // window.location.reload();
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

    // Обновление данных в таблице "person"
    const personUpdateData = {
      id: id,
      firstName: editedWorker.firstName,
      surname: editedWorker.surname,
      patronymic: editedWorker.patronymic,
      nationality: editedWorker.nationality,
      iin: editedWorker.iin
    }

    const personUpdateResponse = await axios.patch(`http://localhost:8000/api/v1/person/${id}/`, personUpdateData, {
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log("  gender: id", gender.id);


    const genderUpdateData = {
      // id: gender.id,
      genderName: editedWorker.genderName
    };
    
    console.log("genderUpdateData", genderUpdateData);
    
    const genderResponse = await axios.patch(`http://localhost:8000/api/v1/person/${id}/update_gender/`, genderUpdateData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Обновление данных в таблице "birthInfo"
    const birthInfoUpdateData = {
      id: birthInfo.id,
      birth_date: editedWorker.birth_date,
      country: editedWorker.country,
      city: editedWorker.city,
      region: editedWorker.region,
    };
    console.log("birthInfoUpdateData",  editedWorker.country);
    console.log(`birthInfo id: ${birthInfo.id}`);


    const birthInfoUpdateResponse = await axios.patch(`http://localhost:8000/api/v1/birth-info/${birthInfo.id}/`, birthInfoUpdateData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    
  
    // После успешного обновления всех таблиц, можно выполнить дополнительные действия
    if (personUpdateResponse.status === 200 && birthInfoUpdateResponse.status === 200 && genderResponse.status === 200) {
      setEditing(false);
      
      // window.location.reload();
    } else {
      console.error('Error saving data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  // ИЗМЕНИТЬ ПОЛЯ
  const handleEditClick = () => {
    setEditing(true);
    // Initialize editedWorker with the worker's current data
      setEditedWorker({
        firstName: person.firstName,
        surname: person.surname,
        patronymic: person.patronymic,
        nationality: person.nationality,
        iin: person.iin,

        genderName: gender.genderName,

        birth_date: birthInfo.birth_date,
        country: birthInfo.country,
        city: birthInfo.city,
        region: birthInfo.region,
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

  if (person && gender && birthInfo) {
    return (
      <div className={cl.info__block}>
          {/* <img src={`data:image/jpeg;base64,${photo}`} alt="worker" className={cl.workerImg} /> */}
          
          <div className={cl.blocks}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                <p className={cl.workerCapitalName}>{person.firstName}</p>
                <p className={cl.workerCapitalName}>{person.surname}</p>
                <p className={cl.workerCapitalName}>{person.patronymic}</p>
              </div>
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
              
              <div className={cl.workerBlock}>
                  <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Имя</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='firstName'
                              className={cl.workerInfo}
                              value={editedWorker.firstName}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{person.firstName}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Фамилия</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='surname'
                              className={cl.workerInfo}
                              value={editedWorker.surname}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{person.surname}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Отчество</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='patronymic'
                              className={cl.workerInfo}
                              value={editedWorker.patronymic}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{person.patronymic}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Пол</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                           <select
                            name='genderName'
                            className={cl.workerInfoSelect}
                            value={editedWorker.genderName}
                            onChange={(e) => setEditedWorker({ ...editedWorker, genderName: e.target.value })}
                           >
                            <option value="">Выберите пол</option>
                            <option value="Female">Женский</option>
                            <option value="Male">Мужской</option>
                           </select>
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{gender.genderName}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Национальность</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='nationality'
                              className={cl.workerInfo}
                              value={editedWorker.nationality}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{person.nationality}</p>
                        )}
                    </div>
  
                  </div>
                  <div className={cl.column}>
                    <div className={cl.rows}>
                      <label className={cl.label}>Дата рождения</label>
                      {editing ? (
                        <div className={cl.datePickerContainer}>
                          <input
                            type="date"
                            name='birth_date'
                            className={cl.workerInfo}
                            value={editedWorker.birth_date || ''}
                            onChange={(e) =>
                              setEditedWorker((prevWorker) => ({
                                ...prevWorker,
                                birth_date: e.target.value,
                              }))
                            }
                          />
                        
                        </div>
                      ) : (
                        <p className={cl.workerInfo}>{birthInfo.birth_date}</p>
                      )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Страна рождения</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='country'
                              className={cl.workerInfo}
                              value={editedWorker.country}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{birthInfo.country}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Город рождения</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='city'
                              className={cl.workerInfo}
                              value={editedWorker.city}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{birthInfo.city}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Регион рождения</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="text"
                              name='region'
                              className={cl.workerInfo}
                              value={editedWorker.region}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className={cl.workerInfo}>{birthInfo.region}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>ИИН</label>
                        {editing ? (
                          <div className={cl.datePickerContainer}>
                            <input
                              type="number"
                              name='iin'
                              className={cl.workerInfo}
                              value={editedWorker.iin}
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
  } else return null;
}

export default BasicInfo;