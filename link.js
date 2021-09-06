//CREATED BY AADI GOLECHA ON 3RD SEPTEMBER 2021
//link class to create an link between 2 bodies

class Link{
  //constructor with 2 perameter
    constructor(bodyA,bodyB)
    {
      var lastlink = bodyA.body.bodies.length-2;
     this.link = Constraint.create(
        {
          bodyA:bodyA.body.bodies[lastlink],
          pointA:{x:0,y:0},
          bodyB:bodyB,
          pointB:{x:0,y:0},
          length:-10,
          stiffness:0.01
        });
        World.add(engine.world,this.link);
    } 

    //function to break the link
    detach()
    {
      World.remove(engine.world,this.link);
     
    }
}

