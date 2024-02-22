import React, { useState, useEffect } from 'react';
import cl from './StaffInfoData.module.css';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';
import { Paper, Button, TextField, Select, FormControl, MenuItem, Box } from '@mui/material';
import { BsExclamationCircle } from "react-icons/bs";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';


function StaffInfoData(props) {
    // const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов
    const [selectedSpecChecksOptions, setSelectedSpecChecksOptions] = useState([]);
    const [selectedAttestationsOptions, setSelectedAttestationsOptions] = useState([]);
    const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);
    const [selectedMilitaryRankOptions, setSelectedMilitaryRankOptions] = useState([]);
    const [selectedAwardsOptions, setSelectedAwardsOptions] = useState([]);
    const [selectedSickLeavesOptions, setSelectedSickLeavesOptions] = useState([]);
    const [selectedInvestigationRetrievalsOptions, setSelectedInvestigationRetrievalsOptions] = useState([]);
    const {formData, setFormData} = props;

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

        setExpanded(false);

    };

    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [expandedAttestation, setExpandedAttestation] = useState(false);
    const handleChangeAttestation = (panel) => (event, isExpanded) => {
        setExpandedAttestation(isExpanded ? panel : false);
    };

    const [expandedCategory, setExpandedCategory] = useState(false);
    const handleChangeCategory = (panel) => (event, isExpanded) => {
        setExpandedCategory(isExpanded ? panel : false);
    };

    const [expandedMilitaryRank, setExpandedMilitaryRank] = useState(false);
    const handleChangeMilitaryRank = (panel) => (event, isExpanded) => {
        setExpandedMilitaryRank(isExpanded ? panel : false);
    };

    const [expandedAwards, setExpandedAwards] = useState(false);
    const handleChangeAwards = (panel) => (event, isExpanded) => {
        setExpandedAwards(isExpanded ? panel : false);
    };

    const [expandedSickLeaves, setExpandedSickLeaves] = useState(false);
    const handleChangeSickLeaves = (panel) => (event, isExpanded) => {
        setExpandedSickLeaves(isExpanded ? panel : false);
    };

    const [expandedInvestigationRetrievals, setExpandedInvestigationRetrievals] = useState(false);
    const handleChangeInvestigationRetrievals = (panel) => (event, isExpanded) => {
        setExpandedInvestigationRetrievals(isExpanded ? panel : false);
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
                <Button variant="contained" style={{ textTransform: 'none', backgroundColor: '#1B3884'  }} onClick={toggleStaffInfoDropdown} className={cl.actionBtn}>
                    Кадровые данные
                    {isOpenStaffInfo ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
                </Button>
                {isOpenStaffInfo && (
                    <Paper className={cl.dropdown__content}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Спец проверка</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion expandedAttestation={expandedAttestation === 'panel1'} onChange={handleChangeAttestation('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Аттестация</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedCategory={expandedCategory === 'panel1'} onChange={handleChangeCategory('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Классные категории</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedMilitaryRank={expandedMilitaryRank === 'panel1'} onChange={handleChangeMilitaryRank('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Звания</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                      
                        <Accordion expandedAwards={expandedAwards === 'panel1'} onChange={handleChangeAwards('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Награды</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedSickLeaves={expandedSickLeaves === 'panel1'} onChange={handleChangeSickLeaves('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Больничные листы</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                     
                        <Accordion expandedInvestigationRetrievals={expandedInvestigationRetrievals === 'panel1'} onChange={handleChangeInvestigationRetrievals('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text}>Служебные расследования, взыскания</p>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
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
                <p className={cl.headline}>Спец проверка</p>
                {selectedSpecChecksOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{spec_checks_options.find((o) => o.id === option).label}:</label>
                        {option === "speccheck:docDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
                                        value={formData[option] != null ? formData[option].start_date : ''}
                                        onChange={(e) => handleInputChange(option, { ...formData[option], start_date: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                    <TextField
                                        size='small'
                                        type="date"
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
                <p className={cl.headline}>Аттестация</p>
                {selectedAttestationsOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{attestations_options.find((o) => o.id === option).label}:</label>
                        {option === "attestation:lastAttDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
                                        value={formData[option] != null ? formData[option].start_date : ''}
                                        onChange={(e) => handleInputChange(option, { ...formData[option], start_date: e.target.value })}
                                    />
                                </div>
                                <div>
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
                            option === "attestation:nextAttDateMin" ? (
                                <div className={cl.data__wrapper}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                        <TextField
                                            type="date"
                                            size='small'
                                            className={cl.workerInfoDate}
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
                            ) :
                        <TextField
                            type="text"
                            size='small'
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
                <p className={cl.headline}>Классные категории</p>
                {selectedCategoryOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{class_categories_options.find((o) => o.id === option).label}:</label>
                        {option === "classcategory:categoryType" ? (
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    required
                                    title="Выберите вид обучения" // Добавлен атрибут title
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите категорию
                                    </MenuItem>
                                    {class_categories_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                
                                </Select>
                            </FormControl>
                
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
                <p className={cl.headline}>Классные категории</p>
                {selectedMilitaryRankOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{military_rank_options.find((o) => o.id === option).label}:</label>
                        {option === "rankInfo:militaryRank:rankTitle" ? (
                            <div className={cl.tooltipWrapper}>
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    required
                                    title="Выберите звание" // Добавлен атрибут title
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите звание
                                    </MenuItem>
                                    {military_rank_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                
                                </Select>
                            </FormControl>
                        <div className={cl.tooltipText}> <BsExclamationCircle />Выберите звание</div>
                            </div>
                         
                        ) : option === "rankInfo:receivedDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
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
                <p className={cl.headline}>Награды</p>
                {selectedAwardsOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{awards_options.find((o) => o.id === option).label}:</label>
                        {option === "reward:rewardType" ? (
                        <div className={cl.tooltipWrapper}>
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    required
                                    title="Выберите тип награды" // Добавлен атрибут title
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите тип награды
                                    </MenuItem>
                                    {awards_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                
                                </Select>
                            </FormControl>
                            <div className={cl.tooltipText}> <BsExclamationCircle />Выберите тип награды</div>
                        </div>
                
                        ) : option === "reward:rewardDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
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
                <p className={cl.headline}>Награды</p>
                {selectedSickLeavesOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{sick_leaves_options.find((o) => o.id === option).label}:</label>
                        {option === "sickleave:sickDocDate" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
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
                <p className={cl.headline}>Служебные взыскания</p>
                {selectedInvestigationRetrievalsOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{investigation_retrievals_options.find((o) => o.id === option).label}:</label>
                        {option === "investigation:investigation_decree_type" ? (
                        <div className={cl.tooltipWrapper}>
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    required
                                    title="Выберите вид взыскания" // Добавлен атрибут title
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите вид взыскания
                                    </MenuItem>
                                    {investigation_retrievals_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                
                                </Select>
                            </FormControl>
                            <div className={cl.tooltipText}> <BsExclamationCircle />Выберите вид взыскания</div>
                        </div>
                        ) : option === "investigation:investigation_date" ? (
                            <div className={cl.data__wrapper}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                    <TextField
                                        type="date"
                                        size='small'
                                        className={cl.workerInfoDate}
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