// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class DesignerNode
{
  constructor ()
  {
    this.position = createVector(0,0);
    this.size = createVector(20,20);
    this.isPressed = false;
    this.magSq = this.size.magSq();
  }

  update(deltaTime)
  {
    if (mouseIsPressed)
    {

        var mousePos = createVector(mouseX - width/2, mouseY - height/2);
        var distanceVector = createVector(0, 0);

        p5.Vector.sub(this.position, mousePos, distanceVector);

        if (distanceVector.magSq() <= this.magSq)
        {
          this.isPressed = true;

          this.position = mousePos;
        }

    }
    else
    {
        this.isPressed = false;
    }


  }

  draw()
  {
    stroke(255);
    strokeWeight(0);
    fill(255);

    ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
  }

}
