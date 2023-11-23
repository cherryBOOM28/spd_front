import React, { useState } from 'react';
import cl from './NewAwards.module.css';
import Button from '../../../../components/UI/button/Button';

import { useForm } from '../../formProvider/FormProvider';


function NewAwards(props) {
    const {rewardsInfo, setRewardsInfo} = useForm();;

    const [showForm, setShowForm] = useState(true);

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

            // if (!inputData.awards_type || !inputData.awards_doc_numb) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                rewardType: inputData.rewardType,
                rewardDocNumber: inputData.rewardDocNumber,
                rewardDate: inputData.rewardDate,
            };

            setRewardsInfo((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

      
            setInputData({
                rewardType: '',
                rewardDocNumber: '',
                rewardDate: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        rewardType: '',
        rewardDocNumber: '',
        rewardDate: '',
    });

    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null); 




    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Награды</p>
            </div>
        </div>
        <div>
            <div>
                <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                    <table className={cl.customTable}>
                        <tbody >
                            <tr>
                                <td>
                                    <select
                                        className={cl.formInput}
                                        value={inputData.rewardType}
                                        name='rewardType'
                                        onChange={(e) => setInputData({ ...inputData, rewardType: e.target.value })}
                                    >
                                        <option value="">Выберите тип награды</option>
                                        <option value="">Выберите тип награды</option>
                                        <option value="Благодарность">Благодарность </option>
                                        <option value="Грамота">Грамота </option>
                                        <option value=" Почетная грамота"> Почетная грамота</option>
                                        <option value="Нагрудной знак"> <span>Нагрудной знак -</span> Қаржылық мониторинг органдарының үздігі </option>
                                        <option value="Медаль "><span>медаль -</span> Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</option>
                                        <option value=" Мінсіз қызметі үшін ІІІ дәрежелі"> Мінсіз қызметі үшін ІІІ дәрежелі</option>
                                        <option value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</option>
                                        <option value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={cl.formInput}
                                        placeholder="Номер приказа"
                                        name='rewardDocNumber'
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
                                        name='rewardDate'
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
                                <td><Button type="submit" onClick={handleShowForm}>Добавить</Button></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </form>
                {showForm && (
                        <div>
                        <table className={cl.customTable} style={{ marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <td>Тип награды</td>
                                    <td>Номер приказа</td>
                                    <td>Дата приказа</td>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {rewardsInfo.slice(1).map((d, i) => (
                                    <tr key={i}>
                                        <td>  
                                            {editingId === d.id ? (
                                                <select
                                                    className={cl.selectRelative_type}
                                                    value={editedData.rewardType}
                                                    name='rewardType'
                                                    onChange={(e) => setEditedData({ ...editedData, rewardType: e.target.value })}
                                                >
                                                    <option value="">Выберите тип награды</option>
                                                    <option value="Благодарность">Благодарность </option>
                                                    <option value="Грамота">Грамота </option>
                                                    <option value=" Почетная грамота"> Почетная грамота</option>
                                                    <option value="Нагрудной знак"> <span>нагрудной знак</span>Қаржылық мониторинг органдарының үздігі </option>
                                                    <option value="Медаль "> <span>нагрудной знак</span>Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін</option>
                                                    <option value=" Мінсіз қызметі үшін ІІІ дәрежелі"> Мінсіз қызметі үшін ІІІ дәрежелі</option>
                                                    <option value="Мінсіз қызметі үшін ІІ дәрежелі ">Мінсіз қызметі үшін ІІ дәрежелі</option>
                                                    <option value="Мінсіз қызметі үшін І дәрежелі">Мінсіз қызметі үшін І дәрежелі</option>

                                                </select>
                                            ) : (
                                                d.rewardType
                                            )}
                                        </td>
                                        <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.rewardDocNumber} onChange={(e) => setEditedData({ ...editedData, rewardDocNumber: e.target.value })} /> : d.rewardDocNumber}</td>
                                        <td>
                                        {editingId === d.id ? (
                                            <div className={cl.datePickerContainer}>
                                                <input
                                                    type="date"
                                                    className={cl.formInput}
                                                    name='rewardDate'
                                                    value={editedData.rewardDate || ''}
                                                    onChange={(e) => {
                                                    const newData = e.target.value;
                                                    setEditedData((prevData) => ({
                                                        ...prevData,
                                                        rewardDate: newData,
                                                    }));
                                                }}
                                                />
                                            </div>
                                        ) : (
                                            d.rewardDate
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
    );
}

export default NewAwards;