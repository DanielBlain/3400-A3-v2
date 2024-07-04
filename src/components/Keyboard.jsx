// import React from 'react'
import PropTypes from 'prop-types'

import {calculatorButtons} from '../globals/calculator-button-data'
import Button from './Button'
import '../styles/Keyboard.css'

function Keyboard({ calculatorBrain: brain }) {
    function performOp(op) {
        let intRunningTotal = parseInt(brain.runningTotal);
        let intDisplayTotal = parseInt(brain.displayTotal);
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
                brain.setDisplayTotal(0);
                brain.setNewNumberFlag(true);
        }
    }

    function handleOperator(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const opDepressed = e.target.value;
        let newTotal = 0;
        if (brain.activeOp != null) {
            newTotal = performOp(brain.activeOp);
            brain.setRunningTotal('' + newTotal);
            brain.setDisplayTotal('' + newTotal);
        }
        else {
            brain.setRunningTotal(brain.displayTotal);
        }
        brain.setActiveOp(opDepressed);
        brain.setNewNumberFlag(true);
    }

    function handleEnter(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        //parameter e is not used; included to parallel other handler funcs 
        let newTotal = 0;
        if (brain.activeOp != null) {
            newTotal = performOp(brain.activeOp);
            brain.setDisplayTotal('' + newTotal);
            brain.setRunningTotal(0);
            brain.setActiveOp(null);
            brain.setNewNumberFlag(true);
        }
    }

    function handleNumber(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const digitDepressed = parseInt(e.target.value);
        let newDisplayTotal = '';
        if (brain.displayTotal == 0 || brain.newNumberFlag) {
            newDisplayTotal +=  digitDepressed;
        }
        else {
            newDisplayTotal +=  brain.displayTotal + digitDepressed;
        }
        brain.setDisplayTotal(newDisplayTotal);
        brain.setNewNumberFlag(false);
    }

    return (
        <section className="keyboard">
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