window.talk = {
  templates: {
    slide: 'templates/slide.mst'
  }
};

talk.Renderer = function(){
  var lookup = function(label){
    return talk.templates[label];
  };

  var render = function(event, options){
    $.get(lookup(options.template),function(template){
      var html = Mustache.render(template, options.view);
      $('#display').html(html);
      options.complete(html);
    });
  };
  
  $(talk).on('render', render);
};

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
    view.position = position + 1;
    $(talk).trigger('render', {
      template: 'slide',
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

talk.Inputs = function(){
  $(window).on('keyup', function(event){
    if(event.keyCode === 32){
      $(talk).trigger('forward');
    }else{
      $(talk).trigger('backward');
    }
  });
};

$(function(){
  $(talk).on('ready', function(){
    $(talk).trigger('forward');
  });
  var slides = new talk.Slides();
  var renderer = new talk.Renderer();
  var inputs = new talk.Inputs();
  
});