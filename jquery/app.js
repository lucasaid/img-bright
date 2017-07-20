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
  $('.banner').imgBright({
    width: $('h1').outerWidth(),
    height:$('h1').outerHeight(),
    xCoord:"10%",
    yCoord:"30%",
    callback: function(brightness){
      if(brightness < 140)
        $("h1").addClass("dark");
      else
        $("h1").removeClass("dark");
    }
  });

  $('.banner').click(function(){
    var image = "/images/"+(Math.floor((Math.random() * 5) + 1))+".jpeg";
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

    $('.banner').imgBright({
      width: $('h1').outerWidth(),
      height:$('h1').outerHeight(),
      xCoord:"10%",
      yCoord:"30%",
      callback: function(brightness){
        if(brightness < 140)
          $("h1").addClass("dark");
        else
          $("h1").removeClass("dark");
      }
    });
  });
  $(window).resize(function(){
    $('.banner').imgBright({
      width: $('h1').outerWidth(),
      height:$('h1').outerHeight(),
      xCoord:"10%",
      yCoord:"30%",
      callback: function(brightness){
        if(brightness < 140)
          $("h1").addClass("dark");
        else
          $("h1").removeClass("dark");
      }
    });
  })
})
