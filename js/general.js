 $(document).ready(function(){
   $("#lifestream-github").lifestream({
      limit: 4,
      list:[
        {
          service: "github",
          user: "roccosportal"
        }
      ]
  });
  $("#lifestream-stackoverflow").lifestream({
      limit: 4,
      list:[
        {
          service: "stackoverflow",
          user: "1307375"
        }
      ]
  });


 
  var projectPagination = BootstrapPagination();
  projectPagination.init({
    $pagination : $('#projects .pagination'),
    $pages : $('#projects .project-row'),
    $gotoLinks : $('.go-to-project'),
    hashStartsWith : '#project',
    hideAndShow : function($hide, $show){
      $hide.fadeOut(function(){
         $show.fadeIn();
      });
     
    }
  });

  var stuffPagination = BootstrapPagination();
  stuffPagination.init({
    $pagination : $('#stuff .pagination'),
    $pages : $('#stuff .stuff-row'),
    $gotoLinks : $('.go-to-stuff'),
    hashStartsWith : '#stuff',
    hideAndShow : function($hide, $show){
      $hide.fadeOut(function(){
         $show.fadeIn();
      });
     
    }
  });

});

