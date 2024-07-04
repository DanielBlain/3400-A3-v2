// import React from 'react'
import PropTypes from 'prop-types'

const Button = ({buttonData, onClickHandler}) => {

    return (
        <button
            className={'calc-button'}
            id={buttonData.type + '-' + buttonData.className}
            value={buttonData.value}
            onClick={onClickHandler}
        >
            {buttonData.text}
        </button>
    )
}

Button.propTypes = {
    buttonData: PropTypes.object,
    onClickHandler: PropTypes.func
};

export default Button