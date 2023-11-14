import React from 'react';
import cl from './Administration.module.css'
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';

function Administration() {
    return (
        <div className={cl.wrapper}>
             <Navigation className={cl.navigation} /> 
             <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Header className={cl.header} />
                <div className={cl.content}>
                    <div className={cl.container}></div>
                </div>
             </div>
       
        </div>
    );
}

export default Administration;