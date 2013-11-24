
/* Game namespace */
var game = {

    data : {
        score : 0,
        level : 0
    },

    "onload" : function () {
        if (!me.video.init("screen", 720, 576, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        me.audio.init("mp3,ogg");
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);

        me.state.change(me.state.LOADING);
    },

    "loaded" : function () {
        console.log('loading Map Data');
        me.mapData = setInitialMapData();
        console.log('LOADED');
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.PAUSE, new game.PauseScreen());
        me.state.transition("fade", "#271900", 250);

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("archeologist", game.Archeologist);
        me.entityPool.add("graveRobber", game.GraveRobber);
        // me.entityPool.add("CoinEntity", game.CoinEntity);
        // me.entityPool.add("EnemyEntity", game.EnemyEntity);

        // enable the keyboard
         me.input.bindKey(me.input.KEY.LEFT, "left");
         me.input.bindKey(me.input.KEY.RIGHT, "right");
         me.input.bindKey(me.input.KEY.UP, "up");
         me.input.bindKey(me.input.KEY.DOWN, "down");

         this.item = "west";
        me.state.change(me.state.MENU);
    }
};

function test(){
//    addArcheologist();
 //   addGraveRobber();
}

function addArcheologist(x, y){
    var testSettings={
        facing: 'east',
        goal: '{"x":50, "y":0}',
        home: '{"x":0, "y":0}',
        image: 'walking_archeologist',
        spritewidth: 32,
        spriteheight: 64
    };
    testArch = new game.Archeologist(x ||5,y || 5, testSettings)
    me.game.add(testArch, 10);
}

function addGraveRobber(){
    var testSettings={
        facing: 'east',
        goal: '{"x":50, "y":0}',
        home: '{"x":0, "y":0}',
        image: 'walking_robber',
        spritewidth: 32,
        spriteheight: 64
    };
    testGR = new game.GraveRobber(15, 3, testSettings);
    me.game.add(testGR, 10);
}

function setInitialMapData(){
    console.log('SET INITIAL MAP DATA CALLED');
    var mapData = []

    for(var i = 0; i < 100; i++){
            mapData[i] = [];
        for(var q = 0; q < 100; q++){
            //mapData[i][q] = {debug:'This tile X is '+i+' Y is '+q};
            var newMapTile = new tile();
            mapData[i][q] = newMapTile;
        }
    }


    return  mapData;
}

function getMapTile(mapData, x, y){
    //console.log('getMapTile x'+ x+' y '+y);
    var tileNumberX = Math.round(x / 32);
    var tileNumberY = Math.round(y / 32);
    return me.mapData[tileNumberX][tileNumberY];
}

function addCompassNorth(x,y){
    var testSettings={
        image: 'crown2',
        spritewidth: 32,
        spriteheight:32 
    };
    var obj = new game.compassNorth(x, y, testSettings);
    var mapTile = getMapTile(game.mapData, x, y);
    console.log("Map tile would be", mapTile);
    mapTile.addEffect(compassNorth);
    me.game.add(obj, 9);
}

function addCompassSouth(x,y){
    var testSettings={
        image: 'dagger1',
        spritewidth: 32,
        spriteheight:32 
    };
    var obj = new game.compassSouth(x, y, testSettings);
    var mapTile = getMapTile(game.mapData, x, y);
    mapTile.addEffect(compassSouth);
    me.game.add(obj, 9);
}
function addCompassEast(x,y){
    var testSettings={
        image: 'instrument2',
        spritewidth: 32,
        spriteheight:32 
    };
    var obj = new game.compassEast(x, y, testSettings);
    var mapTile = getMapTile(game.mapData, x, y);
    console.log("Map tile would be", mapTile);
    mapTile.addEffect(compassEast);
    me.game.add(obj, 9);
}
function addCompassWest(x,y){
    console.log("called");
    var testSettings={
        image: 'axe',
        spritewidth: 32,
        spriteheight:32 
    };
    var obj = new game.compassWest(x, y, testSettings);
    console.log("yeah");
    var mapTile = getMapTile(game.mapData, x, y);
    console.log("Map tile would be", mapTile);
    mapTile.addEffect(compassWest);
    me.game.add(obj, 9);
}

function addItem(x, y){
    if(false){
        addArcheologist(event.gameX, event.gameY);
    }
    console.log('item', game.item);
    if(game.item == 'east'){
        addCompassEast(x,y);    
    }
    if(game.item == 'west'){
        addCompassWest(x,y);    
    }
    if(game.item == 'north'){
        addCompassNorth(x,y);    
    }
    if(game.item == 'south'){
        addCompassSouth(x,y);    
    }
}


