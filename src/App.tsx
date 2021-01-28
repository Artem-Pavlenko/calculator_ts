import React, {useState} from 'react'
import './App.css'
import Calculator from "./calculator/Calculator";
import Calc2 from "./calculator/C2/Calc2";

const App = () => {

    const [trigger, setTrigger] = useState(false)

    return (
        <div className="App">
            <span onClick={() => setTrigger(prev => !prev)}>current : {trigger ? 'V1' : 'V2'}</span>
            {trigger ? <Calculator/> : <Calc2/>}
        </div>
    )
}

export default App
