import React, { useState, useEffect } from 'react';
import cl from './StaffInfoData.module.css';
import Button from '../../UI/button/Button';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';

function StaffInfoData(props) {
    const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов
    const [selectedSpecChecksOptions, setSelectedSpecChecksOptions] = useState([]);
    const [selectedAttestationsOptions, setSelectedAttestationsOptions] = useState([]);
    const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);
    const [selectedMilitaryRankOptions, setSelectedMilitaryRankOptions] = useState([]);
    const [selectedAwardsOptions, setSelectedAwardsOptions] = useState([]);
    const [selectedSickLeavesOptions, setSelectedSickLeavesOptions] = useState([]);
    const [selectedInvestigationRetrievalsOptions, setSelectedInvestigationRetrievalsOptions] = useState([]);


    useEffect(() => {
        props.setSelectedSpecChecksOptions(selectedSpecChecksOptions)
    }, [selectedSpecChecksOptions]);

    useEffect(() => {
        props.setSelectedAttestationsOptions(selectedAttestationsOptions)
    }, [selectedAttestationsOptions]);

    useEffect(() => {
        props.setSelectedCategoryOptions(selectedCategoryOptions)
    }, [selectedCategoryOptions]);

    useEffect(() => {
        props.setSelectedMilitaryRankOptions(selectedMilitaryRankOptions)
    }, [selectedMilitaryRankOptions]);

    useEffect(() => {
        props.setSelectedAwardsOptions(selectedAwardsOptions)
    }, [selectedAwardsOptions]);

    useEffect(() => {
        props.setSelectedSickLeavesOptions(selectedSickLeavesOptions)
    }, [selectedSickLeavesOptions]);

    useEffect(() => {
        props.setSelectedInvestigationRetrievalsOptions(selectedInvestigationRetrievalsOptions)
    }, [selectedInvestigationRetrievalsOptions]);

    selectedSpecChecksOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedAttestationsOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedCategoryOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedMilitaryRankOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedAwardsOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedSickLeavesOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedInvestigationRetrievalsOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    const spec_checks_options = [
        { id: "speccheck:docNumber", label: "Номер документа", isRange: false },
        { id: "speccheck:docDate", label: "Дата документа", isRange: false },
    ];

    const attestations_options = [
        { id: "attestation:attResult", label: "Номер документа", isRange: false },
        { id: "attestation:lastAttDate", label: "Дата начала", isRange: false },
        { id: "attestation:nextAttDateMin", label: "Дата окончания", isRange: false },
    ];

    const class_categories_options = [
        { id: "classcategory:categoryType", label: "Классная категория", selectOptions:["Выберите категорию", "Спец 2 категории", "Спец 1 категории", "Наставник"], isRange: false },
    ]

    const military_rank_options = [
        { id: "rankInfo:militaryRank:rankTitle", label: "Звание", 
        selectOptions:["Выберите звание", "Рядовой", "Ефрейтор", "Наставник", "Младший сержант", "Сержант", "Старший сержант", "Сержант третьего класса",
        "Сержант второго класса", "Сержант первого класса", "Штаб-сержант", "Мастер-сержант", "Лейтенант", "Старший лейтенант", "Капитан",
        "Майор", "Подполковник", "Полковник", "Генерал-майор", "Генерал-лейтенант", "Генерал-полковник", "Генерал армии"], isRange: false },
        { id: "rankInfo:receivedDate", label: "Дата получения", isRange: false },
        { id: "rankInfo:receivedType", label: "Вид квитанции", isRange: false },
    ];

    const awards_options = [
        { id: "reward:rewardType", label: "Тип награды", isRange: false, selectOptions: ["Выберите тип награды", 'Благодарность', "Грамота", "Почетная грамота", "Нагрудной знак - Қаржылық мониторинг органдарының үздігі", "Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін", 'Мінсіз қызметі үшін ІІІ дәрежелі', 'Мінсіз қызметі үшін ІІ дәрежелі', 'Мінсіз қызметі үшін І дәрежелі' ] },
        { id: "reward:rewardDocNumber", label: "Номер приказа", isRange: false },
        { id: "reward:rewardDate", label: "Дата приказа", isRange: false },
    ];

    const sick_leaves_options = [
        { id: "sickleave:sickDocNumber", label: "Номер приказа", isRange: false },
        { id: "sickleave:sickDocDate", label: "Дата приказа", isRange: false },
    ];

    const investigation_retrievals_options = [
        { id: "investigation:investigation_decree_type", label: "Тип приказа", isRange: false, selectOptions: ["Выберите вид взыскания", "Замечания", 'Выговор', 'Строгий выговор', 'Неполное служебное соответствие', 'Увольнение'] },
        { id: "investigation:investigation_decree_number", label: "Номер приказа служебного расследования", isRange: false },
        { id: "investigation:investigation_date", label: "Дата приказа", isRange: false },
    ];

    const [isOpenStaffInfo, setIsOpenStaffInfo] = useState(false);
    const toggleStaffInfoDropdown = () => {
        setIsOpenStaffInfo(!isOpenStaffInfo);
    };

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
    };

    const [subAttestationMenuOpen, setSubAttestationMenuOpen] = useState(false);
    const toggleAttestationSubMenu = () => {
        setSubAttestationMenuOpen(!subAttestationMenuOpen);
    };

    const [subCategoryMenuOpen, setSubCategoryMenuOpen] = useState(false);
    const toggleCategorySubMenu = () => {
        setSubCategoryMenuOpen(!subCategoryMenuOpen);
    };

    const [subMilitaryRankMenuOpen, setSubMilitaryRankMenuOpen] = useState(false);
    const toggleMilitaryRankSubMenu = () => {
        setSubMilitaryRankMenuOpen(!subMilitaryRankMenuOpen);
    };

    const [subAwardsMenuOpen, setSubAwardsMenuOpen] = useState(false);
    const toggleAwardsSubMenu = () => {
        setSubAwardsMenuOpen(!subAwardsMenuOpen);
    };

    const [subSickLeavesMenuOpen, setSubSickLeavesMenuOpen] = useState(false);
    const toggleSickLeavesSubMenu = () => {
        setSubSickLeavesMenuOpen(!subSickLeavesMenuOpen);
    };

    const [subInvestigationRetrievalsMenuOpen, setSubInvestigationRetrievalsMenuOpen] = useState(false);
    const toggleInvestigationRetrievalsSubMenu = () => {
        setSubInvestigationRetrievalsMenuOpen(!subInvestigationRetrievalsMenuOpen);
    };

    const toggleSpecChecksOption = (option) => {
        if (selectedSpecChecksOptions.includes(option)) {
            setSelectedSpecChecksOptions(selectedSpecChecksOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedSpecChecksOptions([...selectedSpecChecksOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
        }
    };

    const toggleAttestationOption = (option) => {
        if (selectedAttestationsOptions.includes(option)) {
            setSelectedAttestationsOptions(selectedAttestationsOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedAttestationsOptions([...selectedAttestationsOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
        }
    };

    const toggleCategoryOption = (option) => {
        if (selectedCategoryOptions.includes(option)) {
            setSelectedCategoryOptions(selectedCategoryOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedCategoryOptions([...selectedCategoryOptions, option]);
            if (option === "category_type") {
                setFormData({
                  ...formData,
                  [option]: option === "category_type" ? class_categories_options.find((o) => o.id === option).selectOptions[0] : {start_date: '' + ':', end_date: ''},
                });
            }
        }
    };

    const toggleMilitaryRankOption = (option) => {
        if (selectedMilitaryRankOptions.includes(option)) {
            setSelectedMilitaryRankOptions(selectedMilitaryRankOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedMilitaryRankOptions([...selectedMilitaryRankOptions, option]);
            if (option === "military_rank") {
                setFormData({
                  ...formData,
                  [option]: option === "military_rank" ? military_rank_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleAwardsOption = (option) => {
        if (selectedAwardsOptions.includes(option)) {
            setSelectedAwardsOptions(selectedAwardsOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedAwardsOptions([...selectedAwardsOptions, option]);
           
        }
    };

    const toggleSickLeavesOption = (option) => {
        if (selectedSickLeavesOptions.includes(option)) {
            setSelectedSickLeavesOptions(selectedSickLeavesOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedSickLeavesOptions([...selectedSickLeavesOptions, option]);
           
        }
    };

    const toggleInvestigationRetrievalsOption = (option) => {
        if (selectedInvestigationRetrievalsOptions.includes(option)) {
            setSelectedInvestigationRetrievalsOptions(selectedInvestigationRetrievalsOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedInvestigationRetrievalsOptions([...selectedInvestigationRetrievalsOptions, option]);
            if (option === "military_rank") {
                setFormData({
                  ...formData,
                  [option]: option === "military_rank" ? military_rank_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
                <Button onClick={toggleStaffInfoDropdown} className={cl.actionBtn}>
                    Кадровые данные
                    {isOpenStaffInfo ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
                </Button>
                {isOpenStaffInfo && (
                    <div className={cl.dropdown__content}>
                        
                        <div className={cl.dropdown} onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>
                            <button className={cl.subMenuDropdown}>
                                Спец проверка
                            </button>
                            {subMenuOpen && (
                                <div className={cl.subMenu}>
                                    <ul>
                                        {spec_checks_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedSpecChecksOptions.includes(option.id)}
                                                    onChange={() => toggleSpecChecksOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedSpecChecksOptions.includes(option.id) && option.id !== "education_type" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdown} onMouseEnter={toggleAttestationSubMenu} onMouseLeave={toggleAttestationSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdown}>
                                Аттестация
                            </button>
                            {subAttestationMenuOpen && (
                                <div className={cl.subMenu}>
                                    <ul>
                                        {attestations_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedAttestationsOptions.includes(option.id)}
                                                    onChange={() => toggleAttestationOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedAttestationsOptions.includes(option.id) && option.id !== "attestation_result" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownCategory} onMouseEnter={toggleCategorySubMenu} onMouseLeave={toggleCategorySubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownCategory}>
                                Классные категории
                            </button>
                            {subCategoryMenuOpen && (
                                <div className={cl.subMenuCategory}>
                                    <ul>
                                        {class_categories_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedCategoryOptions.includes(option.id)}
                                                    onChange={() => toggleCategoryOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedCategoryOptions.includes(option.id) && option.id !== "category_type" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownRank} onMouseEnter={toggleMilitaryRankSubMenu} onMouseLeave={toggleMilitaryRankSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownRank}>
                                Звания
                            </button>
                            {subMilitaryRankMenuOpen && (
                                <div className={cl.subMenuRank}>
                                    <ul>
                                        {military_rank_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedMilitaryRankOptions.includes(option.id)}
                                                    onChange={() => toggleMilitaryRankOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedMilitaryRankOptions.includes(option.id) && option.id !== "military_rank" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownRank} onMouseEnter={toggleAwardsSubMenu} onMouseLeave={toggleAwardsSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownRank}>
                            Награды
                            </button>
                            {subAwardsMenuOpen && (
                                <div className={cl.subMenuRank}>
                                    <ul>
                                        {awards_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedAwardsOptions.includes(option.id)}
                                                    onChange={() => toggleAwardsOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedAwardsOptions.includes(option.id) && option.id !== "awards_type" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownRank} onMouseEnter={toggleSickLeavesSubMenu} onMouseLeave={toggleSickLeavesSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownRank}>
                            Больничные листы
                            </button>
                            {subSickLeavesMenuOpen && (
                                <div className={cl.subMenuRank}>
                                    <ul>
                                        {sick_leaves_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedSickLeavesOptions.includes(option.id)}
                                                    onChange={() => toggleSickLeavesOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedSickLeavesOptions.includes(option.id) && option.id !== "awards_type" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownInvestigationRetrievals} onMouseEnter={toggleInvestigationRetrievalsSubMenu} onMouseLeave={toggleInvestigationRetrievalsSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownInvestigationRetrievals}>
                            Служебные расследования, взыскания
                            </button>
                            {subInvestigationRetrievalsMenuOpen && (
                                <div className={cl.subMenuInvestigationRetrievals}>
                                    <ul>
                                        {investigation_retrievals_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedInvestigationRetrievalsOptions.includes(option.id)}
                                                    onChange={() => toggleInvestigationRetrievalsOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedInvestigationRetrievalsOptions.includes(option.id) && option.id !== "awards_type" && (
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
                )}
            </div>
        </div>
    );
}

export default StaffInfoData;

export function renderSpecChecksOptions(selectedSpecChecksOptions, formData, handleInputChange, spec_checks_options) {
    return(
        selectedSpecChecksOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Кадровые данные</p>
                {selectedSpecChecksOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{spec_checks_options.find((o) => o.id === option).label}:</label>
                        {option === "owning_lvl" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {spec_checks_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "speccheck:docDate" ? (
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
                            placeholder={`${spec_checks_options.find((o) => o.id === option).label}`}
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

export function renderAttestationOptions(selectedAttestationsOptions, formData, handleInputChange, attestations_options) {
    return(
        selectedAttestationsOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Аттестация</p>
                {selectedAttestationsOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{attestations_options.find((o) => o.id === option).label}:</label>
                        {option === "owning_lvl" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {attestations_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "attestation:lastAttDate" ? (
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
                            option === "attestation:nextAttDateMin" ? (
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
                            ) :
                        <input
                            type="text"
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${attestations_options.find((o) => o.id === option).label}`}
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

export function renderCategoryOptions(selectedCategoryOptions, formData, handleInputChange, class_categories_options) {
    return(
        selectedCategoryOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Классные категории</p>
                {selectedCategoryOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{class_categories_options.find((o) => o.id === option).label}:</label>
                        {option === "classcategory:categoryType" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {class_categories_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : (
                        <input
                            type="text"
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${class_categories_options.find((o) => o.id === option).label}`}
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

export function renderMilitaryRankOptions(selectedMilitaryRankOptions, formData, handleInputChange, military_rank_options) {
    return(
        selectedMilitaryRankOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Классные категории</p>
                {selectedMilitaryRankOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{military_rank_options.find((o) => o.id === option).label}:</label>
                        {option === "rankInfo:militaryRank:rankTitle" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {military_rank_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "rankInfo:receivedDate" ? (
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
                            placeholder={`${military_rank_options.find((o) => o.id === option).label}`}
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

export function renderAwardsOptions(selectedAwardsOptions, formData, handleInputChange, awards_options) {
    return(
        selectedAwardsOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Награды</p>
                {selectedAwardsOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{awards_options.find((o) => o.id === option).label}:</label>
                        {option === "reward:rewardType" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {awards_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "reward:rewardDate" ? (
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
                            placeholder={`${awards_options.find((o) => o.id === option).label}`}
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

export function renderSickLeavesOptions(selectedSickLeavesOptions, formData, handleInputChange, sick_leaves_options) {
    return(
        selectedSickLeavesOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Награды</p>
                {selectedSickLeavesOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{sick_leaves_options.find((o) => o.id === option).label}:</label>
                        {option === "" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {sick_leaves_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "sickleave:sickDocDate" ? (
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
                            placeholder={`${sick_leaves_options.find((o) => o.id === option).label}`}
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

export function renderInvestigationRetrievalsOptions(selectedInvestigationRetrievalsOptions, formData, handleInputChange, investigation_retrievals_options) {
    return(
        selectedInvestigationRetrievalsOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.input__name}>Награды</p>
                {selectedInvestigationRetrievalsOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{investigation_retrievals_options.find((o) => o.id === option).label}:</label>
                        {option === "investigation:investigation_decree_type" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {investigation_retrievals_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "investigation:investigation_date" ? (
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
                            placeholder={`${investigation_retrievals_options.find((o) => o.id === option).label}`}
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