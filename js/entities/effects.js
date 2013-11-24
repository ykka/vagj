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
    actor.speed -= 3;

    if(actor.role == 'graveRobber') {
        // modifiers get stored as a buff, the actor checks each turn for the
        // duration on each buff and ticks it down 1. When it reaches 0 it
        // reverses the modifier,

        actor.buffs.push({
            modifiers:{
                speed: -3
                //other keys would be here if you want to add them
            },
            // The effect would be applied for 5 turns
            duration: 5
        });

        // We say that the effect will be destroyed once it has been walked on
        // by the robber
        return true;
    } else {
        // it's an archeologist, he just has to step over the trap.
        actor.buffs.push({
            modifiers:{
                // He's immobile while he steps over it
                speed: 0
            },
            // But only for 1 turn,
            duration: 1
        });

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

