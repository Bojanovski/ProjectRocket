// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class ParticleEmitter
{
  constructor()
  {
    this.particles = []
    this.isActive = true;

    this.size = createVector(10,10);

    this.position = createVector(0,0);
    this.direction = createVector(1,1).normalize();

    this.particlesCount = 0;


    //for particles
    this.maxSpeed = 10.0;
    this.minSpeed = 2.0;

    this.startSize = createVector(5, 5);
    this.endSize = createVector(5, 5);

    this.particleLifetime = 1.0;

    this.startColor = color('#ffffffff');
    this.endColor = color('#ffffff00');

    this.counter = 0;

    this.randomSize = false;
    this.randomDirection = false;

  }

  //should called once for setting general params
  setup(maxParticlesCount, position, minSpeed, maxSpeed, direction, size, particleStartSize, particleEndSize, particleLifetime, startColor, endColor)
  {
      this.position = position;
      this.direction = direction.normalize();
      this.maxSpeed = maxSpeed;
      this.minSpeed = minSpeed;
      this.size = size;
      this.particlesCount = maxParticlesCount;
      //for particles
      this.startSize = particleStartSize;
      this.endSize = particleEndSize;

      this.particleLifetime = particleLifetime;

      this.startColor = startColor;
      this.endColor = endColor;

      for(var i = 0; i < this.particlesCount; ++i)
      {
        var item = new ParticleSystemItem();


        if (this.randomSize)
        {
          var newSize = createVector(0,0);
          newSize.x = random(this.startSize.x, this.endSize.x);
          newSize.y = newSize.x;

          item.startSize = newSize;
          item.endSize = newSize;
        }
        else {
          item.startSize = this.startSize;
          item.endSize = this.endSize;

        }

        item.lifeTime = this.particleLifetime;
        item.lifeTimer = 0.0;

        item.pos.x = this.position.x + random(-size.x, size.x);
        item.pos.y = this.position.y + random(-size.y, size.y);

        var newSpeed = createVector(0,0);

        if (!this.randomDirection)
        {
          p5.Vector.mult(this.direction, random(this.minSpeed, this.maxSpeed), newSpeed);
        }
        else
        {
          var newdir = createVector(0,0);
          newdir.x = random(-this.size.x, this.size.x);
          newdir.y = random(-this.size.y, this.size.y);
          newdir.normalize();

          p5.Vector.mult(newdir, random(this.minSpeed, this.maxSpeed), newSpeed);

        }

        item.speed = newSpeed;

        item.startColor = this.startColor;
        item.endColor = this.endColor;

        item.isActive = this.isActive;

        this.counter += 1;
        if(this.counter > this.particlesCount)
        {
          this.counter = 0;
        }
        item.delay = this.counter * random(0.0, item.lifeTime / this.particlesCount);

        this.particles.push(item);



      }
  }

  //call whenever updated is updated
  emit(isOn, position, direction)
  {
    this.isActive = isOn;
    this.position = position;
    this.direction = direction.normalize();
  }

  update(deltaTime)
  {
    if (this.isActive)
    {
      for(var i = 0; i < this.particles.length; ++i)
      {
        this.particles[i].update(deltaTime);

        if (!this.particles[i].isActive)
        {
          var newpos = createVector(0,0);
          newpos.x = this.position.x + random(-this.size.x, this.size.x);
          newpos.y = this.position.y + random(-this.size.y, this.size.y);

          var speed = createVector(0,0);

          if (!this.randomDirection)
          {

            p5.Vector.mult(this.direction, random(this.minSpeed, this.maxSpeed), speed);

          }
          else
          {
            var newdir = createVector(0,0);
            newdir.x = random(-this.size.x, this.size.x);
            newdir.y = random(-this.size.y, this.size.y);
            newdir.normalize();
            p5.Vector.mult(newdir, random(this.minSpeed, this.maxSpeed), speed);


          }

          if (this.randomSize)
          {
            var newSize = createVector(0,0);
            newSize.x = random(this.startSize.x, this.endSize.x);
            newSize.y = newSize.x;//random(this.startSize.y, this.endSize.y);

            this.particles[i].startSize = newSize;
            this.particles[i].endSize = newSize;
          }


          this.particles[i].reset(newpos, speed);

          this.counter += 1;
          if(this.counter > this.particlesCount)
          {
            this.counter = 0;
          }

          this.particles[i].delay = this.counter * random(0.0, this.particles[i].lifeTime / this.particlesCount);


        }

      }


    }


  }

  draw()
  {
    if (this.isActive)
    {
      for(var i = 0; i < this.particles.length; ++i)
      {
        this.particles[i].draw();

      }
    }

  }


}
