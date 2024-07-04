// import React from 'react'
import PropTypes from 'prop-types'

import {calculatorButtons} from '../globals/calculator-button-data'
import Button from './Button'
import '../styles/Keyboard.css'

function Keyboard({ calculatorBrain: brain }) {
    function handleMemory(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const memopType = e.target.value;
        const intStashMemory = parseInt(brain.stashMemory);
        const intDisplayTotal = parseInt(brain.displayTotal);
        let opResult = intStashMemory;
        switch (memopType.trim().toUpperCase()) {
            case 'MEMORY SAVE':
                brain.setStashMemory(brain.displayTotal);
                brain.setDisplayTotal(0);
                brain.setNewNumberFlag(true);
                break;
            case 'MEMORY CLEAR':
                brain.setStashMemory(0);
                break;
            case 'MEMORY RECALL':
                brain.setDisplayTotal(brain.stashMemory);
                brain.setNewNumberFlag(false);
                break;
            case 'MEMORY ADDITION':
                opResult += intDisplayTotal;
                brain.setDisplayTotal(opResult);
                brain.setNewNumberFlag(false);
                break;
            case 'MEMORY SUBTRACT':
                opResult -= intDisplayTotal;
                brain.setDisplayTotal(opResult);
                brain.setNewNumberFlag(false);
                break;
            //default: // Unknown memory operation -- no error handling for now
        }
    }

    function handleClear(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const clearType = e.target.value;
        switch (clearType.trim().toUpperCase()) {
            case 'ALL CLEAR':
                brain.setStashMemory(0);
                // No break, intentional
            default: // case 'CLEAR':
                brain.setDisplayTotal(0);
                brain.setNewNumberFlag(true);
        }
    }

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
                let buttonType = calculatorButton.type;
                let handleClickFn = handleNumber; // By default, assume a Number was pressed
                
                switch (buttonType.trim().toUpperCase()) {
                    case 'MEMORY':      handleClickFn = handleMemory; break;
                    case 'CLEAR':       handleClickFn = handleClear; break;
                    case 'OPERATOR':    handleClickFn = handleOperator; break;
                    case 'ENTER':       handleClickFn = handleEnter; break;
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