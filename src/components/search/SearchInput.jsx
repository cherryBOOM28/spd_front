import { useState } from 'react';
import cl from './SearchInput.module.css';
import searchIcon from '../../assets/icons/search.svg';

const SearchInput = () => {
    const [ searchText, setSearchText ] = useState('');
    const [ showClearBtn, setShowClearBtn ] = useState(false);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchText(inputValue);
        setShowClearBtn(inputValue !== '');
    };

    const handleClearClick = () => {
        setSearchText('');
        setShowClearBtn(false)
    }

    return(
        <div className={cl.searchWrapper}>
            <img src={searchIcon} alt="searchIcon" className={cl.searchIcon} />
            <input 
                type="text" 
                className={cl.search__input}
                placeholder='Поиск'
                value={searchText}
                onChange={handleInputChange}
            />
            {showClearBtn && (
                <button className={cl.clearBtn} onClick={handleClearClick}>
                    &#x2715;
                </button>
            )}
        </div>
    )
}

export default SearchInput;