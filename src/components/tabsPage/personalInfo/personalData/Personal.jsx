import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './Personal.module.css';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from 'js-cookie';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';

import { deleteFamilyCompositions } from '../../../../api/persona_info/family_compositions/deleteFamilyCompositions';
import { updateFamilyCompositions } from '../../../../api/persona_info/family_compositions/updateFamilyCompositions';


function Personal({ 
    departmentName, setDepartmentName,
    positionInfo, setPositionInfo,
    location, setLocation,
    receivedDate, setReceivedDate,
    positionTitle, setPositionTitle,
    familyStatus, setFamilyStatus,
    familyComposition, 
    setFamilyComposition 
    }) {
    const { id } = useParams();
    // console.log(`id: ${id}`);


    const [editing, setEditing] = useState(false);

    const [editedDepartmentInfo, setEditedDepartmentInfo] = useState({
        id: (positionInfo && positionInfo.id) || '',
        DepartmentName: (positionInfo && positionInfo.DepartmentName) || ''
    });

    const [editedLocationInfo, setEditedLocationInfo] = useState({
        id: (location && location.id) || '',
        LocationName: location.LocationName || ''
    });

    const [editedPositionTitleInfo, setEditedPositionTitleInfo] = useState({
        id: positionTitle.id || '',
        positionTitle: positionTitle.positionTitle || ''
    });

    const [editedReceivedDate, setEditedReceivedDate] = useState({
        id: receivedDate.id || '',
        receivedDate: receivedDate.receivedDate || ''
    });

    const [editedStatusName, setEditedStatusName] = useState({
        id: familyStatus.id || '',
        statusName: familyStatus.statusName || ''
    });


    // ИЗМЕНИТЬ ПОЛЯ
    const handleEditClick = () => {
        setEditedDepartmentInfo({
            DepartmentName: departmentName.DepartmentName
        });
        setEditedLocationInfo({
            LocationName: location.LocationName
        });
        setEditedPositionTitleInfo({
            positionTitle: positionTitle.positionTitle
        });
        setEditedReceivedDate({
            receivedDate: receivedDate.receivedDate
        });
        setEditedStatusName({
            statusName: familyStatus.statusName
        });

        setEditing(true);
    };


    // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (e) => {
        // Обработчик изменения значений в инпуте при редактировании
        const { name, value } = e.target;
        setEditedDepartmentInfo((prevWorker) => ({
            ...prevWorker,
            [name]: value,
        }));
    };

    const handleInputChangeLocation = (e) => {
        // Обработчик изменения значений в инпуте при редактировании
        const { name, value } = e.target;
        setEditedLocationInfo((prevWorker) => ({
            ...prevWorker,
            [name]: value,
        }));
    };

    const handleInputChangePosition = (e) => {
        // Обработчик изменения значений в инпуте при редактировании
        const { name, value } = e.target;
        setEditedPositionTitleInfo((prevWorker) => ({
            ...prevWorker,
            [name]: value,
        }));
    };

    // СОХРАНИТЬ ИЗМЕНЕНИЯ
    const handleSaveClick = async () => {
        try {
            const accessToken = Cookies.get('jwtAccessToken');
            // Update identity card information
            const departmentNameResponse = await axios.patch(`http://localhost:8000/api/v1/department/${positionInfo.id}/`, editedDepartmentInfo, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                }
            });
  
            if (!departmentNameResponse.data) {
                console.error('Failed to update');
                return;
            }
        
            // Update location information
            const locationNameResponse = await axios.patch(`http://localhost:8000/api/v1/location/${location.id}/`, editedLocationInfo, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                }
            });
  
            if (!locationNameResponse.data) {
                console.error('Failed to update');
                return;
            }

            // Update positionTitle information
            const positionTitleResponse = await axios.patch(`http://localhost:8000/api/v1/position/${positionTitle.id}/`, editedPositionTitleInfo, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                }
            });
  
            if (!positionTitleResponse.data) {
                console.error('Failed to update');
                return;
            }

            // Update receivedDate information
            const receivedDateResponse = await axios.patch(`http://localhost:8000/api/v1/position-info/${receivedDate.id}/`, editedReceivedDate, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                }
            });
  
            if (!receivedDateResponse.data) {
                console.error('Failed to update');
                return;
            }

            // Update familyStatus information
            const familyStatusResponse = await axios.patch(`http://localhost:8000/api/v1/family-status/${familyStatus.id}/`, editedStatusName, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                }
            });
  
            if (!familyStatusResponse.data) {
                console.error('Failed to update');
                return;
            }

            setEditing(false);

            setPositionInfo(departmentNameResponse.data);
            setLocation(locationNameResponse.data);
            setPositionTitle(positionTitleResponse.data);
            setReceivedDate(receivedDateResponse.data);
            setFamilyStatus(familyStatusResponse.data);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error.message);
        }
    };


    // отображения формы для новых данных
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    // input-ы где сохраняютя данные
    const [inputData, setInputData] = useState({
        relativeType: "",
        relName: "",
        relSurname: "",
        relPatronymic: "",
        relIin: "",
        relBirthDate: "",
        relJobPlace: "",
    });

    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const handleAddMember = async (e, id) => {
        e.preventDefault();
        try {
            // if (!inputData.relative_type || !inputData.fio || !inputData.rel_iin || !inputData.birth_date_family || !inputData.job_place) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }
            console.log("Current id:", id); 
            const newFamilyMember = {
                personId: id,
                relativeType: inputData.relativeType,
                relName: inputData.relName,
                relSurname: inputData.relSurname,
                relPatronymic: inputData.relPatronymic,
                relIin: inputData.relIin,
                relBirthDate: inputData.relBirthDate,
                relJobPlace: inputData.relJobPlace
            };
            
            console.log(
                newFamilyMember,
                {id}
            )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/family-composition/', newFamilyMember, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            
            if (response.status === 201) {
                setFamilyComposition(prevData => {
                    // Проверяем, что prevData является объектом и содержит relatives
                    if (typeof prevData === 'object' && Array.isArray(prevData.relatives)) {
                        const updatedRelative = {
                            ...newFamilyMember,
                            relativeType: response.data.relativeType
                        };

                        return {
                            ...prevData,
                            // relatives: [...prevData.relatives, newFamilyMember],
                            relatives: [...prevData.relatives, updatedRelative],
                        };
                    } else {
                      console.error("prevData is not an object or does not contain relatives");
                      return prevData;
                       // возвращаем prevData без изменений
                    }
                });
             
                setInputData({
                  personId: id,
                  relativeType: "",
                  relName: "",
                  relSurname: "",
                  relPatronymic: "",
                  relIin: "",
                  relBirthDate: "",
                  relJobPlace: "",
                });
                handleShowForm(false)
                
            } else {
                console.error('Error adding new data');
            }
            window.location.reload()
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ РОДСТВЕННИКА
    const handleDelete = async (id) => {
  
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteFamilyCompositions(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setFamilyComposition(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит workingHistories
              if (typeof prevData === 'object' && Array.isArray(prevData.relatives)) {
                return {
                  ...prevData,
                  relatives: prevData.relatives.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain workingHistories");
                return prevData; // возвращаем prevData без изменений
              }
            });
        
            console.log("Successfully deleted");
          } catch (error) {
            console.error("Error deleting data in table:", error);
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        relativeType: "",
        relName: "",
        relSurname: "",
        relPatronymic: "",
        relIin: "",
        relBirthDate: "",
        relJobPlace: "",
    });

    const [editingId, setEditingId] = useState(null);


    const handleEdit = async (id, editedDataq) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: editedDataq.personId,
                    relativeType: editedDataq.relativeType,
                    relName: editedDataq.relName,
                    relSurname: editedDataq.relSurname,
                    relPatronymic: editedDataq.relPatronymic,
                    relIin: editedDataq.relIin,
                    relBirthDate: editedDataq.relBirthDate,
                    relJobPlace: editedDataq.relJobPlace
                };
              
                await updateFamilyCompositions(id, updatedData);

                setFamilyComposition(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.id === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    relativeType: "",
                    relName: "",
                    relSurname: "",
                    relPatronymic: "",
                    relIin: "",
                    relBirthDate: "",
                    relJobPlace: "",
                });
               
                console.log('Successfully updated')
            } catch(error) {
                console.error('Error updating', error);
            }
        } else {
            setEditingId(id);
            const memberToEdit = familyComposition.relatives.find(member => member.id === id);
            if(memberToEdit) {
                setEditedData(memberToEdit);
            };
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                relativeType: editedData.relativeType,
                relName: editedData.relName,
                relSurname: editedData.relSurname,
                relPatronymic: editedData.relPatronymic,
                relIin: editedData.relIin,
                relBirthDate: editedData.relBirthDate,
                relJobPlace: editedData.relJobPlace
            };
            // console.log("rel id:", id);
    
            const response = await updateFamilyCompositions(id, updatedData);
  
            if (response.status === 200) {
                setFamilyComposition((prevData) => ({
                    ...prevData,
                    relatives: prevData.relatives.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                // console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
            // console.log(updatedData)
            // window.location.reload();
        } catch (error) {
            console.error('Error updating family member:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };

    const handleCancelClick = () => {
        // Отменяем редактирование
        setEditing(false);
    };

    const icon = showForm ? <IoClose style={{ fontSize: '18px' }} /> : <FaPlus style={{ fontSize: '16px' }} />;
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <p className={cl.workerCapitalName}>Семейное положение</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                {!editing ? (
                                <Button className={cl.actionBtn} onClick={handleEditClick} style={{ textTransform: 'none', color: '#1b3884' }}>
                                    &#9998; Редактировать
                                </Button>
                                ) : (

                                <div style={{ display: 'flex', gap: '10px' }}> 
                                    <Button onClick={handleSaveClick} className={cl.actionBtn} style={{ textTransform: 'none', color: '#1b3884' }}>
                                    Сохранить
                                    </Button>
                                    <Button className={cl.actionBtn} onClick={handleCancelClick} style={{ textTransform: 'none', color: '#1b3884' }}>Отмена</Button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}>Подразделение</label>
                                {editing ? (
                                    <div style={{ marginLeft: '12px' }}>
                                        <TextField
                                        id="outlined-basic" 
                                        label="Подразделение" 
                                        variant="outlined" 
                                        size="small"
                                        className={cl.workerInfoText}
                                        type="text"
                                        name="DepartmentName"
                                        value={editedDepartmentInfo.DepartmentName}
                                        onChange={handleInputChange}
                                    />
                                    </div>
                                ) : (
                                    <Paper className={cl.workerInfo}>
                                        {departmentName && departmentName.DepartmentName ? departmentName.DepartmentName : 'Нет данных'}                                    
                                    </Paper>

                                    
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Должность</label>
                                {editing ? (
                                    <div style={{ marginLeft: '12px',  }}>
                                        <TextField
                                        id="outlined-basic" 
                                        label="Должность" 
                                        variant="outlined" 
                                        size="small"
                                        className={cl.workerInfoText}
                                        type="text"
                                        name="positionTitle"
                                        value={editedPositionTitleInfo.positionTitle}
                                        onChange={handleInputChangePosition}
                                        />
                                    </div>
                                   
                                ) : (

                                    <Paper className={cl.workerInfo}>{positionTitle.positionTitle}</Paper>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Дата зачисления</label>
                                {editing ? (
                                    <div className={cl.datePickerContainer} style={{ marginLeft: '12px'  }}>
                                    <TextField
                                        id="outlined-basic" 
                                        label="Дата зачисления" 
                                        variant="outlined" 
                                        size="small"
                                        type="date"
                                        name='receivedDate'
                                        className={cl.workerInfoText}
                                        value={editedReceivedDate.receivedDate || ''}
                                        onChange={(e) =>
                                        setEditedReceivedDate((prevWorker) => ({
                                            ...prevWorker,
                                            receivedDate: e.target.value,
                                        }))
                                        }
                                    />
                                    </div>
                                ) : (
                                    <Paper className={cl.workerInfo}>
                                        {/* {receivedDate.receivedDate} */}
                                        {receivedDate && receivedDate.receivedDate ? receivedDate.receivedDate : 'Нет данных'}                                    

                                    </Paper>
                                )}
                            </div>
                            
                        </div>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}>Семейное положение</label>
                                {editing ? (
                                     <Box sx={{ minWidth: 120 }} style={{ marginLeft: '12px'  }}>
                                     <FormControl fullWidth>
                                       <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                                       <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Пол"
                                            name='genderName'
                                            className={cl.workerInfoSelect}
                                            value={editedStatusName.statusName}
                                            onChange={(e) => setEditedStatusName({ ...editedStatusName, statusName: e.target.value })}
                                        >
                                            <MenuItem value="">Выберите семейное положение</MenuItem>
                                            <MenuItem value="Не женат/не замужем">Не женат/не замужем</MenuItem>
                                            <MenuItem value="Женат/замужем">Женат/замужем</MenuItem>
                                            <MenuItem value="Вдова/вдовец">Вдова/вдовец</MenuItem>
                                            <MenuItem value="Разведена/разведен">Разведен/разведена</MenuItem>
                                       </Select>
                                     </FormControl>
                                   </Box>
                                    
                                ) : (
                                    <Paper className={cl.workerInfo}>{familyStatus.statusName}</Paper>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Город подразделения</label>
                                {editing ? (
                                    <div style={{ marginLeft: '12px'  }}>
                                        <TextField
                                            id="outlined-basic" 
                                            label="Город подразделения" 
                                            variant="outlined" 
                                            size="small"
                                            className={cl.workerInfoText}
                                            type="text"
                                            name="LocationName"
                                            value={editedLocationInfo.LocationName}
                                            onChange={handleInputChangeLocation}
                                        />
                                    </div>
                                ) : (
                                    <Paper className={cl.workerInfo}>
                                        {location && location.LocationName ? location.LocationName : 'Нет данных'}                                    

                                    </Paper>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex',  alignItems: 'center', gap: '20px' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '18px' }}>Состав семьи</p>
                            <IconButton onClick={handleShowForm} aria-label="toggle-form" style={{ marginBottom: '15px' }}>
                                {icon}
                            </IconButton>
                        </div>
                    </div>
                    <div>
                        <div>
                            {showForm && (
                                <form onSubmit={(e) => handleAddMember(e, id)} style={{ marginTop: '10px' }}>
                                    <div style={{ display:'flex', gap: '20px' }}>
                                        <Box>
                                            {/* <label className={cl.label}>Должность</label> */}
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Степень родства</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Степень родства"
                                                placeholder="Степень родства"
                                                name='attResult'
                                                className={cl.workerInfoSelect_long}
                                                value={inputData.relativeType}
                                                onChange={(e) => setInputData({ ...inputData, relativeType: e.target.value })}
                                                
                                                >
                                                    <MenuItem value="">Выберите тип родственника</MenuItem>
                                                    <MenuItem value="супруг/супруга">супруг/супруга</MenuItem>
                                                    <MenuItem value="сын/дочь">сын/дочь</MenuItem>
                                                    <MenuItem value="мать/отец">мать/отец</MenuItem>
                                                    <MenuItem value="брат/сестра">брат/сестра</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Button  variant="contained" type="submit">Добавить</Button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <TextField
                                            id="outlined-basic" 
                                            label="Имя" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            name='relName'
                                            value={inputData.relName}
                                            onChange={(e) => setInputData({ ...inputData, relName: e.target.value })}
                                        />
                                        <TextField
                                            id="outlined-basic" 
                                            label="Фамилия" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            name='relSurname'
                                            value={inputData.relSurname}
                                            onChange={(e) => setInputData({ ...inputData, relSurname: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <TextField
                                            id="outlined-basic" 
                                            label="Отчество" 
                                            variant="outlined"  
                                            size="small"
                                            type="text"
                                            className={cl.workerInfoText}
                                            name='relPatronymic'
                                            value={inputData.relPatronymic}
                                            onChange={(e) => setInputData({ ...inputData, relPatronymic: e.target.value })}
                                        />
                                        <TextField
                                            id="outlined-basic" 
                                            label="ИИН родственника" 
                                            variant="outlined"  
                                            size="small"
                                            type="number"
                                            className={cl.workerInfoText}
                                            name='relIin'
                                            value={inputData.relIin}
                                            onChange={(e) => setInputData({ ...inputData, relIin: e.target.value })}
                                        />
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }} >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
                                            <label style={{ fontSize: '13px', color: '#4B4B4B', marginLeft: '2px' }}>Дата рождения</label>
                                            <TextField
                                                id="outlined-basic" 
                                                variant="outlined"  
                                                size="small"
                                                type="date"
                                                className={cl.workerInfoText}
                                                name='relBirthDate'
                                                value={inputData.relBirthDate || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                    ...prevWorker,
                                                    relBirthDate: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        
                                        <TextField
                                        style={{ marginTop: '25px' }}
                                        id="outlined-basic" 
                                        label="Место работы" 
                                        variant="outlined"  
                                        size="small"
                                        type="text"
                                        className={cl.workerInfoText}
                                        name='relJobPlace'
                                        value={inputData.relJobPlace}
                                        onChange={(e) => setInputData({ ...inputData, relJobPlace: e.target.value })}
                                        />
                                    </div>
                                    
                                
                                            
                                </form>
                            )}
                        </div>
                        <div>
                            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Степень родства</TableCell>
                                                <TableCell>Имя</TableCell>
                                                <TableCell>Фамилия</TableCell>
                                                <TableCell>Отчество</TableCell>
                                                <TableCell>ИИН</TableCell>
                                                <TableCell>Дата рождения</TableCell>
                                                <TableCell>Место работы</TableCell>
                                                <TableCell>Действие</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {familyComposition && familyComposition.relatives && familyComposition.relatives.length > 0 ? (
                                                familyComposition.relatives.map((d, i) => (
                                                    <TableRow key={i}>
                                                    <TableCell>  
                                                        {editingId === d.id ? (
                                                             <Box sx={{ minWidth: 120 }}>
                                                             <FormControl fullWidth>
                                                               <InputLabel id="demo-simple-select-label">Степень родства</InputLabel>
                                                               <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Степень родства"
                                                                    className={cl.workerInfoSelect}
                                                                    style={{ width: '240px' }}
                                                                    name='relativeType'
                                                                    value={editedData.relativeType}
                                                                    onChange={(e) => {
                                                                        const selectedValue = e.target.value;
                                                                        console.log('Selected Relative Type:', selectedValue);
                                                                        setEditedData({ ...editedData, relativeType: selectedValue });
                                                                    }}
                                                                >
                                                                    <MenuItem value="супруг/супруга">супруг/супруга</MenuItem>
                                                                    <MenuItem value="сын/дочь">сын/дочь</MenuItem>
                                                                    <MenuItem value="мать/отец">мать/отец</MenuItem>
                                                                    <MenuItem value="брат/сестра">брат/сестра</MenuItem>
                                                               </Select>
                                                             </FormControl>
                                                           </Box>
                                                        ) : (
                                                            d.relativeType.relativeName
                                                            // d.relativeType && d.relativeType.relativeName
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? 
                                                        <input 
                                                            type="text" 
                                                            className={cl.editInput} 
                                                            name='relName' 
                                                            value={editedData.relName} 
                                                            onChange={(e) => setEditedData({ ...editedData, relName: e.target.value })} 
                                                        /> : d.relName}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? 
                                                        <input 
                                                            type="text" 
                                                            className={cl.editInput} 
                                                            name='relSurname' 
                                                            value={editedData.relSurname} 
                                                            onChange={(e) => setEditedData({ ...editedData, relSurname: e.target.value })} 
                                                        /> : d.relSurname}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? 
                                                        <input 
                                                            type="text" 
                                                            className={cl.editInput} 
                                                            name='relPatronymic' 
                                                            value={editedData.relPatronymic} 
                                                            onChange={(e) => setEditedData({ ...editedData, relPatronymic: e.target.value })} 
                                                        /> : d.relPatronymic}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? <input type='number' className={cl.editInput} name='relIin'  value={editedData.relIin} onChange={(e) => setEditedData({ ...editedData, relIin: e.target.value })} /> : d.relIin}</TableCell>
                                                    <TableCell>
                                                    {editingId === d.id ? (
                                                        <div className={cl.datePickerContainer}>
                                                            <input
                                                                type="date"
                                                                className={cl.formInput}
                                                                name='relBirthDate'
                                                                placeholder="Дата рождения"
                                                                value={editedData.relBirthDate || ''}
                                                                onChange={(e) => {
                                                                    const newDate = e.target.value;
                                                                    setEditedData((prevData) => ({
                                                                    ...prevData,
                                                                    relBirthDate: newDate,
                                                                    }));
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        d.relBirthDate
                                                    )}
                                                    </TableCell>
                                                    <TableCell>{editingId === d.id ? <input type='text' className={cl.editInput} name='relJobPlace' value={editedData.relJobPlace} onChange={(e) => setEditedData({ ...editedData, relJobPlace: e.target.value })} /> : d.relJobPlace}</TableCell>
                                                    <TableCell  className={cl.relativesActionBtns} style={{}}>
                                                        {editingId === d.id ? (
                                                            <div>
                                                                <IconButton className={cl.iconBtn} onClick={() => handleSaveEdit(d.id)}><FaCheck color=' #1B3884' /></IconButton>
                                                                <IconButton className={cl.iconBtn} onClick={handleCancelEdit}><IoClose /></IconButton>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <IconButton className={cl.iconBtn} onClick={() => handleEdit(d.id)}><MdEdit /></IconButton>
                                                                <IconButton className={cl.iconBtn} onClick={() => handleDelete(d.id)}><FaTrash /></IconButton>
                                                            </>
                                                        )}
                                                    </TableCell >
                                                </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={8} align="center">
                                                        Нет данных
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Personal;
