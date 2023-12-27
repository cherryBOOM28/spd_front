import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './NewPersonal.module.css';
import { useForm } from '../formProvider/FormProvider';
import Cookies from 'js-cookie';


function NewPersonal() {

  const { positionInfo, setPositionInfo } = useForm();
  const { person, setPerson } = useForm();
  const { emptyInputs, handleInputChange, handleSubmit } = useForm();
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const fetchData = async (id) => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.get(`http://localhost:8000/api/v1/department`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      // console.log("response", response.data);
  
      if (response.status === 200) {
        setDepartments(response.data);
        // setPerson(response.data.Person);  
        if (positionInfo.department != '') {
          const selectedDepartment = response.data.find(
            (department) => department.DepartmentName == positionInfo.department
          );
          fetchPositions(selectedDepartment)
        }

      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  };

  useEffect(() => {
    fetchData();
    // Запрос данных о департаментах при загрузке компонента
  }, []);


  const handleDropdownChange = (selectedDepartmentName) => {
    const selectedDepartment = departments.find(
      (department) => department.DepartmentName === selectedDepartmentName
    );
  
    if (selectedDepartment) {
      console.log("Selected Department ID:", selectedDepartment.id);
      console.log("Selected  DepartmentName:", selectedDepartment.DepartmentName);

      handleInputChange(setPositionInfo, 'department', selectedDepartment.DepartmentName);
      setSelectedDepartment(selectedDepartmentName);
      fetchPositions(selectedDepartment);
    } else {
      console.error("Selected department not found");
    }
  };
  

  const fetchPositions = async (departmentId) => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.get(`http://localhost:8000/api/v1/positions_departments/${departmentId.id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setPositions(response.data.positions);
        console.log('Positions:', response.data.positions);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

   

  return (
    <div className={cl.info__block}>
        <form onSubmit={handleSubmit}>
            <div className={cl.workerBlock}>
             
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Департамент*</label>
                        <select 
                          onChange={(e) => handleDropdownChange(e.target.value)}
                          className={cl.workerInfoSelect}
                          value={positionInfo.department}
                        >
                        <option value="">Выберите департамент</option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.DepartmentName}>
                            {department.DepartmentName}
                          </option>
                        ))}
                        </select>
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Должность*</label>
                            <select 
                              onChange={(e) => handleInputChange(setPositionInfo, 'position', e.target.value)}
                              value={positionInfo.position}
                              className={cl.workerInfoSelect}
                            >
                              <option value="">Выберите должность</option>
                              {positions.map((position) => (
                                <option key={position.id} value={position.positionTitle}>
                                  {position.positionTitle}
                                </option>
                              ))}
                          </select>
                    </div>
                </div>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Семейное положение*</label>
                            <select
                            className={cl.workerInfoSelect}
                            name="familyStatus"
                            value={person.familyStatus}
                            onChange={(e) => handleInputChange(setPerson, 'familyStatus', e.target.value)}
                            >
                                <option value="">Выберите семейное положение</option>
                                <option value="Не женат/не замужем">Не женат/не замужем</option>
                                <option value="Женат/замужем">Женат/замужем</option>
                                <option value="Вдова/вдовец">Вдова/вдовец</option>
                                <option value="Разведена/разведен">Разведен/разведена</option>
                            </select>
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Дата назначения*</label>
                        <input
                            type="date"
                            className={cl.workerInfo}
                            required
                            name="receivedDate"
                            value={positionInfo.receivedDate}
                            onChange={(e) => handleInputChange(setPositionInfo, 'receivedDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/* <Button onClick={handleSubmit} type="submit" className={cl.actionBtn}>Сохранить</Button> */}
        </form>
    </div>

  )
}

export default NewPersonal;