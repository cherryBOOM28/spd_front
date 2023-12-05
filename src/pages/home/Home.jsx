import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Home.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import employeeList from '../../components/data/employeeList.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '../../components/UI/button/Button';
import Dropdown from '../../components/dropdown/Dropdown';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { MdDownload } from "react-icons/md";
import NotificationButton from '../../components/notificationButton/NotificationButton';

function Home(props) {
    const navigate = useNavigate();

    const handleRadioChange = (value) => {
        setSelectedGroupId(value);
        // localStorage.setItem('selectedGroupId', value);
    };

    // calendar
    const [personalData, setPersonalData] = useState([]); 
    const [city, setCity] = useState({});
    const [showSchedule, setShowSchedule] = useState(false);

    const toggleSchedule = () => {
        setShowSchedule(!showSchedule);
    };

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('wholeCountry');

    const [locations, setLocations] = useState([]);
    const [groupDepartament, setGroupDepartament] = useState([]);
    const [groupLocation, setGroupLocation] = useState('Астана');


    const [ selectedGroupId, setSelectedGroupId ] = useState(
        localStorage.getItem('selectedGroupId') || 'all'
    )

    // employee
    useEffect(() => {
        setPersonalData(employeeList);
    }, [])

    const handleEmployeeClick = (id, iin) => {
        navigate(`/${id}`)
    }

    const [firstName, setFirstName] = useState([]); // Данные из бэка
    const [surname, setSurname] = useState([]); // Данные из бэка
    const [patronymic, setPatronymic] = useState([]); // Данные из бэка
    const [positionTitle, setPositionTitle] = useState([]); // Данные из бэка
    const [gender, setGender] = useState([]); // Данные из бэка
    const [departmentPeople, setDepartmentPeople] = useState([]);

    // данные из person
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

        axios.get(`http://localhost:8000/api/v1/location_departments/Астана/`)
          .then(responseCity => {
            setCity(responseCity.data);
            console.log("responseCity",responseCity.data);
        })
        .catch(error => {
            console.error("Error fetching personal data:", error);
        });
    }, []);

    const [persons, setPersons] = useState([]);

    // город
    useEffect(() => {
        // Выполняем запрос к серверу при монтировании компонента
        axios.get('http://127.0.0.1:8000/api/v1/staffing_table/?location_id=1')
          .then(responseCities => {
            setCities(responseCities.data.Departments.map(department => department.Location.LocationName));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []); // Пустой массив зависимостей указывает, что эффект должен выполняться только один раз при монтировании

    
    // отображение городов
    const handleCityClick = async (cityName) => {
        if (cityName === selectedCity) {
          // Если выбран тот же город, что и ранее, сбрасываем выбор
          setSelectedCity(null);
          setSelectedDepartment(null);
          setSelectedPosition(null);
        } else {
          setSelectedCity(cityName);
    
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/staffing_table/?location_id=1`);
            setDepartments(response.data.Departments);
            console.log("object", response.data.Departments.positionList);
            // onCityClick({ city: cityName });
          } catch (error) {
            console.error('Error fetching departments:', error);
          }
        }
    };

    // отображение департаментов
    const handleDepartmentClick = (departmentName) => {
        if (departmentName === selectedDepartment) {
            setSelectedDepartment(null);
            setSelectedPosition(null);
        } else {
          setSelectedDepartment(departmentName);
        }
    };

    // отображение должностей
    const handlePositionClick = async (positionTitle) => {
        if (positionTitle === selectedPosition) {
          setSelectedPosition(null);
        } else {
          setSelectedPosition(positionTitle);
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/staffing_table/?location_id=1`);
            const persons = response.data.persons;
            setPersons(persons);
            // onCityClick({ city: cityName });
          } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    // отображение списка людей из департаментов
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    useEffect(() => {
        // if (selectedDepartmentId) {
          axios.get(`http://127.0.0.1:8000/api/v1/persons_by_department/?department=ДЦ`)
            .then(responseDepartmentPeople => {
              setDepartmentPeople(responseDepartmentPeople.data.persons);
              console.log("persons", responseDepartmentPeople.data);
            })
            .catch(error => {
              console.error("Error fetching department people data:", error);
            });
        // }
    }, [selectedDepartmentId]);
      
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

    // главная страница - отображение городов
    const accessToken = Cookies.get('jwtAccessToken');
    const handleLocationChange = async (locationName) => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/location_departments/Астана/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          });
          setGroupDepartament(response.data.departments);
          setGroupLocation(locationName);
          setSelectedGroupId('all');
          console.log("departments", response.data.departments);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
    };
    
    useEffect(() => {
        // Load data for the initial selected location
        handleLocationChange(groupLocation);
    }, [groupLocation]);// Пустой массив зависимостей, чтобы эффект вызывался только при монтировании

    const handleClickDepartaments = () => {
        handleLocationChange('Астана');
        setSelectedGroupId(null);
    };

    // отображение tab в штаном расписании 
    const renderEmployeeWrapper = () => {
    if (showSchedule) {
      return (
        // <div className={cl.container}>
            <div className={cl.employeeWrapper}>
                <div className={cl.groups}>
                    <h1 className={cl.headline}>Штатное расписание</h1>
                    <div className={cl.groups_column}>
                        {cities.map((city, index) => (
                            <li key={index} style={{ listStyle: 'none' }}>
                                <button
                                className={city === selectedCity ? cl.active : cl.city}
                                onClick={() => handleCityClick(city)}
                                >
                                {city}
                                </button>
                            </li>
                        ))}
                    </div>
                </div>

                <div className={cl.employees}>
                {selectedCity && (
                    <div>
                        <ul style={{ width: '100%' }}>
                            {departments
                            .filter((department) => department.Location.LocationName === selectedCity)
                            .map((department, index) => (
                                <li key={index}>
                                <button
                                    className={department.DepartmentName === selectedDepartment ? cl.active : cl.city}
                                    onClick={() => handleDepartmentClick(department.DepartmentName)}
                                >
                                    {department.DepartmentName}
                                </button>
                                {selectedDepartment === department.DepartmentName && (
                                    <ul>
                                    {department.positionList.map((position, positionIndex) => (
                                        <li key={positionIndex}>
                                        <button
                                            className={position.positionTitle === selectedPosition ? cl.active_drop : cl.city_drop}
                                            onClick={() => handlePositionClick(position.positionTitle)}
                                            style={{ marginLeft: '30px' }}
                                        >
                                            {position.positionTitle}
                                        </button>
                                        {selectedPosition === position.positionTitle && (
                                            <ul>
                                            {position.persons.map((person, personIndex) => (
                                                <li key={personIndex}>
                                                    <Link to={`/${person.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                        <div className={cl.person}>
                                                            <img src={`data:image/jpeg;base64, ${person.photo.photoBinary}`} className={cl.department_workers_img} alt="Person" />
                                                            <div>{`${person.surname} ${person.firstName} ${person.patronymic}`}</div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                            </ul>
                                        )}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                                {selectedPosition && (
                                    <div className={cl. person}>
                                        <h4>Свободные вакансии: 2 {department.available_slots}</h4>
                                    </div>
                                )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                </div>
            </div>
        // </div>
      );
    } else {
      return (
        // <div className={cl.container}>
            <div className={cl.employeeWrapper}>
                <div className={cl.groups}>
                    <h1 className={cl.headline}>Города</h1>
                    
                    <div className={cl.groups_column}>
                        <div className={cl.group_name} style={{ cursor: 'pointer' }}>
                            <p>Все</p>
                            <input
                                type="radio"
                                name="table"
                                value="all"
                                checked={selectedGroupId === 'all'}
                                onChange={() => handleRadioChange('all')}
                            />
                        </div>
                        <div className={cl.group_name} style={{ cursor: 'pointer' }} onClick={() => handleLocationChange('Астана')}>
                            <p>Астана</p>
                            <input
                                type="radio"
                                name="table"
                                checked={selectedLocation === 'Астана'}
                                onChange={() => handleRadioChange('all')}
                            />
                        </div>
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
       
                                {selectedGroupId === 'all' && personalData.map((data, index) => {
                                    let name = `${data.surname || ''} ${data.firstName || ''} ${data.patronymic || ''}`;

                                    return (
                                    <tr key={data.id} onClick={() => handleEmployeeClick(data.id, data.iin)} className={cl.tableRow}>
                                        <td>{name}</td>
                                        <td>{gender}</td>
                                        <td>{positionTitle}</td>
                                    </tr>
                                    );
                                })}
                             
                            </tbody>
                        </table>
                </div>
            </div>
        // </div>
        
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
                            {/* Filters */}
                            <div className={cl.filters}>
                                
                                <div className={cl.downloaderFile}>
                                    <Dropdown
                                        title="Выберите местоположение"
                                        options={dropdownOptions}
                                        selected={selectedLocation}
                                        onSelect={setSelectedLocation}
                                    />

                                    <div className={cl.downloader}>
                                        <Button
                                            className={cl.download}
                                            onClick={handleDownload}
                                            disabled={!selectedLocation}
                                        >
                                            {selectedLocation === 'wholeCountry' ? '' : ''}
                                            <MdDownload />
                                        </Button>
                                        <NotificationContainer />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Button onClick={toggleSchedule} className={cl.btn_schedule}>
                                    {showSchedule ? 'Вернуться на главную' : 'Штатное расписание'}
                                </Button>
                            </div>
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