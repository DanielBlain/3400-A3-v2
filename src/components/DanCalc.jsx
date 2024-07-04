// import React from 'react'
import { useState } from 'react'

import Keyboard from './Keyboard'
import '../styles/DanCalc.css'

const DanCalc = () => {
    const [displayTotal, setDisplayTotal] = useState(0);
    const [runningTotal, setRunningTotal] = useState(0);
    const [activeOp, setActiveOp] = useState(null);
    const [newNumberFlag, setNewNumberFlag] = useState(true);

    let brain = {
        displayTotal: displayTotal,
        setDisplayTotal: setDisplayTotal,
        runningTotal: runningTotal,
        setRunningTotal: setRunningTotal,
        activeOp: activeOp,
        setActiveOp: setActiveOp,
        newNumberFlag: newNumberFlag,
        setNewNumberFlag: setNewNumberFlag
    }
    
    return (
        <section className='dancalc'>
            <h1>DanCalc</h1>
            <div className='display-window'>{displayTotal}</div>
            <Keyboard calculatorBrain={brain} />
        </section>
    )
}

export default DanCalc