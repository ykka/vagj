// =====================
// EFFECTS
// =====================
// Effects are effects (heh) applied to a tile. They represent game
// mechanics for how actors interact with the tile

// A simple example effect to change an archeologist's facing
var compassNorth = function(actor){
    // This effect causes an archeologist to start heading UP
    // Facing nomenclature and stuff can be changed according to need
    if(actor.role == 'archeologist') {
        // We're going to have the archeologist face north
        actor.facing = 'north';

        // this effect will be used up when it has been read
        return true;
    }
    // HERE'S WHERE WE MIGHT ALSO HAVE AN IMAGE LOCATION
};

// This is an example effect - a sticky Trap that slows down a GraveRobber
// and is largely ignored by an archeologist
var stickyTrap = function(actor){
    // This effect slows down the actor by 2
    console.log('STICKY TRAP');

    if(actor.role == 'graveRobber') {
        console.log("robber slowed for 15 seconds");
        actor.gameObject.setVelocity(1,1);
        setTimeout(function(){
            actor.gameObject.setVelocity(2.5,2.5);
        }, 15000);
        return true;
    } else {
        // it's an archeologist, he just has to step over the trap.
        //
        console.log("archeologist steps over");
        actor.gameObject.setVelocity(0,0);
        setTimeout(function(){
            actor.gameObject.setVelocity(2.5,2.5);
        }, 500);

        // This effect won't be destroyed when it has been walked on by the
        // archeologist
        return false;
    }
};

var compassWest = function(actor){
    if(actor.role == 'archeologist') {
        actor.facing = 'west';
        return true;
    }
};

var compassEast = function(actor){
    if(actor.role == 'archeologist') {
        actor.facing = 'east';
        return true;
    }
};

var compassSouth = function(actor){
    if(actor.role == 'archeologist') {
        actor.facing = 'south';
        return true;
    }
};

var tripWire = function(actor){
    actor.speed === 0;
    // Trip wires work on both! Beware
    actor.buffs.push({
        modifiers:{
            speed: 0
        },
        duration: 2
    });
    return true;
};

// The heavy Fake is an object that seems like it's helpful
// It causes the actor to go to his home camp, slowly (which may not be where he
// came from at the start)
// At this point the actor goes back to work!
// As it works on both actors, it's a sneaky tool which can be used to keep
// an archeologist out of harms way as much as slow down a graveRobber
var heavyFake = function(actor){
    actor.speed -= 3;
    actor.setGoal('home');
    actor.buffs.push({
        modifiers:{
            speed: -3,
            target: 'home'
        },
        duration: 'tillHome'
    });
    return true;
};

var lightFake = function(actor){
    actor.setGoal('home');
    actor.buffs.push({
        modifiers:{
            target: 'home'
        },
        duration: 'tillHome'
    });
    return true;
};

