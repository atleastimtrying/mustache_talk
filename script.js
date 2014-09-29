window.talk = {
  templates: {
    slide: 'templates/slide.mst',
    alt_slide: 'templates/alt_slide.mst',
    bells_and_whistles: 'templates/bells_and_whistles.mst'
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
  $(talk).on('b_w', function(){
    var view = {
      title: 'bells & whistles',
      table: 
      [
        ['cell1a','cell1b','cell1c','cell1d'],
        ['cell2a','cell2b','cell2c','cell2d'],
        ['cell3a','cell3b','cell3c','cell3d'],
        ['cell4a','cell4b','cell4c','cell4d'],
      ],
      present:true,
      unescaped: '<h1>THIS <br>IS <br>SOME <br>UNESCAPED <br>HTML!</h1>'
    };
    $(talk).trigger('render',{
      template: 'bells_and_whistles',
      view: view,
      complete: function(html){
        console.log(html);
      }
    })
  });
});