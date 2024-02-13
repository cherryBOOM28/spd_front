import React, { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import cl from './BasicOrders.module.css'
import { Button } from '@mui/material';
import 'react-notifications/lib/notifications.css';
import DecreeHistory from '../../components/decrees/DecreeHistory';
import { MdOutlineWork } from "react-icons/md";
import { MdDriveFileMoveRtl } from "react-icons/md";
import Appointment from '../../components/decrees/appointment/Appointment';
import Transfer from '../../components/decrees/transfer/Transfer';
import { MdMilitaryTech } from "react-icons/md";
import RunkUp from '../../components/decrees/rankUp/RankUp';
import { ImUserMinus } from "react-icons/im";
import Dismissal from '../../components/decrees/dismissal/Dismissal';

import { BsFillSuitcase2Fill } from "react-icons/bs";
import { RiExchangeBoxFill } from "react-icons/ri";
import Vacation from '../../components/decrees/vacation/Vacation';


function BasicOrders() {
    const [isDecreeHistoryOpen, setDecreeHistoryOpen] = useState(false);
    const [selectedDecreeType, setSelectedDecreeType] = useState(null);
    const [isCreateDecreeClicked, setCreateDecreeClicked] = useState(false);

    const handleDecreeTypeClick = (type) => {
        if (selectedDecreeType === type ?? isCreateDecreeClicked) {
            setCreateDecreeClicked(false); // Deselect the button if it's already selected
        } else {
          setSelectedDecreeType(type);
          setCreateDecreeClicked(true);
            setDecreeHistoryOpen(false);
        };
    };
    
    const handleButtonClick = () => {
        setDecreeHistoryOpen(!isDecreeHistoryOpen);
        setSelectedDecreeType(null);
        setCreateDecreeClicked(false);
    };

    const handleReturnToDecreesClick = () => {
        setCreateDecreeClicked(false);
        setDecreeHistoryOpen(false);
    };
    

    return (
        <div className={cl.wrapper}>
            <Navigation className={cl.navigation} /> 
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Header className={cl.header} />
                <div className={cl.content}>
                    <div className={cl.container}>
                        <div className={cl.filters}>
                            <div className={cl.filter_btn}>
                            {isCreateDecreeClicked ? (
                                <Button  variant="contained" onClick={handleReturnToDecreesClick}>Приказы</Button>
                                ) : (
                                <>
                                    {!isDecreeHistoryOpen && (
                                    <Button  variant="contained"  style={{  textTransform: 'none' }} onClick={handleButtonClick}>Журнал приказов</Button>
                                    )}
                                    {isDecreeHistoryOpen && (
                                    <Button  variant="contained" style={{  textTransform: 'none' }} onClick={handleButtonClick}>Приказы</Button>
                                    )}
                                </>
                            )}
                            </div>
                            <div>
                            </div>
                        </div>
                        {isDecreeHistoryOpen && <DecreeHistory />} 
                        {isCreateDecreeClicked && (
                            <div>
                                {selectedDecreeType === 'appointment' && <Appointment />}
                                {selectedDecreeType === 'transfer' && <Transfer />}
                                {selectedDecreeType === 'rankUp' && <RunkUp />}
                                {selectedDecreeType === 'dismissal' && <Dismissal />}
                                {selectedDecreeType === 'vacation' && <Vacation />}

                            </div>
                        )}
                        {!isCreateDecreeClicked && !isDecreeHistoryOpen && (
                            <div className={cl.decree_btn_wrapper}>
                                <div className={cl.decree_row}>
                                    <div elevation={3}
                                        // className={`${cl.decree_btn} ${
                                        //     selectedDecreeType === 'appointment' ? cl.decree_btn_active : ''
                                        // }`}
                                        className={cl.decree_btn}
                                        onClick={() => handleDecreeTypeClick('appointment')}
                                    >
                                        <MdOutlineWork />
                                        <p>Приказ о назначении</p>
                                    </div>
                                    <div elevation={3}
                                        className={`${cl.decree_btn}`}
                                        onClick={() => handleDecreeTypeClick('transfer')}
                                    >
                                        <MdDriveFileMoveRtl />
                                        <p>Приказ о перемещении</p>
                                    </div>
                                    <div elevation={3}
                                        className={`${cl.decree_btn}`}
                                        onClick={() => handleDecreeTypeClick('rankUp')}
                                    >
                                        <MdMilitaryTech />
                                        <p>Приказ о присвоении звания</p>
                                    </div>
                                </div>

                                <div className={cl.decree_row}>
                                    <div elevation={3}
                                        className={cl.decree_btn}
                                        onClick={() => handleDecreeTypeClick('dismissal')}
                                    >
                                        <ImUserMinus />
                                        <p>Приказ об увольнении</p>
                                    </div>
                                    <div elevation={3}
                                        className={`${cl.decree_btn}`}
                                        onClick={() => handleDecreeTypeClick('vacation')}
                                    >
                                        <RiExchangeBoxFill />
                                        <p>Приказ о командировке</p>
                                    </div>
                                    <div elevation={3}
                                        className={`${cl.decree_btn}`}
                                        onClick={() => handleDecreeTypeClick('vacation')}
                                    >
                                        <BsFillSuitcase2Fill />
                                        <p>Приказ об отпуске</p>
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>   
    );
};

export default BasicOrders;