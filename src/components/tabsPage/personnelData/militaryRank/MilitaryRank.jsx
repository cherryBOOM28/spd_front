import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './MilitaryRank.module.css';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GoHistory } from "react-icons/go";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { updateRankInfo } from '../../../../api/staff_info/military_rank/updateRankInfo';



function MilitaryRank({ rankInfo, militaryRank,setRankInfo, setMilitaryRank, rankArchive }, props) {
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

    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
            <div className={cl.totalInfoContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className={cl.workerCapitalName} style={{ marginBottom: '15px' }}>Звания</p>
                    <Button variant="outlined" onClick={handleMilitaryHistory} style={{ textTransform: 'none'}} className={cl.historyBtn}> <GoHistory /> История приказов</Button>
                </div>
            </div>
            <div className={cl.workerBlock}>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Вид присвоения</label>
                        {editing ? (
                            <div className={cl.datePickerContainer}>
                            <input
                                type="text"
                                name='receivedType'
                                className={cl.workerInfo}
                                value={editedWorker.receivedType}
                                onChange={handleInputChange}
                            />
                            </div>
                        ) : (
                            <p className={cl.workerInfo}>{rankInfo.receivedType}</p>
                        )}
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Звание</label>
                        {editing ? (
                            <div className={cl.datePickerContainer}>
                
                            <select  
                                onChange={(e) => setSelectedRank(e.target.value)}
                                value={selectedRank}
                                className={cl.workerInfoSelect}
                                name='militaryRank'
                            >
                                <option value="" disabled>Выберите звание</option>
                                {militaryRankOption.map(rank => (
                                <option key={rank.id} value={rank.rankTitle}>
                                    {rank.rankTitle}
                                </option>
                                ))}
                            </select>
                            </div>
                        ) : (
                            <p className={cl.workerInfo}>{militaryRank.rankTitle}</p>
                        )}
                    </div>
                </div>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Дата получения</label>
                        {editing ? (
                        <div className={cl.datePickerContainer}>
                            <input
                            type="date"
                            name='receivedDate'
                            className={cl.workerInfo}
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
                        <p className={cl.workerInfo}>{rankInfo.receivedDate}</p>
                        )}
                    </div>
                <div>
            </div>
        </div>      
        <div className={cl.relativesActionBtns} style={{ marginTop: '22px' }}>
            {editing ? (
                <>
                    <div onClick={() => handleSaveEdit()}>&#9998;</div>
                    <div onClick={handleCancelEdit}>&#x2715;</div>
                </>
            ) : (
                <div onClick={() => handleEdit(id, editedWorker)}>&#9998;</div>
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