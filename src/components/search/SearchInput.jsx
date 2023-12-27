import { useState } from 'react';
import cl from './SearchInput.module.css';
import searchIcon from '../../assets/icons/search.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [foundPersons, setFoundPersons] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ showClearBtn, setShowClearBtn ] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const inputValue = event.target.value;
        setSearchText(inputValue);
        setShowClearBtn(inputValue !== '');

        console.log("inputValue", inputValue)
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search_persons/?q=`, {
                params: {
                    q: inputValue,
                },
            });
    
            // Handle the data returned from the server
            const data = response.data;
            setFoundPersons(data.persons);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
        // You can choose to setShowResults(false) when inputValue is empty or handle it differently based on your requirements
        if (inputValue === '') {
            setShowResults(false);
        } else {
            setShowResults(true);
        }
    };

    const handleClearClick = () => {
        setFoundPersons([]);
        setSearchText('');
        setShowClearBtn(false);
        setShowResults(false);
    }

    const handlePersonClick = (personId) => {
        // console.log(`Navigating to person with ID ${personId}`);
        navigate(`/${personId}`);
    };

    return(
        <div className={cl.searchWrapper}>
            <div>
                <img src={searchIcon} alt="searchIcon" className={cl.searchIcon} />
                <input 
                    type="text" 
                    className={cl.search__input}
                    placeholder='Поиск'
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyPress={handleInputChange}
                />
                {showClearBtn && (
                    <button className={cl.clearBtn} onClick={handleClearClick}>
                        &#x2715;
                    </button>
                )}
            </div>
            {showResults && (
                <div className={cl.search_wrapper}>
                   {foundPersons.length > 0 ? (
                        foundPersons.map(person => (
                            <div key={person.id} className={cl.search_list}>
                                <div
                                    className={`${cl.search_row} ${cl.hoverEffect}`}
                                    onClick={() => handlePersonClick(person.id)}
                                >
                                    <div className={cl.search_data}>
                                        <img
                                            src={`data:image/jpeg;base64,${person.photo}`}
                                            alt="Person"
                                            className={cl.profilePic}
                                        />
                                        <label style={{ fontSize: '16px' }}>
                                            {`${person.firstName} ${person.surname} ${person.patronymic}`}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={cl.noResultsMessage}>Не найдено</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchInput;