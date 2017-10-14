class ParticleSystemItem
{
  constructor(speed, speedY, x, y, width)
  {
    this.isActive = true;

    this.startSize = createVector(5, 5);
    this.endSize = createVector(5, 5);

    this.lifeTime = 1.0;
    this.lifeTimer = 1.0;

    this.pos = createVector(0,0);
    this.speed = createVector(10.0, 10.0);

    this.startColor = color('#ffffffff');
    this.endColor = color('#ffffff00');

    this.delay = 0.0;

  }

  reset(position, speed)
  {
    this.lifeTimer = 0;
    this.isActive = true;

    this.pos = position;
    this.speed = speed;

  }

  inactivate()
  {
    this.lifeTimer = this.lifeTime
    this.isActive = false;
  }

  update(deltaTime)
  {
      if (this.isActive)
      {
        if (this.delay <= 0)
        {
          this.lifeTimer += deltaTime;

          var newSpeed = createVector(0,0);
          p5.Vector.mult(this.speed, deltaTime, newSpeed)

          this.pos.x += this.speed.x * deltaTime;
          this.pos.y += this.speed.y * deltaTime;

          if (this.lifeTimer >= this.lifeTime)
          {
            this.inactivate();
          }
        }
        else
        {
          this.delay -= deltaTime;
        }
      }


  }

  draw()
  {
    if (this.isActive)
    {
      if (this.delay <= 0)
      {
        const lifePercent = (this.lifeTime - this.lifeTimer) / this.lifeTime;
        const finalColor = lerpColor(this.endColor, this.startColor, lifePercent);

        stroke(finalColor);
    		strokeWeight(0);
    		fill(finalColor);

        const finalSize = p5.Vector.lerp(this.endSize, this.startSize, lifePercent);

        ellipse(this.pos.x, this.pos.y, finalSize.x, finalSize.y);
      }

    }

  }
}
