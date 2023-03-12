import { gameState } from "./enums";
import TetrisGame from "./tetrisGame";

class GUIManager{
    static game;//the game
    //the html elements
    static scoreText;
    static gamePausedText;
    static gameOverText;
    static gameSpeedInput;
    static optionsConfirmBtn;

    static init(game,scoreText,gamePausedText,gameOverText,gameSpeedInput,optionsConfirmBtn){
        GUIManager.game=game;
        //set elements
        GUIManager.scoreText=scoreText;
        GUIManager.gamePausedText=gamePausedText;
        GUIManager.gameOverText=gameOverText;
        GUIManager.gameSpeedInput=gameSpeedInput;
        GUIManager.optionsConfirmBtn=optionsConfirmBtn;
        //bind events
        GUIManager.optionsConfirmBtn.addEventListener('click',GUIManager.onOptionsConfirmBtn);
        //initial states
        GUIManager.gameSpeedInput.value=(TetrisGame.tickValue*1000).toString();
    }

    static updateState(){
        const currentGameState=GUIManager.game.gameState;
        //hide all
        GUIManager.scoreText.style.display="none";
        GUIManager.gamePausedText.style.display="none";
        GUIManager.gameOverText.style.display="none";
        //
        if(currentGameState==gameState.play){
            GUIManager.scoreText.style.display="block";
        }
        if(currentGameState==gameState.pause){
            GUIManager.gamePausedText.style.display="block";
        }
        if(currentGameState==gameState.gameOver){
            GUIManager.scoreText.style.display="block";
            GUIManager.gameOverText.style.display="block";
        }
    }

    static updateScore(){
        GUIManager.scoreText.innerText=GUIManager.game.score;
    }

    //events handlers
    //on option confirm btn
    static onOptionsConfirmBtn(){
        //game speed in ms
        let gameSpeedVal=parseInt(GUIManager.gameSpeedInput.value);
        if(!isNaN(gameSpeedVal)){
            GUIManager.game.setGameSpeed(gameSpeedVal/1000);//ms to s
        }
    }

}

export default GUIManager;
