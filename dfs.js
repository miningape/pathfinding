class dfs_algo {
  constructor (aMap) {
    //console.log(aMap);
    this.stack = [];
    this.explored = [];
    this.data = new mapData(aMap);
    this.list = this.data.list;
    this.inter = this.data.interMap;
    this.bitmap = this.data.bitMap;
    
    this.returnPath = [];
    
    [this.start, this.end] = this.data.SEalgorithm();
    
    this.stack.push(this.start);
  }
  
  
  step () {
    let current = this.stack.pop();
    
    this.explored.push(current);
    
    let adj = this.list[current].adj;
    
    adj.filter( n => this.list[n].seen == false)
      .forEach( n => {
      this.stack.push(n);
      this.list[n].seen = true;
      this.list[n].parent = current;
    });
    
    this.fixMap();
    
    //console.log(this.bitmap);
    
    if (current == this.end) return [this.bitmap, false, this.returnPath, true]; 
    else return (this.stack.length != 0) ? [this.bitmap, true, this.returnPath] : [this.bitmap, false, this.returnPath, false];
  }
  
  fixMap () {
    this.returnPath = [];
    for (let y = 0; y < this.inter.length; y++) {
      let side=this.inter[y];
      for (let x = 0; x < side.length;x++) {
        
        if (this.inter[y][x] == this.start || this.inter[y][x] == this.end || this.inter[y][x] == -1) continue;
        
        if (this.list[this.inter[y][x]].seen == true) {
          this.bitmap[y][x] = "p";
        }
      }
    }
    
    
    let fx, fy;
    let loopCount = 0;
    let continue_line = true;
    let distCalc = 0;
    let prev = 0;
    this.explored.forEach(step => {
      this.inter.forEach(layer => {
        if (layer.indexOf(step) != -1) {
          fx = layer.indexOf(step)
          fy = this.inter.indexOf(layer)
          let parent = this.list[step].parent;
          if (accurate_dfs) {
          if (prev != 0) {
            if (this.list[parent].x == prev.xv && this.list[parent].y == prev.yv) {
              continue_line = true;
            } else {
              continue_line = false;
            }
            } 
          } else {
          // Distance calculation if you want to continue line in nicer
          // way since if it is near parent you can continue in a smooth way.... but it isnt accurate even if it looks better
            if (prev != 0) {
              distCalc = dist(prev.xv, prev.yv, fx, fy);
            }
          }
        }
      });
      //console.log(distCalc);
      if (accurate_dfs) {
        if (continue_line) { // if (distCalc <= sqrt(2))
          this.returnPath.push({xv: fx, yv: fy});

        } else {
          this.returnPath.push(prev)
          this.returnPath.push({xv: this.list[this.list[step].parent].x, yv: this.list[this.list[step].parent].y})
          this.returnPath.push({xv: fx, yv: fy});
        }
      } else {
        if (distCalc <= 1.5) { // if (distCalc <= sqrt(2))
          this.returnPath.push({xv: fx, yv: fy});

        } else {
          this.returnPath.push(prev)
          this.returnPath.push({xv: this.list[this.list[step].parent].x, yv: this.list[this.list[step].parent].y})
          this.returnPath.push({xv: fx, yv: fy});
        }
      }
      prev = {xv: fx, yv: fy};
    });
  }
  
}