import React, { useEffect, useState } from 'react';
import cl from './ReportPersonalData.module.css';
import { Button, TextField, Select, InputLabel, FormControl, MenuItem, Box } from '@mui/material';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';
import { updateFormData } from '../../../pages/reports/Reports';
import { BsExclamationCircle } from "react-icons/bs";
import list from '../../data/languages';
import listOfSports from '../../data/kindsOfSports';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';



function ReportPersonalData(props) {
    const [selectedPersonalOptions, setSelectedPersonalOptions] = useState([]);
    const [selectedFamilyOptions, setSelectedFamilyOptions] = useState([]);
    const [selectedEducationOptions, setSelectedEducationOptions] = useState([]);
    const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
    const [selectedCoursesOptions, setSelectedCoursesOptions] = useState([]);
    const [selectedAcademicDegreeOptions, setSelectedAcademicDegreeOptions] = useState([]);
    const [selectedSportOptions, setSelectedSportOptions] = useState([]);

    

    const {formData, setFormData} = props; // Состояние для хранения данных из инпутов
    // const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов

    useEffect(() => {
        // console.log(selectedFamilyOptions);
        props.setSelectedFamilyOptions(selectedFamilyOptions)
    }, [selectedFamilyOptions]);

    useEffect(() => {
        props.setSelectedPersonalOptions(selectedPersonalOptions)
    }, [selectedPersonalOptions]);

    useEffect(() => {
        props.setSelectedEducationOptions(selectedEducationOptions)
    }, [selectedEducationOptions]);

    useEffect(() => {
        props.setSelectedLanguageOptions(selectedLanguageOptions)
    }, [selectedLanguageOptions]);

    useEffect(() => {
        props.setSelectedCoursesOptions(selectedCoursesOptions)
    }, [selectedCoursesOptions]);

    useEffect(() => {
        props.setSelectedAcademicDegreeOptions(selectedAcademicDegreeOptions)
    }, [selectedAcademicDegreeOptions]);

    useEffect(() => {
        props.setSelectedSportOptions(selectedSportOptions)
    }, [selectedSportOptions]);


    const personal_data_options = [
        { id: "familyStatus:statusName", label: "Семейное положение", selectOptions: ["Выберите семейное положение", "Не женат/не замужем", "Женат/замужем", "Вдова/вдовец", "Разведена/разведен"], isRange: false },
        { id: "positionInfo:department:DepartmentName", label: "Подразделение", isRange: false },
        { id: "positionInfo:position:positionTitle", label: "Должность", isRange: false },
        { id: "positionInfo:department:LocationName", label: "Город", isRange: false },
    ];

    const family_compositions_options = [
        { id: "familycomposition:relativeType", label: "Степень родства", selectOptions: ["супруг/супруга", "сын/дочь", "мать/отец", "брат/сестра"], isRange: false },
        { id: "familycomposition:relName", label: "Имя", isRange: false },
        { id: "familycomposition:relSurname", label: "Фамилия", isRange: false },
        { id: "familycomposition:relPatronymic", label: "Отчество", isRange: false },
        { id: "familycomposition:relIin", label: "ИИН", isRange: false },
        { id: "familycomposition:relBirthDate", label: "Дата рождения", isRange: false },
        { id: "familycomposition:relJobPlace", label: "Место работы", isRange: false },
    ];

    const educations_options = [
        { id: "education:educationType", label: "Вид образования", selectOptions: ["Выберите вид образования", "Высшее", "Магистратура"], isRange: false },
        { id: "education:educationPlace", label: "Учебное заведение", isRange: false },
        { id: "education:educationDateIn", label: "Дата поступления", isRange: false },
        { id: "education:educationDateOut", label: "Дата окончания", isRange: false },
        { id: "education:speciality", label: "Специальность", isRange: false },
        { id: "education:educationForm", label: "Вид обучения", selectOptions: ["Очное", "Заочное", "Дистанционное"], isRange: false },
    ];

    const owning_languages_options = [
        { id: "languageskill:langName", label: "Язык", isRange: false },
        { id: "languageskill:skillLvl", label: "Уровень владения языком", selectOptions: ["Выберите уровень", "Cо словарем", "Начальный", "Ниже среднего", "Средний", "Выше среднего", "Продвинутый", "Профессиональный", "Родной"], isRange: false },
    ];

    const courses_options = [
        { id: "course:courseType", label: "Вид переподготовки", selectOptions: ["Выберите вид переподготовки", "Повышение", "Подготовка"], isRange: false },
        { id: "course:courseOrg", label: "Учебное заведение", isRange: false },
        { id: "course:startDate", label: "Дата начала", isRange: false },
        { id: "course:endDate", label: "Дата окончания", isRange: false },
        { id: "course:documentType", label: "Вид документа", isRange: false },
        { id: "course:courseName", label: "Название курса", isRange: false },
    ];

    const academic_degree_options = [
        { id: "academicdegree:academicPlace", label: "Учебное заведение", isRange: false },
        { id: "academicdegree:academicDegree", label: "Вид образования", selectOptions: ["Выберите вид образования", "Бакалавр", "Магистр", "Кандидат", "Доктор"], isRange: false },
        { id: "academicdegree:academicDiplomaNumber", label: "Номер диплома", isRange: false },
        { id: "academicdegree:academicDiplomaDate", label: "Дата диплома", isRange: false },
    ];

    const sport_results_options = [
        { id: "sportskill:sportType", label: "Вид спорта", isRange: false },
        { id: "sportskill:sportSkillLvl", label: "Степень владения", selectOptions: ["Выберите степень владения", "Любитель", "Первый спортивный разряд", "Второй спортивный разряд", "Третий спортивный разряд", "Кандидат мастера спорта", "Мастер спорта"], isRange: false },
    ];

    const [isOpenPersonal, setIsOpenPersonal] = useState(false);
    const togglePersonalDropdown = () => {
        setIsOpenPersonal(!isOpenPersonal);

        setExpanded(false);
        setExpandedEdu(false);
        setExpandedLanguage(false);
        setExpandedAcademicDegree(false);
        setExpandedSport(false);
        setExpandedCourse(false);
    };

 
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [expandedEdu, setExpandedEdu] = useState(false);
    const handleChangeEducation = (panel) => (event, isExpanded) => {
        setExpandedEdu(isExpanded ? panel : false);
    };

    const [expandedLanguage, setExpandedLanguage] = useState(false);
    const handleChangeLanguage = (panel) => (event, isExpanded) => {
        setExpandedLanguage(isExpanded ? panel : false);
    };
    
    const [expandedCourse, setExpandedCourse] = useState(false);
    const handleChangeCourse = (panel) => (event, isExpanded) => {
        setExpandedCourse(isExpanded ? panel : false);
    };
    
    const [expandedAcademicDegree, setExpandedAcademicDegree] = useState(false);
    const handleChangeAcademicDegree = (panel) => (event, isExpanded) => {
        setExpandedAcademicDegree(isExpanded ? panel : false);
    };

    const [expandedSport, setExpandedSport] = useState(false);
    const handleChangeSport = (panel) => (event, isExpanded) => {
        setExpandedSport(isExpanded ? panel : false);
    };
 

    const togglePersonalOption = (option) => {

        console.log(selectedPersonalOptions)

        if (selectedPersonalOptions.includes(option)) {
          setSelectedPersonalOptions(prev => {
            return prev.filter((item) => item !== option)
          });
          delete formData[option];

        } else {
          setSelectedPersonalOptions([...selectedPersonalOptions, option]);
          // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
          // то сразу устанавливаем их значения в formData

          if (option === "familyStatus:satatusName") {
            updateFormData(option, personal_data_options.find((o) => o.id === option).selectOptions[0], formData);
          } else {
            updateFormData(option, personal_data_options.find((o) => o.id === option).isRange, formData);
          }

        }

        console.log(selectedPersonalOptions)
    };
      

    const toggleOption = (option) => {
        if (selectedFamilyOptions.includes(option)) {
            setSelectedFamilyOptions(selectedFamilyOptions.filter((item) => item !== option));
            delete formData[option];
          } else {
            setSelectedFamilyOptions([...selectedFamilyOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
            if (option === "familycomposition:relatives:relativeType") {
                setFormData({
                  ...formData,
                  [option]: option === "familycomposition:relatives:relativeType" ? family_compositions_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleEducationOption = (option) => {
        if (selectedEducationOptions.includes(option)) {
            setSelectedEducationOptions(selectedEducationOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedEducationOptions([...selectedEducationOptions, option]);
            if (option === "education:educations:educationType") {
                setFormData({
                  ...formData,
                  [option]: option === "education:educations:educationType" ? educations_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleLanguageOption = (option) => {
        if (selectedLanguageOptions.includes(option)) {
            setSelectedLanguageOptions(selectedLanguageOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedLanguageOptions([...selectedLanguageOptions, option]);
            if (option === "languageskill:languageSkills:langName") {
                setFormData({
                  ...formData,
                  [option]: option === "languageskill:languageSkills:langName" ? owning_languages_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleCourseOption = (option) => {
        if (selectedCoursesOptions.includes(option)) {
            setSelectedCoursesOptions(selectedCoursesOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedCoursesOptions([...selectedCoursesOptions, option]);
            if (option === "course:courses:courseType") {
                setFormData({
                  ...formData,
                  [option]: option === "course:courses:courseType" ? courses_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleAcademicDegreeOption = (option) => {
        if (selectedAcademicDegreeOptions.includes(option)) {
            setSelectedAcademicDegreeOptions(selectedAcademicDegreeOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedAcademicDegreeOptions([...selectedAcademicDegreeOptions, option]);
            if (option === "academicdegree:academicDegrees:academicDegree") {
                setFormData({
                  ...formData,
                  [option]: option === "academicdegree:academicDegrees:academicDegree" ? courses_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleSportOption = (option) => {
        if (selectedSportOptions.includes(option)) {
            setSelectedSportOptions(selectedSportOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedSportOptions([...selectedSportOptions, option]);
            if (option === "sportskill:sportSkills:sportSkillLvl") {
                setFormData({
                  ...formData,
                  [option]: option === "sportskill:sportSkills:sportSkillLvl" ? sport_results_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
                <Button variant="contained" style={{ textTransform: 'none' }} onClick={togglePersonalDropdown} className={cl.actionBtn}>
                    Личные данные
                    {isOpenPersonal ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
                </Button>
                {isOpenPersonal && (
                    <div className={cl.dropdown__content}>
                        <ul>
                            {personal_data_options.map((option) => (
                            <li key={option.id} className={cl.options__label}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={option.id}
                                        checked={selectedPersonalOptions.includes(option.id)}
                                        onChange={() => togglePersonalOption(option.id)}
                                    />
                                    {option.label}
                                </label>
                                {selectedPersonalOptions.includes(option.id) && option.id !== "familyStatus:statusName" && (
                                <div>
                                
                                </div>
                                )}
                            </li>
                            ))}
                        </ul>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text} >Состав семьи</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {family_compositions_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedFamilyOptions.includes(option.id)}
                                                    onChange={() => toggleOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedFamilyOptions.includes(option.id) && option.id !== "education_type" && (
                                                <div>

                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedEdu={expandedEdu === 'panel1'} onChange={handleChangeEducation('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text} >Образование</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {educations_options.map((option) => (
                                                <li key={option.id} className={cl.options__label}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={option.id}
                                                            checked={selectedEducationOptions.includes(option.id)}
                                                            onChange={() => toggleEducationOption(option.id)}
                                                        />
                                                        {option.label}
                                                    </label>
                                                    {selectedEducationOptions.includes(option.id) && option.id !== "relative_type" && (
                                                    <div>
                                                    
                                                    </div>
                                                    )}
                                                </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedLanguage={expandedLanguage === 'panel1'} onChange={handleChangeLanguage('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text} >Владение языками</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {owning_languages_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedLanguageOptions.includes(option.id)}
                                                    onChange={() => toggleLanguageOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedLanguageOptions.includes(option.id) && option.id !== "owning_lvl_language" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedCourse={expandedCourse === 'panel1'} onChange={handleChangeCourse('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text} >Курсы подготовки и повышения квалификаций</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {courses_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedCoursesOptions.includes(option.id)}
                                                    onChange={() => toggleCourseOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedCoursesOptions.includes(option.id) && option.id !== "course_type" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedAcademicDegree={expandedAcademicDegree === 'panel1'} onChange={handleChangeAcademicDegree('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text} >Ученые степени</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {academic_degree_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedAcademicDegreeOptions.includes(option.id)}
                                                    onChange={() => toggleAcademicDegreeOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedAcademicDegreeOptions.includes(option.id) && option.id !== "academic_degree" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expandedSport={expandedSport === 'panel1'} onChange={handleChangeSport('panel1')} style={{ borderRadius: '5px' }}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                            <p className={cl.accordion_text} > Отношение к спорту</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul>
                                    {sport_results_options.map((option) => (
                                        <li key={option.id} className={cl.options__label}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option.id}
                                                    checked={selectedSportOptions.includes(option.id)}
                                                    onChange={() => toggleSportOption(option.id)}
                                                />
                                                {option.label}
                                            </label>
                                            {selectedSportOptions.includes(option.id) && option.id !== "academic_degree" && (
                                            <div>
                                            
                                            </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReportPersonalData;


export function renderFamilyOptions(selectedFamilyOptions, formData, handleInputChange, family_compositions_options) {
  return (
    selectedFamilyOptions.length > 0 && (
      <div className={cl.input__container}>
        <p className={cl.headline}>Личные данные</p>
        <div className={cl.tooltipTextMain}> <BsExclamationCircle style={{ color: '#1565C0' }} /> Заполните все поля</div>
        {selectedFamilyOptions.map((option) => (
          <div key={option} className={cl.wrapper__input}>
            <label className={cl.label__name}>{family_compositions_options.find((o) => o.id === option).label}:</label>
            {option === "familycomposition:relativeType" ? (
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
                            title="Выберите тип родственника" // Добавлен атрибут title
                            size='small'
                            // style={{ marginLeft: '12px' }}
                            className={cl.workerInfoSelect}
                        >
                            <MenuItem value="" disabled hidden>
                            Выберите тип родственника
                            </MenuItem>
                            {family_compositions_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                            <MenuItem key={genderOption} value={genderOption}>
                                {genderOption}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={cl.tooltipText}> <BsExclamationCircle />Выберите тип родственника</div>
                </div>
            ) : option === "familycomposition:relBirthDate" ? (
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
                placeholder={`${family_compositions_options.find((o) => o.id === option).label}`}
                onChange={(e) => handleInputChange(option, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    )
  );
};

export function RenderPersonalOptions(selectedPersonalOptions, formData, handleInputChange, personal_data_options) {
    const [locations, setLocations] = useState([]); // для отображении городов в личных данных
    const [positions, setPositions] = useState([]); // для отображении должностей в личных данных


    useEffect(() => {
        // Функция для загрузки списка городов из API
        const accessToken = Cookies.get('jwtAccessToken');
        const fetchLocations = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/location', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            setLocations(response.data.map(location => location.LocationName));
          } catch (error) {
            console.error('Ошибка при загрузке городов:', error);
          }
        };
    
        fetchLocations(); // Вызываем функцию загрузки при монтировании компонента
    }, []);

    useEffect(() => {
        // Функция для загрузки списка городов из API
        const accessToken = Cookies.get('jwtAccessToken');
        const fetchLocations = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/position', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            setPositions(response.data.map(position => position.positionTitle));
          } catch (error) {
            console.error('Ошибка при загрузке:', error);
          }
        };
    
        fetchLocations(); // Вызываем функцию загрузки при монтировании компонента
    }, []);

    return(
        selectedPersonalOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Личные данные</p>
                {selectedPersonalOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        {personal_data_options && personal_data_options.length > 0 && (
                            <>
                                <label className={cl.label__name}>
                                    {personal_data_options.find((o) => o.id === option)?.label}:
                                </label>
                                {option === "positionInfo:department:LocationName" ? (
                                    <FormControl fullWidth >
                                        {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // label='Страна рождения'
                                            value={formData[option] || ''}
                                            className={cl.workerInfoSelect}
                                            onChange={(e) => handleInputChange(option, e.target.value)}
                                            size='small'
                                            style={{ marginLeft: '32px' }}
                                        >
                                            <MenuItem value="" disabled hidden>
                                            Выберите город
                                            </MenuItem>
                                            {locations.map((city) => (
                                            <MenuItem key={city} value={city}>
                                                {city}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )  : option === "positionInfo:position:positionTitle" ? (
                                    <div className={cl.data__wrapper}>
                                        <FormControl fullWidth >
                                            {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // label='Страна рождения'
                                                value={formData[option] || ''}
                                                className={cl.workerInfoSelect}
                                                onChange={(e) => handleInputChange(option, e.target.value)}
                                                size='small'
                                                style={{ marginLeft: '32px' }}
                                            >
                                                <MenuItem value="" disabled hidden>
                                                Выберите должность
                                                </MenuItem>
                                                {positions.map((position) => (
                                                    <MenuItem key={position} value={position}>
                                                        {position}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                 ) : (
                                    <TextField
                                        type="text"
                                        className={cl.workerInfo}
                                        size='small'
                                        value={formData[option] || ''}
                                        placeholder={`${personal_data_options.find((o) => o.id === option)?.label}`}
                                        onChange={(e) => {
                                            handleInputChange(option, e.target.value)
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}
          
            </div>     
        )
    );
};

export function renderEducationOptions(selectedEducationOptions, formData, handleInputChange, educations_options) {
    return(
        selectedEducationOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Образование</p>
                <div className={cl.tooltipTextMain}> <BsExclamationCircle style={{ color: '#1565C0' }} /> Заполните все поля</div>
                {selectedEducationOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{educations_options.find((o) => o.id === option).label}:</label>
                        {option === "education:educationType" ? (
                            <div className={cl.tooltipWrapper}>
                                <FormControl fullWidth >
                                    {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // label='Страна рождения'
                                        required
                                        title="Выберите вид образования" // Добавлен атрибут title
                                        size='small'
                                        style={{ marginLeft: '12px' }}
                                        value={formData[option] || ''}
                                        className={cl.workerInfoSelect}
                                        onChange={(e) => handleInputChange(option, e.target.value)}
                                    >
                                        <MenuItem value="" disabled hidden>
                                        Выберите вид образования
                                        </MenuItem>
                                        {educations_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                            <MenuItem key={genderOption} value={genderOption}>
                                            {genderOption}
                                            </MenuItem>
                                        ))}
                                    
                                    </Select>
                                </FormControl>
                                <div className={cl.tooltipText}> <BsExclamationCircle />Выберите вид образования</div>
                            </div>
                
                        ) : option === "education:educationDateIn" ? (
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
                         ) :  option === "education:educationDateOut" ? (
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
                         )
                          : option === "education:educationForm" ? (
                            <div className={cl.data__wrapper}>
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
                                    Выберите вид обучения
                                    </MenuItem>
                                    {educations_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                   
                                </Select>
                            </FormControl>
                            </div>
                         ) : ( 
                        <TextField
                            type="text"
                            size='small'
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${educations_options.find((o) => o.id === option).label}`}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            style={{ marginLeft: '12px' }}
                        />
                        ) 
                    }
                    </div>
                ))}
          
            </div>     
        )
    );
};

export function renderLanguageOptions(selectedLanguageOptions, formData, handleInputChange, owning_languages_options) {
    const languageOptions = Object.entries(list);
    return(
        selectedLanguageOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Язык</p>
                {selectedLanguageOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{owning_languages_options.find((o) => o.id === option).label}:</label>
                        {option === "languageskill:skillLvl" ? (
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                    size='small'
                                    style={{ marginLeft: '44px' }}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите уровень владения
                                    </MenuItem>
                                    {owning_languages_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                            </FormControl>
                        )
                        : option === "languageskill:langName" ? (
                            <div className={cl.data__wrapper}>
                               <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите язык
                                    </MenuItem>
                                    {languageOptions.map(([code, language]) => (
                                        <MenuItem key={code} value={language}>
                                        {language}
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                                </FormControl>
                            </div>
                          ) : (
                        <TextField
                            type="text"
                            size='small'
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${owning_languages_options.find((o) => o.id === option).label}`}
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

export function renderCourseOptions(selectedCoursesOptions, formData, handleInputChange, courses_options) {
    return(
        selectedCoursesOptions.length > 0 && (
            <div className={cl.input__container}>
               <p className={cl.headline}>Курсы</p>
                {selectedCoursesOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{courses_options.find((o) => o.id === option).label}:</label>
                        {option === "course:courseType" ? (
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
                                    title="Выберите тип родственника" // Добавлен атрибут title
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                    className={cl.workerInfoSelect}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите вид подготовки
                                    </MenuItem>
                                    {courses_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div className={cl.tooltipText}> <BsExclamationCircle />Выберите  вид подготовки</div>
                            </div>
                
                        ) : option === "course:startDate" ? (
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
                         ) :  option === "course:endDate" ? (
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
                            placeholder={`${courses_options.find((o) => o.id === option).label}`}
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

export function renderAcademicDegreeOptions(selectedAcademicDegreeOptions, formData, handleInputChange, academic_degree_options) {
    return(
        selectedAcademicDegreeOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Ученые степени</p>
                {selectedAcademicDegreeOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{academic_degree_options.find((o) => o.id === option).label}:</label>
                        {option === "academicdegree:academicDegree" ? (
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
                                        title="Выберите  вид образования" // Добавлен атрибут title
                                        size='small'
                                        style={{ marginLeft: '12px' }}
                                        className={cl.workerInfoSelect}
                                    >
                                        <MenuItem value="" disabled hidden>
                                        Выберите вид образования
                                        </MenuItem>
                                        {academic_degree_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                            <MenuItem key={genderOption} value={genderOption}>
                                            {genderOption}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={cl.tooltipText}> <BsExclamationCircle />Выберите  вид образования</div>
                            </div>
                
                        ) : option === "academicdegree:academicDiplomaDate" ? (
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
                            placeholder={`${academic_degree_options.find((o) => o.id === option).label}`}
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

export function renderSportOptions(selectedSportOptions, formData, handleInputChange, sport_results_options) {
    const sportOptions = Object.entries(listOfSports);
    return(
        selectedSportOptions.length > 0 && (
            <div className={cl.input__container}>
                <p className={cl.headline}>Спорт</p>
                {selectedSportOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{sport_results_options.find((o) => o.id === option).label}:</label>
                        {option === "sportskill:sportSkillLvl" ? (
                            <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // label='Страна рождения'
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                    size='small'
                                    style={{ marginLeft: '44px' }}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите уровень владения
                                    </MenuItem>
                                    {sport_results_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                        <MenuItem key={genderOption} value={genderOption}>
                                        {genderOption}
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                            </FormControl>
                        ) :
                        option === "sportskill:sportType" ? (
                            <div className={cl.data__wrapper}>
                               <FormControl fullWidth >
                                {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData[option] || ''}
                                    className={cl.workerInfoSelect}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                    size='small'
                                    style={{ marginLeft: '12px' }}
                                >
                                    <MenuItem value="" disabled hidden>
                                    Выберите вид спорта
                                    </MenuItem>
                                    {sportOptions.map(([code, sport]) => (
                                        <MenuItem key={code} value={sport}>
                                        {sport}
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                                </FormControl>
                            </div>
                        ) : (
                        <input
                            type="text"
                            className={cl.workerInfo}
                            value={formData[option] || ''}
                            placeholder={`${sport_results_options.find((o) => o.id === option).label}`}
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