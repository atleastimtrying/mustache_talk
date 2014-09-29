talk.Inputs = function(){
  $(window).on('keyup', function(event){
    if(event.keyCode === 32){
      $(talk).trigger('forward');
    }else{
      $(talk).trigger('backward');
    }
  });
};