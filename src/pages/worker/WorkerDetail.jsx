import React, { useState, useEffect } from 'react';
import cl from './WorkerDetail.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import TotalInfo from '../../components/tabsPage/totalInfo/TotalInfo';
import BasicInfo from '../../components/tabsPage/basicInfo/BasicInfo';
import PersonnelData from '../../components/tabsPage/personnelData/PersonnelData';
import LaborActivity from '../../components/tabsPage/laborActivity/LaborActivity';
import Personal from '../../components/tabsPage/personalInfo/personalData/Personal';
import Education from '../../components/tabsPage/personalInfo/education/Education';
import Language from '../../components/tabsPage/personalInfo/language/Language';
import Courses from '../../components/tabsPage/personalInfo/courses/Courses';
import AcademicDegree from '../../components/tabsPage/personalInfo/academicDegree/AcademicDegree';
import Sport from '../../components/tabsPage/personalInfo/sport/Sport';
import Loader from '../../components/loader _/Loader ';

import axios from 'axios';
import Cookies from 'js-cookie';


function WorkerDetail() {
  const { id, iin } = useParams();
  // console.log(`id: ${id}`);
  

  // tabs
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const savedTab = sessionStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(parseInt(savedTab));
    }
  }, []);

  const handleTabClick = (tabIndex) => {
    sessionStorage.setItem('activeTab', tabIndex.toString());
    setActiveTab(tabIndex);
  };

  const [photo, setPhoto] = useState({});

  const [person, setPerson] = useState({});
  const [birthInfo, setBirthInfo] = useState([]);
  const [gender, setGender] = useState([]);

  const [identityCardInfo, setIdentityCardInfo] = useState({});
  
  const [residentInfo, setResidentInfo] = useState({});

  const [positionInfo, setPositionInfo] = useState({});
  const [location, setLocation] = useState({});
  const [receivedDate, setReceivedDate] = useState({});
  const [positionTitle, setPositionTitle] = useState({});
  const [departmentName, setDepartmentName] = useState({});

  const [familyStatus, setFamilyStatus] = useState({});
  const [familyComposition, setFamilyComposition] = useState({});
  const [education, setEducation] = useState({});
  const [languageSkill, setLanguageSkill] = useState({});
  const [course, setCourse] = useState({});
  const [academicDegree, setAcademicDegree] = useState({});
  const [sportSkill, setSportSkill] = useState({});

  const [workingHistory, setWorkingHistory] = useState({});
  const [rankArchive, setRankArchive] = useState({});

  const [autobiographyInfo, setAutobiographyInfo] = useState({});
  const [specCheckInfo, setSpecCheckInfo] = useState({});
  const [attestationInfo, setAttestationInfo] = useState({});
  const [classCategoriesInfo, setClassCategoriesInfo] = useState({});
  const [rewardsInfo, setRewardsInfo] = useState({});
  const [sickLeavesInfo, setSickLeavesInfo] = useState({});
  const [investigationsInfo, setInvestigationsInfo] = useState({});
  const [rankInfo, setRankInfo] = useState([]);
  const [militaryRank, setMilitaryRank] = useState({});

  const [loading, setLoading] = useState(false); // Initialize loading state

  const accessToken = Cookies.get('jwtAccessToken');

  const fetchData = async (id) => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.get(`http://localhost:8000/api/v1/person/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      // console.log("response", response.data);
  
      if (response.status === 200) {
        setPhoto(response.data.Person.photo);
        setPerson(response.data.Person);
        setBirthInfo(response.data.BirthInfo);
        setGender(response.data.Person.gender);

        setIdentityCardInfo(response.data.IdentityCardInfo);
        setResidentInfo(response.data.ResidentInfo);

        setPositionInfo(response.data.Person.positionInfo.department);
        setLocation(response.data.Person.positionInfo.department.Location);
        setDepartmentName(response.data.Person.positionInfo.department.DepartmentName);
        setReceivedDate(response.data.Person.positionInfo);
        setPositionTitle(response.data.Person.positionInfo.position);

        setFamilyStatus(response.data.Person.familyStatus);

        setFamilyComposition(response.data.FamilyComposition);
        setEducation(response.data.Education);
        setLanguageSkill(response.data.LanguageSkill);
        setCourse(response.data.Course);
        setAcademicDegree(response.data.AcademicDegree);
        setSportSkill(response.data.SportSkill);

        setWorkingHistory(response.data.WorkingHistory);
        setRankArchive(response.data.RankArchive);

        // console.log("RankArchive",response.data.RankArchive);

        // console.log(response.data.WorkingHistory);

        setAutobiographyInfo(response.data.AutobiographyInfo);
        setSpecCheckInfo(response.data.SpecCheckInfo);
        setAttestationInfo(response.data.AttestationInfo);
        setClassCategoriesInfo(response.data.ClassCategoriesInfo);
        setRewardsInfo(response.data.RewardsInfo);
        setSickLeavesInfo(response.data.SickLeavesInfo);
        setInvestigationsInfo(response.data.InvestigationsInfo);

        setRankInfo(response.data.Person.rankInfo);
        setMilitaryRank(response.data.Person.rankInfo.militaryRank);

        console.log(response.data.Person.rankInfo);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    if (id && accessToken) {
      fetchData(id, accessToken);
    }
  }, [id, accessToken]);
  

  return (
    <div className={cl.homeWrapper}>
        <Navigation className={cl.navigation} /> 
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Header className={cl.header} />
            <div className={cl.content}>
                <div className={cl.container}>
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
                        Личные данные
                      </div>
                      <div 
                          className={activeTab === 3 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                          onClick={() => handleTabClick(3)}
                      >
                          Трудовая деятельность 
                      </div>
                      <div 
                          className={activeTab === 4 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                          onClick={() => handleTabClick(4)}
                      >
                        Кадровые данные 
                      </div>
                    </div>

                    <div className={cl.tabBody}>
                      {loading ? (
                        <Loader loading={loading} />
                      ) : (

                        <div>
                          {
                        activeTab === 1 && 

                        <div className={cl.basic__info}>
                          <BasicInfo  
                            id={id} 
                            photo={photo}
                            person={person} 
                            birthInfo={birthInfo}
                            gender={gender}
                          />
                          <div className={cl.totalInfo}>
                            <TotalInfo
                              id={id}
                              person={person} 

                              identityCardInfo={identityCardInfo}
                              setIdentityCardInfo={setIdentityCardInfo}

                              residentInfo={residentInfo}
                              setResidentInfo={setResidentInfo}
                            />
                          </div>
                            
                        </div>
                      }
                      {
                        activeTab === 2 && 

                        <div className={cl.basic__info}>
                          <BasicInfo id={id}
                            photo={photo}
                            person={person} 
                            birthInfo={birthInfo}
                            gender={gender}
                          />
                          <div className={cl.totalInfo}>
                            <Personal 
                              id={id} 
                              iin={iin}
                              positionInfo={positionInfo}
                              location={location}
                              receivedDate={receivedDate}
                              positionTitle={positionTitle}
                              departmentName={departmentName}
                              familyStatus={familyStatus}
                              
                              familyComposition={familyComposition}
                              setFamilyComposition={setFamilyComposition}
                            />
                            <Education 
                              id={id}
                              education={education}
                              setEducation={setEducation}
                            />
                            <Language 
                              id={id}
                              languageSkill={languageSkill}
                              setLanguageSkill={setLanguageSkill}
                            />
                            <Courses 
                              id={id}
                              course={course}
                              setCourse={setCourse}
                            />
                            <AcademicDegree 
                              id={id}
                              academicDegree={academicDegree}
                              setAcademicDegree={setAcademicDegree}
                            />
                            <Sport 
                              id={id}
                              sportSkill={sportSkill}
                              setSportSkill={setSportSkill}
                            />
                          </div>  
                        </div>
                      }
                      {
                        activeTab === 3 && 

                        <div className={cl.basic__info}>
                          <BasicInfo id={id}
                            photo={photo}
                            person={person} 
                            birthInfo={birthInfo}
                            gender={gender}
                          />
                          <div className={cl.totalInfo}>
                            <LaborActivity 
                              id={id} 
                              workingHistory={workingHistory}
                              setWorkingHistory={setWorkingHistory}
                            />
                          </div>  
                            
                        </div>
                      }
                      {
                        activeTab === 4 && 

                        <div className={cl.basic__info}>
                          <BasicInfo id={id}
                            photo={photo}
                            person={person} 
                            birthInfo={birthInfo}
                            gender={gender}
                          />
                          <div className={cl.totalInfo}>
                            <PersonnelData 
                              id={id} 
                              iin={iin} 

                              autobiographyInfo={autobiographyInfo}   
                              setAutobiographyInfo={setAutobiographyInfo} 

                              specCheckInfo={specCheckInfo}
                              setSpecCheckInfo={setSpecCheckInfo}

                              attestationInfo={attestationInfo}
                              setAttestationInfo={setAttestationInfo}

                              classCategoriesInfo={classCategoriesInfo}
                              setClassCategoriesInfo={setClassCategoriesInfo}

                              rewardsInfo={rewardsInfo}
                              setRewardsInfo={setRewardsInfo}
                              
                              sickLeavesInfo={sickLeavesInfo}
                              setSickLeavesInfo={setSickLeavesInfo}

                              investigationsInfo={investigationsInfo}
                              setInvestigationsInfo={setInvestigationsInfo}

                              rankInfo={rankInfo}
                              setRankInfo={setRankInfo}

                              militaryRank={militaryRank}
                              setMilitaryRank={setMilitaryRank}
                              rankArchive={rankArchive}
                            />
                          </div> 
                            
                        </div>
                      }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default WorkerDetail;