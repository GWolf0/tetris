import InputManager from "./objects/inputManager";

class Block{
    static c=1;
    static colors=["cyan","magenta","lime"];
    static shapes=[
        [
            [
                [1,1,1]
            ],
            [
                [1],
                [1],
                [1]
            ],
        ],
        [
            [
                [1,1],
                [1,1]
            ],
        ],
        [
            [
                [0,0,1],
                [1,1,1]
            ],
            [
                [1,0],
                [1,0],
                [1,1]
            ],
            [
                [1,1,1],
                [1,0,0]
            ],
            [
                [1,1],
                [0,1],
                [0,1]
            ],
        ]
    ];
    id;color;
    x;y;
    shape;shapeIdx;currentShapeSubIdx;
    grid;
    active=true;

    constructor(x,y,grid){
        this.id=Block.c++;
        this.color=Block.colors[this.id%Block.colors.length];
        this.x=x;this.y=y;
        this.shapeIdx=Math.floor(Math.random()*Block.shapes.length);
        this.currentShapeSubIdx=0;
        this.shape=[...Block.shapes[this.shapeIdx][this.currentShapeSubIdx]];
        this.grid=grid;
    }

    update(game){
        //horizontal movement
        let movedHorizontaly=false;
        if(this.active){
            if(InputManager.getKeyUp("space")){
                this.rotate();
            }else{
                if(InputManager.getKeyUp("right")&&this.canGoRight()){
                    this.x++;
                    movedHorizontaly=true;
                }
                if(InputManager.getKeyUp("left")&&this.canGoLeft()){
                    this.x--;
                    movedHorizontaly=true;
                }
                if(InputManager.getKeyUp("down")){
                    this.drop();
                }
            }
        }
        //fall movement
        if(this.canGoDown()){
            if(!movedHorizontaly)this.y++;
        }else{
            if(this.active){
                this.active=false;
                game.addNewBlock();
            }
        }
        //check if needs to break row/s
        if(!this.active){
            let rowsToBreak=[];
            game.idsToBreak.forEach((idsSet,i)=>{
                if(idsSet.has(this.id)){
                    rowsToBreak.push(game.breakAtRows[i]-this.y);
                }
            });
            this.breakRow(rowsToBreak);
        }
        //reflect on grid
        for(let y=this.y;y<this.y+this.shape.length;y++){
            for(let x=this.x;x<this.x+this.shape[0].length;x++){
                const shapeVal=this.shape[y-this.y][x-this.x];
                if(shapeVal>0)this.grid.setAt(x,y,this.id);//console.log("res",this.grid.getAt(x,y),this.id)
            }
        }
    }

    //rotate
    rotate(){
        if(!this.canRotate())return;
        this.currentShapeSubIdx=(this.currentShapeSubIdx+1)%Block.shapes[this.shapeIdx].length;
        this.shape=[...Block.shapes[this.shapeIdx][this.currentShapeSubIdx]];
    }
    //drop
    drop(){
        while(this.canGoDown()){
            this.y++;
        }
    }

    //check if can rotate
    canRotate(){
        const targetShapeSubIdx=(this.currentShapeSubIdx+1)%Block.shapes[this.shapeIdx].length;
        const targetShape=[...Block.shapes[this.shapeIdx][targetShapeSubIdx]];
        for(let y=this.y;y<this.y+targetShape.length;y++){
            for(let x=this.x;x<this.x+targetShape[0].length;x++){
                const shapeVal=targetShape[y-this.y][x-this.x];
                const blockotVal=this.grid.getAt(x,y);
                if((shapeVal>0)&&(blockotVal==null||blockotVal>0))return false;
            }
        }
        return true;
    }
    //check if can go down
    canGoDown(){
        for(let y=this.y;y<this.y+this.shape.length;y++){
            for(let x=this.x;x<this.x+this.shape[0].length;x++){
                const shapeVal=this.shape[y-this.y][x-this.x];
                if(shapeVal===0)continue;
                const below=this.grid.getAt(x,y+1);
                if(below==null||(below>0&&below!==this.id)){
                    return false;
                }
            }
        }
        return true;
    }
    //check if can go right
    canGoRight(){
        for(let y=this.y;y<this.y+this.shape.length;y++){
            for(let x=this.x;x<this.x+this.shape[0].length;x++){
                const shapeVal=this.shape[y-this.y][x-this.x];
                if(shapeVal===0)continue;
                const right=this.grid.getAt(x+1,y);//console.log(below==null)
                if(right==null||(right>0&&right!==this.id)){
                    return false;
                }
            }
        }
        return true;
    }
    //check if can go left
    canGoLeft(){
        for(let y=this.y;y<this.y+this.shape.length;y++){
            for(let x=this.x;x<this.x+this.shape[0].length;x++){
                const shapeVal=this.shape[y-this.y][x-this.x];
                if(shapeVal===0)continue;
                const left=this.grid.getAt(x-1,y);//console.log(below==null)
                if(left==null||(left>0&&left!==this.id)){
                    return false;
                }
            }
        }
        return true;
    }
    //break row
    breakRow(rowsIndices){
        //if the rows indices is not empty then remove each row at the given index(-i because shape which is an array will change in length each time a row is removed)
        if(rowsIndices.length>0){
            rowsIndices.forEach((rIdx,i)=>{
                this.shape.splice(rIdx-i,1);
            });
        }
    }

}

export default Block;
