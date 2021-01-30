import {
    calcReducer,
    CalcType,
    clearDisplay,
    equals, memoryClean,
    memoryRead, minusFromMemory,
    onDigitClick,
    onDot, percent,
    plusToMemory,
    setWaitDigit
} from './calcReducer'


test('correct display of the first input value', () => {
    const state: CalcType = {
        display: '0',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '0'
    }

    const endState = calcReducer(state, onDigitClick('2'))

    expect(endState.display).toBe('2')
    expect(endState.leftDigit).toBe('')
    expect(endState.operator).toBe(null)
    expect(endState.memory).toBe('0')
    expect(endState.trigger).toBe(true)
})

test('correct display of the second input value', () => {
    const state: CalcType = {
        display: '5',
        leftDigit: '',
        operator: null,
        trigger: false,
        memory: '0'
    }

    const endState = calcReducer(state, onDigitClick('2'))

    expect(endState.display).toBe('2')
    expect(endState.leftDigit).toBe('5')
    expect(endState.operator).toBe(null)
    expect(endState.memory).toBe('0')
    expect(endState.trigger).toBe(true)
})

test('calculator should be cleared correctly', () => {
    const state: CalcType = {
        display: '5',
        leftDigit: '5',
        operator: "+",
        trigger: false,
        memory: '15'
    }

    const endState = calcReducer(state, clearDisplay())

    expect(endState.display).toBe('0')
    expect(endState.leftDigit).toBe('')
    expect(endState.operator).toBe(null)
    expect(endState.memory).toBe('15')
    expect(endState.trigger).toBe(true)
})

test('dot should be added correct', () => {
    const state: CalcType = {
        display: '0',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '0'
    }

    const endState = calcReducer(state, onDot())

    expect(endState.display).toBe('0.')
    expect(endState.leftDigit).toBe('')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(true)
    expect(endState.memory).toBe('0')

})

test('dot should be added correct(dot has already)', () => {
    const state: CalcType = {
        display: '5.',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '0'
    }

    const endState = calcReducer(state, onDot())

    expect(endState.display).toBe('5.')
    expect(endState.leftDigit).toBe('')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(true)
    expect(endState.memory).toBe('0')
})

test('correct change trigger (to add the second operand)', () => {
    const state: CalcType = {
        display: '5',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, setWaitDigit())

    expect(endState.display).toBe('5')
    expect(endState.leftDigit).toBe('')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(false)
    expect(endState.memory).toBe('5')
})

test('correct result (+)', () => {
    const state: CalcType = {
        display: '0.1',
        leftDigit: '0.2',
        operator: "+",
        trigger: true,
        memory: '5'
    }
    const state2: CalcType = {
        display: '-5',
        leftDigit: '-5',
        operator: "+",
        trigger: true,
        memory: '5'
    }
    const state3: CalcType = {
        display: '-5',
        leftDigit: '5',
        operator: "+",
        trigger: true,
        memory: '5'
    }
    const state4: CalcType = {
        display: '5',
        leftDigit: '',
        operator: "+",
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, equals())
    const endState2 = calcReducer(state2, equals())
    const endState3 = calcReducer(state3, equals())
    const endState4 = calcReducer(state4, equals())

    expect(endState.display).toBe('0.3')
    expect(endState.leftDigit).toBe('0.3')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(false)
    expect(endState.memory).toBe('5')

    expect(endState2.display).toBe('-10')
    expect(endState2.leftDigit).toBe('-10')
    expect(endState2.operator).toBe(null)
    expect(endState2.trigger).toBe(false)
    expect(endState2.memory).toBe('5')

    expect(endState3.display).toBe('0')
    expect(endState3.leftDigit).toBe('0')
    expect(endState3.operator).toBe(null)
    expect(endState3.trigger).toBe(false)
    expect(endState3.memory).toBe('5')

    expect(endState4.display).toBe('5')
    expect(endState4.leftDigit).toBe('')
    expect(endState4.operator).toBe(null)
    expect(endState4.trigger).toBe(true)
    expect(endState4.memory).toBe('5')
})

test('correct result (-)', () => {
    const state: CalcType = {
        display: '5.5',
        leftDigit: '5.23',
        operator: "-",
        trigger: true,
        memory: '5'
    }
    const state2: CalcType = {
        display: '-5.003',
        leftDigit: '-5',
        operator: "-",
        trigger: true,
        memory: '5'
    }
    const state3: CalcType = {
        display: '-5.5',
        leftDigit: '5.5',
        operator: "-",
        trigger: true,
        memory: '5'
    }
    const state4: CalcType = {
        display: '5',
        leftDigit: '',
        operator: "-",
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, equals())
    const endState2 = calcReducer(state2, equals())
    const endState3 = calcReducer(state3, equals())
    const endState4 = calcReducer(state4, equals())

    expect(endState.display).toBe('-0.27')
    expect(endState.leftDigit).toBe('-0.27')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(false)
    expect(endState.memory).toBe('5')

    expect(endState2.display).toBe('0.003')
    expect(endState2.leftDigit).toBe('0.003')
    expect(endState2.operator).toBe(null)
    expect(endState2.trigger).toBe(false)
    expect(endState2.memory).toBe('5')

    expect(endState3.display).toBe('11')
    expect(endState3.leftDigit).toBe('11')
    expect(endState3.operator).toBe(null)
    expect(endState3.trigger).toBe(false)
    expect(endState3.memory).toBe('5')

    expect(endState4.display).toBe('5')
    expect(endState4.leftDigit).toBe('')
    expect(endState4.operator).toBe(null)
    expect(endState4.trigger).toBe(true)
    expect(endState4.memory).toBe('5')
})

test('correct result (*)', () => {
    const state: CalcType = {
        display: '4.3',
        leftDigit: '5.5',
        operator: "*",
        trigger: true,
        memory: '5'
    }
    const state2: CalcType = {
        display: '-5',
        leftDigit: '-5',
        operator: "*",
        trigger: true,
        memory: '5'
    }
    const state3: CalcType = {
        display: '5',
        leftDigit: '',
        operator: "*",
        trigger: true,
        memory: '5'
    }
    const state4: CalcType = {
        display: '5',
        leftDigit: '-5',
        operator: "*",
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, equals())
    const endState2 = calcReducer(state2, equals())
    const endState3 = calcReducer(state3, equals())
    const endState4 = calcReducer(state4, equals())

    expect(endState.display).toBe('23.65')
    expect(endState.leftDigit).toBe('23.65')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(false)
    expect(endState.memory).toBe('5')

    expect(endState2.display).toBe('25')
    expect(endState2.leftDigit).toBe('25')
    expect(endState2.operator).toBe(null)
    expect(endState2.trigger).toBe(false)
    expect(endState2.memory).toBe('5')

    expect(endState3.display).toBe('0')
    expect(endState3.leftDigit).toBe('')
    expect(endState3.operator).toBe(null)
    expect(endState3.trigger).toBe(true)
    expect(endState3.memory).toBe('5')

    expect(endState4.display).toBe('-25')
    expect(endState4.leftDigit).toBe('-25')
    expect(endState4.operator).toBe(null)
    expect(endState4.trigger).toBe(false)
    expect(endState4.memory).toBe('5')
})

test('correct result (/)', () => {
    const state: CalcType = {
        display: '15',
        leftDigit: '5',
        operator: "/",
        trigger: true,
        memory: '5'
    }
    const state2: CalcType = {
        display: '5',
        leftDigit: '-5.25',
        operator: "/",
        trigger: true,
        memory: '5'
    }
    const state3: CalcType = {
        display: '5',
        leftDigit: '0',
        operator: "/",
        trigger: true,
        memory: '5'
    }
    const state4: CalcType = {
        display: '0',
        leftDigit: '5',
        operator: "/",
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, equals())
    const endState2 = calcReducer(state2, equals())
    const endState3 = calcReducer(state3, equals())
    const endState4 = calcReducer(state4, equals())

    expect(endState.display).toBe('0.33333333')
    expect(endState.leftDigit).toBe('0.33333333')
    expect(endState.operator).toBe(null)
    expect(endState.trigger).toBe(false)
    expect(endState.memory).toBe('5')

    expect(endState2.display).toBe('-1.05')
    expect(endState2.leftDigit).toBe('-1.05')
    expect(endState2.operator).toBe(null)
    expect(endState2.trigger).toBe(false)
    expect(endState2.memory).toBe('5')

    expect(endState3.display).toBe('0')
    expect(endState3.leftDigit).toBe('0')
    expect(endState3.operator).toBe(null)
    expect(endState3.trigger).toBe(false)
    expect(endState3.memory).toBe('5')

    expect(endState4.display).toBe('Ошибка')
    expect(endState4.leftDigit).toBe('')
    expect(endState4.operator).toBe(null)
    expect(endState4.trigger).toBe(true)
    expect(endState4.memory).toBe('5')
})

test('should be correct reading from the memory' , () => {
    const state: CalcType = {
        display: '0',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, memoryRead())

    expect(endState.display).toBe('5')
})

test('should be correct giving to memory' , () => {
    const state: CalcType = {
        display: '7',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, plusToMemory())

    expect(endState.memory).toBe('12')
    expect(endState.display).toBe('7')
})

test('should be correct subtract from memory' , () => {
    const state: CalcType = {
        display: '7',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, minusFromMemory())

    expect(endState.memory).toBe('-2')
    expect(endState.display).toBe('7')
})

test('should be correct clear memory' , () => {
    const state: CalcType = {
        display: '7',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, memoryClean())

    expect(endState.memory).toBe('0')
    expect(endState.display).toBe('7')
})

test('should be correct percent' , () => {
    // процент с одного операнда
    const state: CalcType = {
        display: '5',
        leftDigit: '',
        operator: null,
        trigger: true,
        memory: '5'
    }
    // также будет с одного числа если не задан оператор
    const state2: CalcType = {
        display: '10',
        leftDigit: '200',
        operator: null,
        trigger: true,
        memory: '5'
    }
    // если задан и оператор
    const state3: CalcType = {
        display: '10',
        leftDigit: '200',
        operator: '-',
        trigger: true,
        memory: '5'
    }
    // если задан оператор, но не задан второй операнд
    const state4: CalcType = {
        display: '10',
        leftDigit: '',
        operator: '-',
        trigger: true,
        memory: '5'
    }

    const endState = calcReducer(state, percent())
    const endState2 = calcReducer(state2, percent())
    const endState3 = calcReducer(state3, percent())
    const endState4 = calcReducer(state4, percent())

    expect(endState.display).toBe('0.05')
    expect(endState.trigger).toBe(false)

    expect(endState2.display).toBe('0.1')
    expect(endState2.trigger).toBe(false)

    expect(endState3.display).toBe('20')
    expect(endState3.trigger).toBe(false)

    expect(endState4.display).toBe('0.1')
    expect(endState4.trigger).toBe(false)
})