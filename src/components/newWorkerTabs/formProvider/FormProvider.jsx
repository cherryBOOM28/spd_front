import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../UI/button/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const getSpecCheckInfo = (specCheckInfo) => {
    // console.log("fff", specCheckInfo);
    let newSpecCheckInfo = []

    specCheckInfo.map((item, index) => {
      let _specCheckItem = {};

      if (item['docDate'].length > 0) _specCheckItem['docDate'] = item['docDate'];
      if (item['docNumber'].length > 0) _specCheckItem['docNumber'] = item['docNumber'];

      // console.log(_specCheckItem.length);
      if (Object.keys(_specCheckItem).length > 0) newSpecCheckInfo.push(_specCheckItem);
    });
    // console.log(newSpecCheckInfo, newSpecCheckInfo.length);
    return newSpecCheckInfo;
  };

  const getAttestationInfo = (attestationInfo) => {
    let newAttestationInfo = [];

    attestationInfo.map((item, index) => {
      let _attestationItem = {};

      if (item['lastAttDate'].length > 0) _attestationItem['lastAttDate'] = item['lastAttDate'];
      if (item['attResult'].length > 0) _attestationItem['attResult'] = item['attResult'];

      if (Object.keys(_attestationItem).length > 0) newAttestationInfo.push(_attestationItem);
    });
    return newAttestationInfo;
  };

  const getClassCategoriesInfo = (classCategoriesInfo) => {
    let newClasCategoriesInfo = [];

    classCategoriesInfo.map((item, index) => {
      let _classCategoriesItem = {};

      if (item['categoryType'].length > 0) _classCategoriesItem['categoryType'] = item['categoryType'];
      if (Object.keys(_classCategoriesItem).length > 0) newClasCategoriesInfo.push(_classCategoriesItem);
    });
    return newClasCategoriesInfo;
  };

  const getAutobiographyInfo = (autobiographyInfo) => {
    let newAutobiographyInfo = [];

    autobiographyInfo.map((item, index) => {
      let _autobiographyItem = {};

      if (item['autobiographyText'].length > 0) _autobiographyItem['autobiographyText'] = item['autobiographyText'];
      if (Object.keys(_autobiographyItem).length > 0) newAutobiographyInfo.push(_autobiographyItem);
    });
    return newAutobiographyInfo;
  };

  // Общие данные
  const [photo, setPhoto] = useState(
    {
      photoBinary: ''
    }
  )

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

  // Трудовая деятельность
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

  // Кадровые данные
  const [specCheckInfo, setSpecCheckInfo] = useState([
    {
      docNumber: '',
      docDate: '',
    }
  ]
  );

  const [attestationInfo, setAttestationInfo] = useState([
    {
      attResult: '',
      lastAttDate: '',
    }
  ]
  );

  const [rewardsInfo, setRewardsInfo] = useState([
    {
      rewardType: '',
      rewardDocNumber: '',
      rewardDate: '',
    }
  ]
  );

  const [investigationsInfo, setInvestigationsInfo] = useState([
    {
      investigation_decree_type: '',
      investigation_decree_number: '',
      investigation_date: ''
    }
  ]
  );

  const [rankInfo, setRankInfo] = useState(
    {
      militaryRank: '',
      receivedDate: '',
      receivedType: '',
    }
  );

  const [classCategoriesInfo, setClassCategoriesInfo] = useState(
    [
      {
        categoryType: '',
      }
    ]
  );

  const [autobiographyInfo, setAutobiographyInfo] = useState([
    {
      autobiographyText: '',
    }
  ]
  );

  const [sickLeavesInfo, setSickLeavesInfo] = useState([
    {
      sickDocNumber: '',
      sickDocDate: ''
    }
  ]
  );

  // Приказы рапорта
  const [decreeListInfo, setDecreeListInfo] = useState([
    {
      decreeType: '',
      decreeSubType: '',
      decreeDate: '',
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
  
    // if (!isAllFieldsFilled ) {
    //   NotificationManager.error('Пожалуйста, заполните все поля!');
    //   return;
    // }

    // event.preventDefault();
    // const hasEmptyInputs = Object.values(person).some((value) => value === '');

    // if (hasEmptyInputs) {
    //   setEmptyInputs(true);
    //   return;
    // }

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

    // console.log(specCheckInfo);
    const _specCheckInfo = getSpecCheckInfo(specCheckInfo);
    const _attestationInfo = getAttestationInfo(attestationInfo);
    const _classCategoriesInfo = getClassCategoriesInfo(classCategoriesInfo);
    const _autobiographyInfo = getAutobiographyInfo(autobiographyInfo);

    const requestData = {
      Photo: photo,
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
      SpecCheckInfo: {
        specChecks: _specCheckInfo,
      },
      AttestationInfo: {
        attestations: _attestationInfo
      },
      RankInfo: {rankInfo},
      ClassCategoriesInfo: {
        classCategoriesInfo: _classCategoriesInfo
      },
      AutobiographyInfo: {
        autobiographies: _autobiographyInfo,
      },
      RewardsInfo: {
        rewards: rewardsInfo.slice(1) ? rewardsInfo.slice(1) : [],
      },
      SickLeavesInfo: {
        sickLeaves: sickLeavesInfo.slice(1) ? sickLeavesInfo.slice(1) : [],
      },
      InvestigationsInfo: {
        investigations: investigationsInfo.slice(1) ? investigationsInfo.slice(1) : [],
      },
      DecreeListInfo: {
        decrees: decreeListInfo.slice(1) ? decreeListInfo.slice(1) : [],
      }
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

    

    console.log("post", {
      Photo: {photoBinary: photo},
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
      SpecCheckInfo: {
        specChecks: _specCheckInfo,
      },
      AttestationInfo: {
        attestations: _attestationInfo,
      },
      RankInfo: rankInfo,
      ClassCategoriesInfo: {
        classCategories: _classCategoriesInfo,
      },
      AutobiographyInfo: {
        autobiographies: _autobiographyInfo,
      },
      RewardsInfo: {
        rewards: rewardsInfo.slice(1) ? rewardsInfo.slice(1) : [],
      },
      SickLeavesInfo: {
        sickLeaves: sickLeavesInfo.slice(1) ? sickLeavesInfo.slice(1) : [],
      },
      InvestigationsInfo: {
        investigations: investigationsInfo.slice(1) ? investigationsInfo.slice(1) : [],
      },
      DecreeListInfo: {
        decrees: decreeListInfo.slice(1) ? decreeListInfo.slice(1) : [],
      }
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
        specCheckInfo, setSpecCheckInfo,
        attestationInfo, setAttestationInfo,
        rankInfo, setRankInfo,
        classCategoriesInfo, setClassCategoriesInfo,
        autobiographyInfo, setAutobiographyInfo,
        rewardsInfo, setRewardsInfo,
        sickLeavesInfo, setSickLeavesInfo,
        investigationsInfo, setInvestigationsInfo,
        decreeListInfo, setDecreeListInfo,

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
