import {doMath, round} from './utils/helpers'


export type Operator = '+' | '-' | '*' | '/' | '=' | null
export type Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
export type ActionsType = ReturnType<typeof onDigitClick>
    | ReturnType<typeof doOperation>
    | ReturnType<typeof onDot>
    | ReturnType<typeof clearDisplay>
    | ReturnType<typeof setWaitDigit>
    | ReturnType<typeof equals>
    | ReturnType<typeof plusMinus>
    | ReturnType<typeof percent>
    | ReturnType<typeof memoryClean>
    | ReturnType<typeof memoryRead>
    | ReturnType<typeof plusToMemory>
    | ReturnType<typeof minusFromMemory>


export type CalcType = {
    display: string
    leftDigit: string
    operator: null | Operator
    trigger: boolean
    memory: string
}

export const initState: CalcType = {
    display: '0',
    leftDigit: '',
    operator: null,
    trigger: true,
    memory: '0'
}


export const calcReducer = (state: CalcType = initState, action: ActionsType): CalcType => {

    const {trigger, display, leftDigit, operator, memory} = state

    switch (action.type) {
        case "SET_NUMBER":
            // (+num).toString() убрать ноль спереду в случае если есть "-"
            if (trigger) {
                let num = (display === '0' || display === 'Ошибка') ? action.num : display + action.num
                return {...state, display: (+num).toString()}
            } else if (!trigger) {
                let num = display === '0.' ? display + action.num : action.num
                return {...state, leftDigit: display, trigger: true, display: (+num).toString()}
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
            return {...state, display: '0', leftDigit: '', trigger: true, operator: null}
        case "SET_WAIT_DIGIT":
            return {...state, trigger: false}
        case "PLUS_MINUS":
            const index = display.indexOf('-')
            if (index === -1) {
                if ((operator && !trigger) || display === 'Ошибка') {
                    return {...state, leftDigit: display, display: '-0', trigger: true}
                }
                return {...state, display: '-' + display}
            } else if (index === 0) {
                if (operator && !trigger) {
                    return {...state, leftDigit: display, display: '-0', trigger: true}
                }
                return {...state, display: display.substr(1)}
            }
            return {...state, display: '-' + display}

        // еслибы не нужно было отображать "-0"
        // return {...state, display: (+display * -1).toString()}
        case "PERCENT":
            if (leftDigit && operator) {
                const percent = round((+display / 100) * +leftDigit).toString()
                return {...state, display: percent, trigger: false}
            }
            return {...state, display: (+display / 100).toString(), trigger: false}
        case "PLUS_TO_MEMORY":
            if (display === 'Ошибка' || display === '0') {
                return state
            }
            return {...state, memory: ((+memory) + (+display)).toString()}
        case "MINUS_FROM_MEMORY":
            return {...state, memory: ((+memory) - (+display)).toString()}
        case "MEMORY_CLEAN":
            return {...state, memory: '0'}
        case "MEMORY_READ":
            return {...state, display: memory}
        case "OPERATION":
            if (!operator) {
                // если после точки не было введено значение (цыфру)
                if (display === '0.') {
                    return {...state, operator: action.operator, display: '0'}
                }
                return {...state, operator: action.operator}
            } else if (operator) {
                if (!leftDigit && (display === '0' || display === '0.')) {
                    return {...state, display: '0', leftDigit: '', trigger: true, operator: null}
                }
                return doMath(state, action.operator)
            }
            return state
        case "EQUALS":
            if (operator) {
                return doMath(state, null)
            }
            return state
        default:
            return state
    }
}

export const onDigitClick = (num: Digit) => ({type: 'SET_NUMBER', num} as const)
export const onDot = () => ({type: 'SET_DOT'} as const)
export const clearDisplay = () => ({type: 'CLEAR'} as const)
export const doOperation = (operator: Operator) => ({type: 'OPERATION', operator} as const)
export const setWaitDigit = () => ({type: 'SET_WAIT_DIGIT'} as const)

export const equals = () => ({type: 'EQUALS'} as const)
export const plusMinus = () => ({type: 'PLUS_MINUS'} as const)
export const percent = () => ({type: 'PERCENT'} as const)

export const memoryRead = () => ({type: 'MEMORY_READ'} as const)
export const memoryClean = () => ({type: 'MEMORY_CLEAN'} as const)
export const plusToMemory = () => ({type: 'PLUS_TO_MEMORY'} as const)
export const minusFromMemory = () => ({type: 'MINUS_FROM_MEMORY'} as const)
