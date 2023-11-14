import React, {useState, useEffect} from 'react';
import cl from './NewLanguage.module.css'
import Button from '../../UI/button/Button';
import { useForm } from '../formProvider/FormProvider';

import list from '../../data/languages';

const NewLanguage = (props) => {

    const {language, setLanguage} = useForm();
    const [apiLanguages, setApiLanguages] = useState([]);

     // eslint-disable-next-line
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            // GET Education info
            // const languageResponse = await getPersonalInfo(id);
            // setLanguage(languageResponse.data);
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

    //   // ИЗМЕНЕНИЯ В INPUT
    // const handleInputChange = (event) => {
    // const { name, value } = event.target;

    // setInputData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    // }));
    // };

    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(true);

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

            console.log(inputData)
            if (!inputData.language_name || !inputData.owning_lvl_language) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            // Получаем название языка по его коду из объекта apiLanguages
            const languageName = apiLanguages[inputData.language_name];

            const newLanguage = {
              language_name: languageName,
              owning_lvl_language: inputData.owning_lvl_language,
            };

            // console.log(
            //     { 'language': [newLanguage] }
            // )

            // const response = await axios.post('http://localhost:3001/owning_languages', newLanguage);
            // console.log(response);

            // setLanguage(prevRecords => [...prevRecords, newLanguage]);

            setLanguage((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newLanguage];
                return updatedArray;
              });

            // if (response.status === 201) {
            //     setLanguage(prevRecords => [...prevRecords, newLanguage]);
            //     setInputData({
            //       language_name: '',
            //       owning_lvl: ''
            //     });
            //     handleShowForm(false)
            // } else {
            //     console.error('Error adding education');
            // }
            setInputData({
                language_name: '',
                owning_lvl_language: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
      language_name: '',
      owning_lvl_language: '',
    });

    const [editingId, setEditingId] = useState(null);


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
                        {/* <Button onClick={handleShowForm}>Добавить язык</Button> */}
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
                                                    <option value="Со словарем">Со словарем</option>
                                                    <option value="Начальный">Начальный</option>
                                                    <option value="Ниже среднего">Ниже среднего</option>
                                                    <option value="Средний">Средний</option>
                                                    <option value="Выше среднего">Выше среднего</option>
                                                    <option value="Продвинутый">Продвинутый</option>
                                                    <option value="Профессиональный">Профессиональный уровень владения</option>
                                                    <option value="Родной">Родной</option>
                                                </select>
                                            </td>
                                            <td><Button type="submit" className={cl.submitBtn}onClick={handleShowForm} >Добавить</Button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        {showForm && (
                            <div>
                            <table className={cl.customTable} style={{ marginTop: '20px' }}>
                                <thead>
                                    <tr>
                                        <td>Язык</td>
                                        <td>Уровень владения языком </td>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {language.slice(1).map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.language_name}
                                                        onChange={(e) => setEditedData({ ...editedData, language_name: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип образования</option>
                                                        {Object.keys(apiLanguages).map((languageCode) => (
                                                          <option key={languageCode} value={languageCode}>
                                                            {apiLanguages[languageCode]}
                                                          </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    d.language_name
                                                )}
                                            </td>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        value={editedData.owning_lvl_language}
                                                        onChange={(e) => setEditedData({ ...editedData, owning_lvl_language: e.target.value })}
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
                                                    d.owning_lvl_language
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

export default NewLanguage;