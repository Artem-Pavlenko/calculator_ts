import React, {Dispatch} from 'react'
import cn from 'classnames'
import {
    ActionsType, clearDisplay, Digit, doOperation, equals, memoryClean, memoryRead, minusFromMemory,
    onDigitClick, onDot, Operator, percent, plusMinus, plusToMemory, setWaitDigit
} from '../calcReducer'
import './Button.scss'
import {ButtonType} from '../buutons'

type ButtonProps = ButtonType & { dispatch: Dispatch<ActionsType>, active?: string | null }

const Button = ({value, color, type, dispatch, active}: ButtonProps) => {

    const onClick = () => {
        switch (type) {
            case "digit":
                dispatch(onDigitClick(value as Digit))
                break
            case "dot":
                dispatch(onDot())
                break
            case "mr":
                dispatch(memoryRead())
                break
            case "mc":
                dispatch(memoryClean())
                break
            case "m+":
                dispatch(plusToMemory())
                break
            case "m-":
                dispatch(minusFromMemory())
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
                dispatch(percent())
                break
        }
    }

    return (
        <div className={'wrapper'}>
            <button className={cn(color, {['zero']: value === '0'}, {['active']: value === active})}
                    onClick={onClick}>{value}</button>
        </div>
    )
}

export default Button