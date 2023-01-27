import React, { useState } from 'react';
import { Button } from './Button';

const HeaderBurgerMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleClick = () => {
        setShowMenu(!showMenu);
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log(event);
    };
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={`burger-menu ${showMenu ? 'burger-menu_active' : ''}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <span className='burger-menu burger-menu_outer'>
                <i className='mdi mdi-menu'></i>
            </span>
            <div className='burger-menu__wrapper position-relative'></div>
            <nav className='burger-menu_nav'>
                <span className='burger-menu burger-menu_inner'>
                    <i className='mdi mdi-window-close'></i>
                </span>
                <a href='#section-1' className='burger-menu_link'>
                    Credit card
                </a>
                <a href='#section-2' className='burger-menu_link'>
                    Product
                </a>
                <a href='#section-3' className='burger-menu_link'>
                    Account
                </a>
                <a href='#section-4' className='burger-menu_link'>
                    Resources
                </a>
            </nav>
            <Button title='Online Bank' additional_class='btn__inner' />
            <div className='burger-menu_overlay'></div>
        </div>
    );
};
export { HeaderBurgerMenu };
