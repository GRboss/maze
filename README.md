# Maze

That the world needs: yet another maze game!

The maze consists of rooms. There are three types of rooms:

* Marble rooms
* Dirt rooms
* Mud rooms

Each tires the Hero when he moves through it. The Marble rooms remove 1 health unit, the Dirt rooms 2 and the Mud rooms 3 units.
So if the Hero moves around unnecessarily avoinding battles, he will eventually die.
By pressing the Space bar the Hero shoots towards the direction he last moved. If he sits on a corner and he cannot shoot forward, another direction will selected randomly.

There are 10 Monsters in the maze of 3 types:

* Campe
* Demon
* Empusa

Each has different strength.
If the hero is lucky enough, none of them will be in his way. Normaly some of them will.
The monsters move randomly around.

Finally there are 2 types of Fruits that appear and disappear randomly:

* Apples
* Bananas

Wheather the Hero or a Monster gets into a room with a Fruit it consumes it and his health increases.

For Monster, Floor and Fruit types prototypical inheritance is used.
The Shot class applies the singleton pattern.
