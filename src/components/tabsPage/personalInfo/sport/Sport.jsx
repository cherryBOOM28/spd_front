import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Sport.module.css';
import axios from 'axios';

import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deletePersonalInfo } from '../../../../api/persona_info/deletePersonalInfo';
import { updatePersonalInfo } from '../../../../api/persona_info/updatePersonalInfo';

import { deleteSport } from '../../../../api/persona_info/sport/deleteSport';
import { updateSport } from '../../../../api/persona_info/sport/updateSport';

import list from '../../../data/kindsOfSports';

function Sport({sportSkill}, props) {
    const { id } = useParams();

    const [sport, setSport] = useState({
        "sport_results": []
    }); // Данные из бэка

    const [kindsOfSport, setKindsOfSport] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET kind of sport
            const sportResponse = await getPersonalInfo(id);
            setSport(sportResponse.data);

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
        sport_type: '',
        owning_lvl_sport_results: '',
    });

    const handleAddSport = async (e) => {
        e.preventDefault();
        try {
            console.log(inputData)
            if (!inputData.sport_type || !inputData.owning_lvl_sport_results) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            // Получаем название языка по его коду из объекта apiLanguages
            const sportName = kindsOfSport[inputData.sport_type];

            const newSport = {
              iin: props.id,
              sport_type: sportName,
              owning_lvl_sport_results: inputData.owning_lvl_sport_results,
            };

            // console.log(
            //     { 'sport': [newSport] }
            // )

            const body = { "sport_results": [newSport] }

            const response = await axios.post('http://localhost:8000/personal_info/create/', body);
            console.log(response)

            if (response === 201) {
                const updatedSport = {
                    ...sport,
                    sport_results: [
                        ...sport.sport_results,
                        newSport
                    ]
                };

                setSport(updatedSport);
                setInputData({
                    iin: props.id,
                    sport_type: '',
                    owning_lvl_sport_results: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding sport');
            }
            window.location.reload(); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ SPORT TYPE
    const handleDelete = async (id) => {
        try {
            const response = await deleteSport(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setSport(prevSport => prevSport.filter(sportType => sportType.id !== id));
                console.log("Successfully deleted");
            } else {
                console.log("Error deleting sport type");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
      sport_type: '',
      owning_lvl_sport_results: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataSport) => {
      
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                  iin: props.id,
                  sport_type: editedDataSport.sport_type,
                  owning_lvl_sport_results: editedDataSport.owning_lvl_sport_results
                };

                // Преобразование названия языка в код
                updatedData.sport_type = kindsOfSport[inputData.sport_type];

                await updateSport(id, updatedData);

                setSport(prevSport => {
                    return prevSport.map(sportType => {
                        if(sportType.iin === id) {
                            return {...sportType, ...editedDataSport}
                        }
                        return sportType;
                    })
                });

                setEditingId(null);
                setEditedData({
                    iin: id,
                    sport_type: '',
                    owning_lvl_sport_results: ''
                });
                console.log('Successfully updated sport type')
            } catch(error) {
                console.error('Error updating sport type:', error);
            }
        } else {
            setEditingId(id)
            const sportToEdit = sport.sport_results.find(sportType => sportType.id === id);
            if(sportToEdit) {
                setEditedData(sportToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                sport_type: editedData.sport_type,
                owning_lvl_sport_results: editedData.owning_lvl_sport_results
            };

            // Преобразование названия языка в код
            updatedData.sport_type = kindsOfSport[updatedData.sport_type];
    
            const response = await updateSport(id, updatedData);
    
            if (response === 200) {
                setSport((prevSport) =>
                prevSport.map((sportType) => (sportType.id === id ? updatedData : sportType))
                );
                setEditingId(null); // Завершаем режим редактирования
                console.log('Successfully updated sport type');
            } else {
                console.log('Error updating sport type');
            }
            window.location.reload();
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
                                <form onSubmit={handleAddSport} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.sport_type}
                                                        onChange={(e) => setInputData({ ...inputData, sport_type: e.target.value })}
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
                                                        value={inputData.owning_lvl_sport_results}
                                                        onChange={(e) => setInputData({ ...inputData, owning_lvl_sport_results: e.target.value })}
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