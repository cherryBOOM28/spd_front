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
import bgBack  from '../../assets/images/bgbgbgbg.svg';

import { FiAlertCircle } from "react-icons/fi";

import { ImUserMinus } from "react-icons/im";
import { BsFillSuitcase2Fill } from "react-icons/bs";
import { RiExchangeBoxFill } from "react-icons/ri";


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

    const [selectedRadio, setSelectedRadio] = useState('default');

    useEffect(() => {
        const savedRadio = sessionStorage.getItem('selectedRadio');
        if (savedRadio) {
            setSelectedRadio(savedRadio);
        }
    }, []);

    const handleRadioChange = (event) => {
        const value = event.target.value;
        sessionStorage.setItem('selectedRadio', value);
        setSelectedRadio(value);
    };

    // Восстановление выбранного управления из sessionStorage при загрузке компонента
    useEffect(() => {
        const savedMainDepartment = sessionStorage.getItem('selectedMainDepartment');
        if (savedMainDepartment) {
            setSelectedMainDepartment(JSON.parse(savedMainDepartment));
        }
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
            // const allPeople = response.data;
            // const firedPeople = allPeople.filter(person => person.isFired);
            // fetchFiredPeople(firedPeople);
        } catch (error) {
            console.log("fired", error)
        }
    };



    const handleFiredCheckbox = () => {
        setShowFired(!showFired);
    };
    // const handleFiredCheckbox = () => {
    //     setShowFired(prevState => !prevState); // Изменение состояния на противоположное
    // };
    const filteredPeople = showFired ? people.filter(person => person.isFired) : people;
    // const filteredPeople = showFired ? persons.filter(person => person.isFired) : persons;



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



    // отображаение руководства
     useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/persons_by_department/?departmentId=Руководство`)
          .then(response => {
            setHeadDepartment(response.data.persons);
             console.log("head for department", response.data);
        })
        .catch(error => {
            console.error("Error fetching personal data:", error);
        });
    }, []);


    // Обработчик изменения радио-переключателя
    // const handleHeadDepartmentClick = () => {
    //     setShowHeadDepartment(true);
    // };
    const handleHeadDepartmentClick = () => {
        // setShowHeadDepartment(prevState => !prevState); //  асинхронный колбэк для установки состояния
        setShowHeadDepartment(true); 
        setSelectedMainDepartment('Руководство');
    };


    const handleCheckboxChangeMainDepartments = (department) => {
        if (department) {
            setSelectedMainDepartment(department);
            if (department.id) {
                getEmployeesByDepartmentId(department.id);
                setSelectedDepartment(department.id);
            }
            setShowHeadDepartment(false);
            // Дополнительные действия, если необходимо
        } else {
            console.log("Department is undefined");
        }
    };
    


    // Обработчик изменения выбранного управления
    const handleDepartmentChange = (department, departmentId) => {
        setSelectedMainDepartment(department);
        setShowHeadDepartment(false);
        if (departmentId) {
            setSelectedDepartment(departmentId);
            setShowDepartments(!showDepartments);
        }
    };
    // const handleDepartmentChange = (department, departmentId) => {
    //     setSelectedMainDepartment(department);
    //     setSelectedDepartment(departmentId);
    //     setShowHeadDepartment(false);
    // };
    

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
            // console.log("data[0][2]",response.data)
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


    const [showDepartments, setShowDepartments] = useState(true);
    
    // const handleDepartmentChange = (departmentId) => {
    //     setSelectedDepartment(departmentId);
    //     setShowDepartments(!showDepartments);
    // };

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



    // Определяем состояние для отображения информации о статусе сотрудника при наведении
    const [statusInfo, setStatusInfo] = useState(null);

    // Определение функции handleMouseEnter
    const handleMouseEnter = (person) => {
        setStatusInfo({
            id: person.id, // сохраняем id сотрудника для идентификации
            info: (
                <div className={cl.statusDescription}>
                    <div className={cl.statusDescriptionInner}>  <ImUserMinus style={{ color: '#1B3884' }} />{person.isFired ? 'Уволен' : 'Не уволен'}</div>
                    <div className={cl.statusDescriptionInner}> <BsFillSuitcase2Fill style={{ color: '#1B3884' }} />{person.inVacation ? 'В отпуске' : 'Не в отпуске'}</div>
                    <div className={cl.statusDescriptionInner}> <RiExchangeBoxFill style={{ color: '#1B3884' }} />{person.inKomandirovka ? 'В командировке' : 'Не в командировке'}</div>
                </div>
            ),
        });
    };

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
                                <MdDownload style={{ color: '#1B3884' }} />
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
                        <div>
                            {departments.map(department => (
                                <Button
                                    size="medium"
                                    style={{ textTransform: 'none',  color: '#1B3884', borderColor: '#1B3884', }}
                                    key={department.id}
                                    variant={selectedDepartment === department.id ? "outlined" : "text"}
                                    onClick={() => handleDepartmentChange(selectedDepartment === department.id ? null : department, department.id)}
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
                                                    <div style={{ marginTop: '15px',  display: 'flex', flexWrap: 'wrap'  }}>
                                                        {positionClicked.vacancies.length > 0 ? (
                                                            positionClicked.vacancies.map((vacancy, index) => (
                                                                <Stack key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
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
                                                        {(!positions.find(position => position.id === selectedPosition)?.persons || 
                                                        positions.find(position => position.id === selectedPosition)?.persons.length === 0) && (
                                                            <TableRow>
                                                                <TableCell colSpan={4} align="center">Нет данных</TableCell>
                                                            </TableRow>
                                                        )}
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
                <div className={cl.group_name} style={{ cursor: 'pointer' }} onClick={handleHeadDepartmentClick}>
                    <p>Руководство</p>
                    <input 
                        type="radio"
                        name="table"
                        value="all"
                        checked={showHeadDepartment}
                        onChange={handleHeadDepartmentClick}
                        
                    />

                </div>
                <h1 className={cl.headline} style={{ marginTop: '20px' }}>Управления</h1>
                
                <div className={cl.groups_column}>
                   
                    {/* <p>{selectedMainDepartment ? selectedMainDepartment.DepartmentName : 'Ничего не выбрано'}</p> */}
                  
                    {mainDepartments.map(department => (
                    <div key={department.id} className={cl.group_name} style={{ cursor: 'pointer' }} onClick={() => handleCheckboxChangeMainDepartments(department)}>
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
                            borderRadius: '50%',
                            cursor: 'pointer'
                            }}
                        />
                    </div>
                    ))}

                </div>
            </div>

            <div className={cl.employees}>
               
                <div className={cl.tableContainer}>
                    <table className={cl.table}>
                        <thead>
                            <tr>
                                <th className={cl.table__headline}></th>
                                <th className={cl.table__headline}>ФИО</th>
                                <th className={cl.table__headline}>Должность</th>
                                <th className={cl.table__headline}>Статус</th>

                            </tr>
                        </thead>

 
                        <tbody>
                            {(showHeadDepartment ? headDepartment : 
                                (showFired ? filteredPeople.filter(person => person.isFired && (selectedDepartment === null || person.positionInfo.department.id === selectedDepartment)) : persons))
                                .map(person => (
                                    <tr 
                                        key={person.id}
                                        onClick={() => handleEmployeeClick(person.id)}
                                        className={`
                                            ${cl.tableRow} 
                                            ${person.isFired ? cl.fired : ''} 
                                            ${person.inVacation ? cl.vacation : ''} 
                                            ${person.inKomandirovka ? cl.komandirovka : ''}
                                        `}
                                        
                                    >
                                        <td><img src={`data:image/jpeg;base64,${person.photo.photoBinary}`} alt="d" className={cl.profileImg} /></td>
                                        <td>{`${person.surname} ${person.firstName} ${person.patronymic}`}</td>
                                        <td>{person.positionInfo.position.positionTitle}</td>
                                        <td style={{ position: 'relative' }}>
                                            <div 
                                                className={cl.infoIcon} 
                                                onMouseEnter={() => handleMouseEnter(person)}
                                                onMouseLeave={() => setStatusInfo(null)} // обработчик для сброса состояния при уходе курсора
                                            >
                                                <FiAlertCircle style={{ color: '#1B3884', fontSize: '20px' }} />
                                                {statusInfo && statusInfo.id === person.id && ( // добавляем условие, чтобы отображать информацию только для выбранного сотрудника
                                                    <div className={cl.statusInfoOverlay}>{statusInfo.info}</div>
                                                )}
                                            </div>
                                        </td>
                                        


                                    </tr>
                                ))}
                                {showFired && filteredPeople.filter(person => person.isFired && (selectedDepartment === null || person.positionInfo.department.id === selectedDepartment)).length === 0 && (
                                    <tr>
                                        <td colSpan="9">Нет уволенных людей</td>
                                    </tr>
                                )}
                        </tbody>

{/* <tbody>
    {(showFired ? filteredPeople.filter(person => person.isFired && (selectedDepartment === null || person.positionInfo.department.id === selectedDepartment)) : [])
        .map(person => (
            <tr 
                key={person.id}
                onClick={() => handleEmployeeClick(person && person.id)}
                className={`
                    ${cl.tableRow} 
                    ${person.isFired ? cl.fired : ''} 
                    ${person.inVacation ? cl.vacation : ''} 
                    ${person.inKomandirovka ? cl.komandirovka : ''}
                `}
            >
                <td><img src={`data:image/jpeg;base64,${person.photo.photoBinary}`} alt="d" className={cl.profileImg} /></td>
                <td>{`${person.surname} ${person.firstName} ${person.patronymic}`}</td>
                <td>{person.positionInfo.position.positionTitle}</td>
                <td style={{ position: 'relative' }}>
                    <div 
                        className={cl.infoIcon} 
                        onMouseEnter={() => handleMouseEnter(person)}
                        onMouseLeave={() => setStatusInfo(null)}
                    >
                        <FiAlertCircle style={{ color: '#1B3884', fontSize: '20px' }} />
                        {statusInfo && statusInfo.id === person.id && (
                            <div className={cl.statusInfoOverlay}>{statusInfo.info}</div>
                        )}
                    </div>
                </td>
            </tr>
        ))
    }
    {showFired && filteredPeople.length === 0 && <tr><td colSpan="4">Нет уволенных сотрудников</td></tr>}
</tbody> */}
                       
                    </table>
                    <div className={cl.bgPicWrapper}>

                        <img src={bgBack} alt="" className={cl.bgPic} />
                    </div>
                </div>
                
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
                                            style={{ color: '#1B3884' }}
                                        />
                                    </>
                                )}
                            </div>
                            <Button 
                                onClick={toggleSchedule}  
                                size="small" variant="contained" 
                                style={{ display: 'block',  textTransform: 'none', margin: '6px 0', background: '#1B3884' }}
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