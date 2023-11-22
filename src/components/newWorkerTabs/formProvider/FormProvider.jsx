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

  const [familyComposition, setFamilyComposition] = useState([
    {
      relativeType: "",
      relName: "",
      relSurname: "",
      relPatronymic: "",
      relIin: "",
      relBirthDate: "",
      relJobPlace: "",
    }
  ]);

  const [education, setEducation] = useState([
    {
      educationType: '',
      educationPlace: '',
      educationDateIn: '',
      educationDateOut: '',
      speciality: '',
      diplomaNumber: ''
    }
  ]);

  const [languageSkill, setLanguageSkill] = useState([
    {
      langName: '',
      skillLvl: '',
    }
  ]);

  const [course, setCourse] = useState([
    {
      courseName: '',
      courseType: '',
      courseOrg: '',
      startDate: '',
      endDate: '',
      documentType: ''
    }
  ]);

  const [academicDegree, setAcademicDegree] = useState([
    {
      academicPlace: '',
      academicDegree: '',
      academicDiplomaNumber: '',
      academicDiplomaDate: ''
    }
  ]);

  const [sportSkill, setSportSkill] = useState([
    {
      sportType: '',
      sportSkillLvl: '',
    }
  ]);

  const [workingHistory, setWorkingHistory] = useState([
    {
      positionName: '',
      startDate: '',
      endDate: '',
      department: '',
      organizationName: '',
      organizationAddress: '',
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
      FamilyComposition: {
        relatives: familyComposition.slice(1) ? familyComposition.slice(1) : [],
      },
      Education: {
        educations: education.slice(1) ? education.slice(1) : [],
      },
      LanguageSkill: {
        languageSkills: languageSkill.slice(1) ? languageSkill.slice(1) : [],
      },
      Course: {
        courses: course.slice(1) ? course.slice(1) : [],
      },
      AcademicDegree: {
        academicDegrees: academicDegree.slice(1) ? academicDegree.slice(1) : [],
      },
      SportSkill: {
        sportSkills: sportSkill.slice(1) ? sportSkill.slice(1) : [],
      },
      WorkingHistory: {
        workingHistories: workingHistory.slice(1) ? workingHistory.slice(1) : [],
      },
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
      PositionInfo: positionInfo,
      FamilyComposition: {
        relatives: familyComposition.slice(1) ? familyComposition.slice(1) : [],
      },
      Education: {
        educations: education.slice(1) ? education.slice(1) : [],
      },
      LanguageSkill: {
        languageSkills: languageSkill.slice(1) ? languageSkill.slice(1) : [],
      },
      Course: {
        courses: course.slice(1) ? course.slice(1) : [],
      },
      AcademicDegree: {
        academicDegrees: academicDegree.slice(1) ? academicDegree.slice(1) : [],
      },
      SportSkill: {
        sportSkills: sportSkill.slice(1) ? sportSkill.slice(1) : [],
      },
      WorkingHistory: {
        workingHistories: workingHistory.slice(1) ? workingHistory.slice(1) : [],
      },
    })
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
        familyComposition, setFamilyComposition,
        education, setEducation,
        languageSkill, setLanguageSkill,
        course, setCourse,
        academicDegree, setAcademicDegree,
        sportSkill, setSportSkill,
        workingHistory, setWorkingHistory,
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
