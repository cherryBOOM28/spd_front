import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './NewBasicInfo.module.css';
import defaultPhoto from '../../../assets/images/default.jpeg';
import { useForm } from '../formProvider/FormProvider';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';



function  NewBasicInfo() {
  const { emptyInputs, handleInputChange, handleSubmit } = useForm();
  const { person, setPerson } = useForm();
  const { birthInfo, setBirthInfo } = useForm();
  const { identityCardInfo, setIdentityCardInfo } = useForm();
  const { residentInfo, setResidentInfo } = useForm();
  const { photoBinary, setPhotoBinary } = useForm();

  const [citiesByRegion, setCitiesByRegion] = useState({});
  const [cities, setCities] = useState([]);

  const [citiesRes, setCitiesRes] = useState([]);



  const [useDefaultPhoto, setUseDefaultPhoto] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let base64String = e.target.result;
        base64String = base64String.replace(/^data:image\/\w+;base64,/, '');
        setPhotoBinary(base64String);
      };

      reader.readAsDataURL(file);
    } else {
      setPhotoBinary(''); // Если файл не выбран, устанавливаем пустую строку
    }
  };

    const fetchNewPin = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/get-available-pin/');
            const newPin = response.data.newPin;
            setPerson((prevPerson) => ({ ...prevPerson, pin: newPin }));
        } catch (error) {
            console.error('Error fetching new PIN:', error);
        }
    };
    
    useEffect(() => {
        fetchNewPin();
    }, []); 

    // Данные о городах по областям
    const citiesByRegionData = { 
        "Астана": [ 
            "Астана" 
        ], 
        "Алматы": [ 
            "Алматы" 
        ], 
        "Шымкент": [ 
            "Шымкент" 
        ], 
        "Абайская область":[ 
            "Аягоз", 
            "Курчатов", 
            "Семей", 
            "Шар" 
        ], 
        "Акмолинская область": [ 
            "Акколь", 
            "Атбасар", 
            "Державинск", 
            "Ерейментау", 
            "Есиль", 
            "Кокшетау", 
            "Косшы", 
            "Макинск", 
            "Степногорск", 
            "Степняк", 
            "Щучинск" 
        ], 
        "Актюбинская область": [ 
            "Актобе", 
            "Алга", 
            "Жем", 
            "Кандыагаш", 
            "Темир", 
            "Хромтау", 
            "Шалкар", 
            "Эмба" 
        ], 
        "Алматинская область": [ 
            "Есик", 
            "Каскелен", 
            "Конаев", 
            "Талгар" 
        ], 
        "Атырауская область": [ 
            "Атырау", 
            "Кулсары" 
        ], 
        "Восточно-Казахстанская область": [ 
            "Алтай", 
            "Зайсан", 
            "Риддер", 
            "Серебрянск", 
            "Усть-Каменогорск", 
            "Шемонаиха" 
        ], 
        "Жамбылская область": [ 
            "Жанатас", 
            "Каратау", 
            "Тараз", 
            "Шу" 
        ], 
        "Жетысуская область": [ 
            "Жаркент", 
            "Сарканд", 
            "Талдыкорган", 
            "Текели", 
            "Ушарал", 
            "Уштобе" 
        ], 
        "Западно-Казахстанская область": [ 
            "Уральск", 
            "Аксай" 
        ], 
        "Карагандинская область": [ 
            "Абай", 
            "Балхаш", 
            "Караганды", 
            "Каркаралинск", 
            "Приозёрск", 
            "Сарань", 
            "Темиртау", 
            "Шахтинск" 
        ], 
        "Костанайская область": [ 
            "Аркалык", 
            "Житикара", 
            "Костанай", 
            "Лисаковск", 
            "Рудный", 
            "Тобыл" 
        ], 
        "Кызылординская область": [ 
            "Арал", 
            "Байконыр", 
            "Казалинск", 
            "Кызылорда" 
        ], 
        "Мангистауская область": [ 
            "Актау", 
            "Жанаозен", 
            "Форт-Шевченко" 
        ], 
        "Павлодарская область": [ 
            "Аксу", 
            "Павлодар", 
            "Экибастуз" 
        ], 
        "Северо-Казахстанская область": [ 
            "Булаев", 
            "Мамлют", 
            "Петропавловск", 
            "Сергеев", 
            "Тайынша" 
        ], 
        "Туркестанская область": [ 
            "Арыс", 
            "Жетысай", 
            "Кентау", 
            "Ленгер", 
            "Сарыагаш", 
            "Туркестан", 
            "Шардара" 
        ], 
        "Улытауская область": [ 
            "Жезказган", 
            "Каражал", 
            "Сатпаев" 
        ] 
    }

    const citiesByRegionDataRes = { 
        "Астана": [ 
            "Астана" 
        ], 
        "Алматы": [ 
            "Алматы" 
        ], 
        "Шымкент": [ 
            "Шымкент" 
        ], 
        "Абайская область":[ 
            "Аягоз", 
            "Курчатов", 
            "Семей", 
            "Шар" 
        ], 
        "Акмолинская область": [ 
            "Акколь", 
            "Атбасар", 
            "Державинск", 
            "Ерейментау", 
            "Есиль", 
            "Кокшетау", 
            "Косшы", 
            "Макинск", 
            "Степногорск", 
            "Степняк", 
            "Щучинск" 
        ], 
        "Актюбинская область": [ 
            "Актобе", 
            "Алга", 
            "Жем", 
            "Кандыагаш", 
            "Темир", 
            "Хромтау", 
            "Шалкар", 
            "Эмба" 
        ], 
        "Алматинская область": [ 
            "Есик", 
            "Каскелен", 
            "Конаев", 
            "Талгар" 
        ], 
        "Атырауская область": [ 
            "Атырау", 
            "Кулсары" 
        ], 
        "Восточно-Казахстанская область": [ 
            "Алтай", 
            "Зайсан", 
            "Риддер", 
            "Серебрянск", 
            "Усть-Каменогорск", 
            "Шемонаиха" 
        ], 
        "Жамбылская область": [ 
            "Жанатас", 
            "Каратау", 
            "Тараз", 
            "Шу" 
        ], 
        "Жетысуская область": [ 
            "Жаркент", 
            "Сарканд", 
            "Талдыкорган", 
            "Текели", 
            "Ушарал", 
            "Уштобе" 
        ], 
        "Западно-Казахстанская область": [ 
            "Уральск", 
            "Аксай" 
        ], 
        "Карагандинская область": [ 
            "Абай", 
            "Балхаш", 
            "Караганды", 
            "Каркаралинск", 
            "Приозёрск", 
            "Сарань", 
            "Темиртау", 
            "Шахтинск" 
        ], 
        "Костанайская область": [ 
            "Аркалык", 
            "Житикара", 
            "Костанай", 
            "Лисаковск", 
            "Рудный", 
            "Тобыл" 
        ], 
        "Кызылординская область": [ 
            "Арал", 
            "Байконыр", 
            "Казалинск", 
            "Кызылорда" 
        ], 
        "Мангистауская область": [ 
            "Актау", 
            "Жанаозен", 
            "Форт-Шевченко" 
        ], 
        "Павлодарская область": [ 
            "Аксу", 
            "Павлодар", 
            "Экибастуз" 
        ], 
        "Северо-Казахстанская область": [ 
            "Булаев", 
            "Мамлют", 
            "Петропавловск", 
            "Сергеев", 
            "Тайынша" 
        ], 
        "Туркестанская область": [ 
            "Арыс", 
            "Жетысай", 
            "Кентау", 
            "Ленгер", 
            "Сарыагаш", 
            "Туркестан", 
            "Шардара" 
        ], 
        "Улытауская область": [ 
            "Жезказган", 
            "Каражал", 
            "Сатпаев" 
        ] 
    }
    
    // Обработчик изменения значения области
    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        // Получаем список городов для выбранной области
        const cities = citiesByRegionData[selectedRegion] || [];
        // Обновляем состояние с городами
        setBirthInfo((prevState) => ({
            ...prevState,
            region: selectedRegion,
            city: '',
        }));
        setCities(cities); // Обновляем список городов
    };

    const handleRegionChangeRes = (e) => {
        const selectedRegion = e.target.value;
        // Получаем список городов для выбранной области
        const cities = citiesByRegionDataRes[selectedRegion] || [];
        // Обновляем состояние с городами
        setResidentInfo((prevState) => ({
            ...prevState,
            resRegion: selectedRegion,
            resCity: '',
        }));
        setCitiesRes(cities); // Обновляем список городов
    };

  return (
    <div className={cl.info__block}>
        <form onSubmit={handleSubmit}>
        <p className={cl.create_worker_text}>Создание работника</p>
            <div className={cl.workerBlock}>
            <div className={cl.photoUploaderWrapper}>
                {photoBinary && typeof photoBinary === 'string' && !useDefaultPhoto ? (
                    <img src={`data:image/jpeg;base64,${photoBinary}`} alt="Selected" className={cl.selectedPhoto} />
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
                        <TextField
                            style={{ marginLeft: '12px'  }}
                            size='small'
                            id="outlined-basic" 
                            label="Имя" 
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
                        <TextField
                            style={{ marginLeft: '12px'  }}
                            size='small'
                            id="outlined-basic" 
                            label="Фамилия" 
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
                        <TextField
                            style={{ marginLeft: '12px'  }}
                            size='small'
                            id="outlined-basic" 
                            label="Отчество" 
                            type="text"
                            className={cl.workerInfo}
                            name="patronymic"
                            value={person.patronymic}
                            onChange={(e) => handleInputChange(setPerson, 'patronymic', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Пол*</label>
                        <Box sx={{ minWidth: 120 }} style={{ marginLeft: '12px'  }}>
                            <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size='small'
                                className={cl.workerInfoSelect}
                                name="gender"
                                required
                                value={person.gender}
                                onChange={(e) => handleInputChange(setPerson, 'gender', e.target.value)}
                            >
                                <MenuItem value="" disabled>Выберите пол</MenuItem>
                                <MenuItem value="Женский">Женский</MenuItem>
                                <MenuItem value="Мужской">Мужской</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Национальность*</label>
                        <TextField
                            size='small'
                            id="outlined-basic" 
                            label="Национальность"
                            style={{ marginLeft: '12px' }}
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
                    <label className={cl.label} style={{ marginRight: '12px'  }}>Дата рождения*</label>
                        <TextField
                        size='small'
                        id="outlined-basic" 
                        type="date"
                        className={cl.workerInfo}
                        name="birth_date"
                        required
                        value={birthInfo.birth_date}
                        onChange={(e) => handleInputChange(setBirthInfo, 'birth_date', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label} style={{ marginRight: '12px'  }}>Страна*</label >
                        <TextField
                            size='small'
                            id="outlined-basic" 
                            label="Страна"
                            type="text"
                            className={cl.workerInfo}
                            name="country"
                            required
                            value={birthInfo.country}
                            onChange={(e) => handleInputChange(setBirthInfo, 'country', e.target.value)}
                        />
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Регион*</label>
                        <Box sx={{ minWidth: 120 }} style={{ marginLeft: '12px'  }}>
                            <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size='small'
                                className={cl.workerInfoSelect}
                                name="region"
                                required
                                value={birthInfo.region}
                                // onChange={(e) => handleInputChange(setBirthInfo, 'region', e.target.value)}
                                onChange={handleRegionChange}
                            >
                                <MenuItem value="" disabled>Выберите область</MenuItem>
                                {Object.keys(citiesByRegionData).map((region) => (
                                    <MenuItem key={region} value={region}>{region}</MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Box>
                </div>
                <div className={cl.rows}>
                    <label className={cl.label}>Город*</label>
                        <Box sx={{ minWidth: 120 }} style={{ marginLeft: '12px'  }}>
                            <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size='small'
                                className={cl.workerInfoSelect}
                                name="city"
                                required
                                value={birthInfo.city}
                                // onChange={(e) => handleInputChange(setBirthInfo, 'city', e.target.value)}
                                onChange={(e) => handleInputChange(setBirthInfo, 'city', e.target.value)}
                            >
                                <MenuItem value="" disabled>Выберите город</MenuItem>
                                {cities.map((city) => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Box>
                </div>
                
                <div className={cl.rows}>
                    <label className={cl.label} style={{ marginRight: '12px'  }}>ИИН*</label>
                        <TextField
                            size='small'
                            id="outlined-basic" 
                            label="ИИН"
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
                            <TextField
                                size='small'
                                id="outlined-basic" 
                                label="Номер удостоверения"
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
                            <TextField
                            size='small'
                            id="outlined-basic" 
                            // label="Дата выдачи"
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
                            <TextField
                                size='small'
                                id="outlined-basic" 
                                label="Выдан"
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
                            {/* <input
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="pin"
                                value={person.pin}
                                onChange={(e) => handleInputChange(setPerson, 'pin', e.target.value)}
                            /> */}
                               <TextField
                                size='small'
                                id="outlined-basic" 
                                label="ПИН"
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
                        <label className={cl.label} style={{ marginRight: '12px'  }}>Страна проживания*</label>
                            <TextField
                                size='small'
                                id="outlined-basic" 
                                label="Страна проживания*"
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resCountry"
                                value={residentInfo.resCountry}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resCountry', e.target.value)}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Регион проживания*</label>
                            {/* <TextField
                                size='small'
                                id="outlined-basic" 
                                label="Регион проживания*"
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resRegion"
                                value={residentInfo.resRegion}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resRegion', e.target.value)}
                            /> */}
                            <Box sx={{ minWidth: 120 }} style={{ marginLeft: '12px'  }}>
                                <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    size='small'
                                    className={cl.workerInfoSelect}
                                    name="region"
                                    required
                                    value={residentInfo.resRegion}
                                    // onChange={(e) => handleInputChange(setBirthInfo, 'region', e.target.value)}
                                    onChange={handleRegionChangeRes}
                                >
                                    <MenuItem value="" disabled>Выберите область</MenuItem>
                                    {Object.keys(citiesByRegionDataRes).map((region) => (
                                        <MenuItem key={region} value={region}>{region}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </Box>
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Город проживания*</label>
                            {/* <TextField
                                size='small'
                                id="outlined-basic" 
                                label="Город проживания*"
                                type="text"
                                className={cl.workerInfo}
                                required
                                name="resCity"
                                value={residentInfo.resCity}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resCity', e.target.value)}
                            /> */}
                            <Box sx={{ minWidth: 120 }} style={{ marginLeft: '12px'  }}>
                            <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size='small'
                                className={cl.workerInfoSelect}
                                name="city"
                                required
                                value={residentInfo.resCity}
                                onChange={(e) => handleInputChange(setResidentInfo, 'resCity', e.target.value)}
                            >
                                <MenuItem value="" disabled>Выберите город</MenuItem>
                                {citiesRes.map((city) => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Box>
                    </div>
                    
                </div>
            </div>
            {/* <button type="submit">Отправить</button> */}
        </form>
    </div>

  )
}

export default NewBasicInfo;