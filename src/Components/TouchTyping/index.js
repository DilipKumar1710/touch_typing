import { Component } from "react";
import './style.css';

let timerId;
let inputTextLength;
let quoteLength;
let typingWords = [
"asdfghjkl; asdfghjkl; asdfghjkl; a;sldkfjgh a;sldkfjgh a;sldkfjgh ghfjdksla;",
"ghfjdksla; ghfjdksla; asa asa ada ada afa afa aga aga aha aha aja aja aka;",
"a;a ;l; ;l; ;k; ;k; ;j; ;j; ;h; ;h; ;g; ;g; ;f; ;f; ;d; ;d; ;s; ;s; ;a; ;a;",
"sas sas sds sds sfs sfs sgs sgs shs shs sjs sjs sks sks sls sls s;s s;s l;l l;l lkl lkl ljl",
"ljl lhl lhl lgl lgl lfl lfl ldl ldl lsl lsl lal lal dad dad dsd dsd dfd dfd dgd",
"dgd dhd dhd dkd dkd dld dld d;d d;d k;k k;k klk klk kjk kjk khk khk kgk kgk kfk kfk kdk",
"kdk ksk ksk kak kak faf faf fsf fsf fdf fdf fgf fgf fhf fhf fjf fjf fkf fkf flf flf",
"f;f f;f j;j j;j jlj jkj jkj jhj jhj jgj jgj jfj jfj jdj jdj jsj jsj jaj jaj gag gag",
"gsg gsg gdg gdg gfg gfg ghg ghg gkg gkg glg glg g;g g;g h;h h;h hlh hlh hkh hkh hjh",
"hjh hgh hgh hfh hfh hdh hdh hsh hsh hah hah a l s j d h g ; f k l f s ; j g k h a d;"];

class TouchTyping extends Component{

    state = {
        counter: 300,
        accuracy:0,
        characterTyped:0,
        initialQuoteIndex: typingWords[0],
        inputText: '',
        wpm:0,
    }

    timeLeft = () => {
        this.setState((prevState) => ({counter: prevState.counter - 1}));
    }

    startTimerCount = () => {
        timerId = setInterval(this.timeLeft,1000);
    }

    OnEnterInputText = (event) =>{
        this.setState({
            inputText:event.target.value
        });

    }

    getMinutes = (counter) => {
        let minutes = Math.floor(counter / 60);
        return minutes;
    } 

    getSeconds = (counter) => {
        let seconds = counter % 60;
        return seconds;
    }

    errorHandling = (words) => {
        // console.log(words);
        const{initialQuoteIndex} = this.state;
        let actualQuote = initialQuoteIndex.trim().split(' '); 
        // console.log(actualQuote);

        let correctWord = [];

        for (let i = 0; i < words.length; i++){
            if (words[i] === actualQuote[i]){
                correctWord.push(words[i]);
            }
        }
        return correctWord.length;

    }
 
    onClickFinishGame = () => {
        clearInterval(timerId);
        const {initialQuoteIndex,inputText} = this.state;
        // console.log(inputText);
        let actualWords = inputText.trim().split(' ');
        // console.log(actualWords);
        // console.log(totalTimeTaken);
        let correctWords = this.errorHandling(actualWords)
        // console.log(accurate_words);
        let accurateWords = Math.round((correctWords / initialQuoteIndex.trim().split(' ').length) * 100);

        this.setState({wpm:correctWords, accuracy: accurateWords, characterTyped:inputText.length});
        // console.log(accurateWords);

        this.setState({inputText:''});

    }

    onClickResetButton = () => {
        clearInterval(timerId);
        let randomIndex = Math.floor(Math.random() * typingWords.length)
        this.setState({initialQuoteIndex:typingWords[randomIndex],counter:300,timeElapsed:0,errors:0, totalErrors:0,characterTyped:0, inputText:'',wpm:0, accuracy:0});
    }

    render(){
        const {counter,initialQuoteIndex,inputText,wpm,accuracy,characterTyped} = this.state; 
        let minutes = this.getMinutes(counter);
        let seconds = this.getSeconds(counter);

        inputTextLength = inputText.length;
        quoteLength = initialQuoteIndex.length;

        if (inputTextLength > quoteLength){
            const randomIndex = Math.floor(Math.random()*typingWords.length);
            this.setState({initialQuoteIndex:typingWords[randomIndex]});
        }

        if (seconds < 10 ){
            seconds = '0' + seconds; 
        }

        if (counter === 0){
            clearInterval(timerId);
        }

        return(
            <div className="main-container">
            <h1 className="main-heading">Touch Typing</h1>
                <div className="container">
                    <div className="each-container">
                        <p className="para-heading">CPM</p>
                        <p className="para-count">{characterTyped}</p>
                    </div>      
                    <div className="each-container">
                        <p className="para-heading">WPM</p>
                        <p className="para-count">{wpm}</p>
                    </div>
                    <div className="each-container">
                        <p className="para-heading">ACCURACY</p>
                        <p className="para-count">{accuracy}%</p>
                    </div>
                    <div className="each-container">
                        <p className="para-heading">TIMER</p>
                        <p className="para-count">{`0${minutes} : ${seconds}`}</p>
                    </div>
                </div>
                <div className="content-area">
                    <p id="quote">{initialQuoteIndex}</p>
                </div>
                <textarea 
                cols="30" 
                rows="5" 
                placeholder="Click Start Typing Button and Please Type Here.." 
                className="input-text" 
                onChange={this.OnEnterInputText} 
                value={inputText}></textarea>
                <div className="buttons-container">
                    <button onClick={this.startTimerCount} className="start-btn">Start Typing</button>
                    <button className="finish-btn" onClick={this.onClickFinishGame}>Finish</button>
                    <button className="rese-btn" onClick={this.onClickResetButton}>Reset</button>
                </div>
            </div>
        )
    }
}


export default TouchTyping;