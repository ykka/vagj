

// The base Tile Object
function tile(){
    this.isPassable = true;
    // The effects array are all the effects currently on this tile
    this.effects = [stickyTrap, compassNorth];

    // if we want to store the url for the background image for the tile
    // in the object, might not be necessary at all
    this.background = "";

    // images for effects: ie: the graphics for a trap or artefact 
    this.effectImages = [];
    
    // the actor currently in the tile - not sure this will be needed
    // but easy to ignore later
    this.occupant;

    // Does this tile contain an artefact?
    // here's where we store the artefact
    this.artefact = null;

    // This function is called whenever an actor enters a tile. It handles all
    // the effects which the actor is subjected to.
    this.enterTile = function(actorObject){
        if(this.artefact){
            // tell the actor she has found the artefact
            actor.foundArtefact(this.artefact);
        } else {
            console.log('Tile received passable request from', actorObject);

            // we subject the actor to all of the effects currently on this 
            // tile
            this.effects.forEach(function(effect, index, array){
                checkEffect(effect, actorObject, index, array);
            });

            // and save the actor as our occupant. Again: we may not need this
            // at all but it's easy to ignore
            this.occupant = actorObject;
        }
    };
    
    // Adding effects is straightforward, we're exposing it using a function in
    // case we need to add functionality later.
    this.addEffect = function(effect){
        this.effects.push(effect);
    };

    // Generally effects should remove themselves through their effects in game.
    // However if a player wants to delete or undo an effect, like when editing
    // the level then this function is called
    this.removeEffect = function(effect){
        for(var i; i < this.effects.length; i++){
            if (this.effects[i] == effect){
                this.effects.splice(i, 1);
                break;
            }
        }   
    };

    function checkEffect(effect, actor, index, array){
        console.log('effect is', effect);   
        console.log('actor is', actor); 
        if(effect(actor)){
            console.log('it returned true for destroy');
            array.splice(index,1); 
        }
    }
}


actor = function(goal, mapData) {
    this.mapCoord = { x: 0, y: 0 };
    this.home = { x: 0, y: 0};
    this.normalGoal = goal;
    this.goal = goal;
    this.buffs = [];
    this.normalSpeed = 5;
    this.speed = 5;

    this.initGraveRobber = function(mapData){
        this.init();
        this.role = 'graveRobber';
        this.pathfinder = new Pathfinder();
        this.pathfinder.init(map.width, map.height);
        this.pathfinder.setPath(this.mapCoord.x, this.mapCoord.y, this.goal.x, this.goal.y);
        mapData.forEach(function(mapTile){
            if(!mapTile.isPassable){
                this.pathfinder.addObstacle(mapTile.x, mapTile.y);
            }
        });
    };

    this.initArcheologist = function(mapData){
        this.init();
        this.role = 'archeologist';
    };

    this.init = function(){
        this.goal = {x:0, y:0};
    };

    this.setGoal = function(goal){
        console.log("Setting goal");
        if(goal == 'home'){
            console.log("goal is now home!");
            this.goal = this.home;
        } else {
            console.log("goal is now", goal);
            this.goal = goal;
        }
    };

    this.nextStep = function() {
        if(this.role == 'graveRobber'){
            this.position = this.pathfinder.getNextStep();
            // call the enter on selected file;
            mapData[this.mapCoord.x][this.mapCoord.y].enterTile(this);
        } else {
            // AI for Archeologist goes here!
            
        }
    };


    this.checkBuffs(){
        this.buffs.forEach(function(buff, index, array){
            if(buff.duration == "tillHome"){
                //SPECIAL CASE, TILL HOME
                if (this.mapCoord == this.home){
                    console.log('actor '+this.role+' is home!!!');
                    array.splice(index, 1);
                } else {
                    console.log('actor '+this.role+'still not home');
                }
            } else if(buff.duration == 1){
                for(var key in buff.modifiers){
                   this.reverseBuff(key, buff.modifiers[key]);
                }
                array.splice(index, 1); 
            } else {
                buff.duration -= 1;
            }
        });
    }

    this.reverseBuff(key, value){
        if(key == 'speed'){
            if(value == 0){
                this.speed = this.normalSpeed;        
            } else {
                this.speed -= value;
            }
        }
    }

    this.runTurn = function(){
        this.checkBuffs();
        this.nextStep();
    };
};