import React, { useState } from 'react';
import cl from './Dropdown.module.css';

const Dropdown = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? `${cl.accordion__item} ${cl.open}` : cl.accordion__item}>
      <div className={cl.accordion__header} onClick={toggleAccordion}>
        <span className={cl.accordion__title}>{title}</span>
        <span className={cl.accordion__arrow}></span>
      </div>
      <div className={cl.accordion__content}>
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
