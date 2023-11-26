import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Reports.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import Button from '../../components/UI/button/Button';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';
import ResultsTable from '../../components/reportResults/resultsTable/ResultsTable';
import ReportPersonalData from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderFamilyOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderPersonalOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderEducationOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderLanguageOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderCourseOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderAcademicDegreeOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderSportOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import WorkingHistoryData from '../../components/reportResults/working_history/WorkingHistoryData';
import { renderWorkingHistoryOptions } from '../../components/reportResults/working_history/WorkingHistoryData';
import StaffInfoData from '../../components/reportResults/staff_info/StaffInfoData';
import { renderSpecChecksOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import { renderAttestationOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import { renderCategoryOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import { renderMilitaryRankOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import { renderAwardsOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import { renderSickLeavesOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import { renderInvestigationRetrievalsOptions } from '../../components/reportResults/staff_info/StaffInfoData';
import OrdersListData from '../../components/reportResults/orders_list/OrdersListData';
import { renderOrderListOptions } from '../../components/reportResults/orders_list/OrdersListData';
import ExcelGenerator from '../../components/excelGenerator/ExcelGenerator';
import NextAttestations from '../../components/reportResults/nextAttestation/NextAttestations';
import NextRunkUp from '../../components/reportResults/nextRunkUp/NextRunkUp';





function Reports(props, queryParams) {
    // eslint-disable-next-line
    const [personalData, setPersonalData] = useState([]); 
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [requestSubmitted, setRequestSubmitted] = useState(true);

    const [count, setCount] = useState(0)
    const [previous, setPrevious] = useState('')
    const [next, setNext] = useState('');
    const [page, setPage] = useState(0);

    const [selectedPersonalOptions, setSelectedPersonalOptions] = useState([]);
    const [selectedFamilyOptions, setSelectedFamilyOptions] = useState([]);
    const [selectedEducationOptions, setSelectedEducationOptions] = useState([]);
    const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
    const [selectedCoursesOptions, setSelectedCoursesOptions] = useState([]);
    const [selectedAcademicDegreeOptions, setSelectedAcademicDegreeOptions] = useState([]);
    const [selectedSportOptions, setSelectedSportOptions] = useState([]);

    const [selectedWorkingHistoryOptions, setSelectedWorkingHistoryOptions] = useState([]);

    const [selectedSpecChecksOptions, setSelectedSpecChecksOptions] = useState([]);
    const [selectedAttestationsOptions, setSelectedAttestationsOptions] = useState([]);
    const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);
    const [selectedMilitaryRankOptions, setSelectedMilitaryRankOptions] = useState([]);
    const [selectedAwardsOptions, setSelectedAwardsOptions] = useState([]);
    const [selectedSickLeavesOptions, setSelectedSickLeavesOptions] = useState([]);
    const [selectedInvestigationRetrievalsOptions, setSelectedInvestigationRetrievalsOptions] = useState([]);

    const [selectedOrderListOptions, setSelectedOrderListOptions] = useState([]);
   
    const [showResults, setShowResults] = useState(false);
    const [showExcelButton, setShowExcelButton] = useState(false);
    const [results, setResults] = useState([]);
    const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов

    selectedOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedPersonalOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedEducationOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedFamilyOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedLanguageOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedCoursesOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedAcademicDegreeOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedSportOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    selectedWorkingHistoryOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

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

    selectedOrderListOptions.forEach((option) => {
        if (!formData.hasOwnProperty(option)) {
          formData[option] = '';
        }
    });

    const options = [
        { id: "iin", label: "ИИН", isRange: false },
        { id: "surname", label: "Фамилия", isRange: false },
        { id: "firstName", label: "Имя", isRange: false },
        { id: "patronymic", label: "Отчество", isRange: false },
        { id: "nationality", label: " Национальность", isRange: false },
        { id: "gender:genderName", label: "Пол", selectOptions: ["Выберите пол", "Мужской", "Женский"], isRange: false },
        // { id: "phone_number", label: "Номер телефона", isRange: false  },
        { id: "pin", label: "ПИН", isRange: false  },
        // { id: "group", label: "Группа", isRange: false  },

        { id: "birthinfo:birth_date", label: "Дата рождения", isRange: true },
        { id: "birthinfo:country", label: "Страна рождения", isRange: false },
        { id: "birthinfo:city", label: "Город рождения", isRange: false },
        { id: "birthinfo:region", label: "Регион рождения", isRange: false },

        { id: "residentinfo:resCountry", label: "Страна прожвания", isRange: false },
        { id: "residentinfo:resCity", label: "Город прожвания", isRange: false },
        { id: "residentinfo:resRegion", label: "Регион/район проживания", isRange: false  },

        { id: "identitycardinfo:identityCardNumber", label: "Номер удостоверения", isRange: false },
        { id: "identitycardinfo:issuedBy", label: "Выдан", isRange: false },
        { id: "identitycardinfo:dateOfIssue", label: "Дата выдачи", isRange: true },
    ];
    
    const personal_data_options = [
        { id: "familyStatus:statusName", label: "Семейное положение", selectOptions: ["Выберите семейное положение", "Не женат/не замужем", "Женат/замужем", "Вдова/вдовец", "Разведена/разведен"], isRange: false },
        { id: "positionInfo:department:DepartmentName", label: "Подразделение", isRange: false },
        { id: "positionInfo:position:positionTitle", label: "Должность", isRange: false },
        { id: "positionInfo:department:LocationName", label: "Город", isRange: false },
    ];

    const family_compositions_options = [
        { id: "familycomposition:relativeType", label: "Степень родства", selectOptions: ["Выберите", "супруг/супруга", "сын/дочь", "мать/отец", "брат/сестра"], isRange: false },
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
        { id: "education:diplomaNumber", label: "Номер диплома", isRange: false },
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

    const working_history_options = [
        { id: "workinghistory:startDate", label: "Начало периода", isRange: false },
        { id: "workinghistory:endDate", label: "Конец периода", isRange: false },
        { id: "workinghistory:department", label: "Подразделение", isRange: false },
        { id: "workinghistory:positionName", label: "Должность", isRange: false },
        { id: "workinghistory:organizationName", label: "Учреждение", isRange: false },
        { id: "workinghistory:organizationAddress", label: "Местонахождение организации", isRange: false },
    ];

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

    const orders_list_options = [
        { id: "decreelist:decreeType", label: "Вид приказа", selectOptions: ["Выберите вид приказа", "О назначение", "Перемещение", "Отпуск", "Командирование", "О присвоение звания", "Наложение дисциплинарного взыскания", "Снятие дисциплинарного взыскания", "Поощерение/Премирование", "Зачисление в распоряжение", "Служебные расследования", "Об увольнении"], isRange: false },
        { id: "decreelist:decreeSubType", label: "Вид подприказа", isRange: false },
        { id: "decreelist:decreeDate", label: "Дата приказа", isRange: false },
    ];

    const [isOpenGeneral, setIsOpenGeneral] = useState(false);
    const [isOpenPersonal, setIsOpenPersonal] = useState(false);
    const [isOpenFamily, setIsOpenFamily] = useState(false);

  
    const toggleGeneralDropdown = () => {
        setIsOpenGeneral(!isOpenGeneral);
    };

    const togglePersonalDropdown = () => {
        setIsOpenPersonal(!isOpenPersonal);
    };

    const togglePersonalFamily = () => {
        setIsOpenFamily(!isOpenFamily);
    };
  
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    // Функция для открытия/закрытия меню второго уровня
    const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
    };
    

    const toggleOption = (option, optionId) => {
        if (selectedOptions.includes(option)) {
          setSelectedOptions(selectedOptions.filter((item) => item !== option));
          delete formData[option];
        } else {
          setSelectedOptions([...selectedOptions, option]);
          // Если пользователь выбрал "Пол", "Дата рождения" или другие опции, 
          // то сразу устанавливаем их значения в formData
          if (option === "family_status") {
            setFormData({
              ...formData,
              [option]: option === "gender" ? options.find((o) => o.id === option).selectOptions[0] : {from: '', to: ''},
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
      
    const handleSubmit = (props) => {
        const formatDateRange = (key) => {
            const dateRange = formData[key];
            if (dateRange) {
              const start = dateRange.start_date || '';
              const end = dateRange.end_date || '';
                console.log(start, typeof start)
                // const formattedDate = start + '_' + end; 
                const formattedDate = (start && end) ? `${start}_${end}` : (start || end);
                return formattedDate;
            }
            return '';
        }; 

        const dateRangeParams = [
          'birthinfo:birth_date',
          'familycomposition:relBirthDate',
          'identitycardinfo:dateOfIssue',
          'education:educationDateIn',
          'education:educationDateOut',
          'course:startDate',
          'course:endDate',
          'academicdegree:academicDiplomaDate',
          'workinghistory:startDate',
          'workinghistory:endDate',
          'speccheck:docDate',
          'attestation:lastAttDate',
          'attestation:nextAttDateMin',
          'rankInfo:receivedDate',
          'reward:rewardDate',
          'decreelist:decreeDate',
        ];
      
        const updatedQueryParams = dateRangeParams.reduce((result, key) => {
          result[key] = formatDateRange(key) || formData[key];
          return result;
        }, {});
        // console.log(updatedQueryParams);

        const queryParams = {...formData};
        

        for (const key in updatedQueryParams) {
            if (updatedQueryParams.hasOwnProperty(key)) {
                const value = updatedQueryParams[key];
                // console.log(key, value);
                if (value !== undefined) {
                    // console.log(key, encodeURIComponent(value));
                    queryParams[key] = value;
                }
            }
        }

        // console.log("queryParams", queryParams);
        // console.log(updatedQueryParams);

        // console.log("formData:", formData);


        const queryString = new URLSearchParams(queryParams).toString();
        // console.log(formData);
        // const queryString = queryParams.join('&');
        const url = `http://localhost:8000/api/v1/filter?${queryString}`;
        // const url = `http://localhost:8000/report_list/?birth_date=:`;


        axios
            .get(url)
            .then((response) => {
            setResults(response.data);
            setCount(response.data.count);
            setPrevious(response.data.previous);
            setNext(response.data.next);
            setRequestSubmitted(false);

            setIsOpenGeneral(false);
            setIsOpenPersonal(false);
            setIsOpenFamily(false);

            // setSelectedOptions([]);
            console.log(response);
            console.log("response",response.data.results);
            // console.log("setResults",results);
            console.log("queryParams",formData);
            })
            .catch((error) => {
            console.error('Ошибка при получении данных:', error);
            });
      
        setShowResults(true);
        setShowExcelButton(true);
    };
      
    
    const familyOptions = renderFamilyOptions(selectedFamilyOptions, formData, handleInputChange, family_compositions_options);
    const personalDataOptions = renderPersonalOptions(selectedPersonalOptions, formData, handleInputChange, personal_data_options);
    const educationsDataOptions = renderEducationOptions(selectedEducationOptions, formData, handleInputChange, educations_options);
    const languageDataOptions = renderLanguageOptions(selectedLanguageOptions, formData, handleInputChange, owning_languages_options);
    const courseDataOptions = renderCourseOptions(selectedCoursesOptions, formData, handleInputChange, courses_options);
    const academicDegreeDataOptions = renderAcademicDegreeOptions(selectedAcademicDegreeOptions, formData, handleInputChange, academic_degree_options);
    const sportDataOptions = renderSportOptions(selectedSportOptions, formData, handleInputChange, sport_results_options);
    const workingHistoryDataOptions = renderWorkingHistoryOptions(selectedWorkingHistoryOptions, formData, handleInputChange, working_history_options);
    const specChecksDataOptions = renderSpecChecksOptions(selectedSpecChecksOptions, formData, handleInputChange, spec_checks_options);
    const attestationsDataOptions = renderAttestationOptions(selectedAttestationsOptions, formData, handleInputChange, attestations_options);
    const classCategoryDataOptions = renderCategoryOptions(selectedCategoryOptions, formData, handleInputChange, class_categories_options);
    const militaryRankDataOptions = renderMilitaryRankOptions(selectedMilitaryRankOptions, formData, handleInputChange, military_rank_options);
    const awardsDataOptions = renderAwardsOptions(selectedAwardsOptions, formData, handleInputChange, awards_options);
    const sickLeavesDataOptions = renderSickLeavesOptions(selectedSickLeavesOptions, formData, handleInputChange, sick_leaves_options);
    const investigationRetrievalsDataOptions = renderInvestigationRetrievalsOptions(selectedInvestigationRetrievalsOptions, formData, handleInputChange, investigation_retrievals_options);
    const orderListsDataOptions = renderOrderListOptions(selectedOrderListOptions, formData, handleInputChange, orders_list_options);

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
   
    return (
        <div className={cl.homeWrapper}>
            <Navigation className={cl.navigation} /> 
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Header className={cl.header} personalData={personalData}/>
                <div className={cl.content}>
                    <div className={cl.container}>
                        <div className={cl.employeeWrapper}>
                            <div className={cl.tabContent}>
                                <div className={cl.tabHeader}>
                                    <div 
                                        className={activeTab === 1 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                                        onClick={() => handleTabClick(1)}
                                        >
                                    Общие данные
                                    </div>
                                    <div 
                                        className={activeTab === 2 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                                        onClick={() => handleTabClick(2)}
                                        >
                                    Предстоящие приказы - аттестация
                                    </div>
                                    <div 
                                        className={activeTab === 3 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                                        onClick={() => handleTabClick(3)}
                                        >
                                    Предстоящие приказы - звания
                                    </div>
                                </div>
                                <div className={cl.tabBody}>
                                    {
                                        activeTab === 1 && 
                                        <div className={cl.basic__info}>
                                            <div className={cl.employees}>
                                <div className={cl.dropdown}>
                                    <Button onClick={toggleGeneralDropdown} className={cl.actionBtn}>
                                        Общие данные
                                        {isOpenGeneral ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
                                    </Button>
                                    {isOpenGeneral && (
                                        <div className={cl.dropdown__content}>
                                            <ul>
                                                {options.map((option) => (
                                                <li key={option.id} className={cl.options__label}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={option.id}
                                                            checked={selectedOptions.includes(option.id)}
                                                            onChange={() => toggleOption(option.id)}
                                                        />
                                                        {option.label}
                                                    </label>
                                                    {selectedOptions.includes(option.id) && option.id !== "gender:genderName" && (
                                                        <div>
                                                
                                                        </div>
                                                    )}
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                
                                <ReportPersonalData 
                                    isOpenPersonal={isOpenPersonal}
                                    selectedFamilyOptions={selectedFamilyOptions}
                                    setSelectedFamilyOptions={setSelectedFamilyOptions}
                                    selectedPersonalOptions={selectedPersonalOptions}
                                    setSelectedPersonalOptions={setSelectedPersonalOptions}
                                    selectedEducationOptions={selectedEducationOptions}
                                    setSelectedEducationOptions={setSelectedEducationOptions}
                                    selectedLanguageOptions={selectedLanguageOptions}
                                    setSelectedLanguageOptions={setSelectedLanguageOptions}
                                    selectedCoursesOptions={selectedCoursesOptions}
                                    setSelectedCoursesOptions={setSelectedCoursesOptions}
                                    selectedAcademicDegreeOptions={selectedAcademicDegreeOptions}
                                    setSelectedAcademicDegreeOptions={setSelectedAcademicDegreeOptions}
                                    selectedSportOptions={selectedSportOptions}
                                    setSelectedSportOptions={setSelectedSportOptions}

                                    formData={formData}
                                    handleInputChange={handleInputChange}

                                    personal_data_options={personal_data_options}
                                    family_compositions_options={family_compositions_options}
                                    educations_options={educations_options}
                                    owning_languages_options={owning_languages_options}
                                    courses_options={courses_options}
                                    academic_degree_options={academic_degree_options}
                                    sport_results_options={sport_results_options}
                                />
                                <WorkingHistoryData 
                                    selectedWorkingHistoryOptions={selectedWorkingHistoryOptions}
                                    setSelectedWorkingHistoryOptions={setSelectedWorkingHistoryOptions}

                                    formData={formData}
                                    handleInputChange={handleInputChange}

                                    working_history_options={working_history_options}
                                />
                                <StaffInfoData 
                                    selectedSpecChecksOptions={selectedSpecChecksOptions}
                                    setSelectedSpecChecksOptions={setSelectedSpecChecksOptions}
                                    selectedAttestationsOptions={selectedAttestationsOptions}
                                    setSelectedAttestationsOptions={setSelectedAttestationsOptions}
                                    selectedCategoryOptions={selectedCategoryOptions}
                                    setSelectedCategoryOptions={setSelectedCategoryOptions}
                                    selectedMilitaryRankOptions={selectedMilitaryRankOptions}
                                    setSelectedMilitaryRankOptions={setSelectedMilitaryRankOptions}
                                    selectedAwardsOptions={selectedAwardsOptions}
                                    setSelectedAwardsOptions={setSelectedAwardsOptions}
                                    selectedSickLeavesOptions={selectedSickLeavesOptions}
                                    setSelectedSickLeavesOptions={setSelectedSickLeavesOptions}
                                    selectedInvestigationRetrievalsOptions={selectedInvestigationRetrievalsOptions}
                                    setSelectedInvestigationRetrievalsOptions={setSelectedInvestigationRetrievalsOptions}

                                    formData={formData}
                                    handleInputChange={handleInputChange}

                                    spec_checks_options={spec_checks_options}
                                    attestations_options={attestations_options}
                                    class_categories_options={class_categories_options}
                                    military_rank_options={military_rank_options}
                                    awards_options={awards_options}
                                    sick_leaves_options={sick_leaves_options}
                                    investigation_retrievals_options={investigation_retrievals_options}
                                />
                                <OrdersListData
                                    selectedOrderListOptions={selectedOrderListOptions}
                                    setSelectedOrderListOptions={setSelectedOrderListOptions}

                                    formData={formData}
                                    handleInputChange={handleInputChange}

                                    orders_list_options={orders_list_options}
                                />
                             
                                            </div>
                        
                                            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                                                <div>
                                                    {selectedOptions.length > 0 && (
                                                    <div className={cl.input__container}>
                                                        <p className={cl.input__name}>Общие данные</p>
                                                        {selectedOptions.map((option) => (
                                                            <div key={option} className={cl.wrapper__input}>
                                                                <label className={cl.label__name}>{options.find((o) => o.id === option).label}:</label>
                                                                {option === "gender:genderName" ? (
                                                                    <select
                                                                    value={formData[option] || ''}
                                                                    className={cl.workerInfoSelect}
                                                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                                                    >
                                                                    {options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                                                        <option key={genderOption} value={genderOption}>
                                                                        {genderOption}
                                                                        </option>
                                                                    ))}
                                                                    </select>
                                                        
                                                                ) :
                                                            
                                                                option === "birthinfo:birth_date" ? ( // Проверяем, является ли опция диапазоном даты рождения
                                                                <div className={cl.data__wrapper}>
                                                                    <div>
                                                                        <label style={{ marginRight: '5px', marginLeft: '13px'}}>От</label>
                                                                        <input
                                                                        type="date"
                                                                        className={cl.workerInfoDate}
                                                                        value={formData[option] != null ? formData[option].start_date : ''}
                                                                        onChange={(e) => {handleInputChange(option, { ...formData[option], start_date: e.target.value })}}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                                                        <input
                                                                        type="date"
                                                                        className={cl.workerInfoDate}

                                                                        value={formData[option] != null ? formData[option].end_date : ''}
                                                                        onChange={(e) => handleInputChange(option, { ...formData[option], end_date: e.target.value })}
                                                                        
                                                                        />
                                                                    </div>
                                                                </div>
                                                                ) : (
                                                                option === "identitycardinfo:dateOfIssue" && options.find((o) => o.id === option).isRange ? (
                                                                    <div className={cl.data__wrapper}>
                                                                        <div>
                                                                        <label style={{ marginRight: '5px', marginLeft: '13px'}}>От</label>
                                                                        <input
                                                                            type="date"
                                                                            className={cl.workerInfoDate}
                                                                            value={formData[option] != null ? formData[option].start_date : ''}
                                                                            onChange={(e) => handleInputChange(option, { ...formData[option], from: e.target.value })}
                                                                        />
                                                                        </div>
                                                                        <div>
                                                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                                                        <input
                                                                            type="date"
                                                                            className={cl.workerInfoDate}
                                                                            value={formData[option] != null ? formData[option].end_date : ''}
                                                                            onChange={(e) => handleInputChange(option, { ...formData[option], to: e.target.value })}
                                                                        />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                <input
                                                                    type="text"
                                                                    className={cl.workerInfo}
                                                                    value={formData[option] || ''}
                                                                    placeholder={`${options.find((o) => o.id === option).label}`}
                                                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                                                />
                                                            
                                                                ) 
                                                                
                                                            )}
                                                            </div>
                                                        ))}                                 
                                                    </div>     
                                                    )}
                                                </div>
                                                <div>   
                                                    {personalDataOptions}
                                                    {familyOptions}
                                                    {educationsDataOptions}
                                                    {languageDataOptions}
                                                    {courseDataOptions}
                                                    {academicDegreeDataOptions}
                                                    {sportDataOptions}
                                                </div>
                                                <div>
                                                    {workingHistoryDataOptions}
                                                </div>
                                                <div>
                                                    {specChecksDataOptions}
                                                    {attestationsDataOptions}
                                                    {classCategoryDataOptions}
                                                    {militaryRankDataOptions}
                                                    {awardsDataOptions}
                                                    {sickLeavesDataOptions}
                                                    {investigationRetrievalsDataOptions}
                                                </div>
                                                <div>
                                                    {orderListsDataOptions}
                                                </div>
                                                
                                            </div>
                           
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                                                <Button onClick={handleSubmit} className={cl.submitBtn} >
                                                    Поиск
                                                </Button>
                                                {showExcelButton && (
                                                    <Button style={{ display: 'flex', gap: "10px" }} >
                                                        <ExcelGenerator
                                                            results={results} 
                                                            selected={[
                                                                ...personalData,
                                                                ...selectedOptions,
                                                                ...selectedPersonalOptions,
                                                                ...selectedFamilyOptions,
                                                                ...selectedEducationOptions,
                                                                ...selectedLanguageOptions,
                                                                ...selectedCoursesOptions,
                                                                ...selectedAcademicDegreeOptions,
                                                                ...selectedSportOptions,
                                                                ...selectedWorkingHistoryOptions,
                                                                ...selectedSpecChecksOptions,
                                                                ...selectedAttestationsOptions,
                                                                ...selectedCategoryOptions,
                                                                ...selectedMilitaryRankOptions,
                                                                ...selectedAwardsOptions,
                                                                ...selectedSickLeavesOptions,
                                                                ...selectedInvestigationRetrievalsOptions,
                                                            ]} 
                                                            optionsData={[
                                                                ...options,
                                                                ...personal_data_options,
                                                                ...family_compositions_options,
                                                                ...educations_options,
                                                                ...owning_languages_options,
                                                                ...courses_options,
                                                                ...academic_degree_options,
                                                                ...sport_results_options,
                                                                ...working_history_options,
                                                                ...spec_checks_options,
                                                                ...attestations_options,
                                                                ...class_categories_options,
                                                                ...military_rank_options,
                                                                ...awards_options,
                                                                ...sick_leaves_options,
                                                                ...investigation_retrievals_options,
                                                                ...orders_list_options,
                                                            ]}
                                                            setResults={setResults} 
                                                            formData={formData}
                                                        />
                                                        <AiFillPrinter style={{ fontSize: '16px' }} />
                                                    </Button>
                                                )}
                                            </div>
                    
                           
                                            {showResults && 
                                                <ResultsTable 
                                                selected={[
                                                    ...personalData,
                                                    ...selectedOptions,
                                                    ...selectedPersonalOptions,
                                                    ...selectedFamilyOptions,
                                                    ...selectedEducationOptions,
                                                    ...selectedLanguageOptions,
                                                    ...selectedCoursesOptions,
                                                    ...selectedAcademicDegreeOptions,
                                                    ...selectedSportOptions,
                                                    ...selectedWorkingHistoryOptions,
                                                    ...selectedSpecChecksOptions,
                                                    ...selectedAttestationsOptions,
                                                    ...selectedCategoryOptions,
                                                    ...selectedMilitaryRankOptions,
                                                    ...selectedAwardsOptions,
                                                    ...selectedSickLeavesOptions,
                                                    ...selectedInvestigationRetrievalsOptions,
                                                ]} 
                                                columns={[
                                                    ...options,
                                                    ...personal_data_options,
                                                    ...family_compositions_options,
                                                    ...educations_options,
                                                    ...owning_languages_options,
                                                    ...courses_options,
                                                    ...academic_degree_options,
                                                    ...sport_results_options,
                                                    ...working_history_options,
                                                    ...spec_checks_options,
                                                    ...attestations_options,
                                                    ...class_categories_options,
                                                    ...military_rank_options,
                                                    ...awards_options,
                                                    ...sick_leaves_options,
                                                    ...investigation_retrievals_options,
                                                    ...orders_list_options,
                                                ]}
                                                results={results} 
                                                count={count}
                                                next={next}
                                                previous={previous}
                                                setResults={setResults} 
                                                formData={formData} />
                                            }
                                        </div>
                                    }
                                    {
                                        activeTab === 2 && 
                                        <div className={cl.basic__info}>
                                            <NextAttestations />
                                        </div>
                                    }
                                    {
                                        activeTab === 3 && 
                                        <div className={cl.basic__info}>
                                            <NextRunkUp />
                                        </div>
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
    );
}

export default Reports;