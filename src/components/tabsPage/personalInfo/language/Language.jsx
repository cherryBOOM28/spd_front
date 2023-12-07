import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Language.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteLanguages } from '../../../../api/persona_info/languages/deleteLanguages';
import { updateLanguages } from '../../../../api/persona_info/languages/updateLanguages';

import list from '../../../data/languages';

function Language({ languageSkill, setLanguageSkill }, props) {

    const { id } = useParams();
    const [apiLanguages, setApiLanguages] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            fetchApiLanguages()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchLanguagesFromApi = async () => {
      try {
        const lang_name = Object.values(list)
        setApiLanguages(list)
        return list;
 
      } catch (error) {
        console.error('Error fetching API languages:', error);
        return [];
      }
    };

    const fetchApiLanguages = async () => {
      await fetchLanguagesFromApi();
    };
    

    // ДОБАВЛЕНИЕ ЯЗЫКА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        langName: '',
        skillLvl: '',
    });

    const handleAddLanguage = async (e) => {
        e.preventDefault();
        try {
            // if (!inputData.language_name || !inputData.owning_lvl_language) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            // Получаем название языка по его коду из объекта apiLanguages
            const languageName = apiLanguages[inputData.langName];

            const newLanguage = {
                personId: id,
                langName: languageName,
                skillLvl: inputData.skillLvl,
            };

            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/language-skill/', newLanguage, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                // setWorkingHistory(prevRecords => [...prevRecords, newData]);
                setLanguageSkill(prevData => {
                    // Проверяем, что prevData является объектом и содержит languageSkills
                    if (typeof prevData === 'object' && Array.isArray(prevData.languageSkills)) {
                      return {
                        ...prevData,
                        languageSkills: [...prevData.languageSkills, newLanguage],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain languageSkills");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  langName: '',
                  skillLvl: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ ЯЗЫКА
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteLanguages(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setLanguageSkill(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит languageSkills
              if (typeof prevData === 'object' && Array.isArray(prevData.languageSkills)) {
                return {
                  ...prevData,
                  languageSkills: prevData.languageSkills.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain languageSkills");
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
        langName: '',
        skillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
      
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  langName: editedTableData.langName,
                  skillLvl: editedTableData.skillLvl
                };

                // console.log("updatedData", {updatedData});

                await updateLanguages(id, updatedData);

                setLanguageSkill(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.id === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });
                // console.log(updatedData)

                setEditingId(null);
                setEditedData({
                    id: id,
                    langName: '',
                    skillLvl: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = languageSkill.languageSkills.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
            // console.log(personnelData)
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                langName: editedData.langName,
                skillLvl: editedData.skillLvl,
            };
          
            // Преобразование названия языка в код
            updatedData.langName = apiLanguages[updatedData.langName];
    
            const response = await updateLanguages(id, updatedData);
  
            if (response.status === 200) {
                setLanguageSkill((prevData) => ({
                    ...prevData,
                    languageSkills: prevData.languageSkills.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
            // console.log(updatedData);
            // window.location.reload();
        } catch (error) {
            console.error('Error updating table data:', error);
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
                            <p className={cl.workerCapitalName}>Владения языками</p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить язык</Button>
                            {showForm && (
                                <form onSubmit={(e) => handleAddLanguage(e, id)} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.langName}
                                                        onChange={(e) => setInputData({ ...inputData, langName: e.target.value })}
                                                    >
                                                        <option value="">Выберите язык</option>
                                                        {Object.keys(apiLanguages).map((languageName, index) => (
                                                          <option key={index} value={languageName}>
                                                            {apiLanguages[languageName]}
                                                          </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                <select
                                                        className={cl.formInput}
                                                        value={inputData.skillLvl}
                                                        onChange={(e) => setInputData({ ...inputData, skillLvl: e.target.value })}
                                                    >
                                                        <option value="">Выберите уровень владения</option>
                                                        <option value="со словарем">Со словарем</option>
                                                        <option value="начальный">Начальный</option>
                                                        <option value="ниже среднего">Ниже среднего</option>
                                                        <option value="средний">Средний</option>
                                                        <option value="начальный">Выше среднего</option>
                                                        <option value="продвинутый">Продвинутый</option>
                                                        <option value="профессиональный">Профессиональный уровень владения</option>
                                                        <option value="родной">Родной</option>
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
                                        <td>Язык</td>
                                        <td>Уровень владения языком </td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {languageSkill && languageSkill.languageSkills && languageSkill.languageSkills.map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.langName}
                                                        onChange={(e) => setEditedData({ ...editedData, langName: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип образования</option>
                                                        {Object.keys(apiLanguages).map((languageCode) => (
                                                          <option key={languageCode} value={languageCode}>
                                                            {apiLanguages[languageCode]}
                                                          </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    d.langName
                                                )}
                                            </td>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.skillLvl}
                                                        onChange={(e) => setEditedData({ ...editedData, skillLvl: e.target.value })}
                                                    >
                                                        <option value="">Выберите уровень владения</option>
                                                        <option value="начальный">Начальный</option>
                                                        <option value="ниже среднего">Ниже среднего</option>
                                                        <option value="средний">Средний</option>
                                                        <option value="начальный">Выше среднего</option>
                                                        <option value="продвинутый">Продвинутый</option>
                                                        <option value="профессиональный">Профессиональный уровень владения</option>
                                                    </select>
                                                ) : (
                                                    d.skillLvl
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

export default Language;