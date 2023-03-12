import Block from "./block";
import GUIManager from "./guiManager";
import Game from "./objects/game";
import InputManager from "./objects/inputManager";
import TetrisGrid from "./tetrisGrid";

class TetrisGame extends Game{
    static tickValue=0.3;
    grid;//game grid: contains data(blocks parts ids, here refered to as blockot)
    blocks=[];//blocks array
    activeBlock;//active block
    idsToBreak=[];breakAtRows=[];//array of block ids that have rows that need to break (because of full row)
    score=0;

    constructor(cols,rows,cellSize){
        super(document.getElementById("can"),cellSize*cols,cellSize*rows,TetrisGame.tickValue);
        this.grid=new TetrisGrid(cols,rows,cellSize);
        this.init();
    }

    init(){
        //init gui manager
        GUIManager.init(
            this,
            document.getElementById("gameScoreText"),
            document.getElementById("gamePausedText"),
            document.getElementById("gameGameOverText"),
            document.getElementById("gameSpeedInput"),
            document.getElementById("optionsConfirmBtn"),
        );
        GUIManager.updateState();
        GUIManager.updateScore();
        //add initial block
        this.addNewBlock();
    }

    update(){
        if(this.isGameOver){
            this.checkInputs();
            return;
        }
        this.checkInputs();
        this.checkFilledRow();
        this.grid.update();
        this.blocks.forEach((b,i)=>{
            b.update(this);
        });
        this.idsToBreak.length=0;
        this.breakAtRows.length=0;
    }

    render(){
        this.clear();
        this.grid.render(this);
        this.renderBlocks();
    }

    //check inputs
    checkInputs(){
        if(InputManager.getKeyUp("enter")){//restart on enter key
            this.onRestart();
        }
        if(this.isPaused)return;
        //other inputs that should execute only if game not paused..
    }

    //
    renderBlocks(){
        for(let y=0;y<this.grid.rows;y++){
            for(let x=0;x<this.grid.cols;x++){
                const blockotId=this.grid.getAt(x,y);//console.log(blockotId)
                if(blockotId>0){
                    this.drawBlockot(blockotId,x,y);
                }
            }
        }
    }

    drawBlockot(id,x,y){
        this.cc.fillStyle=Block.colors[id%Block.colors.length];
        this.cc.fillRect(x*this.grid.cellSize,y*this.grid.cellSize,this.grid.cellSize,this.grid.cellSize);
        this.cc.strokeStyle="#eee";
        this.cc.strokeRect(x*this.grid.cellSize,y*this.grid.cellSize,this.grid.cellSize,this.grid.cellSize);
    }

    addNewBlock(){
        //center in x position (by substructing any block shape half width from half grid width)
        const newBlockPos={x:Math.floor(this.grid.cols/2)-Math.floor(Block.shapes[0][0][0].length/2),y:0};
        //if grid cell at new block position is not empty then trigger game over
        if(this.grid.getAt(newBlockPos.x,newBlockPos.y)>0){
            this.onGameOver();
            return;
        }
        const newBlock=new Block(newBlockPos.x,newBlockPos.y,this.grid);
        this.addBlock(newBlock);
    }

    addBlock(block){
        this.blocks.push(block);
        this.activeBlock=this.blocks.at(-1);
    }

    //check filled row
    checkFilledRow(){
        for(let y=0;y<this.grid.rows;y++){
            let isFilled=true;//set row to is filled initially
            let t_idsToBreak=new Set();//temporary set of block ids that may need to break
            for(let x=0;x<this.grid.cols;x++){
                const blockotId=this.grid.getAt(x,y);
                if(blockotId===0){//if a blockot is eq to 0 then the row is not filled and don't need to break
                    isFilled=false;
                    break;
                }else{//else add this blockot id to set of idsToBreak
                    t_idsToBreak.add(blockotId);
                }
            }
            if(isFilled){//if the block is filled then push the last set of idsToBreak and the current row index
                //push the tmp set
                this.idsToBreak.push(t_idsToBreak);
                //push the row
                this.breakAtRows.push(y);
            }
        }
        //update score is there is rows to break
        if(this.breakAtRows.length>0){
            //update score
            this.score+=this.grid.cols*this.breakAtRows.length;
            GUIManager.updateScore();
        }
    }

    //on game over
    onGameOver(){
        this.setGameOver();//inherited from Game class
        GUIManager.updateState();
    }
    //restart
    onRestart(){
        this.unsetGameOver();
        this.reset();
        GUIManager.updateState(this.gameState);
        GUIManager.updateScore();
    }
    reset(){
        this.blocks=[];
        this.grid.resetData();
        this.activeBlock=null;
        this.idsToBreak.length=0;
        this.breakAtRows.length=0;
        this.score=0;
        this.addNewBlock();
    }

    //other things
    setGameSpeed(newVal){
        TetrisGame.tickValue=newVal;
        this.tick=TetrisGame.tickValue;
    }

}

export default TetrisGame;
