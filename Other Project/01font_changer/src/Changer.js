import React from 'react'
import { useState, useEffect } from 'react'


function Changer(props) {
    const [text, setText] = useState("")
    const [changedText, setchangedText] = useState('')

    function enterText(event) {
        setText(event.target.value)
    }

    useEffect(() => {
        setchangedText(text)
    }, [text])

    function fontFamily() {
        let family = document.getElementById("fontFamily").value
        let changedText = document.getElementById("changedText")

        if (text.length === 0) {
            props.showAlert("Please Enter Text for font change", "danger")
            document.getElementById("fontFamily").value = '0'
        }
        else {
            switch (family) {
                case '0': changedText.style.fontFamily = "'Roboto', sans-serif";
                    props.showAlert("Converted to Default font", "success");
                    break;
                case '1': changedText.style.fontFamily = "Playfair Display";
                    props.showAlert("Converted to Playfair Display font", "success");
                    break;
                case '2': changedText.style.fontFamily = "'Jersey 25', sans-serif";
                    props.showAlert("Converted to Jersey 25 font", "success");
                    break;
                case '3': changedText.style.fontFamily = "'Jacquard 24', system-ui";
                    props.showAlert("Converted to Jacquard 24 font", "success");
                    break;
                case '4': changedText.style.fontFamily = "'Merriweather', serif";
                    props.showAlert("Converted to Merriweather font", "success");
                    break;
                case '5': changedText.style.fontFamily = "Dancing Script, cursive";
                    props.showAlert("Converted to Dancing Script font", "success");
                    break;
                default:
                    break;

            }
        }
    }

    function convertUpper() {
        if (text.length === 0) {
            props.showAlert("Please Enter Text for convert Uppercase", "danger")
        } else {
            setchangedText(changedText.toUpperCase())
            props.showAlert("Text Converted into Uppercase", "success")
        }
    }
    function convertLower() {
        if (text.length === 0) {
            props.showAlert("Please Enter Text for convert Lowercase", "danger")
        } else {
            setchangedText(changedText.toLowerCase())
            props.showAlert("Text Converted into Lowercase", "success")
        }
    }

    function clearText() {
        if (text.length === 0) {
            props.showAlert("Please Enter Text for clear text", "danger")
        } else {
            let confirm = window.confirm("Are you sure")
            if (confirm) {
                setText('')
                setchangedText('')
                props.showAlert("Cleared text", "success")
            }
            else {
                props.showAlert("Not cleared text", "warning")
            }
        }
    }

    return (
        <div>
            <div className={`row text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <center><h1 className=''>Online Font Changer</h1></center>
                <div className='col-6 textIn'>
                    <center><h1>Your Text</h1></center>
                    <textarea value={text} onChange={enterText} className="col-12" id="textArea" placeholder='Enter Your text here...'></textarea>
                </div>
                <div className='col-6 textOut'>
                    <center><select id='fontFamily' className="form-select border border-dark w-25" aria-label="Default select example" onChange={fontFamily}>
                        <option value="0">Select font family</option>
                        <option value="1" style={{ fontFamily: 'Playfair Display' }}>Playfair Display</option>
                        <option value="2" style={{ fontFamily: "'Jersey 25', sans-serif" }}>Jersey 25</option>
                        <option value="3" style={{ fontFamily: "'Jacquard 24', system-ui" }}>Jacquard 24</option>
                        <option value="4" style={{ fontFamily: "'Merriweather', serif" }}>Merriweather</option>
                        <option value="5" style={{ fontFamily: "Dancing Script, cursive" }}>Dancing Script</option>
                    </select></center>

                    <p className={`my-3 mx-1 text-dark`} style={{ backgroundColor: 'white' }} id='changedText'>
                        {
                            changedText
                        }
                    </p>

                    <button type="button" class="btn btn-outline-primary mx-2" onClick={convertUpper}>Convert To Uppercase</button>
                    <button type="button" class="btn btn-outline-primary mx-2" onClick={convertLower}>Convert To Lowercase</button>
                    <button type="button" class="btn btn-outline-primary mx-2" onClick={clearText}>Clear text</button>
                    <button type="button" class="btn btn-outline-primary mx-2">Copy text</button>

                </div>
                <center><h5 className='my-5'>{text ? `${text.split(' ').length} words, ${text.length} characters` : '0 words, 0 characters'}    </h5></center>
            </div>

        </div>
    )
}

export default Changer

