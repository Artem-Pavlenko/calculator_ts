
export function round(value: number, decimals: number = 5) {
    return Number(Math.round(Number(value + 'e' + decimals))+'e-'+decimals);
}


// метод под любое количество знаков после запятой (двойным побитовым отрицанием):
export function truncated2(num: number, decimalPlaces: number) {
    let numPowerConverter = Math.pow(10, decimalPlaces);
    return ~~(num * numPowerConverter)/numPowerConverter;
}