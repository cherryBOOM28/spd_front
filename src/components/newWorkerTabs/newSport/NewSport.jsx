import React, { useState, useEffect } from 'react';
import cl from './NewSport.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Button from '../../UI/button/Button';

import { getPersonalInfo } from '../../../api/persona_info/getPersonalInfo';
import { deletePersonalInfo } from '../../../api/persona_info/deletePersonalInfo';
import { updatePersonalInfo } from '../../../api/persona_info/updatePersonalInfo';

import list from '../../data/kindsOfSports';
import { useForm } from '../formProvider/FormProvider';

const NewSport = (props) => {
    // const { id } = useParams();

    const {sport, setSport} = useForm();
    const [kindsOfSport, setKindsOfSport] = useState([]);

    // const iin = props.iin;

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET kind of sport
            // const sportResponse = await getPersonalInfo(id);
            // setSport(sportResponse.data);

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
    

    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(true);

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
            
              sport_type: sportName,
              owning_lvl_sport_results: inputData.owning_lvl_sport_results,
            };
            // setSport(prevRecords => [...prevRecords, newSport]);

            setSport((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newSport];
                return updatedArray;
              });

            // console.log(
            //     { 'sport': [newSport] }
            // )

            // const response = await axios.post('http://localhost:3001/sport_results', newSport);
            // console.log(response)

            // if (response.status === 201) {
            //     setSport(prevRecords => [...prevRecords, newSport]);
            //     setInputData({
            //         sport_type: '',
            //         owning_lvl: ''
            //     });
            //     handleShowForm(false)
            // } else {
            //     console.error('Error adding sport');
            // }
            setInputData({
                sport_type: '',
                owning_lvl_sport_results: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ EDUCATION
    // const handleDelete = async (id) => {
    //     try {
    //         const response = await deletePersonalInfo(id)
    //         if (response.status === 200) {
    //             // Успешно удалено, теперь обновляем состояние
    //             setSport(prevSport => prevSport.filter(sportType => sportType.id !== id));
    //             console.log("Successfully deleted");
    //         } else {
    //             console.log("Error deleting sport type");
    //         }
         
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // EDIT
    const [editedData, setEditedData] = useState({
      sport_type: '',
      owning_lvl_sport_results: '',
    });

    const [editingId, setEditingId] = useState(null);

    // const handleEdit = async (id, editedDataSport) => {
      
    //     if(editingId === id) {
    //         try {
    //             const updatedData = {
    //               iin: id,
    //               sport_type: editedDataSport.sport_type,
    //               owning_lvl: editedDataSport.owning_lvl
    //             };

    //             // Преобразование названия языка в код
    //             updatedData.sport_type = kindsOfSport[inputData.sport_type];

    //             await getPersonalInfo(id, updatedData);

    //             setSport(prevSport => {
    //                 return prevSport.map(sportType => {
    //                     if(sportType.id === id) {
    //                         return {...sportType, ...editedDataSport}
    //                     }
    //                     return sportType;
    //                 })
    //             });

    //             setEditingId(null);
    //             setEditedData({
    //                 id: id,
    //                 sport_type: '',
    //                 owning_lvl: ''
    //             });
    //             console.log('Successfully updated sport type')
    //         } catch(error) {
    //             console.error('Error updating sport type:', error);
    //         }
    //     } else {
    //         setEditingId(id)
    //         const sportToEdit = sport.find(sportType => sportType.id === id);
    //         if(sportToEdit) {
    //             setEditedData(sportToEdit);
    //         }
    //     }
    // };

    // const handleSaveEdit = async (id) => {
    //     try {
    //         const updatedData = {
    //             iin: id,
    //             sport_type: editedData.sport_type,
    //             owning_lvl: editedData.owning_lvl
    //         };

    //         // Преобразование названия языка в код
    //         updatedData.sport_type = kindsOfSport[updatedData.sport_type];
    
    //         const response = await updatePersonalInfo(id, updatedData);
    
    //         if (response.status === 200) {
    //             setSport((prevSport) =>
    //             prevSport.map((sportType) => (sportType.id === id ? updatedData : sportType))
    //             );
    //             setEditingId(null); // Завершаем режим редактирования
    //             console.log('Successfully updated sport type');
    //         } else {
    //             console.log('Error updating sport type');
    //         }
    //     } catch (error) {
    //         console.error('Error updating lansport typeguage:', error);
    //     }
    // };

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
                        {/* <Button onClick={handleShowForm}>Добавить вил спорта</Button> */}
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
                                                <td><Button type="submit" className={cl.submitBtn} onClick={handleShowForm} >Добавить</Button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            {showForm && (
                           <div>
                           <table className={cl.customTable} style={{ marginTop: '20px' }}>
                               <thead>
                                   <tr>
                                       <td>Вид спорта</td>
                                       <td>Степень владения</td>
                                       {/* <td>Действие</td> */}
                                   </tr>
                               </thead>
                               <tbody>
                                   {sport.slice(1).map((d, i) => (
                                       <tr key={i}>
                                           <td>  
                                               {editingId === d.id ? (
                                                   <select
                                                       className={cl.selectRelative_type}
                                                       value={editedData.sport_type}
                                                       onChange={(e) => setEditedData({ ...editedData, sport_type: e.target.value })}
                                                   >
                                                       <option value="">Выберите вил спорта</option>
                                                       {Object.keys(kindsOfSport).map((sportKind, index) => (
                                                         <option key={index} value={sportKind}>
                                                           {kindsOfSport[sportKind]}
                                                         </option>
                                                       ))}
                                                   </select>
                                               ) : (
                                                   d.sport_type
                                               )}
                                           </td>
                                           <td>  
                                               {editingId === d.id ? (
                                                   <select
                                                       className={cl.selectRelative_type}
                                                       value={editedData.owning_lvl_sport_results}
                                                       onChange={(e) => setEditedData({ ...editedData, owning_lvl_sport_results: e.target.value })}
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
                                                   d.owning_lvl_sport_results
                                               )}
                                           </td>
                                          
                                           {/* <td className={cl.relativesActionBtns} style={{}}>
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
                                           </td> */}
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                            )}
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewSport;