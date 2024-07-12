// import React from 'react'
import { useState } from 'react'

import Keyboard from './Keyboard'
import '../styles/DanCalc.css'

const DanCalc = () => {
    const [displayTotal, setDisplayTotal] = useState('0');
    const [runningTotal, setRunningTotal] = useState('0');
    const [activeOp, setActiveOp] = useState(null);
    const [isNextNumber, setIsNextNumber] = useState(true);
    const [stashMemory, setStashMemory] = useState('0');
    // May require updating as the result of a calculation (e.g. <ENTER>)
    const [isNegative, setIsNegative] = useState(false);

    let calculatorBrain = {
        displayTotal: displayTotal,
        setDisplayTotal: setDisplayTotal,
        runningTotal: runningTotal,
        setRunningTotal: setRunningTotal,
        activeOp: activeOp,
        setActiveOp: setActiveOp,
        isNextNumber: isNextNumber,
        setIsNextNumber: setIsNextNumber,
        stashMemory: stashMemory,
        setStashMemory: setStashMemory,
        isNegative: isNegative,
        setIsNegative: setIsNegative,
    }
    
    return (
        <section className='dancalc'>
            <h1>DanCalc</h1>
            <div className='display'>{displayTotal}</div>
            <Keyboard calculatorBrain={calculatorBrain} />
        </section>
    )
}

export default DanCalc