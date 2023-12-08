import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Awards.module.css';
import Button from '../../../../components/UI/button/Button';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { deleteAward } from '../../../../api/staff_info/awards/deleteAward';
import { updateAward } from '../../../../api/staff_info/awards/updateAward';

function Awards({ rewardsInfo, setRewardsInfo }, props) {
    // const iin = props.iin;
    const { id } = useParams();


    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(false);

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
            // if (!inputData.awards_type || !inputData.awards_doc_numb || !inputData.awards_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                personId: id,
                rewardType: inputData.rewardType,
                rewardDocNumber: inputData.rewardDocNumber,
                rewardDate: inputData.rewardDate,
            };
          
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/reward/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setRewardsInfo(prevData => {
                    // Проверяем, что prevData является объектом и содержит rewards
                    if (typeof prevData === 'object' && Array.isArray(prevData.rewards)) {
                      return {
                        ...prevData,
                        rewards: [...prevData.rewards, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain rewards");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                    personId: id,
                    rewardType: '',
                    rewardDocNumber: '',
                    rewardDate: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            console.log(newData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteAward(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setRewardsInfo(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит rewards
              if (typeof prevData === 'object' && Array.isArray(prevData.rewards)) {
                return {
                  ...prevData,
                  rewards: prevData.rewards.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain rewards");
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
        rewardType: '',
        rewardDocNumber: '',
        rewardDate: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    rewardType: editedTableData.rewardType,
                    rewardDocNumber: editedTableData.rewardDocNumber,
                    rewardDate: editedTableData.rewardDate,
                };

                await updateAward(id, updatedData);

                setRewardsInfo(prevData => {
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
                    rewardType: '',
                    rewardDocNumber: '',
                    rewardDate: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = rewardsInfo.rewards.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                rewardType: editedData.rewardType,
                rewardDocNumber: editedData.rewardDocNumber,
                rewardDate: editedData.rewardDate,
            };
            // console.log(id);
    
            const response = await updateAward(id, updatedData);
  
            if (response.status === 200) {
                setRewardsInfo((prevData) => ({
                    ...prevData,
                    rewards: prevData.rewards.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };

    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Награды</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить награду</Button>
                {showForm && (
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <select
                                            className={cl.formInput}
                                            value={inputData.rewardType}
                                            onChange={(e) => setInputData({ ...inputData, rewardType: e.target.value })}
                                        >
                                            <option value="">Выберите тип награды</option>
                                            <option value="Благодарность">Благодарность </option>
                                            <option value="Грамота">Грамота </option>
                                            <option value=" Почетная грамота"> Почетная грамота</option>
                                            <option value="Нагрудной знак">Нагрудной знак - Қаржылық мониторинг органдарының үздігі </option>
                                            <option value="Медаль ">Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</option>
                                            <option value=" Мінсіз қызметі үшін ІІІ дәрежелі">Мінсіз қызметі үшін ІІІ дәрежелі</option>
                                            <option value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</option>
                                            <option value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={cl.formInput}
                                            placeholder="Номер приказа"
                                            value={inputData.rewardDocNumber}
                                            onChange={(e) => setInputData({ ...inputData, rewardDocNumber: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>

                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Дата приказа"
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
                            <td>Тип награды</td>
                            <td>Номер приказа</td>
                            <td>Дата приказа</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rewardsInfo && rewardsInfo.rewards && rewardsInfo.rewards.map((d, i) => (
                            <tr key={i}>
                                <td>  
                                    {editingId === d.id ? (
                                        <select
                                            className={cl.selectRelative_type}
                                            value={editedData.rewardType}
                                            onChange={(e) => setEditedData({ ...editedData, rewardType: e.target.value })}
                                        >
                                            <option value="">Выберите тип награды</option>
                                            <option value="Благодарность">Благодарность </option>
                                            <option value="Грамота">Грамота </option>
                                            <option value=" Почетная грамота"> Почетная грамота</option>
                                            <option value="Нагрудной знак">Нагрудной знак - Қаржылық мониторинг органдарының үздігі </option>
                                            <option value="Медаль ">Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</option>
                                            <option value=" Мінсіз қызметі үшін ІІІ дәрежелі">Мінсіз қызметі үшін ІІІ дәрежелі</option>
                                            <option value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</option>
                                            <option value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</option>
                                        </select>
                                    ) : (
                                        d.rewardType
                                    )}
                                </td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='rewardDocNumber' value={editedData.rewardDocNumber} onChange={(e) => setEditedData({ ...editedData, awards_dorewardDocNumberc_numb: e.target.value })} /> : d.rewardDocNumber}</td>
                                <td>
                                {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            value={editedData.rewardDate || ''}
                                            onChange={(e) =>
                                                setEditedData((prevWorker) => ({
                                                ...prevWorker,
                                                rewardDate: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    d.rewardDate
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
                </table>
            </div>
        </div>
        </div>
    );
}

export default Awards;