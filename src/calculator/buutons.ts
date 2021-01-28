export type ButtonType = {
    value: string
    color: 'gray' | 'lightgray' | 'orange'
    id: string
    type: 'operator' | 'digit' | 'memory' | 'dot' | 'clear'
}

export const buttons: ButtonType[] = [
    {value: 'AC', color: 'lightgray', id: '1', type: 'clear'},
    {value: '+/-', color: 'lightgray', id: '2', type: 'operator'},
    {value: '%', color: 'lightgray', id: '3', type: 'operator'},
    {value: '/', color: 'orange', id: '4', type: 'operator'},
    {value: 'mc', color: 'gray', id: '5', type: 'memory'},
    {value: 'mr', color: 'gray', id: '6', type: 'memory'},
    {value: 'm-', color: 'gray', id: '7', type: 'memory'},
    {value: 'm+', color: 'orange', id: '8', type: 'memory'},
    {value: '7', color: 'gray', id: '9', type: 'digit'},
    {value: '8', color: 'gray', id: '10', type: 'digit'},
    {value: '9', color: 'gray', id: '11', type: 'digit'},
    {value: '*', color: 'orange', id: '12', type: 'operator'},
    {value: '4', color: 'gray', id: '13', type: 'digit'},
    {value: '5', color: 'gray', id: '14', type: 'digit'},
    {value: '6', color: 'gray', id: '15', type: 'digit'},
    {value: '-', color: 'orange', id: '16', type: 'operator'},
    {value: '1', color: 'gray', id: '17', type: 'digit'},
    {value: '2', color: 'gray', id: '18', type: 'digit'},
    {value: '3', color: 'gray', id: '19', type: 'digit'},
    {value: '+', color: 'orange', id: '20', type: 'operator'},
    {value: '0', color: 'gray', id: '21', type: 'digit'},
    {value: ',', color: 'gray', id: '22', type: 'dot'},
    {value: '=', color: 'orange', id: '23', type: 'operator'}
]