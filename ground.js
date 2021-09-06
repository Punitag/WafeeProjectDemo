//CREATED BY AADI GOLECHA ON 3RD SEPTEMBER 2021
//Ground class to create ground and floor

class Ground 
{
  //constructor with 4 perameter
  constructor(x, y, w,h) 
  {
    //making every object of the class still (static)
    let options = {
     isStatic:true
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

 //function to show the object
  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148,127,146);
    rect(pos.x,pos.y, this.w, this.h);
    pop();
  }
}
