import $ from 'jquery';

class imgBright {

  constructor(element, width = 0, height = 0, xCoord = 0, yCoord = 0,callback) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.callback = callback;

    this.getImageLightness();
  }

  getImageLightness() {

      let imageSrc = this.element.css('background-image');

      if(imageSrc) {
          imageSrc = imageSrc.replace('url(','').replace(')','').replace(/\"/gi, "");
      } else {
          imageSrc = this.element.find('img');
          imageSrc = imageSrc.src;
      }
      let [offsetX, offsetY] = this.element.css('background-position').split(" ");

      offsetX = parseInt(offsetX)/100
      offsetY = parseInt(offsetY)/100

      let img = new Image();
      img.src = imageSrc;

      let colorSum = 0;

      img.onload = function() {
          // create canvas
          let canvas = document.createElement("canvas");
          canvas.width = this.element.outerWidth();
          canvas.height = this.element.outerHeight();

          if(this.width <= 0){
            this.width = canvas.width
          }
          if(this.height <= 0){
            this.height = canvas.height
          }

          if(typeof this.xCoord == "string" && this.xCoord.indexOf("%") >= 0){
            this.xCoord = parseInt(this.xCoord);
            this.xCoord = (this.xCoord == 0) ? 0 : (this.xCoord/100)*canvas.width;
          } else {
            this.xCoord = parseInt(this.xCoord);
          }
          if(typeof this.yCoord == "string" && this.yCoord.indexOf("%") >= 0){
            this.yCoord = parseInt(this.yCoord);
            this.yCoord = (this.yCoord == 0) ? 0 : (this.yCoord/100)*canvas.height;
          } else {
            this.xCoord = parseInt(this.xCoord);
          }

          let ctx = canvas.getContext("2d");

          this.drawImageProp(ctx, img,0,0,canvas.width,canvas.height,offsetX,offsetY);

          let imageData = ctx.getImageData(this.xCoord,this.yCoord,this.width,this.height);

          let data = imageData.data;
          let r,g,b,avg;

          for(let x = 0, len = data.length; x < len; x+=4) {
              r = data[x];
              g = data[x+1];
              b = data[x+2];

              avg = Math.floor((r+g+b)/3);
              colorSum += avg;
          }
          let brightness = Math.floor(colorSum / (this.width*this.height));
          this.callback(brightness);
      }.bind(this);
  };
  drawImageProp(ctx, img, x, y, w, h, offsetX = 0.5, offsetY = 0.5) {

      if (arguments.length === 2) {
          x = y = 0;
          w = ctx.canvas.width;
          h = ctx.canvas.height;
      }

      // keep bounds [0.0, 1.0]
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > 1) offsetX = 1;
      if (offsetY > 1) offsetY = 1;

      var iw = img.width,
          ih = img.height,
          r = Math.min(w / iw, h / ih),
          nw = iw * r,   // new prop. width
          nh = ih * r,   // new prop. height
          cx, cy, cw, ch, ar = 1;

      // decide which gap to fill
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
      nw *= ar;
      nh *= ar;

      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  };
}
export default function imgBright(element, width = 0, height = 0, xCoord = 0, yCoord = 0,callback) {
  return new imgBright(element, width, height, xCoord, yCoord,callback);
}
