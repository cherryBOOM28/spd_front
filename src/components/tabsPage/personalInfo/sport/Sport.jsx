import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Sport.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '../../../UI/button/Button';

import { deleteSport } from '../../../../api/persona_info/sport/deleteSport';
import { updateSport } from '../../../../api/persona_info/sport/updateSport';

import list from '../../../data/kindsOfSports';


function Sport({sportSkill, setSportSkill}, props) {
    const { id } = useParams();

    const [kindsOfSport, setKindsOfSport] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            fetchListOfSport()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchKindOfSports = async () => {
      try {
        setKindsOfSport(list)
        return list;
 
      } catch (error) {
        console.error('Error fetching kinds of sport:', error);
        return [];
      }
    };

    const fetchListOfSport = async () => {
      await fetchKindOfSports();
    };
    
    // ДОБАВЛЕНИЕ ВИДА СПОРТА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        sportType: '',
        sportSkillLvl: '',
    });

    const handleAddSport = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.sport_type || !inputData.owning_lvl_sport_results) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            // Получаем название языка по его коду из объекта apiLanguages
            const sportName = kindsOfSport[inputData.sportType];

            const newSport = {
              iin: props.id,
              sportType: sportName,
              sportSkillLvl: inputData.sportSkillLvl,
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/sport-skill/', newSport, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setSportSkill(prevData => {
                    // Проверяем, что prevData является объектом и содержит sportSkills
                    if (typeof prevData === 'object' && Array.isArray(prevData.sportSkills)) {
                      return {
                        ...prevData,
                        sportSkills: [...prevData.sportSkills, newSport],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain sportSkills");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  sportType: '',
                  sportSkillLvl: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ SPORT TYPE
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteSport(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setSportSkill(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит sportSkills
              if (typeof prevData === 'object' && Array.isArray(prevData.sportSkills)) {
                return {
                  ...prevData,
                  sportSkills: prevData.sportSkills.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain sportSkills");
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
        sportType: '',
        sportSkillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataSport) => {
      
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    personId: id,
                    sportType: editedDataSport.sportType,
                    sportSkillLvl: editedDataSport.sportSkillLvl
                };

                // Преобразование названия языка в код
                updatedData.sportType = kindsOfSport[inputData.sportType];

                await updateSport(id, updatedData);

                setSportSkill(prevData => {
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
                    sportType: '',
                    sportSkillLvl: '',
                });
                console.log('Successfully updated sport type')
            } catch(error) {
                console.error('Error updating sport type:', error);
            }
        } else {
            setEditingId(id)
            const sportToEdit = sportSkill.sportSkills.find(sportType => sportType.id === id);
            if(sportToEdit) {
                setEditedData(sportToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
   
                sportType: editedData.sportType,
                sportSkillLvl: editedData.sportSkillLvl
            };

            // Преобразование названия языка в код
            updatedData.sportType = kindsOfSport[updatedData.sportType];
    
            const response = await updateSport(id, updatedData);
    
            if (response.status === 200) {
                setSportSkill((prevData) => ({
                    ...prevData,
                    sportSkills: prevData.sportSkills.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                
                // setSportSkill(prevData => {
                //     const updatedDataArray = prevData.sportSkills.map(tableData =>
                //         tableData.id === id ? { ...tableData, ...updatedData } : tableData
                //     );
    
                //     console.log('Prev Data:', prevData.sportSkills);
                //     console.log('Updated Data:', updatedData);
    
                //     return {
                //         ...prevData,
                //         sportSkills: updatedDataArray,
                //     };
                // });

                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
        } catch (error) {
            console.error('Error updating lansport typeguage:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };
    

    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Отношение к спорту</p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить вил спорта</Button>
                            {showForm && (
                                <form onSubmit={(e) => handleAddSport(e, id)} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.sportType}
                                                        onChange={(e) => setInputData({ ...inputData, sportType: e.target.value })}
                                                    >
                                                        <option value="">Выберите вид спорта</option>
                                                        {Object.keys(kindsOfSport).map((sportKind, index) => (
                                                          <option key={index} value={sportKind}>
                                                            {kindsOfSport[sportKind]}
                                                          </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.sportSkillLvl}
                                                        onChange={(e) => setInputData({ ...inputData, sportSkillLvl: e.target.value })}
                                                    >
                                                        <option value="">Выберите степень владения</option>
                                                        <option value="Любитель">Любитель</option>
                                                        <option value="Первый спортивный разряд">Первый спортивный разряд</option>
                                                        <option value="Второй спортивный разряд">Второй спортивный разряд</option>
                                                        <option value="Третий спортивный разряд">Третий спортивный разряд</option>
                                                        <option value="Кандидат мастера спорта">Кандидат мастера спорта</option>
                                                        <option value="Мастер спорта">Мастер спорта</option>   
                                                    </select>
                                                </td>
                                                <td><Button type="submit" className={cl.submitBtn} >Добавить</Button></td>
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
                                        <td>Вид спорта</td>
                                        <td>Степень владения</td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sportSkill && sportSkill.sportSkills && sportSkill.sportSkills.map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.sportType}
                                                        onChange={(e) => setEditedData({ ...editedData, sportType: e.target.value })}
                                                    >
                                                        <option value="">Выберите вил спорта</option>
                                                        {Object.keys(kindsOfSport).map((sportKind, index) => (
                                                          <option key={index} value={sportKind}>
                                                            {kindsOfSport[sportKind]}
                                                          </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    d.sportType
                                                )}
                                            </td>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.sportSkillLvl}
                                                        onChange={(e) => setEditedData({ ...editedData, sportSkillLvl: e.target.value })}
                                                    >
                                                        <option value="">Выберите степень владения</option>
                                                        <option value="Любитель">Любитель</option>
                                                        <option value="Первый спортивный разряд">Первый спортивный разряд</option>
                                                        <option value="Второй спортивный разряд">Второй спортивный разряд</option>
                                                        <option value="Третий спортивный разряд">Третий спортивный разряд</option>
                                                        <option value="Кандидат мастера спорта">Кандидат мастера спорта</option>
                                                        <option value="Мастер спорта">Мастер спорта</option>   
                                                    </select>
                                                ) : (
                                                    d.sportSkillLvl
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
            </div>
        </div>
    );
}

export default Sport;