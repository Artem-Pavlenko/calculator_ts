export type Operator = '+' | '-' | '*' | '/' | '=' | null
export type Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
export type ActionsType = ReturnType<typeof onDigitClick>
    | ReturnType<typeof doOperation>
    | ReturnType<typeof onDot>
    | ReturnType<typeof clearDisplay>
    | ReturnType<typeof setWaitDigit>
    | ReturnType<typeof equals>


export type CalcType = {
    display: string,
    memory: string,
    operator: null | Operator,
    waitDigit: boolean
}

export const initState: CalcType = {
    display: '0',
    memory: '',
    operator: null,
    waitDigit: true
}


export const calcReducer = (state: CalcType = initState, action: ActionsType): CalcType => {

    const {waitDigit, display, memory, operator} = state

    switch (action.type) {
        case "SET_NUMBER":
            // при вводе первого операнда
            if (waitDigit) {
                return {...state, display: display === '0' ? action.num : display + action.num}
                // при вводе второго операнда
            } else if (!waitDigit) {
                return {...state, memory: display, waitDigit: true, display: action.num}
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
            return {...state, display: '0'}
        case "SET_WAIT_DIGIT":
            return {...state, waitDigit: false}
        case "DO_OPERATION":
            if (!operator) {
                return {...state, operator: action.operator}
            } else if (operator) {
                switch (operator) {
                    case "+":
                        return {
                            ...state, memory: '', operator: null,
                            waitDigit: true, display: ((+memory) + (+display)).toString()
                        }
                }
            }
            return state
        case "EQUALS":
            if (operator) {
                return {...state, }
            } else {
                return state
            }
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