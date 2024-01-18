import React from 'react';
import classes from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

function Modal({ children, visible, setVisible, className, ...props }) {
    const rootClasses = [classes.myModal];

    if (visible) {
        rootClasses.push(classes.active);
    }; 

    const handleCloseBtn = () => {
        setVisible(false)
    };

    return (
        <div className={rootClasses.join(' ')}
             {...props}
        >
            
            <div
                className={classes.myModalContent + " " + className}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={classes.closeBtn} >
                    <IconButton aria-label="delete" onClick={handleCloseBtn}>
                        <IoClose />
                    </IconButton>
                </div>
                
                {children}
            </div>
        </div>
    );
};

export default Modal;
