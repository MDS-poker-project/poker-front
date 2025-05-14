import React from 'react';
import cardImage from '../assets/card-deck1.png';
import moneyImage from '../assets/poker-chip.png';

function Header() {

    return (
        <div className="flex justify-center lg:justify-end h-40 lg:me-60 mb-5 z-20">
            <img src={ cardImage } alt="Logo du site" className="h-50 z-20"/>
        </div>
    );
}
export default Header;