// import React from 'react'
import PropTypes from 'prop-types'

import {calculatorButtons} from '../globals/calculator-button-data'
import Button from './Button'
import '../styles/Keyboard.css'

function Keyboard({ calculatorBrain }) {
    function animateButtonDepress(target) {
        target.classList.remove("pressed");
    }

    function animateButtonPress(target) {
        target.classList.add("pressed");
        setTimeout(animateButtonDepress, 10, target);
    }

    function performOp(op) {
        let intRunningTotal = parseInt(calculatorBrain.runningTotal);
        let intDisplayTotal = parseInt(calculatorBrain.displayTotal);
        let opResult = 0;
        switch (op.trim().toUpperCase()) {
            case 'ADD':         opResult = intRunningTotal + intDisplayTotal; break;
            case 'SUBTRACT':    opResult = intRunningTotal - intDisplayTotal; break;
            case 'MULTIPLY':    opResult = intRunningTotal * intDisplayTotal; break;
            case 'DIVIDE':      opResult = intRunningTotal / intDisplayTotal; break;
            //default: // Unknown operation -- no error handling for now
        }
        return opResult;
    }

    function handleClickClear(e) {
        e.preventDefault();
        animateButtonPress(e.target);

        const clearType = e.target.value;
        switch (clearType) {
            // case 'All Clear':
            //     /* No break, intentional */
            default:
                calculatorBrain.setDisplayTotal(0);
                calculatorBrain.setNewNumberFlag(true);
        }
    }

    function handleClickOperator(e) {
        e.preventDefault();
        animateButtonPress(e.target);

        const opDepressed = e.target.value;
        let newTotal = 0;
        if (calculatorBrain.activeOp != null) {
            newTotal = performOp(calculatorBrain.activeOp);
            calculatorBrain.setRunningTotal('' + newTotal);
            calculatorBrain.setDisplayTotal('' + newTotal);
        }
        else {
            calculatorBrain.setRunningTotal(calculatorBrain.displayTotal);
        }
        calculatorBrain.setActiveOp(opDepressed);
        calculatorBrain.setNewNumberFlag(true);
    }

    function handleClickEnter(e) {
        e.preventDefault();
        animateButtonPress(e.target);

        let newTotal = 0;
        if (calculatorBrain.activeOp != null) {
            newTotal = performOp(calculatorBrain.activeOp);
            calculatorBrain.setDisplayTotal('' + newTotal);
            calculatorBrain.setRunningTotal(0);
            calculatorBrain.setActiveOp(null);
            calculatorBrain.setNewNumberFlag(true);
        }
    }

    function handleClickNumber(e) {
        e.preventDefault();
        animateButtonPress(e.target);

        const digitDepressed = parseInt(e.target.value);
        let newDisplayTotal = '';
        if (calculatorBrain.displayTotal == 0 || calculatorBrain.newNumberFlag) {
            newDisplayTotal +=  digitDepressed;
        }
        else {
            newDisplayTotal +=  calculatorBrain.displayTotal + digitDepressed;
        }
        calculatorBrain.setDisplayTotal(newDisplayTotal);
        calculatorBrain.setNewNumberFlag(false);
    }

    return (
        <section className="calc-keyboard">
            {calculatorButtons.map((calculatorButton) => {
                let handleClickFn = handleClickNumber; // By default, assume a Number was pressed
                
                switch (calculatorButton.type) {
                    case 'clear': handleClickFn = handleClickClear; break;
                    case 'operator': handleClickFn = handleClickOperator; break;
                    case 'enter': handleClickFn=handleClickEnter; break;
                    // default: // Otherwise, digit [0, 9] already assigned
                }

                return (
                    <Button buttonData={calculatorButton} onClickHandler={handleClickFn} />
                )
            })}
        </section>
    )
}

Keyboard.propTypes = {
    calculatorBrain: PropTypes.object
};

export default Keyboard