import React, { useState, useEffect } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import bg1 from './img/bg1.jpg'
import bg2 from './img/bg2.jpg'
import bg3 from './img/bg3.jpg'
import bg4 from './img/bg4.jpg'
import bg5 from './img/bg5.jpg'
import bg6 from './img/bg6.jpg'
import bg7 from './img/bg7.jpg'
import bg8 from './img/bg8.jpg'
import bg9 from './img/bg9.png'
import bg10 from './img/bg10.jpg'
import { FaPlus } from "react-icons/fa6";
import Showtask from './Showtask';


function MyDay() {

    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[today.getDay()];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[today.getMonth()];

    const [themeShow, setThemeShow] = useState('none')
    function themeShowChange() {
        if (themeShow === 'none') {
            setThemeShow('block');
        } else {
    
            setThemeShow('none');
        }
    }

    const [theme, setTheme] = useState({ backgroundImage: `url(${bg1})` })
    function showTheme(style) {
        setTheme(style)
        setThemeShow('none')
    }


    const [inputTask, setInputTask] = useState('')
    const [allTask, setAllTask] = useState([])
    localStorage.setItem("alltasks", JSON.stringify(allTask))
    allTask.reverse()
    function submitTask(){
        const newtask = {
            text : inputTask
        }
        setAllTask([...allTask, newtask])
        setInputTask('')
    }

    function handleOnKeyDown(event){
        if(event.key === 'Enter'){
            submitTask()
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (themeShow === 'block') {
                const themePlate = document.querySelector('.themePlate');
                if (!themePlate.contains(event.target)) {
                    setThemeShow('none');
                }
            }
        }

        document.querySelector('.allTask').addEventListener('click', handleClickOutside);
        document.querySelector('.leftPanel').addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [themeShow]);

    return (
        <div id='main'>
            <div className='myDay' style={theme}>
                <div className='myDayHeader'>
                    <h3>My Day</h3>
                    <p>{dayName}, {monthName} {today.getDate()}</p>

                    <span className='themeOption' onClick={themeShowChange}><CiMenuKebab /></span>
                </div>

                <div className='allTask'>
                    <Showtask/>
                </div>

                <div className='inputTask'>
                    <span className='round' onClick={submitTask}>
                        <FaPlus />
                    </span>
                    <input type="text" placeholder='Enter Your Task' value={inputTask} onChange={(e)=>setInputTask(e.target.value)} onKeyDown={handleOnKeyDown} />
                </div>

            </div>


            <div className='themePlate' style={{ display: `${themeShow}` }} >
                <h5>Theme</h5>
                <div className='themeTable'>
                    <div className='tableRow'>
                        <div className='tableCol' style={{ backgroundColor: '#10439F' }} onClick={() => showTheme({ backgroundColor: '#10439F', })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#FF76CE' }} onClick={() => showTheme({ backgroundColor: '#FF76CE' })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#1A4D2E' }} onClick={() => showTheme({ backgroundColor: '#1A4D2E', })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#0C0C0C' }} onClick={() => showTheme({ backgroundColor: '#0C0C0C', })}></div>
                        <div className='tableCol' style={{ backgroundColor: 'red' }} onClick={() => showTheme({ backgroundColor: 'red', })}></div>
                    </div>
                    <div className='tableRow'>
                        <div className='tableCol' style={{ backgroundColor: '#E1F7F5' }} onClick={() => showTheme({ backgroundColor: '#E1F7F5', color: 'black' })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#FFCBCB' }} onClick={() => showTheme({ backgroundColor: '#FFCBCB', color: 'black' })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#8DECB4' }} onClick={() => showTheme({ backgroundColor: '#8DECB4', color: 'black' })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#31363F' }} onClick={() => showTheme({ backgroundColor: '#31363F', })}></div>
                        <div className='tableCol' style={{ backgroundColor: '#DD5746' }} onClick={() => showTheme({ backgroundColor: '#DD5746' })}></div>
                    </div>
                    <div className='tableRow'>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg1})` }} onClick={() => showTheme({ backgroundImage: `url(${bg1})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg2})` }} onClick={() => showTheme({ backgroundImage: `url(${bg2})`, color: 'black' })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg3})` }} onClick={() => showTheme({ backgroundImage: `url(${bg3})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg4})` }} onClick={() => showTheme({ backgroundImage: `url(${bg4})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg5})` }} onClick={() => showTheme({ backgroundImage: `url(${bg5})`, })}></div>
                    </div>
                    <div className='tableRow'>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg6})` }} onClick={() => showTheme({ backgroundImage: `url(${bg6})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg7})` }} onClick={() => showTheme({ backgroundImage: `url(${bg7})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg8})` }} onClick={() => showTheme({ backgroundImage: `url(${bg8})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg9})` }} onClick={() => showTheme({ backgroundImage: `url(${bg9})`, })}></div>
                        <div className='tableCol' style={{ backgroundImage: `url(${bg10})` }} onClick={() => showTheme({ backgroundImage: `url(${bg10})`, })}></div>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default MyDay
