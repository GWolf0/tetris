import TetrisGame from "./src/tetrisGame";

function main(){
    const game=new TetrisGame(9,18,32);
    game.run();
}

main();
