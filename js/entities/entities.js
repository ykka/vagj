/*-------------------
a player entity
-------------------------------- */
game.RobberEntity = me.ObjectEntity.extend({

    pathfinder: undefined,

    /* constructor */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        this.gravity = 0;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },

    update: function() {
       var backgroundLayer = me.game.currentLevel.getLayerByName('background');
       var collisionMap = me.game.collisionMap;
       var goLeft = false;
       var goRight = false;
       var goUp = false;
       var goDown = false;

        if(collisionMap && !this.pathfinder){
            // get bounds
            this.pathfinder = new Pathfinder(collisionMap.rows,collisionMap.cols);
        }

        if(this.pathfinder && backgroundLayer){
         var tile = backgroundLayer.getTile(this.pos.x,this.pos.y);
         var pathfinderCurrPos = this.pathfinder.getPosition();
         if(tile.col == pathfinderCurrPos.x && tile.row == pathfinderCurrPos.y){
             pathfinderCurrPos = this.pathfinder.getNextStep();
         }
         if(tile.col > pathfinderCurrPos.x){
             goLeft = true;
         } else if(tile.col < pathfinderCurrPos.x){
             goRight = true;
         }
         if(tile.row > pathfinderCurrPos.y){
             goUp = true;
         } else if(tile.row < pathfinderCurrPos.y){
             goDown = true;
         }

        }

        if(this.pathfinder && !this.pathfinder.path && me.game.getEntityByProp('name','artifact').length){
            var robberX = me.game.getEntityByProp('name','robber')[0].pos.x;
            var robberY = me.game.getEntityByProp('name','robber')[0].pos.y;
            var artifactX = me.game.getEntityByProp('name','artifact')[0].pos.x;
            var artifactY = me.game.getEntityByProp('name','artifact')[0].pos.y;
            var robberTile = backgroundLayer.getTile(robberX,robberY);
            var artifactTile = backgroundLayer.getTile(artifactX,artifactY);
            this.pathfinder.setPath(robberTile.col,robberTile.row,artifactTile.col,artifactTile.row);
        }

        if (me.input.isKeyPressed('left') || goLeft) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right') || goRight) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('down') || goDown) {
            // flip the sprite on horizontal axis
            this.flipY(true);
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('up') || goUp) {
            // unflip the sprite
            this.flipY(false);
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
        }

        // check & update player movement
        var res = this.updateMovement();

        // check for collision result with the environment
        if (res.ytile){
            var robberX = me.game.getEntityByProp('name','robber')[0].pos.x;
            var robberY = me.game.getEntityByProp('name','robber')[0].pos.y;
            var robberTile = backgroundLayer.getTile(robberX,robberY);
            var pathfinderCurrPos = this.pathfinder.getPosition();
this.pathfinder.state.x = robberTile.col;
this.pathfinder.state.y = robberTile.row;
            this.pathfinder.addObstacle(pathfinderCurrPos.x,pathfinderCurrPos.y);
            this.pathfinder.addObstacle(res.ytile.col,res.ytile.row);
        }
        if (res.xtile){
            var robberX = me.game.getEntityByProp('name','robber')[0].pos.x;
            var robberY = me.game.getEntityByProp('name','robber')[0].pos.y;
            var robberTile = backgroundLayer.getTile(robberX,robberY);
            var pathfinderCurrPos = this.pathfinder.getPosition();
this.pathfinder.state.x = robberTile.col;
this.pathfinder.state.y = robberTile.row;
            this.pathfinder.addObstacle(pathfinderCurrPos.x,pathfinderCurrPos.y);
            this.pathfinder.addObstacle(res.xtile.col,res.xtile.row);
        }

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
            // update object animation
            console.log(
               'THIS ENTITTY IS UPDATING');
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
});



/*-------------------
artifact  entity
-------------------------------- */
game.ArtifactEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(res, obj) {
        // do something when collected
console.log('Object '+obj.name+' has reached '+this.name);
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
});

game.Archeologist = me.ObjectEntity.extend({
    /* constructor */
    init: function(x, y, settings) {
        console.log('Archeologist::init()');
        // call the constructor
        this.parent(x, y, settings);
        this.gravity = 0;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
        this.actor = new actor('archeologist',
                               settings.facing,
                               JSON.parse(settings.home),
                               JSON.parse(settings.goal),
                               game.mapData);
       this.actor.gameObject = this;
        // set the display to follow our position on both axis

    },

    update: function() {
        if(true){
            switch(this.actor.facing) {
                case 'north':
                    this.vel.x =0;
                    this.vel.y -= this.actor.speed * me.timer.tick;
                    break;
                case 'south':
                    this.vel.x =0;
                    this.vel.y += this.actor.speed * me.timer.tick;
                    break;
                case 'east':
                    this.vel.y =0;
                    this.vel.x += this.actor.speed * me.timer.tick;
                    break;
                case 'west':
                    this.vel.y =0;
                    this.vel.x -= this.actor.speed * me.timer.tick;
                    break;
                default:
                    break;
            }
        }

        // GET MAP COORDS
        var newTile = getMapTile(game.mapData, this.pos.x, this.pos.y);
        if(newTile != this.currentTile){
            this.currentTile = newTile;
            newTile.enterTile(this.actor);
        }

        // CHECK IF MAP COORDS ARE DIFFERENT FROM STORED
        //
        // IF CHANGED< LOG

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
            // update object animation
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});


game.GraveRobber = me.ObjectEntity.extend({
    /* constructor */
    init: function(x, y, settings) {
        console.log('GraveRobber::init()');
        // call the constructor
        this.parent(x, y, settings);
        this.gravity = 0;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
        this.actor = new actor('graveRobber',
                               settings.facing,
                               JSON.parse(settings.home),
                               JSON.parse(settings.goal),
                               game.mapData);
        // set the display to follow our position on both axis

    },

    update: function() {
        if(this.actor.mapCoord.x >= this.pos.x &&
           this.actor.mapCoord.x <= (this.pos.x+30)){
            console.log('in the box');
        }
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('down')) {
            // flip the sprite on horizontal axis
            this.flipY(true);
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            this.flipY(false);
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
        }

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
            // update object animation
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});

