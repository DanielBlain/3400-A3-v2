// import React from 'react'
import PropTypes from 'prop-types'

const Button = ({buttonData, onClickHandler}) => {

    function animateButtonDepress(target) {
        target.classList.remove("pressed");
    }

    function animateButtonPress(target) {
        target.classList.add("pressed");
        setTimeout(animateButtonDepress, 10, target);
    }

    function handleClick(e) {
        e.preventDefault();
        onClickHandler(e);
        animateButtonPress(e.target);
    }

    return (
        <button
            className={'calc-button'}
            id={buttonData.type + '-' + buttonData.className}
            value={buttonData.value}
            onClick={handleClick}
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