import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './NewPersonal.module.css';
import { useForm } from '../formProvider/FormProvider';
import Cookies from 'js-cookie';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';



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
        // console.log(response.statusText);
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
      // console.log("Selected Department ID:", selectedDepartment.id);
      // console.log("Selected  DepartmentName:", selectedDepartment.DepartmentName);

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
        // console.log('Positions:', response.data.positions);
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
                        <Box>
                            {/* <label className={cl.label}>Должность</label> */}
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Департамент</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Департамент"
                                name='attResult'
                                onChange={(e) => handleDropdownChange(e.target.value)}
                                className={cl.workerInfoSelect}
                                value={positionInfo.department}
                                
                                >
                                    <MenuItem value="Бакалавр" disabled>Выберите департамент</MenuItem>
                                    {departments.map((department) => (
                                      <MenuItem key={department.id} value={department.DepartmentName}>
                                        {department.DepartmentName}
                                      </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Должность*</label>
                          <Box>
                            {/* <label className={cl.label}>Должность</label> */}
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Департамент</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Департамент"
                                name='attResult'
                                onChange={(e) => handleInputChange(setPositionInfo, 'position', e.target.value)}
                                value={positionInfo.position}
                                className={cl.workerInfoSelect}
                                >
                                    <MenuItem value="Бакалавр" disabled>Выберите должность</MenuItem>
                                    {positions.map((position) => (
                                      <MenuItem key={position.id} value={position.positionTitle}>
                                        {position.positionTitle}
                                      </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Семейное положение*</label>
                            <Box>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Семейное положение</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Семейное положение"
                                    name='attResult'
                                    onChange={(e) => handleInputChange(setPositionInfo, 'position', e.target.value)}
                                    value={positionInfo.position}
                                    className={cl.workerInfoSelect}
                                    >
                                      <MenuItem value="" disabled>Выберите семейное положение</MenuItem>
                                      <MenuItem value="Не женат/не замужем">Не женат/не замужем</MenuItem>
                                      <MenuItem value="Женат/замужем">Женат/замужем</MenuItem>
                                      <MenuItem value="Вдова/вдовец">Вдова/вдовец</MenuItem>
                                      <MenuItem value="Разведена/разведен">Разведен/разведена</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Дата назначения*</label>
                        <TextField
                            type="date"
                            size='small'
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