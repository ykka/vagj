/*
Usage example:
var pathfinder = new Pathfinder(100,100); //create path finder object (width,height)
pathfinder.setPath(0,0,100,100); //a path between path (xStart,yStart,xEnd,yEnd)
var nextStep = pathfinder.getNextStep(); // return next step {x:1,y:1}
var currentPosition = pathfinder.getPosition(); // return position {x:1,y:1}
pathfinder.addObstacle(20,32); //add obstacle to (x,y)
pathfinder.removeObstacle(20,32); //remove obstacle from (x,y)
*/
var Pathfinder = function(mapWidth,mapHeight){

    this.grid = undefined;

    this.finder = undefined;

    this.path = undefined;

    this.state = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
        x: 0,
        y: 0,
        pathIndex: 0
    };

    this.init = function (width,height) {
        this.grid = new PF.Grid( width, height);
        // we are using A* but in our case the algorithm doesn't really matter
        this.finder = new PF.AStarFinder({
            allowDiagonal: true,
            dontCrossCorners: true
        });
    };

    this.setPath = function(startX,startY,endX,endY) {
        this.state.startX = startX;
        this.state.startY = startY;
        this.state.endX = endX;
        this.state.endY = endY;
        var clonedGrid = this.grid.clone();
        this.path = this.finder.findPath(startX, startY, endX, endY, this.grid);
        this.grid = clonedGrid;
        //this.path = PF.Util.smoothenPath(this.grid, this.path);
        this.state.pathIndex = -1;
        this.getNextStep();
    };

    this.updatePath = function(){
        this.setPath(this.state.x,this.state.y,this.state.endX,this.state.endY);
    };

    this.addObstacle = function(x,y){
        this.grid.setWalkableAt(x, y, false);
        this.updatePath();
    };

    this.removeObstacle = function(x,y){
        this.grid.setWalkableAt(x, y, true);
        this.updatePath();
    };

    this.getNextStep = function(){
        if(this.path){
            this.state.pathIndex+=1;
            this.state.x = this.path[this.state.pathIndex][0];
            this.state.y = this.path[this.state.pathIndex][1];
        }
        return this.getPosition();
    }

    this.getPosition = function(){
        return {
            x: this.state.x,
            y: this.state.y
        };
    };

    this.init(mapWidth,mapHeight);
};
