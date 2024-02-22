import React, { useState, useEffect } from 'react';
import cl from './NewSport.module.css';
import listOfSports from '../../data/kindsOfSports';
import { useForm } from '../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const NewSport = (props) => {
    const {sportSkill, setSportSkill} = useForm();
    const [kindsOfSport, setKindsOfSport] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET kind of sport
            // const sportResponse = await getPersonalInfo(id);
            // setSport(sportResponse.data);

            fetchListOfSport()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchKindOfSports = async () => {
      try {
        setKindsOfSport(listOfSports)
        return listOfSports;
 
      } catch (error) {
        console.error('Error fetching kinds of sport:', error);
        return [];
      }
    };

    const fetchListOfSport = async () => {
      await fetchKindOfSports();
    };
    

    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sportType: '',
        sportSkillLvl: '',
    });

    const handleAddSport = async (e) => {
        e.preventDefault();
        try {

            // console.log(inputData)
            // if (!inputData.sport_type || !inputData.owning_lvl_sport_results) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            // Получаем название языка по его коду из объекта apiLanguages
            const sportName = kindsOfSport[inputData.sportType];

            const newSport = {
            
              sportType: sportName,
              sportSkillLvl: inputData.sportSkillLvl,
            };
            // setSport(prevRecords => [...prevRecords, newSport]);

            setSportSkill((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newSport];
                return updatedArray;
            });
        
            setInputData({
                sportType: '',
                sportSkillLvl: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // EDIT
    const [editedData, setEditedData] = useState({
        sportType: '',
        sportSkillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);



    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Отношение к спорту</p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        {/* <Button onClick={handleShowForm}>Добавить вил спорта</Button> */}
                            <form onSubmit={handleAddSport} style={{ marginTop: '10px' }}>
                                <Paper>
                                    <TableContainer>
                                        <Table className={cl.customTable}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Вид спорта </TableCell>
                                                    <TableCell>Степень владения</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                <TableRow>
                                                    <TableCell>
                                                        <Box>
                                                            {/* <label className={cl.label}>Должность</label> */}
                                                            <FormControl size="small" fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Вид спорта</InputLabel>
                                                                <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Вид спорта"
                                                                name='academicDegree'
                                                                className={cl.workerInfoSelect}
                                                                value={inputData.sportType}
                                                                onChange={(e) => setInputData({ ...inputData, sportType: e.target.value })}
                                                                >
                                                                    <MenuItem value="" disabled>Выберите вид спорта</MenuItem>
                                                                    {Object.keys(kindsOfSport).map((sportKind, index) => (
                                                                        <MenuItem key={index} value={sportKind}>
                                                                        {kindsOfSport[sportKind]}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box>
                                                            {/* <label className={cl.label}>Должность</label> */}
                                                            <FormControl size="small" fullWidth>
                                                                <InputLabel id="demo-simple-select-label">	Степень владения</InputLabel>
                                                                <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="	Степень владения"
                                                                name='academicDegree'
                                                                className={cl.sportSkillLvl}
                                                                value={inputData.sportSkillLvl}
                                                                onChange={(e) => setInputData({ ...inputData, sportSkillLvl: e.target.value })}
                                                                >
                                                                    <MenuItem value="" disabled>Выберите степень владения</MenuItem>
                                                                    <MenuItem value="Любитель">Любитель</MenuItem>
                                                                    <MenuItem value="Первый спортивный разряд">Первый спортивный разряд</MenuItem>
                                                                    <MenuItem value="Второй спортивный разряд">Второй спортивный разряд</MenuItem>
                                                                    <MenuItem value="Третий спортивный разряд">Третий спортивный разряд</MenuItem>
                                                                    <MenuItem value="Кандидат мастера спорта">Кандидат мастера спорта</MenuItem>
                                                                    <MenuItem value="Мастер спорта">Мастер спорта</MenuItem>   
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                                </TableRow>
                                                {sportSkill && sportSkill.slice(1).map((data, index) => (
                                                    <TableRow>
                                                    <TableCell>{data.sportType}</TableCell>
                                                    <TableCell>{data.sportSkillLvl}</TableCell>
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
            </div>
        </div>
    );
}

export default NewSport;