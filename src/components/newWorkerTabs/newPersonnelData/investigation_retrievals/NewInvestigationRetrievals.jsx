import React, { useState } from 'react';
import cl from './NewInvestigationRetrievals.module.css';
import { useForm } from '../../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function NewInvestigationRetrievals(props) {
    const {investigationsInfo, setInvestigationsInfo} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            // if (!inputData.order_type_investigation || !inputData.order_doc_numb) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                investigation_decree_type: inputData.investigation_decree_type,
                investigation_decree_number: inputData.investigation_decree_number,
                investigation_date: inputData.investigation_date,
            };

            setInvestigationsInfo((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

      
            setInputData({
                investigation_decree_type: '',
                investigation_decree_number: '',
                investigation_date: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });

    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Служебные расследования, взыскания</p>
            </div>
        </div>
        <div>
            <div>
            {/* <Button onClick={handleShowForm}>Добавить награду</Button> */}
            <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                <Paper elevation={2}>
                    <TableContainer>
                        <Table className={cl.customTable}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Тип приказа</TableCell>
                                    <TableCell>Номер приказа</TableCell>
                                    <TableCell>Дата приказа</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                               
                                <TableRow>
                                    <TableCell>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Вид взыскания</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Вид взыскания"
                                                className={cl.workerInfoSelect}
                                                value={inputData.investigation_decree_type}
                                                name='investigation_decree_type'
                                                onChange={(e) => setInputData({ ...inputData, investigation_decree_type: e.target.value })}
                                                >
                                                <MenuItem value="" disabled>Выберите вид взыскания</MenuItem>
                                                <MenuItem value="замечания">Замечания</MenuItem>
                                                <MenuItem value="Выговор">Выговор</MenuItem>
                                                <MenuItem value="Строгий выговор">Строгий выговор</MenuItem>
                                                <MenuItem value="Неполное служебное соответствие">Неполное служебное соответствие</MenuItem>
                                                <MenuItem value="Увольнение">Увольнение</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер приказа"
                                            name='investigation_decree_number'
                                            value={inputData.investigation_decree_number}
                                            onChange={(e) => setInputData({ ...inputData, investigation_decree_number: e.target.value })}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
                                            name='investigation_date'
                                            value={inputData.investigation_date || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                investigation_date: newDate,
                                                }));
                                            }}
                                        />
                                        </div>
                                    </TableCell>
                                    <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                </TableRow>
                                {investigationsInfo && investigationsInfo.slice(1).map((data, index) => (
                                    <TableRow>
                                    <TableCell>{data.investigation_decree_type}</TableCell>
                                    <TableCell>{data.investigation_decree_number}</TableCell>
                                    <TableCell>{data.investigation_date}</TableCell>
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

export default NewInvestigationRetrievals;