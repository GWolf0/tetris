var m=Object.defineProperty;var S=(u,t,e)=>t in u?m(u,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):u[t]=e;var a=(u,t,e)=>(S(u,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const h of s)if(h.type==="childList")for(const l of h.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const h={};return s.integrity&&(h.integrity=s.integrity),s.referrerPolicy&&(h.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?h.credentials="include":s.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function i(s){if(s.ep)return;s.ep=!0;const h=e(s);fetch(s.href,h)}})();const r=class{static init(){window.addEventListener("keydown",r.onKeyDown),window.addEventListener("keyup",r.onKeyUp)}static getKey(t){return r.keys[t]}static getKeyUp(t){return r.keysUp[t]}static update(){Object.entries(r.keysUp).forEach(t=>{r.keysUp[t[0]]=!1})}static onKeyDown(t){const e=t.keyCode;r.KeyCodes.includes(e)&&t.preventDefault(),e===38?r.keys.up=!0:e===39?r.keys.right=!0:e===40?r.keys.down=!0:e===37?r.keys.left=!0:e===32?r.keys.space=!0:e===13?r.keys.enter=!0:e===27&&(r.keys.escape=!0)}static onKeyUp(t){const e=t.keyCode;r.KeyCodes.includes(e)&&t.preventDefault(),e===38?(r.keys.up=!1,r.keysUp.up=!0):e===39?(r.keys.right=!1,r.keysUp.right=!0):e===40?(r.keys.down=!1,r.keysUp.down=!0):e===37?(r.keys.left=!1,r.keysUp.left=!0):e===32?(r.keys.space=!1,r.keysUp.space=!0):e===13?(r.keys.enter=!1,r.keysUp.enter=!0):e===27&&(r.keys.escape=!1,r.keysUp.escape=!0)}};let n=r;a(n,"KeyCodes",[38,39,40,37,32,13,27]),a(n,"keys",{up:!1,right:!1,down:!1,left:!1,escape:!1,space:!1,enter:!1}),a(n,"keysUp",{...r.keys});const d=class{constructor(t,e,i){a(this,"id");a(this,"color");a(this,"x");a(this,"y");a(this,"shape");a(this,"shapeIdx");a(this,"currentShapeSubIdx");a(this,"grid");a(this,"active",!0);this.id=d.c++,this.color=d.colors[this.id%d.colors.length],this.x=t,this.y=e,this.shapeIdx=Math.floor(Math.random()*d.shapes.length),this.currentShapeSubIdx=0,this.shape=[...d.shapes[this.shapeIdx][this.currentShapeSubIdx]],this.grid=i}update(t){let e=!1;if(this.active&&(n.getKeyUp("space")?this.rotate():(n.getKeyUp("right")&&this.canGoRight()&&(this.x++,e=!0),n.getKeyUp("left")&&this.canGoLeft()&&(this.x--,e=!0),n.getKeyUp("down")&&this.drop())),this.canGoDown()?e||this.y++:this.active&&(this.active=!1,t.addNewBlock()),!this.active){let i=[];t.idsToBreak.forEach((s,h)=>{s.has(this.id)&&i.push(t.breakAtRows[h]-this.y)}),this.breakRow(i)}for(let i=this.y;i<this.y+this.shape.length;i++)for(let s=this.x;s<this.x+this.shape[0].length;s++)this.shape[i-this.y][s-this.x]>0&&this.grid.setAt(s,i,this.id)}rotate(){this.canRotate()&&(this.currentShapeSubIdx=(this.currentShapeSubIdx+1)%d.shapes[this.shapeIdx].length,this.shape=[...d.shapes[this.shapeIdx][this.currentShapeSubIdx]])}drop(){for(;this.canGoDown();)this.y++}canRotate(){const t=(this.currentShapeSubIdx+1)%d.shapes[this.shapeIdx].length,e=[...d.shapes[this.shapeIdx][t]];for(let i=this.y;i<this.y+e.length;i++)for(let s=this.x;s<this.x+e[0].length;s++){const h=e[i-this.y][s-this.x],l=this.grid.getAt(s,i);if(h>0&&(l==null||l>0))return!1}return!0}canGoDown(){for(let t=this.y;t<this.y+this.shape.length;t++)for(let e=this.x;e<this.x+this.shape[0].length;e++){if(this.shape[t-this.y][e-this.x]===0)continue;const s=this.grid.getAt(e,t+1);if(s==null||s>0&&s!==this.id)return!1}return!0}canGoRight(){for(let t=this.y;t<this.y+this.shape.length;t++)for(let e=this.x;e<this.x+this.shape[0].length;e++){if(this.shape[t-this.y][e-this.x]===0)continue;const s=this.grid.getAt(e+1,t);if(s==null||s>0&&s!==this.id)return!1}return!0}canGoLeft(){for(let t=this.y;t<this.y+this.shape.length;t++)for(let e=this.x;e<this.x+this.shape[0].length;e++){if(this.shape[t-this.y][e-this.x]===0)continue;const s=this.grid.getAt(e-1,t);if(s==null||s>0&&s!==this.id)return!1}return!0}breakRow(t){t.length>0&&t.forEach((e,i)=>{this.shape.splice(e-i,1)})}};let f=d;a(f,"c",1),a(f,"colors",["cyan","magenta","lime"]),a(f,"shapes",[[[[1,1,1]],[[1],[1],[1]]],[[[1,1],[1,1]]],[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]]]);const p={play:0,pause:1,gameOver:2},c=class{static init(t,e,i,s,h,l){c.game=t,c.scoreText=e,c.gamePausedText=i,c.gameOverText=s,c.gameSpeedInput=h,c.optionsConfirmBtn=l,c.optionsConfirmBtn.addEventListener("click",c.onOptionsConfirmBtn),c.gameSpeedInput.value=(k.tickValue*1e3).toString()}static updateState(){const t=c.game.gameState;c.scoreText.style.display="none",c.gamePausedText.style.display="none",c.gameOverText.style.display="none",t==p.play&&(c.scoreText.style.display="block"),t==p.pause&&(c.gamePausedText.style.display="block"),t==p.gameOver&&(c.scoreText.style.display="block",c.gameOverText.style.display="block")}static updateScore(){c.scoreText.innerText=c.game.score}static onOptionsConfirmBtn(){let t=parseInt(c.gameSpeedInput.value);isNaN(t)||c.game.setGameSpeed(t/1e3)}};let o=c;a(o,"game"),a(o,"scoreText"),a(o,"gamePausedText"),a(o,"gameOverText"),a(o,"gameSpeedInput"),a(o,"optionsConfirmBtn");class x{constructor(t,e,i,s=null){a(this,"can");a(this,"cc");a(this,"clearColor","#000");a(this,"gameState",p.play);a(this,"dt");a(this,"lastTime");a(this,"tick",null);a(this,"tickCounter",0);this.can=t,this.cc=t.getContext("2d"),this.can.width=e,this.can.height=i,this.tick=s,this.baseInit()}get cw(){return this.can.width}get ch(){return this.can.height}get isPaused(){return this.gameState===p.pause}get isGameOver(){return this.gameState===p.gameOver}run(){requestAnimationFrame(()=>this.run());const t=new Date;if(this.dt=(t-this.lastTime)/1e3,this.lastTime=t,this.isPaused){this.baseUpdateBefore(),n.getKeyUp("escape")&&this.resume(),this.baseUpdateAfter();return}this.tick!=null?(this.tickCounter+=this.dt,this.tickCounter>this.tick&&(this.baseUpdateBefore(),this.runGame(),this.baseUpdateAfter(),this.tickCounter=0)):(this.baseUpdateBefore(),this.runGame(),this.baseUpdateAfter())}runGame(){this.update(),this.render()}baseInit(){n.init(),this.lastTime=new Date}baseUpdateBefore(){n.getKeyUp("escape")&&(this.isPaused?this.resume():this.pause())}baseUpdateAfter(){n.update()}init(){}update(){}render(){}clear(){this.cc.fillStyle=this.clearColor,this.cc.fillRect(0,0,this.cw,this.ch)}pause(){this.gameState=p.pause,o.updateState(this.gameState)}resume(){this.gameState=p.play,o.updateState(this.gameState)}setGameOver(){this.gameState=p.gameOver}unsetGameOver(){this.gameState=p.play}}class w{constructor(t,e,i,s=0){a(this,"cols");a(this,"rows");a(this,"cellSize");a(this,"data");this.cols=t,this.rows=e,this.cellSize=i,this.data=[];for(let h=0;h<this.rows;h++){this.data.push([]);for(let l=0;l<this.cols;l++)this.data[h].push(s)}}get count(){return this.cols*this.rows}isInRange(t,e){return t>=0&&t<this.cols&&e>=0&&e<this.rows}getAt(t,e){return this.isInRange(t,e)?this.data[e][t]:null}setAt(t,e,i){this.isInRange(t,e)&&(this.data[e][t]=i)}}class b extends w{constructor(t,e,i){super(t,e,i)}update(){this.resetData()}render(t){t.cc.strokeStyle="#333";for(let e=0;e<this.rows;e++){t.cc.beginPath(),t.cc.moveTo(0,e*this.cellSize),t.cc.lineTo(t.cw,e*this.cellSize),t.cc.stroke(),t.cc.closePath();for(let i=0;i<this.cols;i++)t.cc.beginPath(),t.cc.moveTo(i*this.cellSize,0),t.cc.lineTo(i*this.cellSize,t.ch),t.cc.stroke(),t.cc.closePath()}}resetData(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.cols;e++)this.data[t][e]=0}}const g=class extends x{constructor(e,i,s){super(document.getElementById("can"),s*e,s*i,g.tickValue);a(this,"grid");a(this,"blocks",[]);a(this,"activeBlock");a(this,"idsToBreak",[]);a(this,"breakAtRows",[]);a(this,"score",0);this.grid=new b(e,i,s),this.init()}init(){o.init(this,document.getElementById("gameScoreText"),document.getElementById("gamePausedText"),document.getElementById("gameGameOverText"),document.getElementById("gameSpeedInput"),document.getElementById("optionsConfirmBtn")),o.updateState(),o.updateScore(),this.addNewBlock()}update(){if(this.isGameOver){this.checkInputs();return}this.checkInputs(),this.checkFilledRow(),this.grid.update(),this.blocks.forEach((e,i)=>{e.update(this)}),this.idsToBreak.length=0,this.breakAtRows.length=0}render(){this.clear(),this.grid.render(this),this.renderBlocks()}checkInputs(){n.getKeyUp("enter")&&this.onRestart(),this.isPaused}renderBlocks(){for(let e=0;e<this.grid.rows;e++)for(let i=0;i<this.grid.cols;i++){const s=this.grid.getAt(i,e);s>0&&this.drawBlockot(s,i,e)}}drawBlockot(e,i,s){this.cc.fillStyle=f.colors[e%f.colors.length],this.cc.fillRect(i*this.grid.cellSize,s*this.grid.cellSize,this.grid.cellSize,this.grid.cellSize),this.cc.strokeStyle="#eee",this.cc.strokeRect(i*this.grid.cellSize,s*this.grid.cellSize,this.grid.cellSize,this.grid.cellSize)}addNewBlock(){const e={x:Math.floor(this.grid.cols/2)-Math.floor(f.shapes[0][0][0].length/2),y:0};if(this.grid.getAt(e.x,e.y)>0){this.onGameOver();return}const i=new f(e.x,e.y,this.grid);this.addBlock(i)}addBlock(e){this.blocks.push(e),this.activeBlock=this.blocks.at(-1)}checkFilledRow(){for(let e=0;e<this.grid.rows;e++){let i=!0,s=new Set;for(let h=0;h<this.grid.cols;h++){const l=this.grid.getAt(h,e);if(l===0){i=!1;break}else s.add(l)}i&&(this.idsToBreak.push(s),this.breakAtRows.push(e))}this.breakAtRows.length>0&&(this.score+=this.grid.cols*this.breakAtRows.length,o.updateScore())}onGameOver(){this.setGameOver(),o.updateState()}onRestart(){this.unsetGameOver(),this.reset(),o.updateState(this.gameState),o.updateScore()}reset(){this.blocks=[],this.grid.resetData(),this.activeBlock=null,this.idsToBreak.length=0,this.breakAtRows.length=0,this.score=0,this.addNewBlock()}setGameSpeed(e){g.tickValue=e,this.tick=g.tickValue}};let y=g;a(y,"tickValue",.3);const k=y;function v(){new k(9,18,32).run()}v();