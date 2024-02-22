import React, { useState } from 'react';
import cl from './NewEducation.module.css'
import { useForm } from '../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const NewEducation = (props) => {

    const { education, setEducation } = useForm();

  // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };       

    // ДОБАВЛЕНИЕ ДАННЫХ
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        educationType: '',
        educationPlace: '',
        educationDateIn: '',
        educationDateOut: '',
        speciality: '',
        educationForm: ''
    });

    const handleAddEducation = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.education_type || !inputData.education_place || !inputData.education_date_in || !inputData.education_date_out || !inputData.education_speciality || !inputData.diploma_number) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newEducation = {
                educationType: inputData.educationType,
                educationPlace: inputData.educationPlace,
                educationDateIn: inputData.educationDateIn,
                educationDateOut: inputData.educationDateOut,
                speciality: inputData.speciality,
                educationForm: inputData.educationForm
            };
            // setEducation(prevRecords => [...prevRecords, newEducation]);
            setEducation((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newEducation];
                return updatedArray;
                });

            

            setInputData({
                educationType: '',
                educationPlace: '',
                educationDateIn: '',
                educationDateOut: '',
                speciality: '',
                educationForm: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        educationType: '',
        educationPlace: '',
        educationDateIn: '',
        educationDateOut: '',
        speciality: '',
        diplomaNumber: ''
    });

    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.personalWrapper}>
        <div className={cl.container}>
            <div className={cl.totalInfoWrapper}>
                <div className={cl.totalInfoContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <p className={cl.workerCapitalName}>Образование</p>
                    </div>
                </div>
            </div>
            <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                <div>
                    <div>
                    <form onSubmit={handleAddEducation} style={{ marginTop: '10px' }}>

                        <Paper elevation={2}>
                            <TableContainer>
                                <Table className={cl.customTable}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Вид образования</TableCell>
                                            <TableCell>Учебное заведение</TableCell>
                                            <TableCell>	Дата поступления</TableCell>
                                            <TableCell>	Дата окончания</TableCell>
                                            <TableCell>	Специальность</TableCell>
                                            <TableCell>Тип обучения</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody >
                                        <TableRow>
                                            <TableCell>
                                                <Box>
                                                    {/* <label className={cl.label}>Должность</label> */}
                                                    <FormControl size="small" fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Вид образования</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Вид образования"
                                                        className={cl.workerInfoSelect}
                                                        name='relativeType'
                                                        value={inputData.educationType}
                                                        onChange={(e) => setInputData({ ...inputData, educationType: e.target.value })}
                                                        >
                                                        <MenuItem value=""disabled>Вид образование</MenuItem>
                                                        <MenuItem value="Бакалавр">Высшее</MenuItem>
                                                        <MenuItem value="Магистратура">Магистратура</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="text"
                                                    className={cl.formInput}
                                                    placeholder="Учебное заведение "
                                                    name='educationPlace'
                                                    value={inputData.educationPlace}
                                                    onChange={handleInputChange}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className={cl.datePickerContainer}>
                                                <input 
                                                    type="date" 
                                                    className={cl.formInput}
                                                    placeholder="Дата поступления"
                                                    value={inputData.educationDateIn || ''}
                                                    name='educationDateIn'
                                                    onChange={handleInputChange}
                                                />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cl.datePickerContainer}>
                                                <input 
                                                    type="date" 
                                                    className={cl.formInput}
                                                    placeholder="Дата окончания"
                                                    value={inputData.educationDateOut || ''}
                                                    name='educationDateOut'
                                                    onChange={handleInputChange}
                                                /> 
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="text"
                                                    className={cl.formInput}
                                                    placeholder="Специальность"
                                                    value={inputData.speciality}
                                                    name='speciality'
                                                    onChange={handleInputChange}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box>
                                                    {/* <label className={cl.label}>Должность</label> */}
                                                    <FormControl size="small" fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Тип обучения</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Тип обучения"
                                                        name='educationForm'
                                                        className={cl.workerInfoSelect}
                                                        value={inputData.educationForm}
                                                        onChange={(e) => setInputData({ ...inputData, educationForm: e.target.value })}
                                                        >
                                                            <MenuItem value="Очное">Очное</MenuItem>
                                                            <MenuItem value="Заочное">Заочное</MenuItem>
                                                            <MenuItem value="Дистанционное">Дистанционное</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </TableCell>
                                            
                                            <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                        </TableRow>
                                        {education && education.slice(1).map((data, index) => (
                                            <TableRow>
                                            <TableCell>{data.educationType}</TableCell>
                                            <TableCell>{data.educationPlace}</TableCell>
                                            <TableCell>{data.educationDateIn}</TableCell>
                                            <TableCell>{data.educationDateOut}</TableCell>
                                            <TableCell>{data.speciality}</TableCell>
                                            <TableCell>{data.educationForm}</TableCell>
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

export default NewEducation;