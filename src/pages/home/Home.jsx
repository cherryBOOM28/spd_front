import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Home.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import employeeList from '../../components/data/employeeList.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '../../components/UI/button/Button';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import defaultPic from '../../assets/images/default.jpeg';
import DepartmentDropdown from '../../components/departmentDropdown/DepartmentDropdown';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Home(props) {
 
    const navigate = useNavigate();

    // Select optopn(working or not)
    const [ selectedOption, setSelectedOption ] = useState('');

    const handleRadioChange = (value) => {
        setSelectedGroupId(value);
        localStorage.setItem('selectedGroupId', value);
    };


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    // calendar
    const [selectedDate, setSelectedDate] = useState(null);
    const [ includeFired, setIncludeFired ] = useState(false);

    const [personalData, setPersonalData] = useState([]); 

    const [ selectedGroupId, setSelectedGroupId ] = useState(
        localStorage.getItem('selectedGroupId') || 'all'
    )
    
    const [groups, setGroups ] = useState([
        {
            "id": 9,
            "group_name": "IT department",
            "general_info": []
        },
        {
            "id": 10,
            "group_name": "HR department",
            "general_info": [
                {
                    "id": 14,
                    "iin": "030409550850",
                    "surname": "Саткан",
                    "firstname": "Шынгыс",
                    "patronymic": "Менсейтулы",
                    "gender": "M",
                    "birth_date": "2003-04-09",
                    "birth_country": "Казахстан",
                    "birth_city": "Атырау",
                    "birth_region": "Астана",
                    "nationality": "казах",
                    "id_numbers": "541223456",
                    "id_from": "МВД РК",
                    "phone_number": "87759346820",
                    "resid_country": "Казахстан",
                    "resid_city": "Атырау",
                    "resid_region": "Астана",
                    "pin": "123",
                    "id_date": "2019-04-19",
                    "group": 10
                },
                {
                    "id": 15,
                    "iin": "020922550560",
                    "surname": "Касымбаев",
                    "firstname": "Куаныш",
                    "patronymic": "Куанышулы",
                    "gender": "M",
                    "birth_date": "2002-04-10",
                    "birth_country": "Казахстан",
                    "birth_city": "Астана",
                    "birth_region": "Астана",
                    "nationality": "казах",
                    "id_numbers": "541223456",
                    "id_from": "МВД РК",
                    "phone_number": "8777777777",
                    "resid_country": "Казахстан",
                    "resid_city": "Астана",
                    "resid_region": "Астана",
                    "pin": "1234",
                    "id_date": "2019-04-20",
                    "group": 10
                }
            ]
        }
    ])


    // checkbox
    const handleCheckboxFiredChange = () => {
        setIncludeFired(!includeFired);
    }

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

    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');

        axios.get(`http://localhost:8000/api/v1/person/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
          .then(response => {
            console.log("response", response);
            setPersonalData(response.data.sort());
            setFirstName(response.data[0].firstName);
            setSurname(response.data[0].surname);
            setPatronymic(response.data[0].patronymic);
            setGender(response.data[0].gender.genderName);
            setPositionTitle(response.data[0].positionInfo.position.positionTitle);


            console.log("data[0][2]",response.data[0].positionInfo.position.positionTitle)
        })
        .catch(error => {
            console.error("Error fetching personal data:", error);
        });

        axios.get(`http://localhost:8000/group/`)
          .then(response => {
            setGroups(response.data);
        })
        .catch(error => {
            console.error("Error fetching personal data:", error);
        });
    }, []);

    const [showSchedule, setShowSchedule] = useState(false);

    const toggleSchedule = () => {
        setShowSchedule(!showSchedule);
    };

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionTitle, setselectedPositionTitle] = useState(null);

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        // Выполняем запрос к серверу при монтировании компонента
        axios.get('http://127.0.0.1:8000/api/v1/staffing_table/?location_id=1')
          .then(response => {
            setCities(response.data.Departments.map(department => department.Location.LocationName));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []); // Пустой массив зависимостей указывает, что эффект должен выполняться только один раз при монтировании
    
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

    const handleDepartmentClick = (departmentName) => {
        if (departmentName === selectedDepartment) {
            setSelectedDepartment(null);
            setSelectedPosition(null);
        } else {
          setSelectedDepartment(departmentName);
        }
    };

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
 
    

    const renderEmployeeWrapper = () => {
    if (showSchedule) {
      // Вместо расписания, вставьте свой код для отображения расписания сотрудников
      return (
        // <div className={cl.container}>
            <div className={cl.employeeWrapper}>
                {/* Ваш код для отображения расписания сотрудников */}
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
                        {groups.map(group => (
                            <div key={group.id} className={cl.group_name} style={{cursor: 'pointer'}} onClick={() => setSelectedGroupId(group.id)}>
                            
                                <p>{group.group_name}</p>
                                <input 
                                    type="radio"
                                    name="table"
                                    value={group.group_name}
                                    key={group.id}
                                    checked={selectedGroupId === group.id}
                                    onChange={() => setSelectedGroupId(group.id)}
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
                                

                                {selectedGroupId === 'all' && (
                                        personalData.map((data, index) => {
                                        let name = `${data.surname || ''} ${data.firstName || ''} ${data.patronymic || ''}`
                                

                                        return (
                                            <tr key={data.id} onClick={() => handleEmployeeClick(data.id, data.iin)} className={cl.tableRow}>
                                                <td>{name}</td>
                                                <td>{gender}</td>
                                                <td>{positionTitle}</td>
                                            </tr>
                                        )
                                        })
                                    )}

                                {groups.filter(group => group.id === selectedGroupId)[0] && groups.filter(group => group.id === selectedGroupId)[0].general_info.length === 0 ? 
                                    <tr className={cl.tableRow}>
                                        <td colspan="5" align='center' style={{textAlign: 'center', padding: '20px'}}>Нет сотрудников</td>
                                    </tr>
                                    : ""
                                }
                                {groups.filter(group => group.id === selectedGroupId)[0] &&  groups.filter(group => group.id === selectedGroupId)[0].general_info
                                .map((data, index) => {
                                    let name = `${data.surname || ''} ${data.firstName || ''} ${data.patronymic || ''}`
                                    // let gender = data.gender === 'M' ? 'Мужской' : 'Женский'
                            

                                    return (
                                        <tr key={data.id} onClick={() => {handleEmployeeClick(data.id, data.iin)}} className={cl.tableRow}>
                                            <td>{name}</td>
                                            <td>{gender}</td>
                                            <td>{positionTitle}</td>
                                        </tr>
                                    )
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
                                <div className={cl.select}>
                                    <select value={selectedOption} onChange={handleSelectChange}>
                                        <option value="" disabled>Выберите...</option>
                                        <option value="working">Работающие</option>
                                        <option value="non-working">Неработающие</option>
                                    </select>
                                    <div className={cl.select__arrow}>&#9660;</div>
                                </div>

                                <div className={cl.dateOn}>
                                    <p className={cl.dateText}>на дату</p>
                                    <input 
                                        type="date" 
                                        name="" 
                                        id=""
                                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                        className={cl.calendar}
                                    />
                                </div>

                                <div className={cl.including}>
                                    <label className={cl.including__label}>
                                        <input 
                                            type='checkbox'    
                                            checked={includeFired}
                                            onChange={handleCheckboxFiredChange}
                                            className={cl.checkbox}
                                        />
                                        включая уволенных после  
                                    </label>
                                    <p className={cl.selectedDate}>
                                        {selectedDate ? selectedDate.toLocaleDateString() : 'Выбранная дата'}
                                    </p>
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
                   
                </div>
            </div>
        </div>
    );
}

export default Home;