
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 480, 320, true, 'auto')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};

var stickyTrap = function(actor){
	// This effect slows down the actor by 2
	actor.speed -= 3;

	if(actor.role == 'graveRobber') {
		// modifiers get stored as a buff, the actor checks each turn for the duration
		// on each buff and ticks it down 1. When it reaches 0 it reverses the modifier, 

		actor.buffs.push({
			modifiers:{
				speed: -3
				//other keys would be here if you want to add them
			},
			// The effect would be applied for 5 turns
			duration: 5
		});

		// We say that the effect will be destroyed once it has been walked on by the robber
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

		// This effect won't be destroyed when it has been walked on by the archeologist
		return false;
	}
};


function tile(){
	this.isPassable = true;
	this.effects = [stickyTrap];
	this.occupant;
	this.containsArtefact = false;

	this.enterTile = function(actorObject){
		if(this.containsArtefact){
			actor.winner();
		} else {
			console.log('Tile received passable request from', actorObject);
			this.effects.forEach(function(effect, index, array){
				checkEffect(effect, actorObject, index, array);
			});
			this.occupant = actorObject;
		}
	};
	
	this.addEffect = function(effect){
		this.effects.push(effect);
	};

	function checkEffect(effect, actor, index, array){
		console.log('effect is', effect);	
		console.log('actor is', actor);	
		if(effect(actor)){
			console.log('it returned true for destroy');
			array.splice(index,1); 
			console.log('the array is now', array);
		}
	}
}
