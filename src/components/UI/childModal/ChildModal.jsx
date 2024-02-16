import React from 'react';
import classes from "./ChildModal.module.css";
import { IoClose } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

const ChildModal = ({ onClose, children, visibleChild, setVisibleChild, className, ...props }) => {

    const rootClasses = [classes.myModal];

    if (visibleChild) {
        rootClasses.push(classes.active);
    }; 

    const handleCloseChildBtn = () => {
        setVisibleChild(false)
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
                <IconButton aria-label="delete" onClick={handleCloseChildBtn}>
                    <IoClose />
                </IconButton>
            </div>
            
            {children}
        </div>
        </div>
    );
};

export default ChildModal;