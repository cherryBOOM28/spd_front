import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './Language.module.css';
import axios from 'axios';

import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
import { deleteLanguages } from '../../../../api/persona_info/languages/deleteLanguages';
import { updateLanguages } from '../../../../api/persona_info/languages/updateLanguages';

import list from '../../../data/languages';

function Language({ languageSkill }, props) {

    const { id } = useParams();
    const [apiLanguages, setApiLanguages] = useState([]);
    const [language, setLanguage] = useState({
        "owning_languages": []
    }); // Данные из бэка

    // const iin = props.iin;

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // GET Education info
            const languageResponse = await getPersonalInfo(id);
            setLanguage(languageResponse.data);
            fetchApiLanguages()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchLanguagesFromApi = async () => {
      try {
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
        language_name: '',
        owning_lvl_language: '',
    });

    const handleAddLanguage = async (e) => {
        e.preventDefault();
        try {
            if (!inputData.language_name || !inputData.owning_lvl_language) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            // Получаем название языка по его коду из объекта apiLanguages
            const languageName = apiLanguages[inputData.language_name];

            const newLanguage = {
              iin: props.id,
              language_name: languageName,
              owning_lvl_language: inputData.owning_lvl_language,
            };

            // console.log(
            //     { 'language': [newLanguage] }
            // )

            const body = { "owning_languages": [newLanguage] }

            const response = await axios.post('http://localhost:8000/personal_info/create/', body);
            console.log(response)

            if (response.status === 201) {
                const updatedLanguage = {
                    ...language,
                    owning_languages: [
                        ...language.owning_languages,
                        newLanguage
                    ]
                };

                setLanguage(updatedLanguage);
                setInputData({
                  iin: id,
                  language_name: '',
                  owning_lvl_language: ''
                });
                handleShowForm(false)
            } else {
                console.error('Error adding education');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ ЯЗЫКА
    const handleDelete = async (id) => {
        try {
            const response = await deleteLanguages(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                setLanguage(prevLang => prevLang.filter(LangName => LangName.id !== id));
                console.log("Successfully deleted");
            } else {
                console.log("Error deleting language type");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
      language_name: '',
      owning_lvl_language: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedDataLang) => {
      
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  iin: props.id,
                  language_name: editedDataLang.language_name,
                  owning_lvl_language: editedDataLang.owning_lvl_language
                };

                // Преобразование названия языка в код
                updatedData.language_name = apiLanguages[updatedData.language_name];

                await updateLanguages(id, updatedData);

                setLanguage(prevLang => {
                    return prevLang.map(LangType => {
                        if(LangType.iin === id) {
                            return {...LangType, ...editedDataLang}
                        }
                        return LangType;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    language_name: '',
                    owning_lvl_language: ''
                });
                // console.log('Successfully updated language')
            } catch(error) {
                console.error('Error updating language:', error);
            }
        } else {
            setEditingId(id)
            const languageToEdit = language.owning_languages.find(LangType => LangType.id === id);
            if(languageToEdit) {
                setEditedData(languageToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                language_name: editedData.language_name,
                owning_lvl_language: editedData.owning_lvl_language
            };

            // Преобразование названия языка в код
            updatedData.language_name = apiLanguages[updatedData.language_name];
    
            const response = await updateLanguages(id, updatedData);
    
            if (response === 200) {
                setLanguage((prevLanguage) =>
                prevLanguage.map((LangType) => (LangType.id === id ? updatedData : LangType))
                );
                setEditingId(null); // Завершаем режим редактирования
                console.log('Successfully updated language');
            } else {
                console.log('Error updating language');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating language:', error);
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
                                <form onSubmit={handleAddLanguage} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.language_name}
                                                        onChange={(e) => setInputData({ ...inputData, language_name: e.target.value })}
                                                    >
                                                        <option value="">Выберите язык</option>
                                                        {Object.keys(apiLanguages).map((languageCode, index) => (
                                                          <option key={index} value={languageCode}>
                                                            {apiLanguages[languageCode]}
                                                          </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                <select
                                                        className={cl.formInput}
                                                        value={inputData.owning_lvl_language}
                                                        onChange={(e) => setInputData({ ...inputData, owning_lvl_language: e.target.value })}
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