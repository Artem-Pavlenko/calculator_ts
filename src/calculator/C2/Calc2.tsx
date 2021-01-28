import React, {useReducer} from 'react'
import {calcReducer, initState} from '../calcReducer'
import s from './C2.module.scss'
import {buttons} from '../buutons'
import Button from '../Button/Button'


const Calc2 = () => {

    const [{display}, dispatch] = useReducer(calcReducer, initState)

    return (
        <div className={s.wrapper}>
            <div className={s.screen}>
                <span>{display}</span>
            </div>
            <div className={s.btnBlock}>
                {buttons.map((b) => <Button key={b.id} {...b} dispatch={dispatch}/>)}
            </div>
        </div>
    )
}

export default Calc2