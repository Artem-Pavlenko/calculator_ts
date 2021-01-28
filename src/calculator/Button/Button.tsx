import React, {Dispatch} from 'react'
import cn from 'classnames'
import {
    ActionsType,
    clearDisplay,
    Digit,
    doOperation, equals,
    onDigitClick,
    onDot,
    Operator,
    setWaitDigit
} from '../calcReducer'
import './Button.scss'
import {ButtonType} from '../buutons'

type ButtonProps = ButtonType & { dispatch: Dispatch<ActionsType> }

const Button = ({value, color, type, dispatch}: ButtonProps) => {

    const onClick = () => {
        switch (type) {
            case "digit":
                dispatch(onDigitClick(value as Digit))
                break
            case "dot":
                dispatch(onDot())
                break
            case "memory":
                // alert('not ready')
                break
            case "operator":
                if (value === '=') {
                    dispatch(equals())
                } else {
                    dispatch(setWaitDigit())
                    dispatch(doOperation(value as Operator))
                }
                break
            case "clear":
                dispatch(clearDisplay())
                break
        }
    }

    return (
        <div className={'wrapper'}>
            <button className={cn(color, {['zero']: value === '0'})} onClick={onClick}>{value}</button>
        </div>
    )
}

export default Button