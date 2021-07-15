import React, { useState } from 'react'
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function LuckyNum () {
    
    const [num] = useState(Math.floor(Math.random()*20) + 1);
    const [value, setVal] = useState();
    const [msg,setMsg] = useState("");
    const [clr,setColor] = useState("");
    const [count,setCount] = useState(0);
    const [totalGuess,setTotalGuess] = useState(0);
    const [leftGuess,setLeftGuess] = useState(0);
    // const [clickedForMax,setClickForMax] = useState(false);
    // const [max,setMax] = useState(0);
    const [clickedForGame,setClickForGame] = useState(false);
    const [showTotalGuessInput,setShowTotalGuessInput] = useState(true);
    const [showGuessBtn , setGuessBtn] = useState(true);
    function getVal (e) {
        setVal(e.target.value)
    }
    function check(){
        if(value == null || value == 0){
            setMsg("Enter a number greater than 0 !!");
            setColor("hotpink");
        }
        else{
            if(leftGuess > 0 && value !== num){
                setLeftGuess(prevVal => {
                    return prevVal - 1;
                })
            }
            
            if(leftGuess === 0){
                setCount(prevVal => {
                    return prevVal + 1;
                });
            }
            if(leftGuess >= 2){
                if(value > num ){
                    setMsg("You guessed Greater !");
                    setColor("red");
                    document.getElementById("guessedNum").focus();
                }
                else if(value < num){
                    setMsg("You guessed Lower !");
                    setColor("yellow");
                    document.getElementById("guessedNum").focus();
                }
                else{
                    setMsg("Hurrah, you won !!");
                    setColor("rgb(111, 180, 31)");
                    setGuessBtn(false);
                } 
            }
            else if(value !== num && count === 0 ){
                setMsg("Oops, you lost !! The correct number was "+num);
                setColor("black");
                setGuessBtn(false);
            }
            else if(value === num && count === 0){
                setMsg("Hurrah, you won !!");
                setColor("rgb(111, 180, 31)");
                setGuessBtn(false);
            }
            else{
                setMsg("No guesses left !!");
                setColor("black");
                setGuessBtn(false);
            }
        }
    }
    function chngTotalGuess(e){
        setTotalGuess(e.target.value);
        setLeftGuess(e.target.value);
    }
    // function chngMax(e){
    //     setMax(e.target.value);
    // }
    return (
        <div className = "LuckyNum">
            {showTotalGuessInput ? <div className = "label">
                <h2>Total Guesses you'd like to make for guessing between 1 and 20 (inclusive):</h2>
                <input id = "totalGuess" type = "number" value = {totalGuess} onChange = {chngTotalGuess}></input>
                <button onClick = {() =>{
                    if(!totalGuess){
                        alert("Enter total number of guesses !");
                        document.getElementById("totalGuess").focus();
                    }
                    else{
                        // setClickForMax(true);
                        setClickForGame(true);
                        setShowTotalGuessInput(false);
                    }
                }}><ArrowForwardIcon style = {{fontWeight: "bold"}}/></button>
            </div> : 
            null
            }
            

            {/* {clickedForMax && totalGuess ? 
            <div className = "label">
                <h2>Maximum number to be guessed :</h2>
                <input id = "max" type = "number" value = {max} onChange = {chngMax}></input>
                <button onClick = {() =>{
                    if(!max){
                        alert("Enter a Maximum number to be Guessed !");
                        document.getElementById("max").focus();
                    }
                    else{
                        setClickForGame(true);
                    }
                }}>Go</button>
            </div> : 
            null */
            }
            
            {clickedForGame && totalGuess ?
            <div>
                <div className = "heading">
                    <h2>Guess any number between 1 and 20</h2>
                </div>
                <input id = "guessedNum" className = "guessed" type = "number" onChange = {getVal} placeholder = "Type a number..."/>
                {showGuessBtn ? 
                <button onClick = {check} className = "guess">Guess</button> :
                null    
                }
                
                <div className = "msg">
                    <h1 style = {{color: clr}}>{msg}</h1>
                </div>
                <div className = "label">
                    <h2>Guesses left : <button style = {{backgroundColor: "brown",cursor: "auto"}}>{leftGuess}</button></h2>
                </div> 
                <button onClick={() => {window.location.reload()}} className = "restart"><ReplayIcon /></button>
            </div>:
                null
            }
            {/* <div className = "heading">
                <h2>Guess any number between 1 and 10</h2>
            </div>
            <input className = "guessed" type = "number" onChange = {getVal} />
            <button onClick = {check}>Guess</button>
            <div className = "msg">
                <h1 style = {{color: clr}}>{msg}</h1>
            </div>
            <div className = "chances">
                <h3>No. of Guesses = {count}</h3>
            </div> */}
        </div>
    )   
}

export default LuckyNum
