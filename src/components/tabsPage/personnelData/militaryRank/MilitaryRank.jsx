import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './MilitaryRank.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { deleteMilitaryRank } from '../../../../api/staff_info/military_rank/deleteMilitaryRank';
import { updateMilitaryRank } from '../../../../api/staff_info/military_rank/updateMilitaryRank';
import { updateRankInfo } from '../../../../api/staff_info/military_rank/updateRankInfo';

function MilitaryRank({ rankInfo, militaryRank,setRankInfo, setMilitaryRank, rankArchive }, props) {
    // const iin = props.iin;
    const { id } = useParams();
    console.log("id", id)

    const [militaryRankOption, setMilitaryRankOption] = useState([]);

    const [editing, setEditing] = useState(false);
    const [editedWorker, setEditedWorker] = useState({
        rankTitle: '',
        receivedType: '',
        receivedDate: '',
    });

    const [editedData, setEditedData] = useState({
        rankTitle: '',
        receivedType: '',
        receivedDate: '',
    });
    const accessToken = Cookies.get('jwtAccessToken');
    useEffect(() => {
        // Выполняем запрос к серверу при монтировании компонента
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
  
    useEffect(() => {
        if (rankInfo && editedData) {
            setEditedData({
                personId: id,
                // militaryRank: militaryRank.rankTitle,
                receivedType: rankInfo.receivedType,
                receivedDate: rankInfo.receivedDate,
            });
        }
    }, [id, militaryRank, rankInfo, editing]); 


    
    // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
    };

    const handleCancelClick = () => {
        // Отменяем редактирование
        setEditing(false);
    };

    const [personnelData, setPersonnelData] = useState({
        "military_rank": []
    }); // Данные из бэка


    // TABLE DATA

    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        rankTitle: '',
        receivedType: '',
        receivedDate: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.sick_doc_numb || !inputData.sick_doc_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                iin: props.id,
                military_rank: inputData.military_rank,
                received_date: inputData.received_date,
                type_of_receipt: inputData.type_of_receipt,
                position: inputData.position
            };
          
            const body =  { "military_rank": [newData] };
            console.log("body", body);

            const response = await axios.post('http://localhost:8000/staff_info/create/', body);
            

            if (response.status === 201) {
                const updatedPersonnelData = {
                    ...personnelData,
                    military_rank: [
                        ...personnelData.military_rank,
                        newData
                    ]
                };

                setPersonnelData(updatedPersonnelData);
                setInputData({
                    iin: id,
                    military_rank: '',
                    received_date: '',
                    type_of_receipt: '',
                    position: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            const response = await deleteMilitaryRank(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setPersonnelData(prevData => prevData.filter(tableData => tableData.id !== id));
                console.log("Successfully deleted");
            } else {
                console.log("Error deleting data in table");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [selectedMilitaryRank, setSelectedMilitaryRank] = useState(null);

        const handleMilitaryRankChange = (event) => {
        const selectedRank = JSON.parse(event.target.value);
        setSelectedMilitaryRank(selectedRank);
        };

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // This useEffect will trigger whenever rankInfo is updated
        console.log('Rank info updated:', rankInfo);
      }, [rankInfo]);

    const handleEdit = async () => {
        if (editing) {
            try {
                const updatedRankInfo = {
                    id: rankInfo.id,
                    militaryRank: selectedMilitaryRank,
                    receivedType: editedData.receivedType,
                    receivedDate: editedData.receivedDate,
                };
                console.log("id",rankInfo.id)
                console.log({updatedRankInfo})

    
                await updateRankInfo(rankInfo.id, updatedRankInfo);
    
                // setRankInfo(updatedRankInfo); 
                setRankInfo(prevState => ({ ...prevState, ...updatedRankInfo }));
    
                setEditing(false); 
                console.log('Successfully updated data');
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {
            setEditing(true);
        }
        
    };
     
     

    const handleCancelEdit = () => {
        setShowForm(false);
        // setEditedData({
        //     id: null,
        //     rankTitle: '',
        //     receivedType: '',
        //     receivedDate: '',
        // });
    };
    

    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '15px' }}>Звания</p>
            </div>
        </div>
        <div className={cl.workerBlock}>
            <div className={cl.column}>
            <div className={cl.rows}>
                <label className={cl.label}>Поручение</label>
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
                    {/* <select
                    name='rankTitle'
                    className={cl.workerInfoSelect}
                    value={editedWorker.rankTitle}
                    onChange={(e) => setEditedWorker({ ...editedWorker, rankTitle: e.target.value })}
                    >
                        <option value="">Выберите звание</option>
                        <option value="Рядовой">Рядовой</option>
                        <option value="Ефрейтор">Ефрейтор</option>
                        <option value="Младший сержант">Младший сержант	</option>
                        <option value="Сержант">Сержант</option>
                        <option value="Старший сержант">Старший сержант	</option>
                        <option value="Сержант третьего класса">Сержант третьего класса</option>
                        <option value="Сержант второго класса">Сержант второго класса</option>
                        <option value="Сержант первого класса">Сержант первого класса</option>
                        <option value="Штаб-сержант">Штаб-сержант</option>
                        <option value="Мастер-сержант">Мастер-сержант</option>
                        <option value="Лейтенант">Лейтенант</option>
                        <option value="Старший лейтенант">Старший лейтенант	</option>
                        <option value="Капитан">Капитан</option>
                        <option value="Майор">Майор</option>
                        <option value="Подполковник">Подполковник</option>
                        <option value="Полковник">Полковник</option>
                        <option value="Генерал-майор">Генерал-майор</option>
                        <option value="Генерал-лейтенант">Генерал-лейтенант	</option>
                        <option value="Генерал-полковник">Генерал-полковник</option>
                        <option value="Генерал армии">Генерал армии</option>  
                    </select> */}

                    <select  onChange={handleMilitaryRankChange}>
                        {militaryRankOption.map(rank => (
                        <option key={rank.id} value={JSON.stringify(rank)}>
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
                
        {/* <table className={cl.customTable} style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <td>Начало периода</td>
                    <td>Конец периода </td>
                    <td>Должность</td>
                    <td>Подразделение</td>
                    <td>Учреждение</td>
                    <td>Местонахожден. организации</td>
                    <td>Коэфициент</td>
                    <td>Правохран. орган</td>
                    <td>Действие</td>
                </tr>
            </thead>
            <tbody>
                {rankArchive && rankArchive.archiveObjects && rankArchive.archiveObjects.map((d, i) => (
                    <tr key={i}> 
                        <td>
                            {editingId === d.id ? (
                            <div className={cl.datePickerContainer}>
                                <input
                                    type="date"
                                    className={cl.formInput}
                                    placeholder="Начало периода"
                                    name='startDate'
                                    value={editedData.startDate || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setEditedData((prevData) => ({
                                        ...prevData,
                                        startDate: newDate,
                                        }));
                                    }}
                                />
                            </div>
                        ) : (
                            d.startDate
                        )}
                        </td>
                        <td>
                            {editingId === d.id ? (
                            <div className={cl.datePickerContainer}>
                                <input
                                    type="date"
                                    className={cl.formInput}
                                    placeholder="Конец периода"
                                    name='endDate'
                                    value={editedData.endDate || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setEditedData((prevData) => ({
                                        ...prevData,
                                        endDate: newDate,
                                        }));
                                    }}
                                />
                            </div>
                        ) : (
                            d.endDate
                        )}
                        </td>
                        <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='receivedType' value={editedData.receivedType} onChange={(e) => setEditedData({ ...editedData, receivedType: e.target.value })} /> : d.receivedType}</td>
                        <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='decreeNumber' value={editedData.decreeNumber} onChange={(e) => setEditedData({ ...editedData, decreeNumber: e.target.value })} /> : d.decreeNumber}</td>
                        <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='organizationName' value={editedData.organizationName} onChange={(e) => setEditedData({ ...editedData, organizationName: e.target.value })} /> : d.organizationName}</td>
                        <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='organizationAddress' value={editedData.organizationAddress} onChange={(e) => setEditedData({ ...editedData, organizationAddress: e.target.value })} /> : d.organizationAddress}</td>
                        <td>
                            {editingId === d.id ? (
                                <input
                                type="checkbox"
                                name="isPravoOhranka"
                                checked={editedData.isPravoOhranka || false}
                                onChange={(e) =>
                                    setEditedData((prevData) => ({
                                    ...prevData,
                                    isPravoOhranka: e.target.checked,
                                    }))
                                }
                                />
                            ) : (
                                d.isPravoOhranka ? "Да" : "Нет"
                            )}
                        </td>
                        <td>
                            {editingId === d.id ? (
                                <input
                                type="checkbox"
                                name="HaveCoefficient"
                                checked={editedData.HaveCoefficient || false}
                                onChange={(e) =>
                                    setEditedData((prevData) => ({
                                    ...prevData,
                                    HaveCoefficient: e.target.checked,
                                    }))
                                }
                                />
                            ) : (
                                d.HaveCoefficient ? "Да" : "Нет"
                            )}
                        </td>
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
        </table> */}
        

    </div>
            </div>
            <div className={cl.relativesActionBtns} style={{marginTop: '22px'}}>
                {editing ? (
                    <>
                        <div onClick={handleEdit}>&#9998;</div>
                        <div onClick={() => handleCancelEdit()}>&#x2715;</div>
                    </>
                ) : (
                    <>
                        <div onClick={() => handleEdit(rankInfo.id)}>&#9998;</div>
                    </>
                )}
            </div>
        </div>
    </div>
    );
}

export default MilitaryRank;