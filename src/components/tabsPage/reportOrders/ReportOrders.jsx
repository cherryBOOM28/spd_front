import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import cl from './ReportOrders.module.css';
import Button from '../../../components/UI/button/Button';

import { getOrdersList } from '../../../api/orders_list/getOrdersList';
import { deleteOrdersList } from '../../../api/orders_list/deleteOrdersList';
import { updateOrdersList } from '../../../api/orders_list/updateOrdersList';


function ReportOrders(props) {
    const { id } = useParams();
    // const iin = props.iin;

    const [personnelData, setPersonnelData] = useState([]); // Данные из бэка

    useEffect(() => {
        fetchData()
    }, [])

        const fetchData = async () => {
            try {
                // GET PERSONAL DATA
                const response = await getOrdersList(id) 
                setPersonnelData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

            // TABLE DATA

    // ДОБАВЛЕНИЕ НАГРАДЫ
    const [showForm, setShowForm] = useState(false);

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
            // if (!inputData.order_type || !inputData.types_of_order_types || !inputData.order_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

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
                iin: props.id,
                order_type: inputData.order_type,
                types_of_order_types: inputData.types_of_order_types,
                order_date: inputData.order_date,
            };

            // console.log(
            //     { 'data': [newData] }
            // )

            const response = await axios.post('http://localhost:8000/orders_list/create/', newData);

            if (response === 201) {
                setPersonnelData(prevRecords => [...prevRecords, newData]);
                setInputData({
                    iin: id,
                    order_type: '',
                    types_of_order_types: '',
                    order_date: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            const response = await deleteOrdersList(id)
            if (response === 200) {
                // Успешно удалено, теперь обновляем состояние
                // setPersonnelData(prevData => prevData.filter(tableData => tableData.id !== id));
                setPersonnelData((prevData) =>
                prevData.filter((member) => member.id !== id)
            );
                console.log("Successfully deleted");
            } else {
                console.log("Error deleting data in table");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        order_type: '',
        types_of_order_types: '',
        order_date: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                    id: id,
                    iin: props.id,
                    order_type: editedTableData.order_type,
                    types_of_order_types: editedTableData.types_of_order_types,
                    order_date: editedTableData.order_date,
                };

                await getOrdersList(id, updatedData);

                setPersonnelData(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.iin === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });

                setEditingId(null);
                setEditedData({
                    id: id,
                    order_type: '',
                    types_of_order_types: '',
                    order_date: '',
                });
                console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
        } else {
            setEditingId(id)
            const dataToEdit = personnelData.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                iin: props.id,
                order_type: editedData.order_type,
                types_of_order_types: editedData.types_of_order_types,
                order_date: editedData.order_date,
            };
            console.log(id);
    
            const response = await updateOrdersList(id, updatedData);
    
            if (response === 200) {
                setPersonnelData((prevData) =>
                    prevData.map((tableData) => (tableData.id === id ? updatedData : tableData))
                );
                setEditingId(null); // Завершаем режим редактирования
                console.log('Successfully updated table data');
            } else {
                console.log('Error updating table data');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };
    return (
        <div className={cl.totalInfoWrapper}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Приказы рапорта</p>
            </div>
        </div>
        <div>
            <div>
            <Button onClick={handleShowForm}>Добавить приказ рапорта</Button>
                {showForm && (
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
                                            <option value="Поощерение/Премирование">Поощерение/Премирование</option>
                                            <option value="Зачисление в распоряжение">Зачисление в распоряжение</option>
                                            <option value="Служебные расследования">Служебные расследования</option>
                                            <option value="Об увольнении">Об увольнени</option>
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
                                    {inputData.order_type === 'Зачисление в распоряжение' && (
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
                                    {inputData.order_type === 'resignation' && (
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
                                    <td><Button type="submit">Добавить</Button></td>
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
                            <td>Вид приказа</td>
                            <td>Вид подприказа</td>
                            <td>Дата приказа</td>
                            <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {personnelData.map((d, i) => (
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
    );
}

export default ReportOrders;