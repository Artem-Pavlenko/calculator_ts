import React, {useReducer} from 'react'
import s from './Calculatore.module.scss'
import {
    calcReducer,
    clearDisplay,
    Digit,
    doOperation,
    equals,
    initState,
    onDigitClick,
    onDot,
    Operator,
    setWaitDigit
} from './calcReducer'

const Calculator = () => {

    const [state, dispatch] = useReducer(calcReducer, initState)

    const onDigitClickHandler = (num: Digit) => {
        dispatch(onDigitClick(num))
    }

    const onOperation = (operator: Operator) => {
        dispatch(setWaitDigit())
        dispatch(doOperation(operator))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.calcBlock}>

                <div className={s.screen}>
                    <span>{state.display}</span>
                </div>

                <div className={s.b}>
                    <button onClick={() => dispatch(clearDisplay())} className={s.gray}>
                        AC
                    </button>
                    <button className={s.gray}>
                        +/-
                    </button>
                    <button className={s.gray}>
                        %
                    </button>
                    <button onClick={() => onOperation('/')} className={s.orange}>
                        ÷
                    </button>
                </div>
                <div className={s.b}>
                    <button>
                        mc
                    </button>
                    <button>
                        mr
                    </button>
                    <button>
                        m-
                    </button>
                    <button className={s.orange}>
                        m+
                    </button>
                </div>
                <div className={s.b}>
                    <button onClick={() => onDigitClickHandler('7')}>
                        7
                    </button>
                    <button onClick={() => onDigitClickHandler('8')}>
                        8
                    </button>
                    <button onClick={() => onDigitClickHandler('9')}>
                        9
                    </button>
                    <button onClick={() => onOperation('*')} className={s.orange}>
                        x
                    </button>
                </div>
                <div className={s.b}>
                    <button onClick={() => onDigitClickHandler('4')}>
                        4
                    </button>
                    <button onClick={() => onDigitClickHandler('5')}>
                        5
                    </button>
                    <button onClick={() => onDigitClickHandler('6')}>
                        6
                    </button>
                    <button onClick={() => onOperation('-')} className={s.orange}>
                        -
                    </button>
                </div>
                <div className={s.b}>
                    <button onClick={() => onDigitClickHandler('1')}>
                        1
                    </button>
                    <button onClick={() => onDigitClickHandler('2')}>
                        2
                    </button>
                    <button onClick={() => onDigitClickHandler('3')}>
                        3
                    </button>
                    <button onClick={() => onOperation('+')} className={s.orange}>
                        +
                    </button>
                </div>
                <div className={s.b6}>
                    <button onClick={() => onDigitClickHandler('0')} className={s.zero}>
                        0
                    </button>
                    <button onClick={() => dispatch(onDot())}>
                        ,
                    </button>
                    <button onClick={() => dispatch(equals())} className={s.orange}>
                        =
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Calculator