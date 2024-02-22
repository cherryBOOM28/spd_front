import React, { useState } from 'react';
import cl from './NewAwards.module.css';
import { useForm } from '../../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function NewAwards(props) {
    const {rewardsInfo, setRewardsInfo} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        rewardType: '',
        rewardDocNumber: '',
        rewardDate: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            // if (!inputData.awards_type || !inputData.awards_doc_numb) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                rewardType: inputData.rewardType,
                rewardDocNumber: inputData.rewardDocNumber,
                rewardDate: inputData.rewardDate,
            };

            setRewardsInfo((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

      
            setInputData({
                rewardType: '',
                rewardDocNumber: '',
                rewardDate: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        rewardType: '',
        rewardDocNumber: '',
        rewardDate: '',
    });

    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null); 




    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Награды</p>
            </div>
        </div>
        <div>
            <div>
                <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                    <Paper elevation={2}>
                            <TableContainer>
                                <Table className={cl.customTable}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Тип награды</TableCell>
                                            <TableCell>Номер приказа</TableCell>
                                            <TableCell>	Дата приказа</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TableRow>
                                            <TableCell>
                                                <Box>
                                                    {/* <label className={cl.label}>Должность</label> */}
                                                    <FormControl size="small" fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Тип награды</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Тип награды"
                                                        className={cl.workerInfoSelect}
                                                        value={inputData.rewardType}
                                                        name='rewardType'
                                                        onChange={(e) => setInputData({ ...inputData, rewardType: e.target.value })}
                                                        >
                                                        <MenuItem value="" disabled>Выберите тип награды</MenuItem>
                                                        <MenuItem value="Благодарность">Благодарность </MenuItem>
                                                        <MenuItem value="Грамота">Грамота </MenuItem>
                                                        <MenuItem value=" Почетная грамота"> Почетная грамота</MenuItem>
                                                        <MenuItem value="Нагрудной знак">Нагрудной знак - Қаржылық мониторинг органдарының үздігі </MenuItem>
                                                        <MenuItem value="Медаль ">Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</MenuItem>
                                                        <MenuItem value=" Мінсіз қызметі үшін ІІІ дәрежелі">Мінсіз қызметі үшін ІІІ дәрежелі</MenuItem>
                                                        <MenuItem value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</MenuItem>
                                                        <MenuItem value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="number"
                                                    className={cl.formInput}
                                                    placeholder="Номер приказа"
                                                    name='rewardDocNumber'
                                                    value={inputData.rewardDocNumber}
                                                    onChange={(e) => setInputData({ ...inputData, rewardDocNumber: e.target.value })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className={cl.datePickerContainer}>

                                                <input
                                                    type="date"
                                                    className={cl.formInput}
                                                    placeholder="Дата приказа"
                                                    name='rewardDate'
                                                    value={inputData.rewardDate || ''}
                                                    onChange={(e) => {
                                                        const newDate = e.target.value;
                                                        setInputData((prevWorker) => ({
                                                        ...prevWorker,
                                                        rewardDate: newDate,
                                                        }));
                                                    }}
                                                />
                                                </div>
                                            </TableCell>
                                            <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                        </TableRow>
                                        {rewardsInfo && rewardsInfo.slice(1).map((data, index) => (
                                            <TableRow>
                                            <TableCell>{data.rewardType}</TableCell>
                                            <TableCell>{data.rewardDocNumber}</TableCell>
                                            <TableCell>{data.rewardDate}</TableCell>
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

export default NewAwards;