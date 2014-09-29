talk.Slides = function(){
  var position = 0;
  var slides = [];
  
  $.getJSON('slides.json', function(data){
    slides = data;
    position = slides.length - 1;
    $(talk).trigger('ready');
  });
  
  var render = function(){
    var view = slides[position];
    if(view){
      view.position = position + 1;
    }
    $(talk).trigger('render', {
      template: 'alt_slide',
      view: view,
      complete: function(html){
        console.log(html);
      }
    });
  };

  var forward = function(){
    position += 1;
    if(position >= slides.length){
      position = 0;
    }
    render();
  };

  var backward = function(){
    position -= 1;
    if(position <= 0){
      position = slides.length - 1;
    }
    render();
  };

  $(talk).on('forward', forward);
  $(talk).on('backward', backward);
};