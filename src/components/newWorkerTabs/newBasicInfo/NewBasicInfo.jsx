import React, { useState } from 'react';
import axios from 'axios';
import cl from './NewBasicInfo.module.css';
import defaultPhoto from '../../../assets/images/default.jpeg';
import { useForm } from '../formProvider/FormProvider';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';


function NewBasicInfo() {
  const { emptyInputs, handleInputChange, handleSubmit } = useForm();
  const { person, setPerson } = useForm();
  const { birthInfo, setBirthInfo } = useForm();
  const { identityCardInfo, setIdentityCardInfo } = useForm();
  const { residentInfo, setResidentInfo } = useForm();
  const { photo, setPhoto } = useForm();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [useDefaultPhoto, setUseDefaultPhoto] = useState(false);

    // const handlePhotoChange = (event) => {
    //     const file = event.target.files[0];
    //     setPhoto(file);
    //     setUseDefaultPhoto(false);
    // };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64String = e.target.result;
                console.log(base64String); 
                setPhoto(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const infoResponse = await axios.post('http://localhost:8000/api/v1/person/', {
    //         Person: person,
    //         BirthInfo: birthInfo,
    //         IdentityCardInfo: identityCardInfo,
    //         ResidentInfo: residentInfo,
    //         Photo: { photoBinary: photo },
    //       });
    //       console.log('Ответ от сервера (данные):', infoResponse.data);
    //     } catch (error) {
    //       console.error('Ошибка при отправке данных:', error);
    //     }
    // };

    // const handleInputChange = (stateUpdater, name, value) => {
    //     stateUpdater((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //     }));
    // };


  return (
    <div className={cl.info__block}>
        <form onSubmit={handleSubmit}>
        <p className={cl.create_worker_text}>Создание работника</p>
            <div className={cl.workerBlock}>
                <div className={cl.photoUploaderWrapper}>
                    {photo && typeof photo === 'string' && !useDefaultPhoto ? (
                        <img src={photo} alt="Selected" className={cl.selectedPhoto} />
                    ) : (
                        <img src={defaultPhoto} alt="Default" className={cl.selectedPhoto} />
                    )}
                    <label className={cl.customFileInput}>
                        <input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handlePhotoChange}
                        className={cl.fileInput}
                        />
                    </label>
                </div>

                <div className={cl.column}>
                <div className={cl.rows}>
                    <label className={cl.label}>Имя*</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="firstName"
                            required
                            value={person.firstName}
                            onChange={(e) => handleInputChange(setPerson, 'firstName', e.target.value)}
                        />
                        {emptyInputs && <p style={{ color: 'red' }}>Пожалуйста, заполните все поля.</p>}
           
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Фамилия*</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="surname"
                            required
                            value={person.surname}
                            onChange={(e) => handleInputChange(setPerson, 'surname', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Отчество</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="patronymic"
                            value={person.patronymic}
                            onChange={(e) => handleInputChange(setPerson, 'patronymic', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Пол*</label>
                        <select
                        className={cl.workerInfoSelect}
                        name="gender"
                        required
                        value={person.gender}
                        onChange={(e) => handleInputChange(setPerson, 'gender', e.target.value)}
                        >
                        <option value="">Выберите пол</option>
                        <option value="Female">Женский</option>
                        <option value="Male">Мужской</option>
                        </select>
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Национальность*</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="nationality"
                            required
                            value={person.nationality}
                            onChange={(e) => handleInputChange(setPerson, 'nationality', e.target.value)}
                        />
                </div>

                </div>
                <div className={cl.column}>
                <div className={cl.rows}>
                    <label className={cl.label}>Дата рождения*</label>
                        <input
                        type="date"
                        className={cl.workerInfo}
                        name="birth_date"
                        required
                        value={birthInfo.birth_date}
                        onChange={(e) => handleInputChange(setBirthInfo, 'birth_date', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Страна*</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="country"
                            required
                            value={birthInfo.country}
                            onChange={(e) => handleInputChange(setBirthInfo, 'country', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Город*</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="city"
                            required
                            value={birthInfo.city}
                            onChange={(e) => handleInputChange(setBirthInfo, 'city', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Регион*</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="region"
                            required
                            value={birthInfo.region}
                            onChange={(e) => handleInputChange(setBirthInfo, 'region', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>ИИН*</label>
                        <input
                            type="number"
                            className={cl.workerInfo}
                            required
                            name="iin"
                            minLength="12"
                            value={person.iin}
                            onChange={(e) => handleInputChange(setPerson, 'iin', e.target.value)}
                        />
                </div>
                </div>
            </div>
            <div className={cl.workerBlock}>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Номер удостоверения*</label>
                            <input
                                type="number"
                                className={cl.workerInfo}
                                required
                                name="identityCardNumber"
                                value={identityCardInfo.identityCardNumber}
                                onChange={(e) => handleInputChange(setIdentityCardInfo, 'identityCardNumber', e.target.value)}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Дата выдачи*</label>
                            <input
                            type="date"
                            className={cl.workerInfo}
                            required
                            name="dateOfIssue"
                            value={identityCardInfo.dateOfIssue}
                            onChange={(e) => handleInputChange(setIdentityCardInfo, 'dateOfIssue', e.target.value)}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Выдан*</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="issuedBy"
                                value={identityCardInfo.issuedBy} 
                                onChange={(e) => handleInputChange(setIdentityCardInfo, 'issuedBy', e.target.value)}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>ПИН*</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="pin"
                                value={person.pin}
                                onChange={(e) => handleInputChange(setPerson, 'pin', e.target.value)}
                            />
                    </div>
                </div>
                <div className={cl.column}> 
                    <div className={cl.rows}>
                        <label className={cl.label}>Страна проживания*</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resCountry"
                                value={residentInfo.resCountry}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resCountry', e.target.value)}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Город проживания*</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resCity"
                                value={residentInfo.resCity}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resCity', e.target.value)}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Регион проживания*</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resRegion"
                                value={residentInfo.resRegion}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resRegion', e.target.value)}
                            />
                    </div>
                </div>
            </div>
            {/* <button type="submit">Отправить</button> */}
        </form>
    </div>

  )
}

export default NewBasicInfo;