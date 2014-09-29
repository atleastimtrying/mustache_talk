$(function(){
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