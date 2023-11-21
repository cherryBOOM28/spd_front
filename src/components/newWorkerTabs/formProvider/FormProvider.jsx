import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../UI/button/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  // Общие данные
  const [photo, setPhoto] = useState([
    {
      photoBinary: ''
    }
  ])

  const [person, setPerson] = useState({
    firstName: '',
    surname: '',
    patronymic: '',
    gender: '',
    nationality: '',
    iin: '',
    pin: ''
  });


  const [birthInfo, setBirthInfo] = useState({
    birth_date: '',
    country: '',
    region: '',
    city: '',
  });

  const [identityCardInfo, setIdentityCardInfo] =useState({
    identityCardNumber: '',
    issuedBy: '',
    dateOfIssue: '',
  });

  const [residentInfo, setResidentInfo] = useState({
    resCountry: '',
    resRegion: '',
    resCity: '',
  });

  // Личные данные
  const [positionInfo, setPositionInfo] = useState({
    position: "",
    department: {},
    receivedDate: "",
  });

  const [education, setEducation] = useState([
    {
      education_type: '',
      education_place: '',
      education_date_in: '',
      education_date_out: '',
      education_speciality: '',
      diploma_number: ''
    }
  ]);

  const [family_compositions, setFamilyCompositions] = useState([
    {
      relative_type: "",
      fio: "",
      rel_iin: "",
      birth_date_family: "",
      job_place: "",
    }
  ])

  const [language, setLanguage] = useState([
    {
      // id: '',
      language_name: '',
      owning_lvl_language: '',
    }
  ]);

  const [courses, setCourses] = useState([
    {
      // id: '',
      course_type: '',
      course_organization: '',
      course_start_date: '',
      course_end_date: '',
      document_type: '',
      course_name: ''
    }
  ]);

  const [academicDegree, setAcademicDegree] = useState([
    {
      education_place_academic: '',
      academic_degree: '',
      diploma_number_academic: '',
      diploma_date: ''
    }
  ]);

  const [sport, setSport] = useState([
    {
      sport_type: '',
      owning_lvl_sport_results: '',
    }
  ]);

  const [laborActivity, setLaborActivity] = useState([
    {
      working_start: '',
      working_end: '',
      departament_work: '',
      jposition_work: '',
      organization_name: '',
      organization_addres: '',
    }
  ]);

  const [spec_checks, setSpec_checks] = useState([
    {
      doc_number: '',
      doc_date: '',
    }
  ]
  );

  const [attestations, setAttestations] = useState([
    {
      attestation_result: '',
      last_attestation_date: '',
      next_attestation_date: '',
    }
  ]
  );

  const [awards, setAwards] = useState([
    {
      awards_type: '',
      awards_doc_numb: '',
      awards_date: '',
    }
  ]
  );

  const [investigation_retrievals, setInvestigation_retrievals] = useState([
    {
      order_type_investigation: '',
      order_doc_numb: '',
      order_date_investigation: ''
    }
  ]
  );

  const [military_rank, setMilitary_rank] = useState(
    {
      military_rank: '',
      received_date: '',
      type_of_receipt: '',
      position: '',
    }
  );

  const [class_category, setClass_category] = useState(
    [
      {
        category_type: '',
      }
    ]
  );

  const [autobiography, setAutobiography] = useState(
    {
      autobiography: '',
    }
  );

  const [sick_leaves, setSick_leaves] = useState([
    {
      sick_dock_numb: '',
      sick_doc_date: ''
    }
  ]
  );

  const [reportOrders, setReportOrders] = useState([
    {
      order_type: '',
      order_subtype: '',
      order_date: '',
    }
  ]);


  const navigate = useNavigate();
  // const validateFields = (fields) => {
  //   for (const fieldName in fields) {
  //     if (!fields[fieldName].trim()) {
  //       return false; 
  //     }
  //   }
  //   return true;
  // };
  const validateFields = (fields) => {
    for (const fieldName in fields) {
      // Skip validation for the 'patronymic' field if it's not provided
      if (fieldName === 'patronymic' && !fields[fieldName].trim()) {
        continue;
      }
      if (!fields[fieldName].trim()) {
        return false; 
      }
    }
    return true;
  };

  const showNotification = () => {
    NotificationManager.success('Успех!', 'Сохранение данных прошло успешно.');
  };


  
  // useEffect(() => {
  //     console.log(photo.slice(22))
  // }, [photo])

  const [emptyInputs, setEmptyInputs] = useState(false);

  const handleInputChange = (stateUpdater, name, value) => {
    stateUpdater((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async(event) => {

    const isAllFieldsFilled = validateFields(person);
  
    if (!isAllFieldsFilled ) {
      NotificationManager.error('Пожалуйста, заполните все поля!');
      return;
    }

   

    event.preventDefault();


    const hasEmptyInputs = Object.values(person).some((value) => value === '');

    if (hasEmptyInputs) {
      setEmptyInputs(true);
      return;
    }

    try {
      // navigate('/'); 
      // window.location.reload(); 
      setTimeout(() => {
        showNotification();
      }, 200);
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }

    // const imageData = (base64String) => {};
    // if (photo) {
    //   imageData.append('image', photo);
    //   await axios.post('http://localhost:8000/api/v1/person/photos/', imageData, {
    //     headers: {
    //       'Content-Type': 'application/json', 
    //     },
    //   });
    // }

    const requestData = {
      // Photo: {photo},
      Person: {person},
      BirthInfo: {birthInfo},
      IdentityCardInfo: {identityCardInfo},
      ResidentInfo: {residentInfo},
      PositionInfo: {positionInfo},
      // educations: education.slice(1) ? education.slice(1) : [],
      // courses :courses.slice(1) ? courses.slice(1) : [],
      // academic_degree: academicDegree.slice(1) ? academicDegree.slice(1) : [],
      // attestations: attestations,
      // autobiography: autobiography,
      // investigation_retrievals: investigation_retrievals.slice(1) ? investigation_retrievals.slice(1) : [],
      // awards: awards.slice(1) ? awards.slice(1) : [],
      // class_categories: class_category,
      // family_compositions: family_compositions.slice(1) ? family_compositions.slice(1) : [],
      // orders_list: reportOrders.slice(1) ? reportOrders.slice(1) : [],
      // owning_languages:  language.slice(1) ? language.slice(1) : [],
      // sick_leaves: sick_leaves.slice(1) ? sick_leaves.slice(1) : [],
      // spec_checks: spec_checks,
      // sport_results:  sport.slice(1) ? sport.slice(1) : [],
      // working_histories: laborActivity.slice(1) ? laborActivity.slice(1) : [],
      // military_rank: military_rank         
    }

    event.preventDefault();
    // const myArray = photo.split(",");
    const accessToken = Cookies.get('jwtAccessToken');
    axios.post('http://localhost:8000/api/v1/person/', requestData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    // eslint-disable-next-line
    .then(() => {
      // console.log('Ответ от сервера:', response.data);
    })
    .catch((error) => {
      console.error('Ошибка при отправке данных:', error);
    });

    console.log(photo)

    console.log("post",{
      photo: photo,
      Person: person,
      BirthInfo: birthInfo,
      IdentityCardInfo: identityCardInfo,
      ResidentInfo: residentInfo, 
      PositionInfo: positionInfo,  })
  };

  // console.log('Person:', JSON.stringify(person));

  return (
    <FormContext.Provider 
      value={{ 
        photo, setPhoto,
        person, setPerson, 
        birthInfo, setBirthInfo,
        identityCardInfo, setIdentityCardInfo,
        residentInfo, setResidentInfo,
        positionInfo, setPositionInfo,
        // personalData, setPersonalData,
        // image, setImage,
        // education, setEducation,
        // language, setLanguage,
        // courses, setCourses,
        // academicDegree, setAcademicDegree,
        // sport, setSport,
        // laborActivity, setLaborActivity,
        // family_compositions, setFamilyCompositions,
        // spec_checks, setSpec_checks,
        // attestations, setAttestations,
        // investigation_retrievals, setInvestigation_retrievals,
        // awards, setAwards,
        // military_rank, setMilitary_rank,
        // class_category, setClass_category,
        // autobiography, setAutobiography,
        // sick_leaves, setSick_leaves,

        // reportOrders, setReportOrders,
        emptyInputs,
        handleInputChange,
        handleSubmit
      }}>
      {children}
      <Button type="submit" onClick={handleSubmit}>Сохранить</Button>
      <NotificationContainer />
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};
