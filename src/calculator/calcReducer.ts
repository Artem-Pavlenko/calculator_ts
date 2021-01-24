export type Operator = '+' | '-' | '*' | '/' | '=' | null
export type Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
export type ActionsType = ReturnType<typeof onDigitClick>
    | ReturnType<typeof doOperation>
    | ReturnType<typeof onDot>
    | ReturnType<typeof clearDisplay>
    | ReturnType<typeof setWaitDigit>
    | ReturnType<typeof equals>

type Sort = 'leftOperand' | 'rightOperand' | 'result'

export type CalcType = {
    display: string,
    leftDigit: string,
    rightDigit: string,
    operator: null | Operator,
    sortDigit: boolean
}

export const initState: CalcType = {
    display: '0',
    leftDigit: '',
    rightDigit: '',
    operator: null,
    sortDigit: true
}


export const calcReducer = (state: CalcType = initState, action: ActionsType): CalcType => {

    const {sortDigit, display, leftDigit, operator} = state

    switch (action.type) {
        case "SET_NUMBER":
            // при вводе первого операнда
            if (sortDigit) {
                return {...state, display: display === '0' ? action.num : display + action.num}
                // при вводе второго операнда
            } else if (!sortDigit) {
                return {...state, leftDigit: display, sortDigit: true, display: action.num}
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
            if (!operator) {
                return {...state, operator: action.operator, leftDigit: display}
            } else if (operator) {
                switch (operator) {
                    case "+":
                        return {
                            ...state, leftDigit: ((+leftDigit) + (+display)).toString(), operator: null,
                            sortDigit: true, display: ((+leftDigit) + (+display)).toString()
                        }
                }
            }
            return state
        case "EQUALS":
            if (operator) {
                switch (operator) {
                    case "+":
                        return {
                            ...state, leftDigit: '', operator: null,
                            sortDigit: true, display: ((+leftDigit) + (+display)).toString()
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