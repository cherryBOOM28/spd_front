import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '../formProvider/FormProvider';
import { useParams } from 'react-router-dom';
import cl from './NewReportOrders.module.css';
import Button from '../../../components/UI/button/Button';

import { getOrdersList } from '../../../api/orders_list/getOrdersList';
import { deleteOrdersList } from '../../../api/orders_list/deleteOrdersList';
import { updateOrdersList } from '../../../api/orders_list/updateOrdersList';



function NewReportOrders(props) {
    const {reportOrders, setReportOrders} = useForm();


    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        order_type: '',
        types_of_order_types: '',
        order_date: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {
            // Генерируем уникальный id

            if (!inputData.order_type || !inputData.order_date) {
                alert('Пожалуйста, заполните все обязательные поля!');
                return;
            }
    
            // Дополнительная проверка для конкретных типов приказов
            if (
                (inputData.order_type === 'vacation' || 
                inputData.order_type === 'sincentive__bonus' || 
                inputData.order_type === 'resignation') && 
                !inputData.types_of_order_types
            ) {
                alert('Пожалуйста, выберите тип подприказа!');
                return;
            }

            const newData = {
                order_type: inputData.order_type,
                types_of_order_types: inputData.types_of_order_types,
                order_date: inputData.order_date,
            };

            setReportOrders((prevArray) => {
                
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

           
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA

    // EDIT
    const [editedData, setEditedData] = useState({
        order_type: '',
        types_of_order_types: '',
        order_date: '',
    });

    const [editingId, setEditingId] = useState(null);

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
                                            value={inputData.order_type}
                                            onChange={(e) => setInputData({ ...inputData, order_type: e.target.value })}
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
                                    {inputData.order_type === 'Отпуск' && (
                                        <td>
                                            <select
                                                className={cl.formInput}
                                                value={inputData.types_of_order_types}
                                                onChange={(e) => setInputData({ ...inputData, types_of_order_types: e.target.value })}
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
                                    {inputData.order_type === 'Поощерение' && (
                                        <td>
                                            <select
                                                className={cl.formInput}
                                                value={inputData.types_of_order_types}
                                                onChange={(e) => setInputData({ ...inputData, types_of_order_types: e.target.value })}
                                            >
                                                <option value="">Выберите вид поощерения</option>
                                                <option value="sincentive__bonus1">Выберите вил поощерения 1</option>
                                                <option value="sincentive__bonus2">Выберите вил поощерения 2</option>
                                            </select>
                                        </td>
                                    )}
                                    {inputData.order_type === 'увольнения' && (
                                        <td>
                                            <select
                                                className={cl.formInput}
                                                value={inputData.types_of_order_types}
                                                onChange={(e) => setInputData({ ...inputData, types_of_order_types: e.target.value })}
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
                                            value={inputData.order_date || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                order_date: newDate,
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
                           {reportOrders.slice(1).map((d, i) => (
                               <tr key={i}>
                                   <td>
                                       {editingId === d.id ? (
                                           <select
                                            className={cl.formInput}
                                            value={editedData.order_type}
                                            onChange={(e) => setEditedData({ ...editedData, order_type: e.target.value })}
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
                                           d.order_type
                                       )}
                                   </td>
                                   <td>
                                       {editingId === d.id ? (
                                           <select
                                            className={cl.formInput}
                                            value={editedData.types_of_order_types}
                                            onChange={(e) => setEditedData({ ...editedData, types_of_order_types: e.target.value })}
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
                                           d.types_of_order_types
                                       )}
                                       {editingId === d.id && editedData.types_of_order_types === 'vacation' && (
                                           <td>
                                               <select
                                                   className={cl.formInput}
                                                   value={editedData.types_of_order_types}
                                                   onChange={(e) => setEditedData({ ...editedData, types_of_order_types: e.target.value })}
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
                                       {editingId === d.id && editedData.types_of_order_types === 'sincentive__bonus' && (
                                           <td>
                                               <select
                                                   className={cl.formInput}
                                                   value={editedData.vacation_subtype}
                                                   onChange={(e) => setEditedData({ ...editedData, types_of_order_types: e.target.value })}
                                               >
                                                <option value="">Выберите вид поощерения</option>
                                                <option value="sincentive__bonus1">Выберите вил поощерения 1</option>
                                                <option value="sincentive__bonus2">Выберите вил поощерения 2</option>
                                               </select>
                                           </td>
                                       )}
                                       {editingId === d.id && editedData.types_of_order_types === 'resignation' && (
                                           <td>
                                               <select
                                                   className={cl.formInput}
                                                   value={editedData.types_of_order_types}
                                                   onChange={(e) => setEditedData({ ...editedData, types_of_order_types: e.target.value })}
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
                                               value={editedData.order_date || ''}
                                               onChange={(e) => {
                                                   const newDate = e.target.value;
                                                   setEditedData((prevData) => ({
                                                   ...prevData,
                                                   order_date: newDate,
                                                   }));
                                               }}
                                           />
                                       </div>
                                   ) : (
                                       d.order_date
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