import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from './OrdersListData.module.css';
import { Button } from '@mui/material';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';

function OrdersListData(props) {
    const [selectedOrderListOptions, setSelectedOrderListOptions] = useState([]);
    // const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов
    const {formData, setFormData} = props;

    useEffect(() => {
        // console.log(selectedFamilyOptions);
        props.setSelectedOrderListOptions(selectedOrderListOptions)
    }, [selectedOrderListOptions]);

    const orders_list_options = [
        { id: "decreelist:decreeType", label: "Вид приказа", selectOptions: ["Выберите вид приказа", "О назначение", "Перемещение", "Отпуск", "Командирование", "О присвоение звания", "Наложение дисциплинарного взыскания", "Снятие дисциплинарного взыскания", "Поощерение/Премирование", "Зачисление в распоряжение", "Служебные расследования", "Об увольнении"], isRange: false },
        { id: "decreelist:decreeSubType", label: "Вид подприказа", isRange: false },
        { id: "decreelist:decreeDate", label: "Дата приказа", isRange: false },
    ];


    const [isOpenOrderList, setIsOpenOrderList] = useState(false);
    const toggleOrderListDropdown = () => {
        setIsOpenOrderList(!isOpenOrderList);
    };

      
    const toggleOrderListOption = (option) => {
        if (selectedOrderListOptions.includes(option)) {
            setSelectedOrderListOptions(selectedOrderListOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedOrderListOptions([...selectedOrderListOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
            if (option === "decreelist:decrees:decreeType") {
                setFormData({
                  ...formData,
                  [option]: option === "decreelist:decrees:decreeType" ? orders_list_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const handleInputChange = (option, value) => {
        setFormData({
          ...formData,
          [option]: value,
        });
    };

    return (
        <div>
            <div className={cl.dropdown}>
                <Button variant="contained" style={{ textTransform: 'none' }} onClick={toggleOrderListDropdown} className={cl.actionBtn}>
                    Приказы рапорта
                    {isOpenOrderList ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
                </Button>
                {isOpenOrderList && (
                    <div className={cl.dropdown__content}>
                        <ul>
                            {orders_list_options.map((option) => (
                            <li key={option.id} className={cl.options__label}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={option.id}
                                        checked={selectedOrderListOptions.includes(option.id)}
                                        onChange={() => toggleOrderListOption(option.id)}
                                    />
                                    {option.label}
                                </label>
                                {selectedOrderListOptions.includes(option.id) && option.id !== "order_type" && (
                                <div>
                                
                                </div>
                                )}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdersListData;

export function renderOrderListOptions(selectedOrderListOptions, formData, handleInputChange, orders_list_options) {
    const selectedOrderType = formData["decreelist:decreeType"]; // Получаем выбранный вид приказа
    return(
        selectedOrderListOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Трудовая деятельность</p>
                {selectedOrderListOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{orders_list_options.find((o) => o.id === option).label}:</label>
                        {option === "decreelist:decreeType" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {orders_list_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : 
                            option === "decreelist:decreeDate" ? (
                            <div className={cl.data__wrapper}>
                                <div>
                                <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                <input
                                    type="date"
                                    className={cl.workerInfoDate}
                                    value={formData[option]?.start_date || ''}
                                    onChange={(e) => handleInputChange(option, { ...formData[option], start_date: e.target.value })}
                                />
                                </div>
                                <div>
                                <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                <input
                                    type="date"
                                    className={cl.workerInfoDate}
                                    value={formData[option]?.end_date || ''}
                                    onChange={(e) => handleInputChange(option, { ...formData[option], end_date: e.target.value })}
                                />
                                </div>
                            </div>
                         ) : ( 
                        <input
                            type="text"
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${orders_list_options.find((o) => o.id === option).label}`}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                        />
                        ) 
                    }
                    </div>
                ))}
                {selectedOrderType === "Отпуск" && (
                    <div style={{ display: 'flex' }}>
                        <label className={cl.label__name}>Тип отпуска:</label>
                        <select
                            value={formData["decreelist:decreeSubType"] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange("decreelist:decreeSubType", e.target.value)}
                        >
                            <option value="Годовой трудовой">Годовой трудовой</option>
                            <option value="Краткосрочный">Краткосрочный</option>
                            <option value="Без сохранения заработной платы">Без сохранения заработной платы</option>
                            <option value="Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет">Отпуск без сохранения заработной платы по уходу за ребенком до достижения им возраста трех лет</option>
                            <option value="Отпуск в связи с беременностью и рождением ребенка (детей)">Отпуск в связи с беременностью и рождением ребенка (детей)</option>
                            <option value="С усыновлением (удочерением) новорожденного ребенка (детей)">С усыновлением (удочерением) новорожденного ребенка (детей)</option>
                        </select>
                    </div>
                )}
                {selectedOrderType === "Об увольнении" && (
                    <div>
                        <label className={cl.label__name}>Вид увольнения:</label>
                        <select
                            value={formData["decreelist:decreeSubType"] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange("decreelist:decreeSubType", e.target.value)}
                        >
                           <option value="">Выберите вид увольнения</option>
                            <option value="По собственной инициативе">По собственной инициативе</option>
                            <option value="По отрицательным мотивам">По отрицательным мотивам</option>
                            <option value="На пенсию">На пенсию</option>
                        </select>
                    </div>
                )}
            </div>     
        )
    );
};