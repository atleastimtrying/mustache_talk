talk.templates = {
  slide: 'templates/slide.mst',
  alt_slide: 'templates/alt_slide.mst',
  bells_and_whistles: 'templates/bells_and_whistles.mst'
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