import $ from 'jquery';
import imgBright from './imgBright';

$(document).ready(function(){
  imgBright($('.banner'), 0, $('header').outerHeight(), 0, 0,function(brightness){
    if(brightness < 140)
      $("header").addClass("dark");
  });
  imgBright($('.banner'), $('h1').outerWidth(), $('h1').outerHeight(), "10%", "30%",function(brightness){
    if(brightness < 140)
      $("h1").addClass("dark");
    else
      $("h1").removeClass("dark");
  });
  imgBright($('.banner'), $('h2').outerWidth(), $('h2').outerHeight(), "50px", "50%",function(brightness){
    if(brightness < 140)
      $("h2").addClass("dark");
    else
      $("h2").removeClass("dark");
  });

  $('.banner').click(function(){
    var image = "images/"+(Math.floor((Math.random() * 5) + 1))+".jpeg";
    $(".banner").css('background-image', "url('"+image+"')");

    imgBright($('.banner'), 0, $('header').outerHeight(), 0, 0,function(brightness){
      if(brightness < 140)
        $("header").addClass("dark");
      else
        $("header").removeClass("dark");
    });
    imgBright($('.banner'), $('h1').outerWidth(), $('h1').outerHeight(), "10%", "30%",function(brightness){
      if(brightness < 140)
        $("h1").addClass("dark");
      else
        $("h1").removeClass("dark");
    });
  });
  $(window).resize(function(){
    imgBright($('.banner'), $('h1').outerWidth(), $('h1').outerHeight(), "10%", "30%",function(brightness){
      if(brightness < 140)
        $("h1").addClass("dark");
      else
        $("h1").removeClass("dark");
    });
    imgBright($('.banner'), $('h2').outerWidth(), $('h2').outerHeight(), "50px", "50%",function(brightness){
      if(brightness < 140)
        $("h2").addClass("dark");
      else
        $("h2").removeClass("dark");
    });
  })
})
