import React, { useEffect, useState, useRef } from "react";
import "../../styles/searchBar.styles.scss"

const SearchBar = ({ placeholder, data, getOption, dataListClassName, onChange, labelText, searchBarDefaultValue }) => {
    const [filterData, setFilterData] = useState([]);
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleChange = (e) => {
        const searchWord = e.target.value;
        setQuery(searchWord);

        if (!searchWord) {
            onChange("")
            return;
        }

        const newFilter = data.filter(dataValue => {
            return (getOption(dataValue)||"").toLowerCase().includes(searchWord.toLowerCase())
        });

        setFilterData(newFilter);
        setIsOpen(true);
    };

    const onClickFunction = (chosenDataValue) => {
        onChange(chosenDataValue);
        setQuery(chosenDataValue);
        setIsOpen(false);
        setFilterData([]);
    }

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (!wrapperRef.current?.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])

    useEffect(() => {
        setQuery(searchBarDefaultValue || "");
    }, [searchBarDefaultValue])

    return (
        <div className="search" ref={wrapperRef}>
            <div className="search-inputs">
                <label className="search-input-label" htmlFor={`search-bar-input-id-${dataListClassName}`}>{labelText}</label>
                <input
                    type="text"
                    id={`search-bar-input-id-${dataListClassName}`}
                    className="search-input-data"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    onFocus={() => {
                        setFilterData(data)
                        setIsOpen(true)
                    }}
                />
                <div className="searchIcon"></div>
            </div>
            {isOpen && filterData.length > 0 && (
                <div className={`data-list ${dataListClassName}`}>
                    {filterData.map(dataValue => (
                        <div
                            className="data-row"
                            key={dataValue.id}
                            value={getOption(dataValue)}
                            onClick={() => (
                                onClickFunction(getOption(dataValue))
                            )}
                        >
                            {getOption(dataValue)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default SearchBar;