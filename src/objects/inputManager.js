class InputManager{
    //keycodes of the keyboard keys used by the game
    static KeyCodes=[38,39,40,37,32,13,27];
    //keys are true on keydown event and false on key down event
    static keys={
        "up":false,"right":false,"down":false,"left":false,
        "escape":false,"space":false,"enter":false
    };
    //keyup are true on keyup event and are reseted at the end of the game loop(baseAfterUpdate)
    static keysUp={...InputManager.keys};

    //initialized in the baseInit method in the Game class
    static init(){
        window.addEventListener('keydown',InputManager.onKeyDown);
        window.addEventListener('keyup',InputManager.onKeyUp);
    }

    //check if key is down
    static getKey(alias){
        return InputManager.keys[alias];
    }
    //check if key has been just released
    static getKeyUp(alias){
        return InputManager.keysUp[alias];
    }

    //this method is called at to end of the game loop to reset keyup properties
    static update(){
        //reset keys up
        Object.entries(InputManager.keysUp).forEach(e=>{
            InputManager.keysUp[e[0]]=false;
        });
    }

    //key down handler
    static onKeyDown(e){
        const kc=e.keyCode;
        //prevent default behaviour on this event(if keycode is among the keys used by the game)
        if(InputManager.KeyCodes.includes(kc))e.preventDefault();
        //console.log(kc);
        if(kc===38){//"up"
            InputManager.keys["up"]=true;
        }else if(kc===39){//"right"
            InputManager.keys["right"]=true;
        }else if(kc===40){//"down"
            InputManager.keys["down"]=true;
        }else if(kc===37){//"left"
            InputManager.keys["left"]=true;
        }else if(kc===32){//"space"
            InputManager.keys["space"]=true;
        }else if(kc===13){//"enter"
            InputManager.keys["enter"]=true;
        }else if(kc===27){//"escape"
            InputManager.keys["escape"]=true;
        }
    }
    //key up handler
    static onKeyUp(e){
        const kc=e.keyCode;
        //prevent default behaviour on this event(if keycode is among the keys used by the game)
        if(InputManager.KeyCodes.includes(kc))e.preventDefault();
        //console.log(kc);
        if(kc===38){//"up"
            InputManager.keys["up"]=false;
            InputManager.keysUp["up"]=true;
        }else if(kc===39){//"right"
            InputManager.keys["right"]=false;
            InputManager.keysUp["right"]=true;
        }else if(kc===40){//"down"
            InputManager.keys["down"]=false;
            InputManager.keysUp["down"]=true;
        }else if(kc===37){//"left"
            InputManager.keys["left"]=false;
            InputManager.keysUp["left"]=true;
        }else if(kc===32){//"space"
            InputManager.keys["space"]=false;
            InputManager.keysUp["space"]=true;
        }else if(kc===13){//"enter"
            InputManager.keys["enter"]=false;
            InputManager.keysUp["enter"]=true;
        }else if(kc===27){//"escape"
            InputManager.keys["escape"]=false;
            InputManager.keysUp["escape"]=true;
        }
    }

}

export default InputManager;
