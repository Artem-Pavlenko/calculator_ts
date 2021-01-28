import React, {Dispatch} from 'react'
import cn from 'classnames'
import {
    ActionsType,
    clearDisplay,
    Digit,
    doOperation, equals,
    onDigitClick,
    onDot,
    Operator, plusMinus,
    setWaitDigit
} from '../calcReducer'
import './Button.scss'
import {ButtonType} from '../buutons'

type ButtonProps = ButtonType & { dispatch: Dispatch<ActionsType> , active?: string | null }

const Button = ({value, color, type, dispatch, active}: ButtonProps) => {

    const onClick = () => {
        switch (type) {
            case "digit":
                dispatch(onDigitClick(value as Digit))
                break
            case "dot":
                dispatch(onDot())
                break
            case "memory":
                // empty
                break
            case "operator":
                dispatch(setWaitDigit())
                dispatch(doOperation(value as Operator))
                break
            case "equals":
                dispatch(equals())
                break
            case "clear":
                dispatch(clearDisplay())
                break
            case "+/-":
                dispatch(plusMinus())
                break
            case "%":

                break
        }
    }

    return (
        <div className={'wrapper'}>
            <button className={cn(color, {['zero']: value === '0'}, {['active']: value === active})} onClick={onClick}>{value}</button>
        </div>
    )
}

export default Button