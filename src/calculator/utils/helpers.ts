import {CalcType, Operator} from '../calcReducer'

export function round(value: number, decimals: number = 7) {
    const result = Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
    if (!result) {
        return 'Ошибка'
    }
    return result
}


export const doMath = (state: CalcType, newOperator: null | Operator): CalcType => {

    const {display, leftDigit, operator} = state

    switch (operator) {
        case "+":
            const plusNum = round((+leftDigit) + (+display)).toString()
            if (leftDigit) {
                return {
                    ...state, leftDigit: plusNum, operator: newOperator,
                    trigger: false, display: plusNum
                }
            } else {
                return {...state, operator: newOperator}
            }
        case "-":
            const minusNum = round((+leftDigit) - (+display)).toString()
            if (leftDigit) {
                return {
                    ...state, leftDigit: minusNum, operator: newOperator,
                    trigger: false, display: minusNum
                }
            } else {
                return {...state, operator: newOperator}
            }
        case "*":
            const multipliedNum = round((+leftDigit) * (+display)).toString()
            if (leftDigit) {
                return {
                    ...state, leftDigit: multipliedNum, operator: newOperator,
                    trigger: false, display: multipliedNum
                }
            } else {
                return {...state, operator: newOperator}
            }
        case "/":
            const splitNum = round((+leftDigit) / (+display)).toString()
            // делить на 0 нельзя =)
            if (display === '0' || display === "0.") return {
                ...state,
                leftDigit: '',
                display: 'Ошибка',
                operator: null,
                trigger: true
            }
            if (leftDigit) {
                return {
                    ...state, leftDigit: splitNum, operator: newOperator,
                    trigger: false, display: splitNum
                }
            } else {
                return {...state, operator: newOperator}
            }
        default:
            return state
    }
}