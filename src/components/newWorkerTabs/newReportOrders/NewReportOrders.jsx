import React, { useEffect, useState } from 'react';
import { useForm } from '../formProvider/FormProvider';
import cl from './NewReportOrders.module.css';
import Button from '../../../components/UI/button/Button';


function NewReportOrders(props) {
    const {decreeListInfo, setDecreeListInfo} = useForm();
    const [showForm, setShowForm] = useState(true);
    const [editingId, setEditingId] = useState(null);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        decreeType: '',
        decreeSubType: '',
        decreeDate: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // Генерируем уникальный id

            // if (!inputData.order_type || !inputData.order_date) {
            //     alert('Пожалуйста, заполните все обязательные поля!');
            //     return;
            // }
    
            // Дополнительная проверка для конкретных типов приказов
            if (
                (inputData.decreeType === 'vacation' || 
                inputData.decreeType === 'sincentive__bonus' || 
                inputData.decreeType === 'resignation') && 
                !inputData.decreeSubType
            ) {
                alert('Пожалуйста, выберите тип подприказа!');
                return;
            }

            const newData = {
                decreeType: inputData.decreeType,
                decreeSubType: inputData.decreeSubType,
                decreeDate: inputData.decreeDate,
            };

            setDecreeListInfo((prevArray) => {
                const updatedArray = [...prevArray, newData];
                return updatedArray;
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [editedData, setEditedData] = useState({
        decreeType: '',
        decreeSubType: '',
        decreeDate: '',
    });

    return (
        <div className={cl.totalInfoWrapper}>
            <div className={cl.totalInfoContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Приказы рапорта</p>
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
                                                value={inputData.decreeType}
                                                onChange={(e) => setInputData({ ...inputData, decreeType: e.target.value })}
                                            >
                                                <option value="">Выберите вид приказa</option>
                                                <option value="О назначение">О назначение</option>
                                                <option value="Перемещение">Перемещение</option>
                                                <option value="Отпуск">Отпуск</option>
                                                <option value="Командирование">Командирование</option>
                                                <option value="О присвоение звания">О присвоение звания</option>
                                                <option value="Наложение дисциплинарного взыскания">Наложение дисциплинарного взыскания</option>
                                                <option value="Снятие дисциплинарного взыскания">Снятие дисциплинарного взыскания</option>
                                                <option value="Поощерение">Поощерение/Премирование</option>
                                                <option value="Зачисление в распоряжение">Зачисление в распоряжение</option>
                                                <option value="Служебные расследования">Служебные расследования</option>
                                                <option value="увольнения">Об увольнени</option>
                                            </select>
                                        </td>        
                                        {inputData.decreeType === 'Отпуск' && (
                                            <td>
                                                <select
                                                    className={cl.formInput}
                                                    value={inputData.decreeSubType}
                                                    onChange={(e) => setInputData({ ...inputData, decreeSubType: e.target.value })}
                                                >
                                                    <option value="">Выберите тип отпуска</option>
                                                    <option value="Годовой трудовой">Годовой трудовой</option>
                                                    <option value="Краткосрочный">Краткосрочный</option>
                                                    <option value="Без сохранения заработной платы">Без сохранения заработной платы</option>
                                                    <option value="Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет">Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет</option>
                                                    <option value="Отпуск в связи с беременностью и рождением ребенка (детей)">Отпуск в связи с беременностью и рождением ребенка (детей)</option>
                                                    <option value="С усыновлением (удочерением) новорожденного ребенка (детей)">С усыновлением (удочерением) новорожденного ребенка (детей)</option>
                                                </select>
                                            </td>
                                        )}
                                        {inputData.decreeType === 'Поощерение' && (
                                            <td>
                                                <select
                                                    className={cl.formInput}
                                                    value={inputData.decreeSubType}
                                                    onChange={(e) => setInputData({ ...inputData, decreeSubType: e.target.value })}
                                                >
                                                    <option value="">Выберите вид поощерения</option>
                                                    <option value="sincentive__bonus1">Выберите вил поощерения 1</option>
                                                    <option value="sincentive__bonus2">Выберите вил поощерения 2</option>
                                                </select>
                                            </td>
                                        )}
                                        {inputData.decreeType === 'увольнения' && (
                                            <td>
                                                <select
                                                    className={cl.formInput}
                                                    value={inputData.decreeSubType}
                                                    onChange={(e) => setInputData({ ...inputData, decreeSubType: e.target.value })}
                                                >
                                                    <option value="">Выберите вид увольнения</option>
                                                    <option value="По собственной инициативе">По собственной инициативе</option>
                                                    <option value="По отрицательным мотивам">По отрицательным мотивам</option>
                                                    <option value="На пенсию">На пенсию</option>
                                                </select>
                                            </td>
                                        )}
                                        <td>
                                            <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Дата приказа"
                                                value={inputData.decreeDate || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setInputData((prevWorker) => ({
                                                    ...prevWorker,
                                                    decreeDate: newDate,
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
                                    <td>Вид приказа</td>
                                    <td>Вид подприказа</td>
                                    <td>Дата приказа</td>
                                </tr>
                            </thead>
                            <tbody>
                                {decreeListInfo.slice(1).map((d, i) => (
                                    <tr key={i}>
                                        <td>
                                            {editingId === d.id ? (
                                                <select
                                                    className={cl.formInput}
                                                    value={editedData.decreeType}
                                                    onChange={(e) => setEditedData({ ...editedData, decreeType: e.target.value })}
                                                >
                                                    <option value="">Выберите вид приказa</option>
                                                    <option value="О назначение">О назначение</option>
                                                    <option value="Перемещение">Перемещение</option>
                                                    <option value="Отпуск">Отпуск</option>
                                                    <option value="Командирование">Командирование</option>
                                                    <option value="О присвоение звания">О присвоение звания</option>
                                                    <option value="Наложение дисциплинарного взыскания">Наложение дисциплинарного взыскания</option>
                                                    <option value="Снятие дисциплинарного взыскания">Снятие дисциплинарного взыскания</option>
                                                    <option value="Поощерение/Премирование">Поощерение/Премирование</option>
                                                    <option value="Зачисление в распоряжение">Зачисление в распоряжение</option>
                                                    <option value="Служебные расследования">Служебные расследования</option>
                                                    <option value="resОб увольнениignation">Об увольнени</option>
                                                </select> 
                                            ) : (
                                                d.decreeType
                                            )}
                                        </td>
                                        <td>
                                            {editingId === d.id ? (
                                                <select
                                                    className={cl.formInput}
                                                    value={editedData.decreeSubType}
                                                    onChange={(e) => setEditedData({ ...editedData, decreeSubType: e.target.value })}
                                                >
                                                        <option value="">Выберите вид приказa</option>
                                                    <option value="Годовой трудовой">Годовой трудовой</option>
                                                    <option value="Краткосрочный">Краткосрочный</option>
                                                    <option value="Без сохранения заработной платы">Без сохранения заработной платы</option>
                                                    <option value="Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет">Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет</option>
                                                    <option value="Отпуск в связи с беременностью и рождением ребенка (детей)">Отпуск в связи с беременностью и рождением ребенка (детей)</option>
                                                    <option value="С усыновлением (удочерением) новорожденного ребенка (детей)">С усыновлением (удочерением) новорожденного ребенка (детей)</option>
                                                </select> 
                                            ) : (
                                                d.decreeSubType
                                            )}
                                            {editingId === d.id && editedData.decreeSubType === 'vacation' && (
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={editedData.decreeSubType}
                                                        onChange={(e) => setEditedData({ ...editedData, decreeSubType: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип отпуска</option>
                                                        <option value="Годовой трудовой">Годовой трудовой</option>
                                                        <option value="Краткосрочный">Краткосрочный</option>
                                                        <option value="Без сохранения заработной платы">Без сохранения заработной платы</option>
                                                        <option value="Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет">Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет</option>
                                                        <option value="Отпуск в связи с беременностью и рождением ребенка (детей)">Отпуск в связи с беременностью и рождением ребенка (детей)</option>
                                                        <option value="С усыновлением (удочерением) новорожденного ребенка (детей)">С усыновлением (удочерением) новорожденного ребенка (детей)</option>
                                                    </select>
                                                </td>
                                            )}
                                            {editingId === d.id && editedData.decreeSubType === 'sincentive__bonus' && (
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={editedData.vacation_subtype}
                                                        onChange={(e) => setEditedData({ ...editedData, decreeSubType: e.target.value })}
                                                    >
                                                        <option value="">Выберите вид поощерения</option>
                                                        <option value="sincentive__bonus1">Выберите вил поощерения 1</option>
                                                        <option value="sincentive__bonus2">Выберите вил поощерения 2</option>
                                                    </select>
                                                </td>
                                            )}
                                            {editingId === d.id && editedData.decreeSubType === 'resignation' && (
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={editedData.decreeSubType}
                                                        onChange={(e) => setEditedData({ ...editedData, decreeSubType: e.target.value })}
                                                    >
                                                        <option value="">Выберите вид увольнения</option>
                                                        <option value="По собственной инициативе">По собственной инициативе</option>
                                                        <option value="По отрицательным мотивам">По отрицательным мотивам</option>
                                                        <option value="На пенсию">На пенсию</option>
                                                    </select>
                                                </td>
                                            )}
                                        </td>
                                        
                                        <td>
                                        {editingId === d.id ? (
                                            <div className={cl.datePickerContainer}>
                                                <input
                                                    type="date"
                                                    className={cl.formInput}
                                                    placeholder="Дата приказа"
                                                    value={editedData.decreeDate || ''}
                                                    onChange={(e) => {
                                                        const newDate = e.target.value;
                                                        setEditedData((prevData) => ({
                                                        ...prevData,
                                                        decreeDate: newDate,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            d.decreeDate
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

export default NewReportOrders;