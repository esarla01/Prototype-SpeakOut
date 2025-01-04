"use client"
import React, { useState } from 'react';

interface Props {
  options: string[];
}

export default function Dropdown({ options }: Props) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setShowDropDown(false);
  };

  const handleOptionHover = (option: string) => {
    setHoveredOption(option);
  };

  const labelStyles = {
    color: '#1E2A78',
    fontFamily: 'DM Serif Text',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  };

  const dropdownOptionsStyles = {
    borderRadius: '10px',
    border: '1px solid #000',
    background: '#FFF',
    width: '150px',
    padding: '5px',
  };

  const highlightedOptionStyles = {
    backgroundColor: '#EBEEFF',
    borderRadius: '5px'
  };

  return (
    <>
      <div className="flex flex-row items-end">
        <label style={labelStyles}>{selectedOption}</label>
        <div className = "p-2" onClick={toggleDropDown}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="15" viewBox="0 0 26 15" fill="" >
            <path d="M13 15L0.00961876 0L25.9904 0L13 15Z" fill="#1E2A78" />
          </svg>
        </div>
      </div>
      {showDropDown && (
        <div style={dropdownOptionsStyles}>
          {options.map((option) => (
            <div
              className = "p-1"
              key={option}
              onClick={() => selectOption(option)}
              onMouseEnter={() => handleOptionHover(option)}
              onMouseLeave={() => setHoveredOption(null)}
              style={hoveredOption === option ? highlightedOptionStyles : {}}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </>
  );
}