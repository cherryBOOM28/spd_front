import React, { useState } from 'react';
import cl from './NewAcademicDegree.module.css';
import { useForm } from '../formProvider/FormProvider';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const NewAcademicDegree = (props) => {
    const {academicDegree, setAcademicDegree} = useForm();


    // useEffect(() => {
    //     fetchData()
    // }, [])

    // const fetchData = async () => {
    //     try {
    //         // GET Academic degree info
    //         const academivDegreeResponse = await getAcademicDegree();
    //         setAcademicDegree(academivDegreeResponse.data);

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }

    // ДОБАВЛЕНИЕ УЧЕНОЙ СТЕПЕНИ
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const handleAddDegree = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.education_place_academic || !inputData.academic_degree || !inputData.diploma_number_academic || !inputData.diploma_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newAcademicDegree = {
                academicPlace: inputData.academicPlace,
                academicDegree: inputData.academicDegree,
                academicDiplomaNumber: inputData.academicDiplomaNumber,
                academicDiplomaDate: inputData.academicDiplomaDate
            };

            // setAcademicDegree(prevRecords => [...prevRecords, newAcademicDegree]);

            setAcademicDegree((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newAcademicDegree];
                return updatedArray;
            });


            setInputData({
                academicPlace: '',
                academicDegree: '',
                academicDiplomaNumber: '',
                academicDiplomaDate: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Ученые степени </p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        {/* <Button onClick={handleShowForm}>Добавить ученую степень </Button> */}
                            <form onSubmit={handleAddDegree} style={{ marginTop: '10px' }}>
                                <Paper>
                                    <TableContainer>
                                        <Table className={cl.customTable}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Учебное заведение </TableCell>
                                                    <TableCell>Ученая степень</TableCell>
                                                    <TableCell>Номер диплома</TableCell>
                                                    <TableCell>Дата диплома</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                <TableRow>
                                                    <TableCell>
                                                        <input
                                                            type="text"
                                                            className={cl.formInput}
                                                            placeholder="Учебное заведение "
                                                            value={inputData.academicPlace}
                                                            onChange={(e) => setInputData({ ...inputData, academicPlace: e.target.value })}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box>
                                                            {/* <label className={cl.label}>Должность</label> */}
                                                            <FormControl size="small" fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Ученая степень</InputLabel>
                                                                <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Ученая степень"
                                                                name='academicDegree'
                                                                className={cl.workerInfoSelect}
                                                                value={inputData.academicDegree}
                                                                onChange={(e) => setInputData({ ...inputData, academicDegree: e.target.value })}
                                                                >
                                                                    <MenuItem value="" disabled>Ученая степень</MenuItem>
                                                                    <MenuItem value="Бакалавр">Бакалавр</MenuItem>
                                                                    <MenuItem value="Магистр">Магистр</MenuItem>
                                                                    <MenuItem value="Кандидат">Кандидат наук</MenuItem>
                                                                    <MenuItem value="Доктор">Доктор наук</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                      
                                                    </TableCell>
                                                    <TableCell>
                                                        <input
                                                            type="number"
                                                            className={cl.formInput}
                                                            placeholder="Номер диплома"
                                                            value={inputData.academicDiplomaNumber}
                                                            onChange={(e) => setInputData({ ...inputData, academicDiplomaNumber: e.target.value })}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className={cl.datePickerContainer}>
                                                        <input
                                                            type="date"
                                                            className={cl.formInput}
                                                            placeholder="Дата диплома"
                                                            value={inputData.academicDiplomaDate || ''}
                                                            onChange={(e) => {
                                                                const newDate = e.target.value;
                                                                setInputData((prevWorker) => ({
                                                                ...prevWorker,
                                                                academicDiplomaDate: newDate,
                                                                }));
                                                            }}
                                                        />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                                </TableRow>
                                                {academicDegree && academicDegree.slice(1).map((data, index) => (
                                                    <TableRow>
                                                    <TableCell>{data.academicPlace}</TableCell>
                                                    <TableCell>{data.academicDegree}</TableCell>
                                                    <TableCell>{data.academicDiplomaNumber}</TableCell>
                                                    <TableCell>{data.academicDiplomaDate}</TableCell>
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

export default NewAcademicDegree;