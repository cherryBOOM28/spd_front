import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Home.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import Dropdown from '../../components/dropdown/Dropdown';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { MdDownload } from "react-icons/md";
import NotificationButton from '../../components/notificationButton/NotificationButton';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';


function Home(props) {
    const navigate = useNavigate();

    // const handleRadioChange = (value) => {
    //     setSelectedGroupId(value);
    //     // localStorage.setItem('selectedGroupId', value);
    // };

    const [persons, setPersons] = useState([]);
    const [personalData, setPersonalData] = useState([]); 
    const [showSchedule, setShowSchedule] = useState(false);

    const [mainDepartments, setMainDepartments] = useState([]);
    const [selectedMainDepartment, setSelectedMainDepartment] = useState(null);

    // главная страница - отображение городов
    const accessToken = Cookies.get('jwtAccessToken');
    const handleLocationChange = async (locationName) => {
        try {
        const response = await axios.get(`http://localhost:8000/api/v1/location_departments/Астана/`, {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            }
        });
        setSelectedGroupId('all');
        console.log("departments", response.data.departments);
        } catch (error) {
        console.error('Error fetching departments:', error);
        }
    };

    // Отображения управлении на главной странице
    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        axios.get(`http://127.0.0.1:8000/api/v1/department`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                setMainDepartments(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log("Error main departments", error)
            })
            
    }, []); // Пустой массив зависимостей гарантирует, что запрос будет выполнен только один раз при монтировании

    const getEmployeesByDepartmentId = async (departmentId) => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/v1/persons_by_department/?departmentId=${departmentId}`);
          setPersons(response.data.persons);
          console.log("Employees for department", response.data);
          // Обработка данных сотрудников
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
    };
      
    // Пример использования функции с id департамента
    // getEmployeesByDepartmentId(1);

    // обновление выбранный департнамент при изменении чекбокса
    const handleCheckboxChangeMainDepartments = (department) => {
        setSelectedMainDepartment(department);
        getEmployeesByDepartmentId(department.id);
    };

    // Выбор все на главной страницу
     const [ selectedGroupId, setSelectedGroupId ] = useState(
        localStorage.getItem('selectedGroupId') || 'all'
    );

    const handleRadioChange = (value) => {
    setSelectedGroupId(value);
    };

    // Переход на личные страницы - на главной
    const handleEmployeeClick = (id) => {
        navigate(`/${id}`)
    };

    const [firstName, setFirstName] = useState([]); // Данные из бэка
    const [surname, setSurname] = useState([]); // Данные из бэка
    const [patronymic, setPatronymic] = useState([]); // Данные из бэка
    const [positionTitle, setPositionTitle] = useState([]); // Данные из бэка
    const [gender, setGender] = useState([]); // Данные из бэка

    // данные из person - таблица на главной
    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');

        axios.get(`http://localhost:8000/api/v1/person/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
          .then(response => {
            // console.log("response", response);
            // setPersonalData(response.data.sort());
            setPersonalData(response.data);

            setFirstName(response.data[0].firstName);
            setSurname(response.data[0].surname);
            setPatronymic(response.data[0].patronymic);
            setGender(response.data[0].gender.genderName);
            setPositionTitle(response.data[0].positionInfo.position.positionTitle);
            // console.log("data[0][2]",response.data[0].positionInfo.position.positionTitle)
        })
        .catch(error => {
            console.error("Error fetching personal data:", error);
        });
    }, []);
   

    // Штатное расписание

    // Штатное расписание - кнопка
    const toggleSchedule = () => {
        setShowSchedule(!showSchedule);
    };

    // Выпадашка в штатном распиании - выборка
    const [selectedLocation, setSelectedLocation] = useState('wholeCountry');
      
    // скачать штатное расписание
    const handleDownload = () => {
        if (!selectedLocation) {
            NotificationManager.warning('Please select a location before downloading', 'Warning');
            return;
        }
        window.location.href = `http://127.0.0.1:8000/api/v1/download-staffing-table/?locationName=Весь Казахстан`;
    };
    
    // values для шатаного расписания
    const dropdownOptions = [
        { value: 'wholeCountry', label: 'Вся страна' },
        { value: 'city', label: 'Город' },
    ];


    // выбранный город
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);



    // департаменты выбранного города
    const [departments, setDepartments] = useState([]);

    // выбранный департамент 
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // должности из выбранного деепартамента
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);


    // все города в меню
    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        axios.get('http://127.0.0.1:8000/api/v1/location', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
        })
        .then(response => {
            setCities(response.data)
            // console.log(response.data)
        })
        .catch(error => console.error('Error fetching data:', error));
        
    }, []);

    // выбранный город который отображает департаменты этого города
    useEffect(() => {
        if (selectedCity) {
          const accessToken = Cookies.get('jwtAccessToken');
    
          axios.get(`http://127.0.0.1:8000/api/v1/location_departments/${selectedCity}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          })
            .then(response => setDepartments(response.data.departments))
            .catch(error => console.error('Error fetching departments:', error));
        }
    }, [selectedCity]);
  
    const handleCityChange = (cityId) => {
        setSelectedCity(cityId);
        setSelectedDepartment(null);
        setSelectedPosition(null)
    };


    const [showDepartments, setShowDepartments] = useState(true);
    
    const handleDepartmentChange = (departmentId) => {
        setSelectedDepartment(departmentId);
        setShowDepartments(!showDepartments);
    };

    const handlePositionChange = (positionId) => {
        setSelectedPosition(positionId);
    };

    // выбранная должность из департамента
    useEffect(() => {
        // console.log("selectedDepartment", selectedDepartment);
        if (selectedDepartment) {
          const accessToken = Cookies.get('jwtAccessToken');
    
          axios.get(`http://127.0.0.1:8000/api/v1/positions_departments/${selectedDepartment}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          })
            .then(response => 
                {
                    setPositions(response.data.positions)
                    // console.log("positions",response.data.positions)
                }
            )
            .catch(error => console.error('Error fetching positions:', error));
        }
    }, [selectedDepartment]);

    // отображение tab в штаном расписании 
    const renderEmployeeWrapper = () => {
    if (showSchedule) {
      return (
        <div>
            <div className={cl.filter_wrapper}>
                <div className={cl.filters}>
                    <div className={cl.downloaderFile}>
                        <Dropdown
                            title="Выберите местоположение"
                            options={dropdownOptions}
                            selected={selectedLocation}
                            onSelect={setSelectedLocation}
                        />
                        <div className={cl.downloader}>
                            <IconButton 
                                onClick={handleDownload}
                                disabled={!selectedLocation}
                                variant="outlined"
                            >
                                {selectedLocation === 'wholeCountry' ? '' : ''}
                                <MdDownload style={{ color: '#1565C0' }} />
                            </IconButton >
                            <NotificationContainer />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.employeeWrapper}>
                <div className={cl.groups}>
                    <h1 className={cl.headline}>Штатное расписание</h1>
                    <div className={cl.groups_column}>
                    {cities.map(city => (
                        <div key={city.id} className={cl.group_name} style={{ cursor: 'pointer' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div>{city.LocationName}</div>
                                <input
                                    type="radio"
                                    value={city.LocationName}
                                    checked={selectedCity === city.LocationName}
                                    onChange={() => handleCityChange(city.LocationName)}
                                />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className={cl.employees}>
                    <p className={cl.headline_2}>Департаменты</p>
                    <div className={cl.wrapper}>
                        
                        <div>
                            
                            {departments.map(department => (
                                <Button
                                    size="medium"
                                    key={department.id}
                                    variant={selectedDepartment === department.id ? "contained" : "outlined"}
                                    onClick={() => handleDepartmentChange(
                                    selectedDepartment === department.id ? null : department.id
                                    )}
                                    className={`${cl.departaments_btn} ${selectedDepartment === department.id ? cl.activeButton : ''}`}
                                >
                                    {department.DepartmentName}
                                </Button>
                            ))}
                        </div>
                        <div>
                            {selectedDepartment && (
                                <div >
                                    <Box className={cl.workers_table} sx={{ minWidth: 320 }}>
                                        <FormControl fullWidth>
                                            <InputLabel  sx={{ marginTop: '-8px' }}  id="position-label">Должности</InputLabel>
                                            <Select
                                                size="medium"
                                                sx={{ height: '38px' }}
                                                labelId="position-label"
                                                id="position-select"
                                                label="Должности"
                                                className={cl.worker_select}
                                                value={selectedPosition || ''}
                                                onChange={(e) => handlePositionChange(e.target.value)}  // Исправление тут
                                            >
                                                <MenuItem value=''>Выберите должность</MenuItem>
                                                {positions.map(position => (
                                                    <MenuItem key={position.id} value={position.id}>
                                                        {position.positionTitle}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        {selectedDepartment && (
                            <div>
                                {selectedPosition && (
                                    <div>
                                        <div>
                                        {
                                            [positions.find(position => position.id === selectedPosition)].map(positionCLicked => (
                                                <div key={positionCLicked.id} className={cl.available_count_wrapper}>
                                                    <p className={cl.headline_3}>Свободные вакансии на должность: {positionCLicked.positionTitle}</p>

                                                    <div style={{ marginTop: '15px' }}>
                                                        {Array.from({ length: positionCLicked.available_count }, (_, index) => (
                                                            <Stack key={index} style={{ display: 'inline-block', margin: '4px' }}>
                                                                <Chip
                                                                    avatar={<Avatar alt="" src="" />}
                                                                    label={`Вакансия`}
                                                                    variant="outlined"
                                                                />
                                                            </Stack>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                           
                                        </div>
                                        <div style={{ marginTop: '30px' }}>
                                            {/* Здесь отображаем работников для выбранной должности */}
                                            <p className={cl.headline_2} style={{ marginBottom: '20px' }}>Список сотрудников</p>
                                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                                <TableContainer sx={{ maxHeight: 440 }}>
                                                    <Table stickyHeader aria-label="sticky table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell></TableCell>
                                                                <TableCell>Имя</TableCell>
                                                                <TableCell>Фамилия</TableCell>
                                                                <TableCell>Отчество</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {positions.find(position => position.id === selectedPosition)?.persons.map(person => (
                                                                <TableRow key={person.id}>
                                                                    <TableCell><img src={`data:image/jpeg;base64,${person.photo}`} alt="" className={cl.department_workers_img} /></TableCell>
                                                                    <TableCell>{`${person.surname}`}</TableCell>
                                                                    <TableCell>{` ${person.firstName} `}</TableCell>
                                                                    <TableCell> {`${person.patronymic}`}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      );
    } else {
      return (
        <div className={cl.employeeWrapper}>
            <div className={cl.groups}>
                <h1 className={cl.headline}>Управления</h1>
                
                <div className={cl.groups_column}>
                    {/* <div className={cl.group_name} style={{ cursor: 'pointer' }}>
                        <p>Все</p>
                        <input
                            type="radio"
                            name="table"
                            value="all"
                            checked={selectedGroupId === 'all'}
                            onChange={() => handleRadioChange('all')}
                        />
                    </div> */}
                    {/* <p>{selectedMainDepartment ? selectedMainDepartment.DepartmentName : 'Ничего не выбрано'}</p> */}
                  
                    {mainDepartments.map(department => (
                    <div key={department.id} className={cl.group_name} style={{ cursor: 'pointer' }}>
                        <label>{department.DepartmentName}</label>
                        <input 
                            type="radio"
                            id={department.id}
                            name="table"
                            checked={selectedMainDepartment === department}
                            onChange={() => handleCheckboxChangeMainDepartments(department)}
                            style={{
                            marginRight: '5px', 
                            borderRadius: '50%'
                            }}
                        />
                        
                    </div>
                    ))}

                </div>
            </div>
            <div className={cl.employees}>
                    <table className={cl.table}>
                        <thead>
                            <tr>
                                <th className={cl.table__headline}>ФИО</th>
                                <th className={cl.table__headline}>Пол</th>
                                <th className={cl.table__headline}>Должность</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {selectedGroupId === 'all' && personalData.map((data, index) => {
                                let name = `${data.surname || ''} ${data.firstName || ''} ${data.patronymic || ''}`;

                                return (
                                <tr key={data.id} onClick={() => handleEmployeeClick(data.id, data.iin)} className={cl.tableRow}>
                                    <td>{name}</td>
                                    <td>{gender}</td>
                                    <td>{positionTitle}</td>
                                </tr>
                                );
                            })} */}
                             {persons.map(person => (
                                <tr key={person.id}  onClick={() => handleEmployeeClick(person.id)}>
                                {/* <td>{person.id}</td> */}
                                <td>{`${person.surname} ${person.firstName} ${person.patronymic}`}</td>
                                <td>{person.gender.genderName}</td>
                                <td>{person.positionInfo.position.positionTitle}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
      );
    }
    };

    return (
        <div className={cl.homeWrapper}>
            <Navigation className={cl.navigation} /> 
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Header className={cl.header} personalData={personalData}/>
                <div className={cl.content}>
                    <div className={cl.container}>
                        <div className={cl.btn_wrapper}>
                            <div></div>
                            <Button onClick={toggleSchedule}  size="small" variant="contained" style={{ display: 'block',  textTransform: 'none' }}>
                                {showSchedule ? 'Вернуться на главную' : 'Штатное расписание'}
                            </Button>
                        </div>
                        {renderEmployeeWrapper()}
                    </div>
                    <NotificationButton className={cl.notificationButton} />
                </div>
            </div>
        </div>
    );
};

export default Home;