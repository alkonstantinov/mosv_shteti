import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <svg>
                    <use href="#head-logo"></use>
                </svg>
            </div>
            <div className="logo-title">
                <h2>РЕПУБЛИКА БЪЛГАРИЯ</h2>
                <h3>МИНИСТЕРСТВО НА ОКОЛНАТА СРЕДА И ВОДИТЕ</h3>
            </div>
            <div className="logo-title">
                <h4>Информационна система за 
                    събиране и обработване на информация за 
                    случаи на непосредствена заплаха за 
                    екологични щети или на причинени 
                    екологични щети</h4>
            </div>
        </header>
    );
};

export default Header;