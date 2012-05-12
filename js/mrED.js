(function(window) {

    function MrED(imageSource, radius) {
        if (imageSource === undefined) imageSource = '';
        if (radius === undefined) radius = 38;
        this.oldX = 0;
        this.oldY = 0;
        this.radius = radius;
        this.scale = 1;
        this.imageSource = imageSource;
        this.initialize();
    }

    MrED.prototype = new Container();

    MrED.prototype.vx = 0;
    MrED.prototype.vy = 0;
    MrED.prototype.friction = 0.9;
    MrED.prototype.thrust = 0;
    MrED.prototype.vr = 0;
    MrED.prototype.stokeWidth = 5;
    MrED.prototype.objectWidth;
    MrED.prototype.objectHeight;
    MrED.prototype.radius;
    MrED.prototype.bounds;
    MrED.prototype.imageSource;

    MrED.prototype.Container_initialize = MrED.prototype.initialize;
    MrED.prototype.initialize = function() {
        this.Container_initialize();

        this.shadow = new Shadow("#666", 3, 0, 0);

        if (this.imageSource != '' ) {
            var bmp = new Bitmap(this.imageSource.result);
            this.addChild(bmp);
        }
        else {
            var edGraphic = generateEDGraphic(this.radius, this.stokeWidth);
            this.addChild(edGraphic);
            this.objectWidth = this.radius *2.5;
            this.objectHeight = this.radius *2.5;
        }
    }

    MrED.prototype.tick = function() {
       this.rotation += this.vr;
        var angle = this.rotation * Math.PI/180,
            ax = Math.cos(angle) * this.thrust,
            ay = Math.sin(angle) * this.thrust,
            left = this.bounds.x,
            right = this.bounds.width,
            top = this.bounds.y,
            bottom = this.bounds.height;

            this.vx += ax;
            this.vy += ay;
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.x += this.vx;
            this.y += this.vy;

            /*var speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy),
                angle = Math.atan2(this.vy, this.vx);
            var  left = this.bounds.x,
            right = this.bounds.width,
            top = this.bounds.y,
            bottom = this.bounds.height;

            if( speed > this.friction)
            {
                speed -= this.friction;
            }
            else { speed = 0; }

            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.x += this.vx;
            this.y += this.vy;*/

            if (this.x - this.objectWidth/2 > right) {
                this.x = left - this.objectWidth/2;
            }
            else if (this.x+this.objectWidth/2 < left) {
                this.x = right + this.objectWidth/2;
            }
            if (this.y - this.objectHeight/2 > bottom) {
                this.y = top - this.objectHeight /2;
            }
            else if (this.y+this.objectHeight/2 < top)
            {
                this.y = bottom + this.objectHeight /2;
            }
    }

    function handleImageLoad() {
       var bmp = new Bitmap(this.img);
       this.addChild(bmp);
    }

    function generateEDGraphic(r, sw) {
        var g = new Graphics();
        g.setStrokeStyle(sw);
        g.beginStroke(Graphics.getRGB(0,0,0));
        g.beginFill(Graphics.getRGB(255,255,255));
        g.arc(0,0,r,-Math.PI/2,Math.PI/2);
        g.closePath();
        g.endFill();
        g.moveTo(0, -r);
        g.lineTo(-r*0.8, -r); 
        g.moveTo(0,0);
        g.lineTo(-r*0.8, 0); 
        g.moveTo(0,r);
        g.lineTo(-r*0.8, r); 
        g.endStroke();
        g.beginFill(Graphics.getRGB(0,0,0));
        g.drawCircle(r/2,-r/3,3);
        g.endFill();
        var s = new Shape(g);
        s.cache(-r-5, -r-5, (r+5)*2, (r+5)*2 );
        return s;
    }
    window.MrED = MrED;
}(window));