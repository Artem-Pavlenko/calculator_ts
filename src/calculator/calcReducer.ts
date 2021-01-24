import {round} from "./utils/helpers"


export type Operator = '+' | '-' | '*' | '/' | '=' | null
export type Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
export type ActionsType = ReturnType<typeof onDigitClick>
    | ReturnType<typeof doOperation>
    | ReturnType<typeof onDot>
    | ReturnType<typeof clearDisplay>
    | ReturnType<typeof setWaitDigit>
    | ReturnType<typeof equals>


export type CalcType = {
    display: string
    leftDigit: string
    operator: null | Operator
    sortDigit: boolean
}

export const initState: CalcType = {
    display: '0',
    leftDigit: '',
    operator: null,
    sortDigit: true
}


export const calcReducer = (state: CalcType = initState, action: ActionsType): CalcType => {

    const {sortDigit, display, leftDigit, operator} = state

    switch (action.type) {
        case "SET_NUMBER":
            const num = display === '0' ? action.num : display + action.num
            if (sortDigit) {
                return {...state, display: num}
            } else if (!sortDigit) {
                const num = display === '0.' ? display + action.num : action.num
                return {...state, leftDigit: display, sortDigit: true, display: num}
            } else {
                return state
            }
        case "SET_DOT":
            if (display.indexOf('.') === -1) {
                return {...state, display: display + '.'}
            } else {
                return state
            }
        case "CLEAR":
            return {...state, display: '0', leftDigit: '', sortDigit: true, operator: null}
        case "SET_WAIT_DIGIT":
            return {...state, sortDigit: false}
        case "DO_OPERATION":
            // если нету оператора то сетаем его
            if (!operator) {
                return {...state, operator: action.operator, leftDigit: display}
                // в случае если уже был задан оператор и хотим выполнить следующее вычисление
            } else if (operator) {
                // проходимся на свичу и сетаем следущий оператор
                if (display === '0' || display === '0.') {
                    return {...state, display: '0', leftDigit: '', sortDigit: true, operator: null}
                }
                switch (operator) {
                    case "+":
                        const plusNum = round((+leftDigit) + (+display)).toString()
                        return {
                            ...state, leftDigit: plusNum, operator: action.operator,
                            sortDigit: false, display: plusNum
                        }
                    case "-":
                        const minusNum = round((+leftDigit) - (+display)).toString()
                        return {
                            ...state, leftDigit: minusNum, operator: action.operator,
                            sortDigit: false, display: minusNum
                        }
                    case "*":
                        const multipliedNum = round((+leftDigit) * (+display)).toString()
                        return {
                            ...state, leftDigit: multipliedNum, operator: action.operator,
                            sortDigit: false, display: multipliedNum
                        }
                    case "/":

                        const splitNum = round((+leftDigit) / (+display)).toString()

                        return {
                            ...state, leftDigit: splitNum, operator: action.operator,
                            sortDigit: false, display: splitNum
                        }
                }
            }
            return state
        case "EQUALS":
            if (operator) {
                switch (operator) {
                    case "+":
                        const plusNum = round((+leftDigit) + (+display)).toString()
                        return {
                            ...state, leftDigit: plusNum, operator: null,
                            sortDigit: false, display: plusNum
                        }
                    case "-":
                        const minusNum = round((+leftDigit) - (+display)).toString()
                        return {
                            ...state, leftDigit: minusNum, operator: null,
                            sortDigit: false, display: minusNum
                        }
                    case "*":
                        const multipliedNum = round((+leftDigit) * (+display)).toString()
                        return {
                            ...state, leftDigit: multipliedNum, operator: null,
                            sortDigit: false, display: multipliedNum
                        }
                    case "/":
                        const splitNum = round((+leftDigit) / (+display)).toString()
                        return {
                            ...state, leftDigit: splitNum, operator: null,
                            sortDigit: false, display: splitNum
                        }
                }
            }
            return state

        default:
            return state
    }
}

export const onDigitClick = (num: Digit) => ({type: 'SET_NUMBER', num} as const)
export const onDot = () => ({type: 'SET_DOT'} as const)
export const clearDisplay = () => ({type: 'CLEAR'} as const)
export const doOperation = (operator: Operator) => ({type: 'DO_OPERATION', operator} as const)
export const setWaitDigit = () => ({type: 'SET_WAIT_DIGIT'} as const)
export const equals = () => ({type: 'EQUALS'} as const)