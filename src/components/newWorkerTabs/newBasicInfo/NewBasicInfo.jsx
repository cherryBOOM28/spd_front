import React, { useState } from 'react';
import axios from 'axios';
import cl from './NewBasicInfo.module.css';
import defaultPhoto from '../../../assets/images/default.jpeg';
import { useForm } from '../formProvider/FormProvider';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { red } from '@mui/material/colors';


function NewBasicInfo() {

  const { generalInfo, setGeneralInfo } = useForm();
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




  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        // eslint-disable-next-line 
        const infoResponse = await axios.post('http://localhost:8000/general_info/all', generalInfo);
        // console.log('Ответ от сервера (данные):', infoResponse.data);
    } catch(error) {
        console.error('Ошибка при отправке данных:', error);
    }
  };


  // ИЗМЕНЕНИЯ В INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (/^\d{0,12}$/.test(value)) {
        setGeneralInfo({
          ...generalInfo,
          [name]: value,
        });
      }

    setGeneralInfo((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};



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
                    <label className={cl.label}>Имя</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="firstname"
                            required
                            value={generalInfo.firstname}
                            onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Фамилия</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="surname"
                            required
                            value={generalInfo.surname}
                            onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Отчество</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="patronymic"
                            value={generalInfo.patronymic}
                            onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Пол</label>
                        <select
                        className={cl.workerInfoSelect}
                        name="gender"
                        required
                        value={generalInfo.gender}
                        onChange={handleInputChange}
                        >
                        <option value="">Выберите пол</option>
                        <option value="Женский">Женский</option>
                        <option value="Мужской">Мужской</option>
                        </select>
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Национальность</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="nationality"
                            required
                            value={generalInfo.nationality}
                            onChange={handleInputChange}
                        />
                </div>

                </div>
                <div className={cl.column}>
                <div className={cl.rows}>
                    <label className={cl.label}>Дата рождения</label>
                        <input
                        type="date"
                        className={cl.workerInfo}
                        name="birth_date"
                        required
                        value={generalInfo.birth_date}
                        onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Страна</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="birth_country"
                            required
                            value={generalInfo.birth_country}
                            onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Город</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="birth_city"
                            required
                            value={generalInfo.birth_city}
                            onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Регион</label>
                        <input
                            type="text"
                            className={cl.workerInfo}
                            name="birth_region"
                            required
                            value={generalInfo.birth_region}
                            onChange={handleInputChange}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>ИИН</label>
                        <input
                            type="number"
                            className={cl.workerInfo}
                            required
                            name="iin_general"
                            minLength="12"
                            value={generalInfo.iin_general}
                            onChange={handleInputChange}
                        />
                </div>
                </div>
            </div>
            <div className={cl.workerBlock}>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Номер удостоверения</label>
                            <input
                                type="number"
                                className={cl.workerInfo}
                                required
                                name="id_numbers"
                                value={generalInfo.id_numbers}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Дата выдачи</label>
                            <input
                            type="date"
                            className={cl.workerInfo}
                            required
                            name="id_date"
                            value={generalInfo.id_date}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Выдан</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="id_from"
                                value={generalInfo.id_from}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>ПИН</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="pin"
                                value={generalInfo.pin}
                                onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div className={cl.column}> 
                    <div className={cl.rows}>
                        <label className={cl.label}>Страна проживания</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resid_country"
                                value={generalInfo.resid_country}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Город проживания</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resid_city"
                                value={generalInfo.resid_city}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Регион проживания</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resid_region"
                                value={generalInfo.resid_region}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Номер телефона</label>
                            <input
                                type="number"
                                className={cl.workerInfo}
                                required
                                name="phone_number"
                                value={generalInfo.phone_number}
                                onChange={handleInputChange}
                            />
                    </div>
                </div>
            </div>
            {/* <Button onClick={handleSubmit} type="submit" className={cl.actionBtn}>Сохранить</Button> */}
        </form>
    </div>

  )
}

export default NewBasicInfo;