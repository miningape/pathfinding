# Pathfinding in JS
This is a project that tried to analyse the main pathfinding algorithms that are used.
In the picture below you can see the interface we used to test the different algorithms.

There are a bunch of buttons below the canvas we used as well as some output windows to the right.
The most important buttons are "Randomize Map and Position" (Beneath "Automatic Map Editing" at the bottom) and the algorithm buttons "DFS, BFS, Dijkstra, A*" (in a cluster to the right of that).

The way I built it is such that every black dot is a node that can be travelled to. And you can 
travel between any adjacent nodes (both diagonal and cardinal). Any node that is a
cross cannot be travelled to. Every algorithm tries to
find the shortest path from the start (Green node) to the end (Red node).

![Picture Of Editor](images/Capture.PNG)

# Usage
The rest of the buttons and fields in the interface interact with the map in different ways.

To change the number of nodes, input the number of nodes you want (on one side) in the x, y fields, and press "new map" to the left of the fields.

The field below that is "Random/100" it expresses the percentage chance that any node is a cross after after pressing "random map" under
automatic map editing, by default it is at 30%. Random position randomizes the position of both the start and end nodes. "Random map and position" does both of these things at once, using the percentage in the field.

# Specification
It uses p5.js to draw everything.

# ToDo
- [ ] Fixup UI
- [ ] Add on page information

