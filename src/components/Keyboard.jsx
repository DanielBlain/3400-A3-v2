// import React from 'react'
import PropTypes from 'prop-types'

import {calculatorButtons} from '../globals/calculator-button-data'
import Button from './Button'
import '../styles/Keyboard.css'

function Keyboard({ calculatorBrain: brain_ }) {
    function performOp(op) {
        let intRunningTotal = parseInt(brain_.runningTotal);
        let intDisplayTotal = parseInt(brain_.displayTotal);
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

    function handleClear(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const clearType = e.target.value;
        switch (clearType) {
            // case 'All Clear':
            //     /* No break, intentional */
            default:
                brain_.setDisplayTotal(0);
                brain_.setNewNumberFlag(true);
        }
    }

    function handleOperator(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const opDepressed = e.target.value;
        let newTotal = 0;
        if (brain_.activeOp != null) {
            newTotal = performOp(brain_.activeOp);
            brain_.setRunningTotal('' + newTotal);
            brain_.setDisplayTotal('' + newTotal);
        }
        else {
            brain_.setRunningTotal(brain_.displayTotal);
        }
        brain_.setActiveOp(opDepressed);
        brain_.setNewNumberFlag(true);
    }

    function handleEnter(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        let newTotal = 0;
        if (brain_.activeOp != null) {
            newTotal = performOp(brain_.activeOp);
            brain_.setDisplayTotal('' + newTotal);
            brain_.setRunningTotal(0);
            brain_.setActiveOp(null);
            brain_.setNewNumberFlag(true);
        }
    }

    function handleNumber(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const digitDepressed = parseInt(e.target.value);
        let newDisplayTotal = '';
        if (brain_.displayTotal == 0 || brain_.newNumberFlag) {
            newDisplayTotal +=  digitDepressed;
        }
        else {
            newDisplayTotal +=  brain_.displayTotal + digitDepressed;
        }
        brain_.setDisplayTotal(newDisplayTotal);
        brain_.setNewNumberFlag(false);
    }

    return (
        <section className="calc-keyboard">
            {calculatorButtons.map((calculatorButton) => {
                let handleClickFn = handleNumber; // By default, assume a Number was pressed
                
                switch (calculatorButton.type) {
                    case 'clear': handleClickFn = handleClear; break;
                    case 'operator': handleClickFn = handleOperator; break;
                    case 'enter': handleClickFn=handleEnter; break;
                    // default: // Otherwise, digit [0, 9] handler already assigned
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