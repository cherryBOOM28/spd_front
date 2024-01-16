import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './Personal.module.css';
import Button from '../../../UI/button/Button';
import Cookies from 'js-cookie';

import { deleteFamilyCompositions } from '../../../../api/persona_info/family_compositions/deleteFamilyCompositions';
import { updateFamilyCompositions } from '../../../../api/persona_info/family_compositions/updateFamilyCompositions';


function Personal({ 
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
        id:positionInfo.id,
        DepartmentName: positionInfo.DepartmentName
    });

    const [editedLocationInfo, setEditedLocationInfo] = useState({
        id: location.id,
        LocationName: location.LocationName
    });

    const [editedPositionTitleInfo, setEditedPositionTitleInfo] = useState({
        id: positionTitle.id,
        positionTitle: positionTitle.positionTitle
    });

    const [editedReceivedDate, setEditedReceivedDate] = useState({
        id: receivedDate.id,
        receivedDate: receivedDate.receivedDate
    });

    const [editedStatusName, setEditedStatusName] = useState({
        id: familyStatus.id,
        statusName: familyStatus.statusName
    });


    // ИЗМЕНИТЬ ПОЛЯ
    const handleEditClick = () => {
        setEditedDepartmentInfo({
            DepartmentName: positionInfo.DepartmentName
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
        setShowForm(true);
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
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <p className={cl.workerCapitalName}>Семейное положение</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                {!editing ? (
                                <Button className={cl.actionBtn} onClick={handleEditClick}>
                                    &#9998; Редактировать
                                </Button>
                                ) : (

                                <div style={{ display: 'flex', gap: '10px' }}> 
                                    <Button onClick={handleSaveClick} className={cl.actionBtn}>
                                    Сохранить
                                    </Button>
                                    <Button className={cl.actionBtn} onClick={handleCancelClick}>Отмена</Button>
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
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="DepartmentName"
                                        value={editedDepartmentInfo.DepartmentName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p className={cl.workerInfo}>{positionInfo.DepartmentName}</p>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Должность</label>
                                {editing ? (
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="positionTitle"
                                        value={editedPositionTitleInfo.positionTitle}
                                        onChange={handleInputChangePosition}
                                    />
                                ) : (

                                    <p className={cl.workerInfo}>{positionTitle.positionTitle}</p>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Дата зачисления</label>
                                {editing ? (
                                    <div className={cl.datePickerContainer}>
                                    <input
                                        type="date"
                                        name='receivedDate'
                                        className={cl.workerInfo}
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
                                    <p className={cl.workerInfo}>{receivedDate.receivedDate}</p>
                                )}
                            </div>
                            
                        </div>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}>Семейное положение</label>
                                {editing ? (
                                    <select
                                    className={cl.workerInfoSelect}
                                     value={editedStatusName.statusName}
                                     onChange={(e) => setEditedStatusName({ ...editedStatusName, statusName: e.target.value })}
                                     >
                                        <option value="">Выберите семейное положение</option>
                                        <option value="Не женат/не замужем">Не женат/не замужем</option>
                                        <option value="Женат/замужем">Женат/замужем</option>
                                        <option value="Вдова/вдовец">Вдова/вдовец</option>
                                        <option value="Разведена/разведен">Разведен/разведена</option>
                                     </select>  
                                    
                                ) : (

                                    <p className={cl.workerInfo}>{familyStatus.statusName}</p>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Город подразделения</label>
                                {editing ? (
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="LocationName"
                                        value={editedLocationInfo.LocationName}
                                        onChange={handleInputChangeLocation}
                                    />
                                ) : (

                                    <p className={cl.workerInfo}>{location.LocationName}</p>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Состав семьи</p>
                        </div>
                    </div>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить родственника</Button>
                            {showForm && (
                                <form onSubmit={(e) => handleAddMember(e, id)} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.relativeType}
                                                        onChange={(e) => setInputData({ ...inputData, relativeType: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип родственника</option>
                                                        <option value="супруг/супруга">супруг/супруга</option>
                                                        <option value="сын/дочь">сын/дочь</option>
                                                        <option value="мать/отец">мать/отец</option>
                                                        <option value="брат/сестра">брат/сестра</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Имя"
                                                        name='relName'
                                                        value={inputData.relName}
                                                        onChange={(e) => setInputData({ ...inputData, relName: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Фамилия"
                                                        name='relSurname'
                                                        value={inputData.relSurname}
                                                        onChange={(e) => setInputData({ ...inputData, relSurname: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Отчество"
                                                        name='relPatronymic'
                                                        value={inputData.relPatronymic}
                                                        onChange={(e) => setInputData({ ...inputData, relPatronymic: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cl.formInput}
                                                        name='relIin'
                                                        placeholder="ИИН родственника"
                                                        value={inputData.relIin}
                                                        onChange={(e) => setInputData({ ...inputData, relIin: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>

                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        name='relBirthDate'
                                                        placeholder="Дата рождения"
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
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        name='relJobPlace'
                                                        placeholder="Место работы"
                                                        value={inputData.relJobPlace}
                                                        onChange={(e) => setInputData({ ...inputData, relJobPlace: e.target.value })}
                                                    />
                                                </td>
                                                <td><Button type="submit">Добавить</Button></td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </form>
                            )}
                        </div>
                        <div>
                            <table className={cl.customTable} style={{ marginTop: '20px' }}>
                                <thead>
                                    <tr>
                                        <td>Степень родства</td>
                                        <td>Имя</td>
                                        <td>Фамилия</td>
                                        <td>Отчество</td>
                                        <td>ИИН</td>
                                        <td>Дата рождения</td>
                                        <td>Место работы</td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {familyComposition && familyComposition.relatives && familyComposition.relatives.map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        name='relativeType'
                                                        value={editedData.relativeType}
                                                        onChange={(e) => {
                                                            const selectedValue = e.target.value;
                                                            console.log('Selected Relative Type:', selectedValue);
                                                            setEditedData({ ...editedData, relativeType: selectedValue });
                                                          }}
                                                        
                                                    >
                                                        <option value="">Выберите тип родственника</option>
                                                        <option value="супруг/супруга">супруг/супруга</option>
                                                        <option value="сын/дочь">сын/дочь</option>
                                                        <option value="мать/отец">мать/отец</option>
                                                        <option value="брат/сестра">брат/сестра</option>
                                                    </select>
                                                ) : (
                                                    d.relativeType.relativeName
                                                    // d.relativeType && d.relativeType.relativeName
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? 
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='relName' 
                                                    value={editedData.relName} 
                                                    onChange={(e) => setEditedData({ ...editedData, relName: e.target.value })} 
                                                /> : d.relName}
                                            </td>
                                            <td>{editingId === d.id ? 
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='relSurname' 
                                                    value={editedData.relSurname} 
                                                    onChange={(e) => setEditedData({ ...editedData, relSurname: e.target.value })} 
                                                /> : d.relSurname}
                                            </td>
                                            <td>{editingId === d.id ? 
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='relPatronymic' 
                                                    value={editedData.relPatronymic} 
                                                    onChange={(e) => setEditedData({ ...editedData, relPatronymic: e.target.value })} 
                                                /> : d.relPatronymic}
                                            </td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput} name='relIin'  value={editedData.relIin} onChange={(e) => setEditedData({ ...editedData, relIin: e.target.value })} /> : d.relIin}</td>
                                            <td>
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
                                            </td>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput} name='relJobPlace' value={editedData.relJobPlace} onChange={(e) => setEditedData({ ...editedData, relJobPlace: e.target.value })} /> : d.relJobPlace}</td>
                                            <td className={cl.relativesActionBtns} style={{}}>
                                                {editingId === d.id ? (
                                                    <>
                                                        <div onClick={() => handleSaveEdit(d.id)}>&#10003;</div>
                                                        <div onClick={handleCancelEdit}>&#x2715;</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div onClick={() => handleEdit(d.id)}>&#9998;</div>
                                                        <div onClick={() => handleDelete(d.id)}>Удалить</div>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Personal;
