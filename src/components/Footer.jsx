//import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Footer.css'
import { getYear } from '../utils/getDate.js'

const Footer = ({ author:author = "Daniel Blain", copyright:copyright = getYear() }) => {
    return (
        <footer>{copyright} &copy; {author}</footer>
    )
}

Footer.propTypes = {
    author: PropTypes.string,
    copyright: PropTypes.number
};

export default Footer