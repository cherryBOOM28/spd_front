import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './ReportPersonalData.module.css';
import Button from '../../UI/button/Button';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';


function ReportPersonalData(props) {
    const [selectedPersonalOptions, setSelectedPersonalOptions] = useState([]);
    const [selectedFamilyOptions, setSelectedFamilyOptions] = useState([]);
    const [selectedEducationOptions, setSelectedEducationOptions] = useState([]);
    const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
    const [selectedCoursesOptions, setSelectedCoursesOptions] = useState([]);
    const [selectedAcademicDegreeOptions, setSelectedAcademicDegreeOptions] = useState([]);
    const [selectedSportOptions, setSelectedSportOptions] = useState([]);


    const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов

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
        { id: "family_status", label: "Семейное положение", selectOptions: ["Выберите семейное положение", "Не женат/не замужем", "Женат/замужем", "Вдова/вдовец", "Разведена/разведен"], isRange: false },
        { id: "departament", label: "Подразделение", isRange: false },
        { id: "jposition", label: "Должность", isRange: false },
        { id: "city", label: "Город", isRange: false },
    ]; 

    const family_compositions_options = [
        { id: "relative_type", label: "Степень родства", selectOptions: ["Выберите", "супруг/супруга", "сын/дочь", "мать/отец", "брат/сестра"], isRange: false },
        { id: "fio", label: "ФИО", isRange: false },
        { id: "rel_iin", label: "ИИН", isRange: false },
        { id: "birth_date_family", label: "Дата рождения", isRange: false },
        { id: "job_place", label: "Место работы", isRange: false },
    ];

    const educations_options = [
        { id: "education_type", label: "Вид образования", selectOptions: ["Выберите вид образования", "Бакалавр", "Магистратура"], isRange: false },
        { id: "education_place_academic", label: "Учебное заведение", isRange: false },
        { id: "education_date_in", label: "Дата поступления", isRange: false },
        { id: "education_date_out", label: "Дата окончания", isRange: false },
        { id: "education_speciality", label: "Специальность", isRange: false },
        { id: "diploma_number_academic", label: "Номер диплома", isRange: false },
    ];

    const owning_languages_options = [
        { id: "language_name", label: "Язык", isRange: false },
        { id: "owning_lvl_language", label: "Уровень владения языком", selectOptions: ["Выберите уровень", "Cо словарем", "Начальный", "Ниже среднего", "Средний", "Выше среднего", "Продвинутый", "Профессиональный", "Родной"], isRange: false },
    ];

    const courses_options = [
        { id: "course_type", label: "Вид переподготовки", selectOptions: ["Выберите вид переподготовки", "Повышение", "Подготовка"], isRange: false },
        { id: "course_organization", label: "Учебное заведение", isRange: false },
        { id: "course_start_date", label: "Дата начала", isRange: false },
        { id: "course_end_date", label: "Дата окончания", isRange: false },
        { id: "document_type", label: "Вид документа", isRange: false },
        { id: "course_name", label: "Название курса", isRange: false },
    ];

    const academic_degree_options = [
        { id: "education_place", label: "Учебное заведение", isRange: false },
        { id: "academic_degree", label: "Вид образования", selectOptions: ["Выберите вид образования", "Бакалавр", "Магистр", "Кандидат", "Доктор"], isRange: false },
        { id: "diploma_number", label: "Номер диплома", isRange: false },
        { id: "diploma_date", label: "Дата диплома", isRange: false },
    ];

    const sport_results_options = [
        { id: "sport_type", label: "Вид спорта", isRange: false },
        { id: "owning_lvl_sport_results", label: "Степень владения", selectOptions: ["Выберите степень владения", "Любитель", "Первый спортивный разряд", "Второй спортивный разряд", "Третий спортивный разряд", "Кандидат мастера спорта", "Мастер спорта"], isRange: false },
    ];


    const [isOpenPersonal, setIsOpenPersonal] = useState(false);
    const togglePersonalDropdown = () => {
        setIsOpenPersonal(!isOpenPersonal);
    };

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
    };

    const [educationSubMenuOpen, setEducationSubMenuOpen] = useState(false);
    const toggleEducationSubMenu = () => {
        setEducationSubMenuOpen(!educationSubMenuOpen);
    };

    const [languageSubMenuOpen, setLanguageSubMenuOpen] = useState(false);
    const toggleLanguageSubMenu = () => {
        setLanguageSubMenuOpen(!languageSubMenuOpen);
    };

    const [coursesSubMenuOpen, setCoursesSubMenuOpen] = useState(false);
    const toggleCoursesSubMenu = () => {
        setCoursesSubMenuOpen(!coursesSubMenuOpen);
    };

    const [academicDegreeSubMenuOpen, setAcademicDegreeSubMenuOpen] = useState(false);
    const toggleAcademicDegreeSubMenu = () => {
        setAcademicDegreeSubMenuOpen(!academicDegreeSubMenuOpen);
    };

    const [sportSubMenuOpen, setSportSubMenuOpen] = useState(false);
    const toggleSportSubMenu = () => {
        setSportSubMenuOpen(!sportSubMenuOpen);
    };

    
    const togglePersonalOption = (option) => {
        if (selectedPersonalOptions.includes(option)) {
            setSelectedPersonalOptions(selectedPersonalOptions.filter((item) => item !== option));
            delete formData[option];
        } else {
            setSelectedPersonalOptions([...selectedPersonalOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
            if (option === "family_status") {
                setFormData({
                  ...formData,
                  [option]: option === "family_status" ? personal_data_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
                });
            }
        }
    };

    const toggleOption = (option) => {
        if (selectedFamilyOptions.includes(option)) {
            setSelectedFamilyOptions(selectedFamilyOptions.filter((item) => item !== option));
            delete formData[option];
          } else {
            setSelectedFamilyOptions([...selectedFamilyOptions, option]);
            // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
            // то сразу устанавливаем их значения в formData
            if (option === "relative_type") {
                setFormData({
                  ...formData,
                  [option]: option === "relative_type" ? family_compositions_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
            if (option === "education_type") {
                setFormData({
                  ...formData,
                  [option]: option === "education_type" ? educations_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
            if (option === "owning_lvl_language") {
                setFormData({
                  ...formData,
                  [option]: option === "owning_lvl_language" ? owning_languages_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
            if (option === "course_type") {
                setFormData({
                  ...formData,
                  [option]: option === "course_type" ? courses_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
            if (option === "academic_degree") {
                setFormData({
                  ...formData,
                  [option]: option === "academic_degree" ? courses_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
            if (option === "owning_lvl") {
                setFormData({
                  ...formData,
                  [option]: option === "owning_lvl" ? sport_results_options.find((o) => o.id === option).selectOptions[0] : {start_date: '', end_date: ''},
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
                <Button onClick={togglePersonalDropdown} className={cl.actionBtn}>
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
                                {selectedPersonalOptions.includes(option.id) && option.id !== "family_status" && (
                                <div>
                                
                                </div>
                                )}
                            </li>
                            ))}
                        </ul>
                        <div className={cl.dropdownFamily} onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>
                            <button className={cl.subMenuDropdownFamily}>
                                Состав семьи
                            </button>
                            {subMenuOpen && (
                                <div className={cl.subMenuFamily}>
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
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownEdu} onMouseEnter={toggleEducationSubMenu} onMouseLeave={toggleEducationSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownEdu}>
                                Образование
                            </button>
                            {educationSubMenuOpen && (
                                <div className={cl.subMenuEdu}>
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
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownLang} onMouseEnter={toggleLanguageSubMenu} onMouseLeave={toggleLanguageSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownLang}>
                                Владения языками
                            </button>
                            {languageSubMenuOpen && (
                                <div className={cl.subMenuLang}>
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
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownCourse} onMouseEnter={toggleCoursesSubMenu} onMouseLeave={toggleCoursesSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownCourse}>
                                Курсы подготовки и повышения квалификаций
                            </button>
                            {coursesSubMenuOpen && (
                                <div className={cl.subMenuCourse}>
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
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownDegree} onMouseEnter={toggleAcademicDegreeSubMenu} onMouseLeave={toggleAcademicDegreeSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownDegree}>
                                Ученые степени
                            </button>
                            {academicDegreeSubMenuOpen && (
                                <div className={cl.subMenuDegree}>
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
                                </div>
                            )}
                        </div>
                        <div className={cl.dropdownSport} onMouseEnter={toggleSportSubMenu} onMouseLeave={toggleSportSubMenu} style={{ marginTop: '10px' }}>
                            <button className={cl.subMenuDropdownSport}>
                                Отношение к спорту
                            </button>
                            {sportSubMenuOpen && (
                                <div className={cl.subMenuSport}>
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
                                </div>
                            )}
                        </div>
                    
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
        <p className={cl.input__name}>Личные данные</p>
        {selectedFamilyOptions.map((option) => (
          <div key={option} className={cl.wrapper__input}>
            <label className={cl.label__name}>{family_compositions_options.find((o) => o.id === option).label}:</label>
            {option === "relative_type" ? (
              <select
                value={formData[option] || ''}
                className={cl.workerInfoSelect}
                onChange={(e) => handleInputChange(option, e.target.value)}
              >
                {family_compositions_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                  <option key={genderOption} value={genderOption}>
                    {genderOption}
                  </option>
                ))}
              </select>
            ) : option === "birth_date_family" ? (
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

export function renderPersonalOptions(selectedPersonalOptions, formData, handleInputChange, personal_data_options) {
    return(
        selectedPersonalOptions.length > 0 && (
            <div className={cl.input__container}>
                {selectedPersonalOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{personal_data_options.find((o) => o.id === option).label}:</label>
                        {option === "family_status" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {personal_data_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
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
                            placeholder={`${personal_data_options.find((o) => o.id === option).label}`}
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

export function renderEducationOptions(selectedEducationOptions, formData, handleInputChange, educations_options) {
    return(
        selectedEducationOptions.length > 0 && (
            <div className={cl.input__container}>
                {selectedEducationOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{educations_options.find((o) => o.id === option).label}:</label>
                        {option === "education_type" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {educations_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "education_date_in" ? (
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
                         ) :  option === "education_date_out" ? (
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
                            placeholder={`${educations_options.find((o) => o.id === option).label}`}
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

export function renderLanguageOptions(selectedLanguageOptions, formData, handleInputChange, owning_languages_options) {
    return(
        selectedLanguageOptions.length > 0 && (
            <div className={cl.input__container}>
                {selectedLanguageOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{owning_languages_options.find((o) => o.id === option).label}:</label>
                        {option === "owning_lvl_language" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {owning_languages_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
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
                {selectedCoursesOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{courses_options.find((o) => o.id === option).label}:</label>
                        {option === "course_type" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {courses_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "course_start_date" ? (
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
                         ) :  option === "course_end_date" ? (
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
                {selectedAcademicDegreeOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{academic_degree_options.find((o) => o.id === option).label}:</label>
                        {option === "academic_degree" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {academic_degree_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                <option key={genderOption} value={genderOption}>
                                {genderOption}
                                </option>
                            ))}
                            </select>
                
                        ) : option === "diploma_date" ? (
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
    return(
        selectedSportOptions.length > 0 && (
            <div className={cl.input__container}>
                {selectedSportOptions.map((option) => (
                    <div key={option} className={cl.wrapper__input}>
                        <label className={cl.label__name}>{sport_results_options.find((o) => o.id === option).label}:</label>
                        {option === "owning_lvl" ? (
                            <select
                            value={formData[option] || ''}
                            className={cl.workerInfoSelect}
                            onChange={(e) => handleInputChange(option, e.target.value)}
                            >
                            {sport_results_options.find((o) => o.id === option).selectOptions.map((genderOption) => (
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