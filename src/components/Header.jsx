//import React from 'react'
import PropTypes from 'prop-types'

import LogoSrc from '/DanLogo-x1024.png'
import '../styles/Header.css'

const Header = ({title = "DanCalc"}, {logoSrc = LogoSrc}) => {
    return (
        <header>
            <img src={logoSrc} alt="logo" />
            <div className="title-wrapper">
                <h1>{title}</h1>
            </div>
            <div>
                {/* Placeholder for spacing */}
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string,
    logoSrc: PropTypes.string
};

export default Header