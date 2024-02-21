import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Home.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import Dropdown from '../../components/dropdown/Dropdown';
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
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';


function Home(props) {
    const navigate = useNavigate();

    const [persons, setPersons] = useState([]);
    const [personalData, setPersonalData] = useState([]); 
    const [showSchedule, setShowSchedule] = useState(false);

    const [mainDepartments, setMainDepartments] = useState([]);
    const [selectedMainDepartment, setSelectedMainDepartment] = useState(null);

    const [people, setPeople] = useState([]);
    const [showFired, setShowFired] = useState(false);

    useEffect(() => {
        fetchFiredPeople();
    }, []);

    const fetchFiredPeople = async (departmentId) => {
        try {
            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.get(`http://localhost:8000/api/v1/person/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            setPeople(response.data);
        } catch (error) {
            console.log("fired", error)
        }
    };

    const handleFiredCheckbox = () => {
        setShowFired(!showFired);
    };

   
    const filteredPeople = showFired ? people.filter(person => person.isFired) : people;

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


    // отображаение руководства 
    const [headDepartment, setHeadDepartment] = useState([]);
    const [showHeadDepartment, setShowHeadDepartment] = useState(false);

    useEffect(() => {
        if (showHeadDepartment) {
            getHeadDepartment();
        }
    }, [showHeadDepartment]);

    const getHeadDepartment = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/persons_by_department/?departmentId=Руководство');
            setHeadDepartment(response.data.persons);
            // console.log("head for department", response.data);
            // Обработка данных сотрудников
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Обработчик изменения радио-переключателя
    const handleHeadDepartmentClick = () => {
        setShowHeadDepartment(true);
    };

      
    // Пример использования функции с id департамента
    // getEmployeesByDepartmentId(1);

    // обновление выбранный департнамент при изменении чекбокса
    const handleCheckboxChangeMainDepartments = (department) => {
        if (department) {
            // console.log("Setting selected department:", department);
            setSelectedMainDepartment(department);
            getEmployeesByDepartmentId(department.id);
            setSelectedDepartment(department.id);
            // console.log("Selected department updated:", department.id);
        }
    };
    


    // Выбор все на главной страницу
     const [ selectedGroupId, setSelectedGroupId ] = useState(
        localStorage.getItem('selectedGroupId') || 'all'
    );

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
            setPersonalData("people", response.data);

            setFirstName(response.data[0].firstName);
            setSurname(response.data[0].surname);
            setPatronymic(response.data[0].patronymic);
            setGender(response.data[0].gender.genderName);
            setPositionTitle(response.data[0].positionInfo.position.positionTitle);
            console.log("data[0][2]",response.data)
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


    // Дропдаун с управлениями для скачивания таблиц
    const handleDownload = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/v1/staffing-table/downloadStaffingTable?department=${encodeURIComponent(selectedStaffingTable)}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob',
            });
    
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', 'staffing_table.docx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    };
    
    const [selectedStaffingTable, setSelectedStaffingTable] = useState('');

    const handleTableChange = (event) => {
        const value = event.target.value;
        setSelectedStaffingTable(value);
        console.log('Выбранное значение:', value);
    };

     
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
    // useEffect(() => {
    //     const accessToken = Cookies.get('jwtAccessToken');
    //     axios.get('http://127.0.0.1:8000/api/v1/location', {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //     }
    //     })
    //     .then(response => {
    //         setCities(response.data)
    //         // console.log(response.data)
    //     })
    //     .catch(error => console.error('Error fetching data:', error));
        
    // }, []);

    // Все управления
    

    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        fetchDepartments(accessToken);
    }, []);

    const fetchDepartments = (accessToken) => {
        axios.get(`http://127.0.0.1:8000/api/v1/department`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then(response => {
            setDepartments(response.data);
        })
        .catch(error => console.log("Error fetching departments:", error));
    };

    // useEffect(() => {
    //     const accessToken = Cookies.get('jwtAccessToken');
    //     axios.get(`http://127.0.0.1:8000/api/v1/department`, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //         }
    //     })
    //     .then(response => {
    //         setDepartments(response.data)
    //     })
    //     .catch(error => console.log("Error", error))
    // });

    // выбранный город который отображает департаменты этого города
    useEffect(() => {
        if (selectedCity) {
          const accessToken = Cookies.get('jwtAccessToken');
    
          axios.get(`http://127.0.0.1:8000/api/v1/location_departments/${selectedCity}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          })
            .then(response => {setDepartments(response.data.departments)
                // console.log(selectedCity)
            })
            .catch(error => console.error('Error fetching departments:', error));
        }
    }, [selectedCity]);


  
    const handleCityChange = (cityId) => {
        setSelectedCity(cityId);
        setSelectedDepartment(null);
        setSelectedPosition(null)
    };


    const [showDepartments, setShowDepartments] = useState(true);
    const [vacancies, setVacancies] = useState([]);
    
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
    
          axios.get(`http://127.0.0.1:8000/api/v1/staffing-table/getStaffingTable?department_id=${selectedDepartment}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          })
            .then(response => 
                {
                    setPositions(response.data.positionList)
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
                        <FormControl  size="small" fullWidth style={{ width: '300px' }}>
                            <InputLabel id="demo-simple-select-label">Штатное расписание</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Штатное расписание"
                                value={selectedStaffingTable}
                                onChange={handleTableChange}
                                // sx={{ height: '32.75px !important' }} 
                            >
                                <MenuItem value="Все управления">Все управления</MenuItem>
                                {departments.map((department) => (
                                    <MenuItem key={department.id} value={department.DepartmentName}>
                                        {department.DepartmentName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={cl.downloader}>
                            <IconButton 
                                variant="outlined"
                                onClick={handleDownload}

                            >
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
                        {/* {cities.map(city => (
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
                        ))} */}
                        <div>
                            {departments.map(department => (
                                <Button
                                    size="medium"
                                    style={{ textTransform: 'none' }}
                                    key={department.id}
                                    variant={selectedDepartment === department.id ? "outlined" : "text"}
                                    onClick={() => handleDepartmentChange(
                                    selectedDepartment === department.id ? null : department.id
                                    )}
                                    className={`${cl.departaments_btn} ${selectedDepartment === department.id ? cl.activeButton : ''}`}
                                >
                                    {department.DepartmentName}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cl.employees}>
                    <p className={cl.headline_2}>Должности</p>
                    <div className={cl.wrapper}>
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
                                                {positions && positions.map(position => (
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
                                            [positions.find(position => position.id === selectedPosition)].map(positionClicked => (
                                                <div key={positionClicked.id} className={cl.available_count_wrapper}>
                                                    <p className={cl.headline_3}>Свободные вакансии на должность: {positionClicked.positionTitle}</p>
                                                    <div style={{ marginTop: '15px' }}>
                                                        {positionClicked.vacancies.length > 0 ? (
                                                            positionClicked.vacancies.map((vacancy, index) => (
                                                                <Stack key={index} style={{ display: 'inline-block', margin: '0px' }}>
                                                                    <Chip
                                                                        sx={{ height: 'auto', minHeight: '28px' }} // Установка стилей через sx
                                                                        avatar={<Avatar alt="" src="" />}
                                                                        label={
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '5px' }}>
                                                                                <div>Вакансия {index + 1}:</div>
                                                                                <div>Дата открытия вакансии: {vacancy.available_date}</div>
                                                                            </div>
                                                                        }
                                                                        variant="outlined"
                                                                    />
                                                                </Stack>
                                                            ))
                                                        ) : (
                                                            <Chip
                                                                label="Нет доступных вакансий" variant="outlined"  
                                                            />
                                                            // <p>Нет доступных вакансий</p>
                                                        )}
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
                                                                    <TableCell><img src={`data:image/jpeg;base64,${person.photo.photoBinary}`} alt="" className={cl.department_workers_img} /></TableCell>
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
        <div className={cl.employeeWrapper} >
            <div className={cl.groups}>
                <div className={cl.group_name} style={{ cursor: 'pointer' }}>
                    <p>Руководство</p>
                    <input 
                        type="radio"
                        name="table"
                        value="all"
                        checked={showHeadDepartment}
                        onChange={() => {
                            console.log("Before setShowHeadDepartment", showHeadDepartment);
                            setShowHeadDepartment(prevState => !prevState);
                            console.log("After setShowHeadDepartment", showHeadDepartment);
                            if (!showHeadDepartment) {
                                console.log("Resetting selected department and updating data");
                                setSelectedMainDepartment(null);
                                handleCheckboxChangeMainDepartments(null);
                            }
                        }}
                    />


                </div>
                <h1 className={cl.headline} style={{ marginTop: '20px' }}>Управления</h1>
                
                <div className={cl.groups_column}>
                   
                    {/* <p>{selectedMainDepartment ? selectedMainDepartment.DepartmentName : 'Ничего не выбрано'}</p> */}
                  
                    {mainDepartments.map(department => (
                    <div key={department.id} className={cl.group_name} style={{ cursor: 'pointer' }}>
                        <label>{department.DepartmentName}</label>
                        <input 
                            type="radio"
                            id={department.id}
                            name="table"
                            checked={selectedMainDepartment === department}
                            
                            // onChange={() => handleCheckboxChangeMainDepartments(department)}

                            onChange={() => {
                                setSelectedMainDepartment(department);
                                setShowHeadDepartment(false); // Установите showHeadDepartment в false при выборе других групп
                                handleCheckboxChangeMainDepartments(department);
                            }}

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
                                <th className={cl.table__headline}></th>
                                <th className={cl.table__headline}>ФИО</th>
                                <th className={cl.table__headline}>Должность</th>
                            </tr>
                        </thead>
                


                        {/* Отображение уволенных людей и обычных сотрудников */}
                        {!showHeadDepartment && (
                            <tbody>
                                {showFired ? (
                                    // Отображение уволенных людей
                                    (filteredPeople.filter(person => person.isFired && (selectedDepartment === null || person.positionInfo.department.id === selectedDepartment)).length > 0 ? (
                                        filteredPeople.map(person => (
                                            (selectedDepartment === null || person.positionInfo.department.id === selectedDepartment) && person.isFired && (
                                                <tr key={person.id} onClick={() => handleEmployeeClick(person.id)}>
                                                    <td><img src={`data:image/jpeg;base64,${person.photo.photoBinary}`} alt="d" className={cl.profileImg} /></td>
                                                    <td>{`${person.surname} ${person.firstName} ${person.patronymic}`}</td>
                                                    <td>{person.positionInfo.position.positionTitle}</td>
                                                </tr>
                                            )
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='3' style={{ textAlign: 'center' }}>Нет уволенных людей</td>
                                        </tr>
                                    ))
                                ) : (
                                    // Отображение обычных сотрудников
                                    persons
                                    .filter(person => !person.isFired) // Исключить уволенных людей
                                    .map(person => (
                                        (selectedDepartment === null || person.positionInfo.department.id === selectedDepartment) && (
                                            <tr key={person.id} onClick={() => handleEmployeeClick(person.id)}>
                                                <td><img src={`data:image/jpeg;base64,${person.photo.photoBinary}`} alt="d" className={cl.profileImg} /></td>
                                                <td>{`${person.surname} ${person.firstName} ${person.patronymic}`}</td>
                                                <td>{person.positionInfo.position.positionTitle}</td>
                                            </tr>
                                        )
                                    ))
                                )}
                            </tbody>
                        )}
{/* {console.log("Before head department check")}
{console.log("showHeadDepartment:", showHeadDepartment)}
{console.log("headDepartment:", headDepartment)}
{console.log("headDepartment.persons:", headDepartment && headDepartment.persons)}

{console.log("Before rendering head department tbody")} */}

<div>
            <button onClick={handleHeadDepartmentClick}>Руководство</button>
            {showHeadDepartment && (
                <table>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Должность</th>
                        </tr>
                    </thead>
                    <tbody>
                        {headDepartment.persons && headDepartment.persons.map(person => (
                            person && person.id && person.positionInfo && person.positionInfo.position && (
                                <tr key={person.id} onClick={() => handleEmployeeClick(person.id)}>
                                    <td>{`${person.surname} ${person.firstName} ${person.patronymic}`}</td>
                                    <td>{person.positionInfo.position.positionTitle}</td>
                                </tr>
                            )
                        ))}
                    </tbody>


                </table>
            )}
        </div>


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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {!showSchedule && (
                                    <>
                                        <p>Только уволенные</p>
                                        <Checkbox 
                                            checked={showFired} 
                                            onChange={handleFiredCheckbox} 
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </>
                                )}
                            </div>
                            <Button 
                                onClick={toggleSchedule}  
                                size="small" variant="contained" 
                                style={{ display: 'block',  textTransform: 'none', margin: '6px 0' }}
                            >
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