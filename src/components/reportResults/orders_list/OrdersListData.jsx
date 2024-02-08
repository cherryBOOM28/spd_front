import React, { useState, useEffect } from 'react';
import cl from './OrdersListData.module.css';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';
import { Button, TextField, Select, InputLabel, FormControl, MenuItem, Box } from '@mui/material';
import { BsExclamationCircle } from "react-icons/bs";


function OrdersListData(props) {
    const [selectedOrderListOptions, setSelectedOrderListOptions] = useState([]);
    // const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов
    const {formData, setFormData} = props;

    useEffect(() => {
        // console.log(selectedFamilyOptions);
        props.setSelectedOrderListOptions(selectedOrderListOptions)
    }, [selectedOrderListOptions]);

    const orders_list_options = [
        { id: "decreelist:decreeType", label: "Вид приказа", selectOptions: ["Присвоение звания", "Назначение", "Перемещение", "Отпуск", "Командировка", "Увольнение"], isRange: false },
        { id: "decreelist:decreeDate", label: "Дата приказа", isRange: false },
    ];

    // selectedOrderListOptions.forEach((option) => {
    //     if (!formData.hasOwnProperty(option)) {
    //       formData[option] = '';
    //     }
    // });

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
            if (option === "decreelist:decreeType") {
                setFormData({
                  ...formData,
                  [option]: option === "decreelist:decreeType" ? orders_list_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
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
    return(
        selectedOrderListOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Приказы</p>
                {selectedOrderListOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{orders_list_options.find((o) => o.id === option).label}:</label>
                        {option === "decreelist:decreeType" ? (
                            <div className={cl.tooltipWrapper}>
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    value={formData[option] || ''}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                    required
                                    title="Выберите вид приказа" // Добавлен атрибут title
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                    className={cl.workerInfoSelect}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите вид приказа
                                    </MenuItem>
                                    {orders_list_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div className={cl.tooltipText}> <BsExclamationCircle />Выберите вид приказа</div>
                            </div>
                        ) : 
                            option === "decreelist:decreeDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
                                        style={{ marginBottom: '10px' }}
                                        value={formData[option] != null ? formData[option].start_date : ''}
                                        onChange={(e) => handleInputChange(option, { ...formData[option], start_date: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
                                        value={formData[option] != null ? formData[option].end_date : ''}
                                        onChange={(e) => handleInputChange(option, { ...formData[option], end_date: e.target.value })}
                                    />
                                </div>
                            </div>
                         ) : ( 
                        <TextField
                            type="text"
                            size='small'
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${orders_list_options.find((o) => o.id === option).label}`}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                        />
                        ) 
                    }
                    </div>
                ))}
                
            </div>     
        )
    );
};