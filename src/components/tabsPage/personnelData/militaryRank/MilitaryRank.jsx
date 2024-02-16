import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './MilitaryRank.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GoHistory } from "react-icons/go";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { updateRankInfo } from '../../../../api/staff_info/military_rank/updateRankInfo';



function MilitaryRank({ rankInfo, militaryRank, setRankInfo, setMilitaryRank, rankArchive }) {
    const { id } = useParams();
    // console.log("id", id)
    const [openMilitaryHistory, setOpenMilitaryHistory] = useState(false);
    const [editing, setEditing] = useState(false);
    const [militaryRankOption, setMilitaryRankOption] = useState([]);
    const [editedWorker, setEditedWorker] = useState({
        militaryRank: '',
        receivedType: '',
        receivedDate: '',
    });

    // TABLE DATA
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const [inputData, setInputData] = useState({
    militaryRank: '',
    receivedType: '',
    receivedDate: '',
    });

    // Добавление данных
    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                militaryRank: {
                    rankTitle: inputData.militaryRank,
                    // Добавьте остальные поля, если они присутствуют в вашей структуре объекта "rankInfo"
                },
                receivedType: inputData.receivedType,
                receivedDate: inputData.receivedDate,
                // Добавьте другие поля, если они присутствуют в вашей структуре объекта "rankInfo"
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/sick-leave/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setRankInfo(prevData => {
                    if (typeof prevData === 'object' && Array.isArray(prevData.sickLeaves)) {
                        return {
                            ...prevData,
                            sickLeaves: [...prevData.sickLeaves, newData],
                        };
                    } else {
                        console.error("prevData is not an object or does not contain data");
                        return prevData;
                    }
                });
                setInputData({
                    personId: id,
                    militaryRank: '',
                    receivedType: '',
                    receivedDate: '',
                });
                handleShowForm(false);
            } else {
                console.error('Error adding new data');
            }
            console.log(newData)
        } catch (error) {
            console.error('Error:', error);
        }
    };
     
   
    const accessToken = Cookies.get('jwtAccessToken');
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/military-rank/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
        })
          .then(response => {
            setMilitaryRankOption(response.data);
            console.log("setMilitaryRankOption", response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []); 
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
    };

    const handleEdit = () => {
        console.log("Initial rankInfo:", rankInfo);
        setEditing(true);
        setEditedWorker({
            militaryRank: militaryRank.rankTitle,
            receivedType:  rankInfo.receivedType,
            receivedDate: rankInfo.receivedDate,
        });
    };

    // const handleSaveEdit = async () => {
    //     try {
            
           
    //         const updatedRankInfo  = {
    //             id: rankInfo.id,
    //             militaryRank: selectedRank,
    //             receivedType: editedWorker.receivedType,
    //             receivedDate: editedWorker.receivedDate,
    //         };

          
    //         console.log("id",rankInfo.id)
    //         console.log(updatedRankInfo)



    //         const response = await updateRankInfo(rankInfo.id, updatedRankInfo);
    
    //       if (response.ok) {
    //         // закончить редактирование
    //         setEditing(false);
    //       } else {
    //         console.error('Ошибка при сохранении изменений');
    //       }
    //     } catch (error) {
    //       console.error('Ошибка при выполнении запроса:', error);
    //     }
    // };

    // EDIT
    
    const handleSaveEdit = async () => {
        try {
          const updatedFields = {};
      
          if (selectedRank !== rankInfo.militaryRank) {
            updatedFields.militaryRank = selectedRank;
          }
          if (editedWorker.receivedType !== rankInfo.receivedType) {
            updatedFields.receivedType = editedWorker.receivedType;
          }
          if (editedWorker.receivedDate !== rankInfo.receivedDate) {
            updatedFields.receivedDate = editedWorker.receivedDate;
          }
      
          // Check if any fields have changed before making the patch request
          if (Object.keys(updatedFields).length > 0) {
            const updatedRankInfo = {
              id: rankInfo.id,
              ...updatedFields,
            };
      
            console.log("id", rankInfo.id);
            console.log(updatedRankInfo);
      
            const response = await updateRankInfo(rankInfo.id, updatedRankInfo);
      
            if (response.ok) {
                setRankInfo((prevRankInfo) => ({
                    ...prevRankInfo,
                    militaryRank: prevRankInfo.militaryRank.map((rank) =>
                      rank.id === id ? updatedRankInfo : rank
                    ),
                }));
                  
                  
              setEditing(false);
            } else {
              console.error('Error saving changes');
            }
          } else {
            // No fields have changed
            console.log('No changes detected');
          }
          window.location.reload()
        } catch (error) {
          console.error('Error executing request:', error);
        }
    };
      
    useEffect(() => {
        // Your fetch or update logic here
    }, [rankInfo]); 
    
    const [selectedRank, setSelectedRank] = useState('');

    const handleCancelEdit = () => {
        console.log('handleCancelEdit called');
        setEditing(false);
    };

    const handleMilitaryHistory = () => {
        setOpenMilitaryHistory(!openMilitaryHistory);
    }
    
    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;


    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
            <div className={cl.totalInfoContent}>
                <div style={{ display: 'flex',  alignItems: 'center', gap: '20px',  marginTop: '40px' }}>
                    <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Звания</p>
                    <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                        {icon}
                    </IconButton>
                </div>
            </div>
            <div>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px',  marginBottom: '30px'  }}>
                            <div style={{  display: 'flex', gap: '10px', marginTop: '18px' }}>

                                <Box>
                                    {/* <label className={cl.label}>Должность</label> */}
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Звание</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Звание"
                                        name='militaryRank'
                                        className={cl.workerInfoSelect}
                                        value={inputData.militaryRank}
                                        onChange={(e) => setInputData({ ...inputData, militaryRank: e.target.value })}
                                        >
                                            
                                            <MenuItem value="" disabled>Выберите звание</MenuItem>
                                            {militaryRankOption.map(rank => (
                                            <MenuItem key={rank.id} value={rank.rankTitle}>
                                                {rank.rankTitle}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box >
                                    {/* <label className={cl.label}>Должность</label> */}
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Вид присвоения</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Вид присвоения"
                                        name='receivedType'
                                        className={cl.workerInfoSelect}
                                        value={inputData.receivedType}
                                        onChange={(e) => setInputData({ ...inputData, receivedType: e.target.value })}
                                        >
                                            <MenuItem value="">Выберите вид присвоения</MenuItem>
                                            <MenuItem value="Досрочное присвоение">Досрочное присвоение</MenuItem>
                                            <MenuItem value="Внеочередное">Внеочередное</MenuItem>
                                            <MenuItem value="На одну ступень выше специального звания">На одну ступень выше специального звания</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                           
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата получения</label>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"  
                                    size="small"
                                    type="date"
                                    className={cl.workerInfoText}
                                    value={inputData.receivedDate || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setInputData((prevWorker) => ({
                                        ...prevWorker,
                                        receivedDate: newDate,
                                        }));
                                    }}
                                />
                            </div>
                            <Button variant="contained" type="submit" className={cl.submitBtn} >Добавить</Button>
                        </div>
                    </form>
                )}
            </div>
            {/* {militaryRank && specCheckInfo.militaryRank && specCheckInfo.militaryRank.map((d, i) => ( */}
            <div className={cl.workerBlock}>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Вид присвоения</label>
                        {editing ? (
                            <div className={cl.datePickerContainer}>
                            <Box>
                                {/* <label className={cl.label}>Должность</label> */}
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Вид присвоения</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Вид присвоения"
                                    name='receivedType'
                                    className={cl.workerInfoSelect}
                                    value={editedWorker.receivedType}
                                    onChange={handleInputChange}
                                    >
                                        <MenuItem value="">Выберите вид присвоения</MenuItem>
                                        <MenuItem value="Досрочное присвоение">Досрочное присвоение</MenuItem>
                                        <MenuItem value="Внеочередное">Внеочередное</MenuItem>
                                        <MenuItem value="На одну ступень выше специального звания">На одну ступень выше специального звания</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        
                            </div>
                        ) : (
                            <Paper className={cl.workerInfoP}>{rankInfo &&  rankInfo.receivedType}</Paper>    
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Звание</label>
                        {editing ? (
                            <div className={cl.datePickerContainer}>
                                <Box>
                                    {/* <label className={cl.label}>Должность</label> */}
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Звание</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Звание"
                                        name='militaryRank'
                                        className={cl.workerInfoSelect}
                                        onChange={(e) => setSelectedRank(e.target.value)}
                                        value={selectedRank}
                                        >
                                           
                                            <MenuItem value="" disabled>Выберите звание</MenuItem>
                                            {militaryRankOption.map(rank => (
                                            <MenuItem key={rank.id} value={rank.rankTitle}>
                                                {rank.rankTitle}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        ) : (
                            <Paper className={cl.workerInfoP}>{ militaryRank &&  militaryRank.rankTitle}</Paper>    
                        )}
                    </div>
                </div>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Дата получения</label>
                        {editing ? (
                        <div className={cl.datePickerContainer}>
                            <TextField 
                                type="date"
                                id="outlined-basic" 
                                variant="outlined"  
                                size="small"
                                className={cl.workerInfo}
                                name='receivedDate' 
                                value={editedWorker.receivedDate || ''}
                                onChange={(e) =>
                                    setEditedWorker((prevWorker) => ({
                                    ...prevWorker,
                                    receivedDate: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        ) : (
                            <Paper className={cl.workerInfoP}>{ rankInfo && rankInfo.receivedDate}</Paper>    
                        )}
                    </div>
                <div>
            </div>
        </div>      
        <div  style={{ marginTop: '30px' }} className={cl.relativesActionBtns}>
            {editing ? (
                <div>
                    <IconButton className={cl.iconBtn}  onClick={() => handleSaveEdit()}><FaCheck color=' #1565C0' /></IconButton>
                    <IconButton className={cl.iconBtn} onClick={handleCancelEdit}><IoClose /></IconButton>
                </div>
            ) : (
                <IconButton className={cl.iconBtn} onClick={() => handleEdit(id, editedWorker)}><MdEdit /></IconButton>
            )}
        </div>
            </div>


        {openMilitaryHistory && (
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '40px' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Звание</TableCell>
                                <TableCell>Начало периода</TableCell>
                                <TableCell>Конец периода</TableCell>
                                <TableCell>Поручение</TableCell>
                                <TableCell>Пенсионный возраст</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rankArchive &&
                                rankArchive.archiveObjects &&
                                rankArchive.archiveObjects.map((archiveObject, i) => (
                                <TableRow key={i}>
                                    <TableCell>{archiveObject.militaryRank.rankTitle}</TableCell>
                                    <TableCell>{archiveObject.startDate}</TableCell>
                                    <TableCell>{archiveObject.endDate}</TableCell>
                                    <TableCell>{archiveObject.receivedType}</TableCell>
                                    <TableCell>{archiveObject.militaryRank.pensionAge}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )}
        
    </div>
    );
}

export default MilitaryRank;