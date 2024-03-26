import React, { useState } from 'react';
import cl from './NewLaborActivity.module.css';
import { useForm } from '../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const NewLaborActivity = (props) => {
   
    const { workingHistory, setWorkingHistory } = useForm();


    // ДОБАВЛЕНИЕ НАГРАДЫ
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
        personType: '',
        personSubType: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.organization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              positionName: inputData.positionName,
              startDate: inputData.startDate,
              endDate: inputData.endDate,
              department: inputData.department,
              organizationName: inputData.organizationName,
              organizationAddress: inputData.organizationAddress,
              personType: inputData.personType,
              personSubType: inputData.personSubType,
            };
            // console.log(newData)

            // setLaborActivity((prevArray) => {
            //     // Create a new array by copying the previous array and adding a new element
            //     const updatedArray = [...prevArray, newData];
            //     return updatedArray;
            //   });

            setWorkingHistory((prevArray) => [...prevArray, newData]);

            setInputData(
                {
                positionName: '',
                startDate: '',
                endDate: '',
                department: '',
                organizationName: '',
                organizationAddress: '',
                personType: '',
                personSubType: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
        personType: '',
        personSubType: ''
    });

     // eslint-disable-next-line
    const [editingId, setEditingId] = useState(null);

     // Опции для personSubType в зависимости от выбранного значения в personType
     const subTypeOptions = {
        "Впервые назначенный": [
        "Академия правоохранительных органов",
        "В особом порядке",
        "Военнослужащие"
        ],
        "Бывший сотрудник правоохранительного органа": [
        "Органы внутренних дел",
        "Органы прокуратуры",
        "Антикоррупционные службы",
        "Органы национальной безопасности",
        "Служба гос охраны",
        "Органы по фин мониторингу"
        ],
        "Откомандирован из другого правоохранительного органа": [
        "Органы внутренних дел",
        "Органы прокуратуры",
        "Антикоррупционные службы",
        "Органы национальной безопасности",
        "Служба гос охраны",
        "Органы по фин мониторингу"
        ]
    };


    return (
        <div className={cl.totalInfoWrapper}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Трудовая деятельность </p>
            </div>
        </div>
        <div>
            <div>
                <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                    <Paper elevation={2} className={cl.customTable}>
                        <TableContainer >
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Начало периода</TableCell>
                                        <TableCell>Конец периода</TableCell>
                                        <TableCell>Должность</TableCell>
                                        <TableCell>Подразделение</TableCell>
                                        <TableCell>Учреждение</TableCell>
                                        <TableCell>Местонахождение организации</TableCell>
                                        <TableCell>Тип сотрудника</TableCell>
                                        <TableCell>Подтип сотрудника</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody >
                                    <TableRow>   
                                    <TableCell>
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Начало периода"
                                                name='startDate'
                                                value={inputData.startDate || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                    ...prevWorker,
                                                    startDate: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        </TableCell>
                                        <TableCell>
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                name='endDate'
                                                placeholder="Конец периода"
                                                value={inputData.endDate || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                    ...prevWorker,
                                                    endDate: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                className={cl.formInput}
                                                placeholder="Должность"
                                                name='positionName'
                                                value={inputData.positionName}
                                                onChange={handleInputChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                className={cl.formInput}
                                                name='department'
                                                placeholder="Подразделение"
                                                value={inputData.department}
                                                onChange={handleInputChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                className={cl.formInput}
                                                placeholder="Учреждение"
                                                name='organizationName'
                                                value={inputData.organizationName}
                                                onChange={handleInputChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                className={cl.formInput}
                                                name='organizationAddress'
                                                placeholder="Местонахождение организации"
                                                value={inputData.organizationAddress}
                                                onChange={handleInputChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='personType'
                                                    className={cl.workerInfoSelect}
                                                    value={inputData.personType}
                                                    onChange={(e) => {
                                                        const selectedType = e.target.value;
                                                        const updatedSubTypes = subTypeOptions[selectedType] || [];
                                                        setInputData({ ...inputData, personType: selectedType, personSubType: "", personSubTypes: updatedSubTypes });
                                                        }}
                                                    >
                                                    <MenuItem value="" disabled>Выберите тип сотрудника</MenuItem>
                                                    <MenuItem value="Впервые назначенный">Впервые назначенный</MenuItem>
                                                    <MenuItem value="Бывший сотрудник правоохранительного органа"> Бывший сотрудник правоохранительного органа</MenuItem>
                                                    <MenuItem value="Откомандирован из другого правоохранительного органа">Откомандирован из другого правоохранительного органа</MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='personSubType'
                                                    className={cl.workerInfoSelect}
                                                    value={inputData.personSubType}
                                                    onChange={(e) => setInputData({ ...inputData, personSubType: e.target.value })}
                                                    >
                                                    <MenuItem value="" disabled>Выберите подтип сотрудника</MenuItem>
                                                    {inputData.personSubTypes && inputData.personSubTypes.map((subType, index) => (
                                                        <MenuItem key={index} value={subType}>{subType}</MenuItem>
                                                    ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                        <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                    </TableRow>
                                    {workingHistory && workingHistory.slice(1).map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{data.positionName}</TableCell>
                                        <TableCell>{data.startDate}</TableCell>
                                        <TableCell>{data.endDate}</TableCell>
                                        <TableCell>{data.department}</TableCell>
                                        <TableCell>{data.organizationName}</TableCell>
                                        <TableCell>{data.organizationAddress}</TableCell>
                                        <TableCell>{data.personType}</TableCell>
                                        <TableCell>{data.personSubType}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    
                </form>
              
            </div>
         
        </div>
    </div>
    );
}

export default NewLaborActivity;