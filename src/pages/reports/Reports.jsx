import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './Reports.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import { Paper, Button, TextField, Select, InputLabel, FormControl, MenuItem, Box } from '@mui/material';
import { MdArrowDropDown, MdExpandLess } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';
import ResultsTable from '../../components/reportResults/resultsTable/ResultsTable';
import ReportPersonalData from '../../components/reportResults/personal_data/ReportPersonalData';
import { renderFamilyOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
import { RenderPersonalOptions } from '../../components/reportResults/personal_data/ReportPersonalData';
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
import PensionList from '../../components/reportResults/pensionList/PensionList';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


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
   
    const [showResults, setShowResults] = useState(true);
    const [showExcelButton, setShowExcelButton] = useState(false);
    // const [results, setResults] = useState(JSON.parse(localStorage.getItem('searchResults')).length > 0 ? JSON.parse(localStorage.getItem('searchResults')) : []);
    const [results, setResults] = useState([]);
    const [tableResults, setTableResults] = useState([]);
    const [formData, setFormData] = useState({}); // Состояние для хранения данных из инпутов



    useEffect(() => {
        // console.log(selectedPersonalOptions)
        
        if (selectedPersonalOptions.length === 0) {
            personal_data_options.forEach(item => {
                setFormData(prev => {
                    const { [item]: deletedItem, ...rest } = prev;
                    return rest;
                })
            })
        }

        // console.log(formData)
    }, [selectedPersonalOptions])

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
        { id: "selectAll", label: "Выбрать все", isSelectAll: true },
        { id: "iin", label: "ИИН", isRange: false },
        { id: "surname", label: "Фамилия", isRange: false },
        { id: "firstName", label: "Имя", isRange: false },
        { id: "patronymic", label: "Отчество", isRange: false },
        { id: "nationality", label: " Национальность", isRange: false },
        { id: "gender:genderName", label: "Пол", selectOptions: ["Мужской", "Женский"], isRange: false },
        // { id: "phone_number", label: "Номер телефона", isRange: false  },
        { id: "pin", label: "ПИН", isRange: false  },
        // { id: "group", label: "Группа", isRange: false  },

        { id: "birthinfo:birth_date", label: "Дата рождения", isRange: true },
        { id: "birthinfo:country", label: "Страна рождения", selectOptions: ["Россия", "Украина", "Беларусь", "Казахстан", "Армения", "Узбекистан", "Туркменистан", "Молдова", "Киргизия", "Таджикистан"], isRange: false },
        { id: "birthinfo:city", label: "Город рождения", selectOptions: ["Астана", "Алматы", "Шымкент", "Актобе", "Караганда", "Тараз", "Павлодар", "Уральск", "Семей", "Костанай", "Атырау", "Кызылорда", "Актау", "Туркестан", "Кокшетау", "Талдыкорган", "Экибастуз", "Рудный", "Темиртау", "Жезказган", "Аксай", "Байконур"], isRange: false },
        { id: "birthinfo:region", label: "Регион/район рождения", isRange: false },

        { id: "residentinfo:resCountry", label: "Страна прожвания", selectOptions: ["Россия", "Украина", "Беларусь", "Казахстан", "Армения", "Узбекистан", "Туркменистан", "Молдова", "Киргизия", "Таджикистан"], isRange: false },
        { id: "residentinfo:resCity", label: "Город прожвания", selectOptions: ["Астана", "Алматы", "Шымкент", "Актобе", "Караганда", "Тараз", "Павлодар", "Уральск", "Семей", "Костанай", "Атырау", "Кызылорда", "Актау", "Туркестан", "Кокшетау", "Талдыкорган", "Экибастуз", "Рудный", "Темиртау", "Жезказган", "Аксай", "Байконур"], isRange: false },
        { id: "residentinfo:resRegion", label: "Регион/район проживания", isRange: false  },

        { id: "identitycardinfo:identityCardNumber", label: "Номер удостоверения", isRange: false },
        { id: "identitycardinfo:issuedBy", label: "Выдан", isRange: false },
        { id: "identitycardinfo:dateOfIssue", label: "Дата выдачи", isRange: true },
    ];
    
    const personal_data_options = [
        { id: "familyStatus:statusName", label: "Семейное положение", selectOptions: ["Не женат/не замужем", "Женат/замужем", "Вдова/вдовец", "Разведена/разведен"], isRange: false },
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
        { id: "education:educationType", label: "Вид образования", selectOptions: ["Высшее", "Магистратура"], isRange: false },
        { id: "education:educationPlace", label: "Учебное заведение", isRange: false },
        { id: "education:educationDateIn", label: "Дата поступления", isRange: false },
        { id: "education:educationDateOut", label: "Дата окончания", isRange: false },
        { id: "education:speciality", label: "Специальность", isRange: false },
        { id: "education:educationForm", label: "Вид обучения", selectOptions: ["Очное", "Заочное", "Дистанционное"], isRange: false },
    ];

    const owning_languages_options = [
        { id: "languageskill:langName", label: "Язык", isRange: false },
        { id: "languageskill:skillLvl", label: "Уровень владения языком", selectOptions: ["Cо словарем", "Начальный", "Ниже среднего", "Средний", "Выше среднего", "Продвинутый", "Профессиональный", "Родной"], isRange: false },
    ];

    const courses_options = [
        { id: "course:courseType", label: "Вид переподготовки", selectOptions: ["Повышение", "Подготовка"], isRange: false },
        { id: "course:courseOrg", label: "Учебное заведение", isRange: false },
        { id: "course:startDate", label: "Дата начала", isRange: false },
        { id: "course:endDate", label: "Дата окончания", isRange: false },
        { id: "course:documentType", label: "Вид документа", isRange: false },
        { id: "course:courseName", label: "Название курса", isRange: false },
    ];

    const academic_degree_options = [
        { id: "academicdegree:academicPlace", label: "Учебное заведение", isRange: false },
        { id: "academicdegree:academicDegree", label: "Вид образования", selectOptions: ["Бакалавр", "Магистр", "Кандидат", "Доктор"], isRange: false },
        { id: "academicdegree:academicDiplomaNumber", label: "Номер диплома", isRange: false },
        { id: "academicdegree:academicDiplomaDate", label: "Дата диплома", isRange: false },
    ];

    const sport_results_options = [
        { id: "sportskill:sportType", label: "Вид спорта", isRange: false },
        { id: "sportskill:sportSkillLvl", label: "Степень владения", selectOptions: ["Любитель", "Первый спортивный разряд", "Второй спортивный разряд", "Третий спортивный разряд", "Кандидат мастера спорта", "Мастер спорта"], isRange: false },
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
        { id: "classcategory:categoryType", label: "Классная категория", selectOptions:["Спец 2 категории", "Спец 1 категории", "Наставник"], isRange: false },
    ]

    const military_rank_options = [
        { id: "rankInfo:militaryRank:rankTitle", label: "Звание", 
        selectOptions:["Рядовой", "Ефрейтор", "Наставник", "Младший сержант", "Сержант", "Старший сержант", "Сержант третьего класса",
        "Сержант второго класса", "Сержант первого класса", "Штаб-сержант", "Мастер-сержант", "Лейтенант", "Старший лейтенант", "Капитан",
        "Майор", "Подполковник", "Полковник", "Генерал-майор", "Генерал-лейтенант", "Генерал-полковник", "Генерал армии"], isRange: false },
        { id: "rankInfo:receivedDate", label: "Дата получения", isRange: false },
        { id: "rankInfo:receivedType", label: "Вид квитанции", isRange: false },
    ];

    const awards_options = [
        { id: "reward:rewardType", label: "Тип награды", isRange: false, selectOptions: ['Благодарность', "Грамота", "Почетная грамота", "Нагрудной знак - Қаржылық мониторинг органдарының үздігі", "Медаль - Экономикалық қауіпсіздікті қамтамасыз етуге қосқан үлесі үшін", 'Мінсіз қызметі үшін ІІІ дәрежелі', 'Мінсіз қызметі үшін ІІ дәрежелі', 'Мінсіз қызметі үшін І дәрежелі' ] },
        { id: "reward:rewardDocNumber", label: "Номер приказа", isRange: false },
        { id: "reward:rewardDate", label: "Дата приказа", isRange: false },
    ];

    const sick_leaves_options = [
        { id: "sickleave:sickDocNumber", label: "Номер приказа", isRange: false },
        { id: "sickleave:sickDocDate", label: "Дата приказа", isRange: false },
    ];

    const investigation_retrievals_options = [
        { id: "investigation:investigation_decree_type", label: "Тип приказа", isRange: false, selectOptions: ["Замечания", 'Выговор', 'Строгий выговор', 'Неполное служебное соответствие', 'Увольнение'] },
        { id: "investigation:investigation_decree_number", label: "Номер приказа служебного расследования", isRange: false },
        { id: "investigation:investigation_date", label: "Дата приказа", isRange: false },
    ];

    const orders_list_options = [
        { id: "decreelist:decreeType", label: "Вид приказа", selectOptions:  ["Присвоение звания", "Назначение", "Перемещение", "Отпуск", "Командировка", "Увольнение"], isRange: false },
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
        // console.log(option, value)

      setFormData({
        ...formData,
        [option]: value,
      });
    };

    // Кнопка для выбора всех чекбоксов
    const handleSelectAll = () => {

        const allOptionsIds = options.map(option => option.id);
        const allSelected = selectedOptions.length === allOptionsIds.length;

        if (allSelected) {
            setSelectedOptions([]);
        } else {
            setSelectedOptions(allOptionsIds);
        }
    };


      
    // Поиск
    const handleSubmit = (props) => {
      

        const formatDateRange = (key) => {
            const dateRange = formData[key];
            if (dateRange) {
              const start = dateRange.start_date || '';
              const end = dateRange.end_date || '';
                // console.log(start, typeof start)
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

        // Убираем параметры с "selectAll"
        delete queryParams.selectAll;

        const updateFormDataInternal = (key, value) => {
            setFormData((prevFormData) => updateFormData(key, value, prevFormData));
        };

        for (const key in updatedQueryParams) {
            if (updatedQueryParams.hasOwnProperty(key)) {
                const value = updatedQueryParams[key];
                if (value !== undefined) {
                    queryParams[key] = value;
                    // Update formData when removing items
                    updateFormDataInternal(key, value);
                }
            }
        }

        console.log(queryParams)

        const queryString = new URLSearchParams(queryParams).toString();
        console.log(formData);
        console.log(queryString);
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

            // Сохраняем результаты запроса в состоянии компонента таблицы
            setTableResults(response.data);


            // setSelectedOptions([]);
            // console.log(response);
            // console.log("response",response.data.results);
            // console.log("setResults",results);
            console.log(url)
            console.log("queryParams", formData);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
                if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.error || 'Неизвестная ошибка';
                    NotificationManager.error(errorMessage, 'Ошибка', 3000);
                } else {
                    NotificationManager.error('Произошла ошибка', 'Ошибка', 3000);
                }
            })
            .finally(() => {
                // for (const key in formData) {
                //     formData[key] = '';
                // }
            });
      
        setShowResults(true);
        setShowExcelButton(true);
    }; 


    
    const familyOptions = renderFamilyOptions(selectedFamilyOptions, formData, handleInputChange, family_compositions_options);
    const personalDataOptions = RenderPersonalOptions(selectedPersonalOptions, formData, handleInputChange, personal_data_options);
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
                        <Paper className={cl.employeeWrapper}>
                            <div className={cl.tabContent}>
                                <Paper className={cl.tabHeader}>
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
                                    <div 
                                        className={activeTab === 4 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                                        onClick={() => handleTabClick(4)}
                                        >
                                    Пенсия
                                    </div>
                                </Paper>
                                <div className={cl.tabBody}>
                                    {
                                        activeTab === 1 && 
                                        <div className={cl.basic__info}>  
                                            <div className={cl.employees}>
                                                <div className={cl.dropdown}>
                                                    <Button variant="contained" style={{ textTransform: 'none', flex: 1, backgroundColor: '#1B3884'  }}  onClick={toggleGeneralDropdown} className={cl.actionBtn}>
                                                        Общие данные
                                                        {isOpenGeneral ? <MdExpandLess className={cl.arrow} /> : <MdArrowDropDown className={cl.arrow} />}
                                                    </Button>
                                                    {isOpenGeneral && (
                                                        <Paper className={cl.dropdown__content}>
                                                            <ul>
                                                                {options.map((option) => (
                                                                <li key={option.id} className={cl.options__label}>
                                                                    {option.isSelectAll ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedOptions.length === options.length}
                                                                            onChange={handleSelectAll}
                                                                        />
                                                                        {option.label}
                                                                    </div>
                                                                    ) : (
                                                                        <label>
                                                                            <input 
                                                                                type="checkbox"
                                                                                value={option.id}
                                                                                checked={selectedOptions.includes(option.id)}
                                                                                onChange={() => toggleOption(option.id)}
                                                                            />
                                                                            {option.label}
                                                                        </label>
                                                                    )}
                                                                    {/* {selectedOptions.includes(option.id) && option.id !== "gender:genderName" && (
                                                                        <div>
                                                                
                                                                        </div>
                                                                    )} */}
                                                                </li>
                                                                ))}
                                                            </ul>
                                                        </Paper>
                                                    )}
                                                </div>
                                                <ReportPersonalData 
                                                    updateFormData={updateFormData}
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
                                                    setFormData={setFormData}
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
                                                    setFormData={setFormData}

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
                                                    setFormData={setFormData}
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
                                                                    {/* Добавим условие для скрытия текстового поля при выборе "Выбрать все" */}
                                                                    {option !== "selectAll" && (
                                                                        <>
                                                                            <label className={cl.label__name}>{options.find((o) => o.id === option).label}:</label>
                                                                            {option === "gender:genderName" ? (
                                                                                <Box>
                                                                                    <FormControl fullWidth>
                                                                                        {/* <InputLabel id="demo-simple-select-label">Пол</InputLabel> */}
                                                                                        <Select
                                                                                        labelId="demo-simple-select-label"
                                                                                        id="demo-simple-select"
                                                                                        // label="Пол"
                                                                                        placeholder='Пол'
                                                                                        size="small"
                                                                                        value={formData[option] || ''}
                                                                                        className={cl.workerInfoSelect}
                                                                                        onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                        style={{ marginLeft: '12px' }}
                                                                                        >   
                                                                                        <MenuItem value="" disabled hidden>
                                                                                        Выберите пол
                                                                                        </MenuItem>
                                                                                            {options.find((o) => o.id === option).selectOptions.map((genderOption) => (
                                                                                                <MenuItem key={genderOption} value={genderOption}>
                                                                                                    {genderOption}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Box>
                                                                            )  : option === "birthinfo:country" ? (
                                                                                <Box>
                                                                                    <FormControl fullWidth >
                                                                                        {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            // label='Страна рождения'
                                                                                            value={formData[option] || ''}
                                                                                            onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                            size='small'
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoSelect}
                                                                                        >
                                                                                            <MenuItem value="" disabled hidden>
                                                                                            Выберите страну рождения
                                                                                            </MenuItem>
                                                                                            {options.find((o) => o.id === option).selectOptions.map((countryOption) => (
                                                                                                <MenuItem key={countryOption} value={countryOption}>
                                                                                                    {countryOption}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <TextField
                                                                                        type="text"
                                                                                        size='small'
                                                                                        style={{ marginTop: '12px', marginLeft: '12px' }}
                                                                                        className={cl.workerInfo}
                                                                                        placeholder={`${options.find((o) => o.id === option).label}`}
                                                                                        onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                    />
                                                                                </Box>
                                                                            ) 
                                                                            : option === "birthinfo:city" ? (
                                                                                <Box>
                                                                                    <FormControl fullWidth >
                                                                                        {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            // label='Страна рождения'
                                                                                            value={formData[option] || ''}
                                                                                            onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                            size='small'
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoSelect}
                                                                                        >
                                                                                            <MenuItem value="" disabled hidden>
                                                                                            Выберите город рождения
                                                                                            </MenuItem>
                                                                                            {options.find((o) => o.id === option).selectOptions.map((countryOption) => (
                                                                                                <MenuItem key={countryOption} value={countryOption}>
                                                                                                    {countryOption}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <TextField
                                                                                        type="text"
                                                                                        size='small'
                                                                                        style={{ marginTop: '12px', marginLeft: '12px' }}
                                                                                        className={cl.workerInfo}
                                                                                        placeholder={`${options.find((o) => o.id === option).label}`}
                                                                                        onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                    />
                                                                                </Box>
                                                                            )
                                                                              : option === "residentinfo:resCountry" ? (
                                                                                <Box>
                                                                                    <FormControl fullWidth >
                                                                                        {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            // label='Страна рождения'
                                                                                            value={formData[option] || ''}
                                                                                            onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                            size='small'
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoSelect}
                                                                                        >
                                                                                            <MenuItem value="" disabled hidden>
                                                                                                Выберите страну прожвания
                                                                                            </MenuItem>
                                                                                            {options.find((o) => o.id === option).selectOptions.map((countryOption) => (
                                                                                                <MenuItem key={countryOption} value={countryOption}>
                                                                                                    {countryOption}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <TextField
                                                                                        type="text"
                                                                                        size='small'
                                                                                        style={{ marginTop: '12px', marginLeft: '12px' }}
                                                                                        className={cl.workerInfo}
                                                                                        placeholder={`${options.find((o) => o.id === option).label}`}
                                                                                        onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                    />
                                                                                </Box>
                                                                            ) 
                                                                            : option === "residentinfo:resCity" ? (
                                                                                <Box>
                                                                                    <FormControl fullWidth >
                                                                                        {/* <InputLabel id="demo-simple-select-label">{options.find((o) => o.id === option).label}</InputLabel> */}
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            // label='Страна рождения'
                                                                                            value={formData[option] || ''}
                                                                                            onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                            size='small'
                                                                                            title="Выберите город прожвания"
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoSelect}
                                                                                        >
                                                                                            <MenuItem value="" disabled hidden>
                                                                                                Выберите город прожвания
                                                                                            </MenuItem>
                                                                                            {options.find((o) => o.id === option).selectOptions.map((countryOption) => (
                                                                                                <MenuItem key={countryOption} value={countryOption}>
                                                                                                    {countryOption}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <TextField
                                                                                        type="text"
                                                                                        size='small'
                                                                                        style={{ marginTop: '12px', marginLeft: '12px' }}
                                                                                        className={cl.workerInfo}
                                                                                        placeholder={`${options.find((o) => o.id === option).label}`}
                                                                                        onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                    />
                                                                                </Box>
                                                                            )
                                                                             : option === "birthinfo:birth_date" ? (
                                                                                <div className={cl.data__wrapper}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                                                                        <TextField
                                                                                            type="date"
                                                                                            size='small'
                                                                                            className={cl.workerInfoDate}
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            value={formData[option] != null ? formData[option].start_date : ''}
                                                                                            onChange={(e) => { handleInputChange(option, { ...formData[option], start_date: e.target.value }) }}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                                                                        <TextField
                                                                                            type="date"
                                                                                            size='small'
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoDate}
                                                                                            value={formData[option] != null ? formData[option].end_date : ''}
                                                                                            onChange={(e) => handleInputChange(option, { ...formData[option], end_date: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            ) : option === "identitycardinfo:dateOfIssue" && options.find((o) => o.id === option).isRange ? (
                                                                                <div className={cl.data__wrapper}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>От</label>
                                                                                        <TextField
                                                                                            type="date"
                                                                                            size='small'
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoDate}
                                                                                            value={formData[option] != null ? formData[option].start_date : ''}
                                                                                            onChange={(e) => handleInputChange(option, { ...formData[option], from: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <label style={{ marginRight: '5px', marginLeft: '13px' }}>До</label>
                                                                                        <TextField
                                                                                            type="date"
                                                                                            size='small'
                                                                                            style={{ marginLeft: '12px' }}
                                                                                            className={cl.workerInfoDate}
                                                                                            value={formData[option] != null ? formData[option].end_date : ''}
                                                                                            onChange={(e) => handleInputChange(option, { ...formData[option], to: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <TextField
                                                                                    type="text"
                                                                                    size='small'
                                                                                    style={{ marginLeft: '12px' }}
                                                                                    className={cl.workerInfo}
                                                                                    value={formData[option] || ''}
                                                                                    placeholder={`${options.find((o) => o.id === option).label}`}
                                                                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                                                                />
                                                                            )}
                                                                        </>
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
                           
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', marginTop: '15px' }}>
                                                <Button variant="contained" onClick={handleSubmit} style={{ textTransform: 'none', backgroundColor: '#1B3884'  }} className={cl.submitBtn} >
                                                    Поиск
                                                </Button>
                                                {showExcelButton && (
                                                    <Button  variant="outlined" style={{ display: 'flex', gap: "10px",  textTransform: 'none', color: '#1B3884', borderColor: '#1b3884'  }} >
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
                                                                ...selectedOrderListOptions
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
                                                    ...selectedOrderListOptions
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
                                    {
                                        activeTab === 4 && 
                                        <div className={cl.basic__info}>
                                            <PensionList />
                                        </div>
                                    }
                                </div>
                            </div>
                            
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
  
    );
};

export default Reports;

export const updateFormData = (key, value, prevFormData) => {
    console.log(key, value, prevFormData)

    const updatedFormData = { ...prevFormData };
    if (value === undefined || value === null || value === '') {
      delete updatedFormData[key];
    } else {
      updatedFormData[key] = value;
    }

    return updatedFormData;  
};