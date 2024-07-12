// import React from 'react'
import PropTypes from 'prop-types'

import {calculatorButtons} from '../globals/calculator-button-data'
import Button from './Button'
import '../styles/Keyboard.css'

function Keyboard({ calculatorBrain: brain }) {
    function handleMemory(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const memopType = e.target.value;
        const intStashMemory = parseFloat(brain.stashMemory);
        let opResult = parseFloat(brain.displayTotal);
        switch (memopType.trim().toUpperCase()) {
            case 'MEMORY SAVE':
                brain.setStashMemory(brain.displayTotal);
                brain.setDisplayTotal('0');
                brain.setIsNextNumber(true);
                break;
            case 'MEMORY CLEAR':
                brain.setStashMemory('0');
                break;
            case 'MEMORY RECALL':
                brain.setDisplayTotal(brain.stashMemory);
                brain.setIsNextNumber(false);
                break;
            case 'MEMORY ADDITION':
                opResult += intStashMemory;
                brain.setStashMemory('' + opResult);
                brain.setDisplayTotal('0');
                brain.setIsNextNumber(true);
                break;
            case 'MEMORY SUBTRACT':
                opResult -= intStashMemory;
                brain.setStashMemory('' + opResult);
                brain.setDisplayTotal('0');
                brain.setIsNextNumber(true);
                break;
            //default: // Unknown memory operation -- no error handling for now
        }
    }

    function handleClear(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const clearType = e.target.value;
        switch (clearType.trim().toUpperCase()) {
            case 'ALL CLEAR':
                brain.setStashMemory('0');
                brain.setDisplayTotal('0');
                brain.setRunningTotal('0');
                brain.setActiveOp(null);
                brain.setIsNextNumber(true);
                break;
            default: // case 'CLEAR':
                brain.setDisplayTotal('0');
                brain.setRunningTotal('0');
                brain.setActiveOp(null);
                brain.setIsNextNumber(true);
        }
    }

    function performOp(op) {
        let fltDisplayTotal = parseFloat(brain.displayTotal);
        let opResult = parseFloat(brain.runningTotal);
        switch (op) {
            case 'ADD':         opResult += fltDisplayTotal; break;
            case 'SUBTRACT':    opResult -= fltDisplayTotal; break;
            case 'MULTIPLY':    opResult *= fltDisplayTotal; break;
            case 'DIVIDE':      opResult /= fltDisplayTotal; break;
            case 'PERCENT':     opResult = fltDisplayTotal / 100.0; break;
            case 'SQUARE ROOT': opResult = Math.sqrt(fltDisplayTotal); break;
            //default: // Unknown operation -- no error handling for now
        }
        return '' + opResult;
    }

    function handleOperator(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const opDepressed = (e.target.value).trim().toUpperCase();
        let newTotal;
        switch (opDepressed) {
            case 'PERCENT':
                newTotal = performOp(opDepressed);
                brain.setDisplayTotal(newTotal);
                break;
            case 'SQUARE ROOT':
                newTotal = performOp(opDepressed);
                brain.setDisplayTotal(newTotal);
                break;
            default:
                if (brain.activeOp == null) {
                    brain.setRunningTotal(brain.displayTotal);
                }
                else {
                    newTotal = performOp(brain.activeOp);
                    brain.setRunningTotal(newTotal);
                    brain.setDisplayTotal(newTotal);
                }
                brain.setActiveOp(opDepressed);
        }
        brain.setIsNextNumber(true);
    }

    function handleEnter(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        //parameter e is not used; included to parallel other handler funcs
        if (brain.activeOp != null) {
            let newTotal = performOp(brain.activeOp);
            brain.setDisplayTotal(newTotal);
            brain.setRunningTotal('0');
            brain.setActiveOp(null);
            brain.setIsNextNumber(true);
        }
    }

    function handleNumber(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        const digitDepressed = e.target.value;
        let newDisplayTotal = '';

        // Append the depressed digit iff not a new number and is already showing a number
        if (!brain.isNextNumber && brain.displayTotal != '0') {
            newDisplayTotal +=  brain.displayTotal;
        }

        newDisplayTotal +=  digitDepressed;
        brain.setDisplayTotal(newDisplayTotal);
        brain.setIsNextNumber(false);
    }

    function handleDecimal(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        //parameter e is not used; included to parallel other handler funcs
        if (brain.isNextNumber || brain.displayTotal == '0') {
            brain.setDisplayTotal('0.');
        }
        else {
            if (!brain.displayTotal.includes('.')) {
                brain.setDisplayTotal(brain.displayTotal + '.');
            }
            else {
                brain.setDisplayTotal(brain.displayTotal + '0');
            }
        }
        brain.setIsNextNumber(false);
    }

    function handleSign(e) {
        //e.preventDefault(); -- skipped, called by <Button /> event handler
        //parameter e is not used; included to parallel other handler funcs
        if (brain.displayTotal == '0') return;
        const firstCharOfDisplay = brain.displayTotal[0];
        if (firstCharOfDisplay == '-') {
            brain.setDisplayTotal(brain.displayTotal.substring(1));
        }
        else {
            brain.setDisplayTotal('-' + brain.displayTotal);
        }
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
                    case 'DECIMAL':     handleClickFn = handleDecimal; break;
                    case 'SIGN':        handleClickFn = handleSign; break;
                    // default: // Otherwise, digit [0, 9] handler already assigned
                }

                return (
                    <Button key={calculatorButton.className} buttonData={calculatorButton} onClickHandler={handleClickFn} />
                )
            })}
        </section>
    )
}

Keyboard.propTypes = {
    calculatorBrain: PropTypes.object
};

export default Keyboard