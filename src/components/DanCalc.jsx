// import React from 'react'
import { useState } from 'react'

import Header from './Header'
import Display from './Display'
import Keyboard from './Keyboard'
import Footer from './Footer'
import '../styles/DanCalc.css'

const DanCalc = () => {
    const [displayTotal, setDisplayTotal] = useState('0')
    const [runningTotal, setRunningTotal] = useState('0')
    const [activeOp, setActiveOp] = useState(null)
    const [isNextNumber, setIsNextNumber] = useState(true)
    const [stashMemory, setStashMemory] = useState('0')

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
        setStashMemory: setStashMemory
    }
    
    return (
        <section className='dancalc'>
            <Header title='DanCalc v2.0'/>
            <Display displayTotal={calculatorBrain.displayTotal} />
            <Keyboard calculatorBrain={calculatorBrain} />
            <Footer author='Dan J. Blain' copyright='2024' />
        </section>
    )
}

export default DanCalc