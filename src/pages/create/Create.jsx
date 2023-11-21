import React, { useState, useEffect } from 'react';
import cl from './Create.module.css';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
// import Cookies from 'js-cookie';

import NewBasicInfo from '../../components/newWorkerTabs/newBasicInfo/NewBasicInfo';
import NewPersonal from '../../components/newWorkerTabs/newPersonal/NewPersonal';
import { FormProvider } from '../../components/newWorkerTabs/formProvider/FormProvider';
import NewEducation from '../../components/newWorkerTabs/newEducation/NewEducation';
import NewLanguage from '../../components/newWorkerTabs/newLanguage/NewLanguage';
import NewCourses from '../../components/newWorkerTabs/newCourses/NewCourses';
import NewSport from '../../components/newWorkerTabs/newSport/NewSport';
import NewLaborActivity from '../../components/newWorkerTabs/newLaborActivity/NewLaborActivity';
import NewPersonnelData from '../../components/newWorkerTabs/newPersonnelData/NewPersonnelData';
import NewReportOrders from '../../components/newWorkerTabs/newReportOrders/NewReportOrders';
import NewAcademicDegree from '../../components/newWorkerTabs/newAcademicDegree/NewAcademicDegree';
import NewFamilyComposition from '../../components/newWorkerTabs/newFamilyComposition/NewFamilyComposition';

function Create(props) {
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
        sessionStorage.removeItem('activeTab');
    };

    return (
            <div className={cl.homeWrapper}>
            <Navigation className={cl.navigation} /> 
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Header className={cl.header} />
                <div className={cl.content}>
                    <div className={cl.container}>
                    <FormProvider>
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
                            <div 
                                className={activeTab === 5 ? cl.btnTab + ' ' + cl.activeTab : cl.btnTab}
                                onClick={() => handleTabClick(5)}
                                >
                            Приказы рапорта 
                            </div>
                        </div>

                        <div className={cl.tabBody}>
                            {
                                activeTab === 1 && 
                                <div className={cl.basic__info}>
                                    <NewBasicInfo/>
                                </div>
                            }
                            {
                                activeTab === 2 && 
                                <div className={cl.basic__info}>
                                <div className={cl.totalInfo}>
                                    <NewPersonal />
                                    {/* <NewFamilyComposition />
                                    <NewEducation />
                                    <NewLanguage />
                                    <NewAcademicDegree />
                                    <NewCourses />
                                    <NewSport /> */}
                                </div>  
                            </div>
                            }
                            {
                                activeTab === 3 &&                       
                                <div className={cl.basic__info}>
                                <div className={cl.totalInfo}>
                                    {/* <NewLaborActivity /> */}
                                </div>                 
                            </div>
                            }
                            {
                                activeTab === 4 && 
                                <div className={cl.basic__info}>
                                <div className={cl.totalInfo}>
                                    {/* <NewPersonnelData /> */}
                                </div>         
                            </div>
                            }
                            {
                                activeTab === 5 && 
                                <div className={cl.basic__info}>
                                <div className={cl.totalInfo}>
                                    {/* <NewReportOrders /> */}
                                </div>      
                            </div>
                            }
                        </div>                
                        </div>
                    </FormProvider>
                    </div>
                </div>
            </div>
            </div>
         
    );
}

export default Create;