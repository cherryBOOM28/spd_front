import React, { useState } from 'react';
import cl from './NewSickLeaves.module.css';
import { useForm } from '../../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function NewSickLeaves(props) {

    const {sickLeavesInfo, setSickLeavesInfo} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sickDocNumber: '',
        sickDocDate: '',
    });

    const [editedData, setEditedData] = useState({
        sickDocNumber: '',
        sickDocDate: '',
    });


    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                sickDocNumber: inputData.sickDocNumber,
                sickDocDate: inputData.sickDocDate,
            };

            setSickLeavesInfo((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

              setInputData({
                sickDocNumber: '',
                sickDocDate: '',
            })
            // console.log(
            //     { 'data': [newData] }
            // )

        } catch (error) {
            console.error('Error:', error);
        }
    };


    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null); 

    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Больничные листы</p>
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
                                        <TableCell>Номер приказа</TableCell>
                                        <TableCell>Дата приказа</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    <TableRow>
                                        <TableCell>
                                            <input
                                                type="number"
                                                className={cl.formInput}
                                                placeholder="Номер приказа"
                                                name='sickDocNumber'
                                                value={inputData.sickDocNumber}
                                                onChange={(e) => setInputData({ ...inputData, sickDocNumber: e.target.value })}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                name='sickDocDate'
                                                placeholder="Дата приказа"
                                                value={inputData.sickDocDate || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                    ...prevWorker,
                                                    sickDocDate: newDate,
                                                    }));
                                                }}
                                            />
                                            </div>
                                        </TableCell>
                                        <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                    </TableRow>
                                    {sickLeavesInfo && sickLeavesInfo.slice(1).map((data, index) => (
                                        <TableRow>
                                        <TableCell>{data.sickDocNumber}</TableCell>
                                        <TableCell>{data.sickDocDate}</TableCell>
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

export default NewSickLeaves;