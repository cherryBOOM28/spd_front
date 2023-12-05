// import React, { useState } from 'react';
// import cl from './Dropdown.module.css';

// const Dropdown = ({ title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={isOpen ? `${cl.accordion__item} ${cl.open}` : cl.accordion__item}>
//       <div className={cl.accordion__header} onClick={toggleAccordion}>
//         <span className={cl.accordion__title}>{title}</span>
//         <span className={cl.accordion__arrow}></span>
//       </div>
//       <div className={cl.accordion__content}>
//         {content}
//       </div>
//     </div>
//   );
// };

// export default Dropdown;


import React, { useState } from 'react';
import cl from './Dropdown.module.css';

const Dropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selected);

  return (
    <div className={isOpen ? `${cl.accordion__item} ${cl.open}` : cl.accordion__item}>
      <div className={cl.accordion__header} onClick={toggleAccordion}>
        <span className={cl.accordion__title}>{selectedOption ? selectedOption.label : selected}</span>
        <span className={cl.accordion__arrow}></span>
      </div>
      <div className={cl.accordion__content}>
        <ul className={cl.dropdown__list}>
          {options.map((option) => (
            <li 
              key={option.value} 
              onClick={() => handleOptionClick(option.value)}
              className={cl.dropdown__item}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
