import React, { useState, useEffect } from 'react';
import cl from './NewSport.module.css';
import Button from '../../UI/button/Button';
import list from '../../data/kindsOfSports';
import { useForm } from '../formProvider/FormProvider';

const NewSport = (props) => {
    const {sportSkill, setSportSkill} = useForm();
    const [kindsOfSport, setKindsOfSport] = useState([]);

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
            
              sportType: sportName,
              sportSkillLvl: inputData.sportSkillLvl,
            };
            // setSport(prevRecords => [...prevRecords, newSport]);

            setSportSkill((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newSport];
                return updatedArray;
            });
        
            setInputData({
                sportType: '',
                sportSkillLvl: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // EDIT
    const [editedData, setEditedData] = useState({
        sportType: '',
        sportSkillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);



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
                                   {sportSkill.slice(1).map((d, i) => (
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