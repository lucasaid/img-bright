(function($) {

  $.fn.imgBright = function(options) {

    // Establish our default settings
    var settings = $.extend({
      width: 0,
      height: 0,
      xCoord: 0,
      yCoord: 0
    }, options);

    var drawImageProp = function(ctx, img, x, y, w, h, offsetX = 0.5, offsetY = 0.5) {

      if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
      }

      // keep bounds [0.0, 1.0]
      if (offsetX < 0)
        offsetX = 0;
      if (offsetY < 0)
        offsetY = 0;
      if (offsetX > 1)
        offsetX = 1;
      if (offsetY > 1)
        offsetY = 1;

      var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r, // new prop. width
        nh = ih * r, // new prop. height
        cx,
        cy,
        cw,
        ch,
        ar = 1;

      // decide which gap to fill
      if (nw < w)
        ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h)
        ar = h / nh; // updated
      nw *= ar;
      nh *= ar;

      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // make sure source rectangle is valid
      if (cx < 0)
        cx = 0;
      if (cy < 0)
        cy = 0;
      if (cw > iw)
        cw = iw;
      if (ch > ih)
        ch = ih;

      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    };

    return this.each(function() {
      var imageSrc = $(this).css('background-image');

      if (imageSrc) {
        imageSrc = imageSrc.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      } else {
        imageSrc = $(this).find('img');
        imageSrc = imageSrc.src;
      }
      var offset = $(this).css('background-position').split(" ");

      offsetX = parseInt(offset[0]) / 100
      offsetY = parseInt(offset[1]) / 100

      var img = new Image();
      img.src = imageSrc;

      var colorSum = 0;
      var element = $(this);

      img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = element.outerWidth();
        canvas.height = element.outerHeight();

        if (settings.width <= 0) {
          settings.width = canvas.width
        }
        if (settings.height <= 0) {
          settings.height = canvas.height
        }

        if (typeof settings.xCoord == "string" && settings.xCoord.indexOf("%") >= 0) {
          settings.xCoord = parseInt(settings.xCoord);
          settings.xCoord = (settings.xCoord == 0)
            ? 0
            : (settings.xCoord / 100) * canvas.width;
        } else {
          settings.xCoord = parseInt(settings.xCoord);
        }
        if (typeof settings.yCoord == "string" && settings.yCoord.indexOf("%") >= 0) {
          settings.yCoord = parseInt(settings.yCoord);
          settings.yCoord = (settings.yCoord == 0)
            ? 0
            : (settings.yCoord / 100) * canvas.height;
        } else {
          settings.xCoord = parseInt(settings.xCoord);
        }

        var ctx = canvas.getContext("2d");

        drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, offsetX, offsetY);

        var imageData = ctx.getImageData(settings.xCoord, settings.yCoord, settings.width, settings.height);

        var data = imageData.data;
        var r,
          g,
          b,
          avg;

        for (var x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x + 1];
          b = data[x + 2];

          avg = Math.floor((r + g + b) / 3);
          colorSum += avg;
        }
        var brightness = Math.floor(colorSum / (settings.width * settings.height));
        settings.callback(brightness);
      };
    });

  }

}(jQuery));
