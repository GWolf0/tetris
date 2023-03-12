import Grid from "./objects/grid";

class TetrisGrid extends Grid{

    constructor(cols,rows,cellSize){
        super(cols,rows,cellSize);
    }

    update(){
        //reset data
        this.resetData();
    }

    render(game){
        game.cc.strokeStyle="#333";
        for(let y=0;y<this.rows;y++){
            game.cc.beginPath();
            game.cc.moveTo(0,y*this.cellSize);
            game.cc.lineTo(game.cw,y*this.cellSize);
            game.cc.stroke();
            game.cc.closePath();
            for(let x=0;x<this.cols;x++){
                game.cc.beginPath();
                game.cc.moveTo(x*this.cellSize,0);
                game.cc.lineTo(x*this.cellSize,game.ch);
                game.cc.stroke();
                game.cc.closePath();
            }
        }
    }

    resetData(){
        for(let y=0;y<this.rows;y++){
            for(let x=0;x<this.cols;x++){
                this.data[y][x]=0;
            }
        }
    }

}

export default TetrisGrid;
