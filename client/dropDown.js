import React from 'react';

const DropDown = () => {
    console.log('hi');
    return (
        <div>
            <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
                <a href="#" className="w3-bar-item w3-button">Link 1</a>
            </div>
            </div>           
        </div>
    )
}

export default DropDown;