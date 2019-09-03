
class HorizontalStarField extends StarField {
  protected direction:number = 1;

  protected randomizeStar(s: Star) {
    s.speed = Math.round(Math.random() * this.maxSpeed) + 1;
    s.x = Math.round(Math.random() * this.width * 2- this.width ) ;
    s.y = Math.round(Math.random() * this.height * 2 - this.height );
    s.z = Math.round(Math.random() * this.maxDistance);
  }

  protected moveStars() {
    this.stars.forEach((star:Star) => {
      if (star.active) {
        if (this.direction < 0) {
          // right to left
          star.x-=star.speed;
          if (star.x < -this.width) {
            star.active = false;
          }
        } else {
          // left to right
          star.x+=star.speed;
          if (star.x > this.width) {
            star.active = false;
          }
        }
      } else {
        this.randomizeStar(star);
        star.active = true;
      }
    });
  }
}