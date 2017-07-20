function checkH1(){
  var offset = $('h1').offset();
  $('.banner').imgBright({
    width: $('h1').outerWidth(),
    height: $('h1').outerHeight(),
    xCoord:offset.left,
    yCoord:offset.top,
    callback: function(brightness){
      if(brightness < 140)
        $("h1").addClass("dark");
      else
        $("h1").removeClass("dark");
    }
  });
}
$(document).ready(function(){
  $('.banner').imgBright({
    width:0,
    height:$('header').outerHeight(),
    xCoord:0,
    yCoord:0,
    callback: function(brightness){
      if(brightness < 140)
        $("header").addClass("dark");
    }
  });
  checkH1();

  $(document).keydown(function(e){
    if(e.which == 13) {
      var image = "images/"+(Math.floor((Math.random() * 5) + 1))+".jpeg";
      $(".banner").css('background-image', "url('"+image+"')");

      $('.banner').imgBright({
        width:0,
        height:$('header').outerHeight(),
        xCoord:0,
        yCoord:0,
        callback: function(brightness){
          if(brightness < 140)
            $("header").addClass("dark");
          else
            $("header").removeClass("dark");
        }
      });

      checkH1();
    }
  });
  $(document).click(function(e){
    $("h1").css('left',e.clientX);
    $("h1").css('top',e.clientY);
    checkH1();
  });
  $(window).resize(function(){
    checkH1();
  })
})
