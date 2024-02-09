import React, { useState, useEffect } from 'react';
import cl from './WorkingHistoryData.module.css'
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';
import {Paper,  Button, TextField, Select, InputLabel, FormControl, MenuItem, Box } from '@mui/material';


function WorkingHistoryData(props) {
    const [selectedWorkingHistoryOptions, setSelectedWorkingHistoryOptions] = useState([]);
    // const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов
    const {formData, setFormData} = props

    useEffect(() => {
        // console.log(selectedFamilyOptions);
        props.setSelectedWorkingHistoryOptions(selectedWorkingHistoryOptions)
    }, [selectedWorkingHistoryOptions]);
    
    const working_history_options = [
        { id: "workinghistory:startDate", label: "Начало периода", isRange: false },
        { id: "workinghistory:endDate", label: "Конец периода", isRange: false },
        { id: "workinghistory:department", label: "Подразделение", isRange: false },
        { id: "workinghistory:positionName", label: "Должность", isRange: false },
        { id: "workinghistory:organizationName", label: "Учреждение", isRange: false },
        { id: "workinghistory:organizationAddress", label: "Местонахождение организации", isRange: false },
    ];

    selectedWorkingHistoryOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    const [isOpenWorkingHistory, setIsOpenWorkingHistory] = useState(false);
    const toggleWorkingHistoryDropdown = () => {
        setIsOpenWorkingHistory(!isOpenWorkingHistory);
    };

    const toggleWorkingHistoryOption = (option) => {
        if (selectedWorkingHistoryOptions.includes(option)) {
            setSelectedWorkingHistoryOptions(selectedWorkingHistoryOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedWorkingHistoryOptions([...selectedWorkingHistoryOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
            if (option === "family_status") {
                setFormData({
                  ...formData,
                  [option]: option === "family_status" ? working_history_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };


    return (
        <div className={cl.dropdown}>
            <Button variant="contained" style={{ textTransform: 'none',  flex: 1, }} onClick={toggleWorkingHistoryDropdown} className={cl.actionBtn}>
                Трудовая деятельность
                {isOpenWorkingHistory ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
            </Button>
            {isOpenWorkingHistory && (
                <Paper className={cl.dropdown__content}>
                    <ul>
                        {working_history_options.map((option) => (
                        <li key={option.id} className={cl.options__label}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    checked={selectedWorkingHistoryOptions.includes(option.id)}
                                    onChange={() => toggleWorkingHistoryOption(option.id)}
                                />
                                {option.label}
                            </label>
                            {selectedWorkingHistoryOptions.includes(option.id) && option.id !== "gender" && (
                            <div>
                                
                            </div>
                            )}
                        </li>
                        ))}
                    </ul>
                </Paper>
            )}
        </div>
    );
}

export default WorkingHistoryData;

export function renderWorkingHistoryOptions(selectedWorkingHistoryOptions, formData, handleInputChange, working_history_options) {
    return(
        selectedWorkingHistoryOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Трудовая деятельность</p>
                {selectedWorkingHistoryOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{working_history_options.find((o) => o.id === option).label}:</label>
                        {option === "workinghistory:startDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
                                        value={formData[option] != null ? formData[option].start_date : ''}
                                        // value={formData[option]?.start_date || ''}
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
                                        // value={formData[option]?.end_date || ''}
                                        onChange={(e) => handleInputChange(option, { ...formData[option], end_date: e.target.value })}
                                    />
                                </div>
                            </div>
                         ) :  option === "workinghistory:endDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
                                        // value={formData[option]?.start_date || ''}
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
                                        // value={formData[option]?.end_date || ''}
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
                            placeholder={`${working_history_options.find((o) => o.id === option).label}`}
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
