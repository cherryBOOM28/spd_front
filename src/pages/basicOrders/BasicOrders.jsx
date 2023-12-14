import React, { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/header/Header';
import cl from './BasicOrders.module.css'
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import 'react-notifications/lib/notifications.css';
import DecreeHistory from '../../components/decrees/DecreeHistory';
import { MdOutlineWork } from "react-icons/md";
import { MdDriveFileMoveRtl } from "react-icons/md";
import Appointment from '../../components/decrees/appointment/Appointment';
import Transfer from '../../components/decrees/transfer/Transfer';


function BasicOrders() {
    const [isDecreeHistoryOpen, setDecreeHistoryOpen] = useState(false);
    const [selectedDecreeType, setSelectedDecreeType] = useState(null);
    const [isCreateDecreeClicked, setCreateDecreeClicked] = useState(false);

    const handleDecreeTypeClick = (type) => {
        if (selectedDecreeType === type) {
          setSelectedDecreeType(null); // Deselect the button if it's already selected
        } else {
          setSelectedDecreeType(type);
        }
        setCreateDecreeClicked(false);
        setDecreeHistoryOpen(false);
    };
    
    const handleCreateDecreeClick = () => {
        setCreateDecreeClicked(true);
        setDecreeHistoryOpen(false);
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
                                    <Button  variant="contained" style={{  textTransform: 'none' }}
                                    onClick={handleCreateDecreeClick}
                                    className={isCreateDecreeClicked ? cl.decree_btn_active : ''}
                                    >
                                    Создать приказ
                                    </Button>
                                    {!isDecreeHistoryOpen && (
                                    <Button  variant="contained"  style={{  textTransform: 'none' }} onClick={handleButtonClick}>История документов</Button>
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

                            </div>
                        )}
                        {!isCreateDecreeClicked && !isDecreeHistoryOpen && (
                            <div className={cl.decree_btn_wrapper}>
                                <div className={cl.decree_row}>
                                    <div elevation={3}
                                        className={`${cl.decree_btn} ${
                                            selectedDecreeType === 'appointment' ? cl.decree_btn_active : ''
                                        }`}
                                        onClick={() => handleDecreeTypeClick('appointment')}
                                    >
                                        <MdOutlineWork />
                                        <p>Приказ о назначении</p>
                                    </div>
                                    <div elevation={3}
                                        className={`${cl.decree_btn} ${
                                            selectedDecreeType === 'transfer' ? cl.decree_btn_active : ''
                                        }`}
                                        onClick={() => handleDecreeTypeClick('transfer')}
                                    >
                                        <MdDriveFileMoveRtl />
                                        <p>Приказ о перемещении</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>   
    );

    
}

export default BasicOrders;