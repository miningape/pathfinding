class bfs_algo {
  // Everything in here is all the algorithm can see and interact with
  
  // When the algorithm is initialized we pass in the map we are running on
  constructor (aMap) {
    // this. means its a member of this class (not just this function)
    // Getting all the data from the map
    this.data = new mapData(aMap);
    console.log(this.data);
    // Setting adjacency list
    this.list = this.data.list;
    // Just a copy of the actual map for the algorithm
    this.bitmap = this.data.bitMap;
    // Map of node names
    this.inter = this.data.interMap;
    // Getting the name of start and end points
    [this.start, this.end] = this.data.SEalgorithm();
    
    //  This is algorithm set up so if your algorithm needs more information you can generate it here or 
    // initialize queue
    this.queue = [];
    // Put start node on queue
    this.queue.push(this.start);
    
    // Initialize algorithm variables
    this.path = [];
  }

  step () {
    let cur = this.queue.shift();
    
    if (cur == this.end) {
      // Path found
      this.pathFind();
      return [this.bitmap, false, this.path, true];
    } else {
      
      this.list[cur].adj
      .filter(n => this.list[n].seen == false)
      .forEach(n => {
        this.list[n].parent = cur;
        this.list[n].seen = true;
        this.queue.push(n);
      });
  
    
    this.fixMap();
      
      // Not completed
      if (this.queue.length != 0) {
        // Still More to do
        return [this.bitmap, true, []];
      } else {
        // Algorithm searched everything but no path
        return [this.bitmap, false, [], false];
      }
    }
  }
  
  pathFind() {
    let node = this.end;
    let tPath = [];

    while(node != this.start) {
      tPath.push(node);
      node = this.list[node].parent;
      
    }
    
    tPath.push(this.start);
    
    
    while (tPath.length!=0) {
      node = tPath.pop();
      
      let xv = 0;
      let yv = 0;
      
      this.inter.forEach(row => {
        xv = 0;
        row.forEach(cell => {
          if (cell == node) {
            this.path.push({xv: xv, yv: yv});
          }
          xv++;
        });
        yv++;
      });
    }
  }
  
  fixMap() {
    for (let y = 0; y < this.inter.length; y++) {
      for (let x = 0; x < this.inter[0].length; x++) {
        if (this.inter[y][x] == this.start || this.inter[y][x] == this.end || this.inter[y][x] == -1) continue;
        
        if (this.list[this.inter[y][x]].seen) {
          this.bitmap[y][x] = "p";
        }
      }
    }
  }
}