//import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Footer.css'
import { getYear } from '../utils/getDate.js'

const Footer = ({ author:author = "Daniel Blain", copyright:copyright = getYear() }) => {
    return (
        <footer>
            <div className='footer-left'>
                https://freestocktextures.com/texture/drop-rain-water,662.html
            </div>
            <div className='footer-right'>
                {copyright} &copy; {author}
            </div>
        </footer>
    )
}

Footer.propTypes = {
    author: PropTypes.string,
    copyright: PropTypes.number
};

export default Footer