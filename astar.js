class astar_node {
  constructor(_id, _gCost, _hCost) {
    this.ID = _id;
    this.G_COST = _gCost;
    this.H_COST = _hCost;
    this.F_COST = this.G_COST + this.H_COST;
  }
  
  get id() {
    return this.ID;
  }
  
  get gCost() {
    return this.G_COST;
  }
  
  get hCost() {
    return this.H_COST;
  }
  
  get fCost() {
    return this.F_COST;
  }
}
// new astar_node(id, gCost, hCost, parent);

class astar_algo {
  constructor(aMap) {
    this.data = new mapData(aMap);
    this.list = this.data.list;
    this.bitmap = this.data.bitMap;
    this.inter = this.data.interMap;
    [this.start, this.end] = this.data.SEalgorithm();
    const COMPARE_FUNCTION = function(_a, _b) {
      return _b.fCost - _a.fCost;
    }
    
    this.pq = new priority_queue(COMPARE_FUNCTION);
    this.pq.push(new astar_node(this.start, 0, 0));
    this.path = [];
    this.seen = [];
    this.added = [];
    this.heuristic = function(_a, _b) {
      return dist(
        this.list[_a].x, this.list[_a].y, 
        this.list[_b].x, this.list[_b].y
      );
    }
  }
  
  step() {
    let cur = this.pq.pop();
    while(this.list[cur.id].visited) {
      if(this.pq.empty()) {
        return [this.bitmap, false, [], false];
      }
      
      cur = this.pq.pop();
    }
    
    this.list[cur.id].visited = true;
    if(cur.id === this.end) {
      this.pathFind();
      return [this.bitmap, false, this.path, true];
    }
    
    for(let i = 0; i < this.list[cur.id].adj.length; ++i) {
      if(this.list[this.list[cur.id].adj[i]].g <= 
         cur.gCost + sqrt(this.list[cur.id].weights[i])
        ) continue;
      
      this.list[this.list[cur.id].adj[i]].g = 
        cur.gCost + sqrt(this.list[cur.id].weights[i]);
      
      this.list[this.list[cur.id].adj[i]].parent = cur.id;
      
      this.pq.push(new astar_node(
        this.list[cur.id].adj[i],
        cur.gCost + sqrt(this.list[cur.id].weights[i]),
        this.heuristic(this.list[cur.id].adj[i], this.end)
      ));
      
      this.list[this.list[cur.id].adj[i]].seen = true;
    }
    
    this.fixMap();
    if(this.pq.empty()) {
      return [this.bitmap, false, [], false];
    } else {
      return [this.bitmap, true, []];
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
    for(let y = 0; y < this.inter.length; ++y) {
      for(let x = 0; x < this.inter[0].length; ++x) {
        
        if(this.inter[y][x] == this.start || this.inter[y][x] == this.end)
          continue;
        
        if(this.inter[y][x] !== -1) {
          if(this.list[this.inter[y][x]].seen)
            this.bitmap[y][x] = "p";
        }
        
      }
      
    }
    
  }
  
}
