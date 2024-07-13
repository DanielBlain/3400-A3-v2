//import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Display.css'

function Display({ displayTotal: displayTotal }) {
    return (
        <div className='display'>{displayTotal}</div>
    )
}

Display.propTypes = {
    displayTotal: PropTypes.string
};

export default Display