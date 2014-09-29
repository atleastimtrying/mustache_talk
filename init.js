$(function(){
  $(talk).on('ready', function(){
    $(talk).trigger('forward');
  });
  var slides = new talk.Slides();
  var renderer = new talk.Renderer();
  var inputs = new talk.Inputs();
});