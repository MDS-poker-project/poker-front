import React from 'react';
import cardImage from '../assets/card-deck1.png';

function Header() {

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center h-40 lg:me-60 lg:ms-20 z-20 mb-10 lg:mb-0">
            <span className='txtWarning text-white text-2xl lg:text-4xl order-2 lg:order-1 mt-2 lg:mt-0 mx-auto lg:mx-0 z-20'>Recevez 1 000 $ offerts à l'inscription !</span>
            <img src={cardImage} alt="Logo du site" className="h-40 lg:h-45 z-20 order-1 lg:order-2" />
        </div>
    );
}
export default Header;