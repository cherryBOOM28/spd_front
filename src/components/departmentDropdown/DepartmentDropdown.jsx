import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './DepartmentDropdown.module.css';

const DepartmentDropdown = ({  onCityClick }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

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
            onCityClick({ city: cityName });
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

    const handlePositionClick = (positionTitle) => {
        if (positionTitle === selectedPosition) {
          setSelectedPosition(null);
        } else {
          setSelectedPosition(positionTitle);
        }
    };

  return (
    <div>
      <h2>Список городов</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <button 
                onClick={() => handleCityClick(city)}
                className={city === selectedCity ? cl.active : ''}
            >
              {city}
            </button>
          </li>
        ))}
      </ul>

      {selectedCity && (
        <div>
          <h3>{selectedCity}</h3>
          <ul>
            {departments
              .filter((department) => department.Location.LocationName === selectedCity)
              .map((department, index) => (
                <li key={index}>
                  <button
                    className={department.DepartmentName === selectedDepartment ? cl.active : ''}
                    onClick={() => handleDepartmentClick(department.DepartmentName)}
                  >
                    {department.DepartmentName}
                  </button>
                  {selectedDepartment === department.DepartmentName && (
                    <ul>
                      {department.positionList.map((position, positionIndex) => (
                        <li key={positionIndex}>
                          <button
                            className={position.positionTitle === selectedPosition ? cl.active : ''}
                            onClick={() => handlePositionClick(position.positionTitle)}
                          >
                            {position.positionTitle}
                          </button>
                          {selectedPosition === position.positionTitle && (
                            <ul>
                              {position.persons.map((person, personIndex) => (
                                <li key={personIndex}>
                                  <img src={person.photo.photoBinary} alt="Person" />
                                  <div>{`${person.surname} ${person.firstName} ${person.patronymic}`}</div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {selectedPosition && (
                    <div>
                      <h4>Свободные вакансии: {department.available_slots}</h4>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DepartmentDropdown;
