$(document).ready(function(){
  var example1 = BootstrapPagination();
  example1.init({
    $pagination : $('#example1 .pagination'),
    $pages : $('#example1 .example1-page')
  });

  var example2 = BootstrapPagination();
  example2.init({
    $pagination : $('#example2 .pagination'),
    $pages : $('#example2 .example2-page'),
    $gotoLinks : $('.example2-goto'),
    hashStartsWith : '#example2'
  });

  var example3 = BootstrapPagination();
  example3.init({
    $pagination : $('#example3 .pagination'),
    $pages : $('#example3 .example3-page'),
    hideAndShow : function($hide, $show){
      $hide.fadeOut(function(){
         $show.fadeIn();
      });
    }
  });
});