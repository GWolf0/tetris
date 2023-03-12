import InputManager from "./inputManager";
import { gameState } from "../enums";
import GUIManager from "../guiManager";

class Game{
    can;cc;
    clearColor="#000";
    gameState=gameState.play;
    dt;lastTime;//delta time in seconds
    tick=null;//duration in seconds that the game will wait for to update(if null then no wait)
    tickCounter=0;//count duration for tick
    get cw(){return this.can.width};
    get ch(){return this.can.height};
    get isPaused(){return this.gameState===gameState.pause};
    get isGameOver(){return this.gameState===gameState.gameOver};

    constructor(can,cw,ch,tick=null){
        this.can=can;
        this.cc=can.getContext('2d');
        this.can.width=cw;
        this.can.height=ch;
        this.tick=tick;
        this.baseInit();
    }

    run(){//'game loop'
        requestAnimationFrame(()=>this.run());
        //update deltatime
        const curTime=new Date();
        this.dt=(curTime-this.lastTime)/1000;
        this.lastTime=curTime;
        //check paused state
        if(this.isPaused){//if game is paused then check for resume inputs
            this.baseUpdateBefore();
            if(InputManager.getKeyUp("escape")){
                this.resume();
            }
            this.baseUpdateAfter();
            return;
        }
        //if games uses a tick value then update on when tickcounter reach this value
        if(this.tick!=null){
            this.tickCounter+=this.dt;
            if(this.tickCounter>this.tick){
                this.baseUpdateBefore();
                this.runGame();
                this.baseUpdateAfter();
                this.tickCounter=0;
            }
        }else{//else update immediately
            this.baseUpdateBefore();
            this.runGame();
            this.baseUpdateAfter();
        }
    }

    //run game
    runGame(){
        this.update();
        this.render();
    }

    //base init
    baseInit(){
        InputManager.init();
        this.lastTime=new Date();
    }
    //base update before
    baseUpdateBefore(){
        //check inputs (pause/resume events)
        if(InputManager.getKeyUp("escape")){
            if(this.isPaused)this.resume();else this.pause();
        }
    }
    //base update after
    baseUpdateAfter(){
        //update input manager (it basically reset input values (need to be reset at the end of game update))
        InputManager.update();
    }

    //to override
    init(){}
    update(){}
    render(){}

    //methods
    clear(){
        this.cc.fillStyle=this.clearColor;
        this.cc.fillRect(0,0,this.cw,this.ch);
    }
    pause(){
        this.gameState=gameState.pause;
        GUIManager.updateState(this.gameState);//console.log("pause")
    }
    resume(){
        this.gameState=gameState.play;
        GUIManager.updateState(this.gameState);//console.log("resume")
    }
    setGameOver(){
        this.gameState=gameState.gameOver;
    }
    unsetGameOver(){
        this.gameState=gameState.play;
    }

}

export default Game;
