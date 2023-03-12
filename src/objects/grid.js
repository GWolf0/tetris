class Grid{
    cols;rows;cellSize;
    data;
    get count(){return this.cols*this.rows;};

    constructor(cols,rows,cellSize,defaultDataValue=0){
        this.cols=cols;
        this.rows=rows;
        this.cellSize=cellSize;
        this.data=[];
        //init data array
        for(let y=0;y<this.rows;y++){
            this.data.push([]);
            for(let x=0;x<this.cols;x++){
                this.data[y].push(defaultDataValue);
            }
        }
    }

    isInRange(x,y){
        return x>=0&&x<this.cols&&y>=0&&y<this.rows;
    }
    getAt(x,y){
        return this.isInRange(x,y)?this.data[y][x]:null;
    }
    setAt(x,y,val){
        if(this.isInRange(x,y))this.data[y][x]=val;
    }

}

export default Grid;
