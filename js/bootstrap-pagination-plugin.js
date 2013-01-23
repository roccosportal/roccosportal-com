var BootstrapPagination = function(){
    var me = {};


    /**
    * Initialize.
    *
    */
    me.init = function(options){
        me.options = $.extend({hashStartsWith : null, prev: 'Prev', next : 'Next', $gotoLinks : null, onPageChanged :null , hideAndShow : null},options);
        me.verifyAndCleanupOptions();
        me.$paginationPages = [];
        me.activePage = 0;
        me.buildPagination();


        if(me.options.$gotoLinks != null){
        me.options.$gotoLinks.click(function(e){
           e.preventDefault();
           page = me.findPageForId($(this).attr('href'));
            if(page != null){
              me.gotoPage(page);
            }
          });
        }
        if(me.options.hashStartsWith != null && location.hash != '' && location.hash.indexOf( me.options.hashStartsWith) == 0){
            page = me.findPageForId(location.hash);
            if(page != null){
              me.gotoPage(page);
            }
        }
    };


    /**
    * Verify if all options are set up correct.
    * Clean up options that are not neccessary. 
    *
    */
    me.verifyAndCleanupOptions = function(){
       if(typeof me.options.$pagination == 'undefined' || me.options.$pagination == null){
          throw new Exception('BootstrapPagination options: $pagination must be declared.');
       }
       if(typeof me.options.$pages == 'undefined' || me.options.$pages == null){
          throw new Exception('BootstrapPagination options: $pages must be declared.');
       }
       if(typeof me.options.prev == 'undefined' || me.options.prev == null){
          throw new Exception('BootstrapPagination options: prev must be declared.');
       }
      if(typeof me.options.next == 'undefined' || me.options.next == null){
          throw new Exception('BootstrapPagination options: next must be declared.');
       }
       if(typeof me.options.$gotoLinks == 'undefined' ){
           me.options.$gotoLinks = null;
       }
       if(typeof me.options.hashStartsWith == 'undefined' ){
           me.options.hashStartsWith = null;
       }
       if(typeof me.options.onPageChange == 'undefined' ){
           me.options.onPageChange = null;
       }
       if(typeof me.options.onPageChanged == 'undefined' ){
           me.options.onPageChanged = null;
       }
       if(typeof me.options.hideAndShow == 'undefined' ){
           me.options.hideAndShow = null;
       }
    };

    /**
    * Build the html for the pagination.
    *
    */
    me.buildPagination = function(){
      var $ul = $('<ul></ul>');
      var $li = null;
      me.$prev = $('<li data-page="'+ me.activePage +'"><a href="#">' + me.options.prev +'</a></li>');
      me.$prev.click(me.paginationPagesClick);
      me.validatePrev();
      $ul.append(me.$prev);
      for (var i = 0; i < me.options.$pages.length; i++) {
        $li = $('<li data-page="' + i +'"><a href="#" >' + (i + 1)+'</a></li>');
        $li.click(me.paginationPagesClick);
        me.$paginationPages.push($li);
        $ul.append($li);
      }
      me.$next = $('<li data-page="'+ me.options.$pages.length +'"><a href="#">' + me.options.next +'</a></li>');
      me.$next.click(me.paginationPagesClick);
      me.validateNext();
      $ul.append(me.$next);

      me.$paginationPages[me.activePage].addClass('active');

      me.options.$pagination.append($ul);
    }

    /**
    * Checks if the prev button has the correct attributes and sets them.
    *
    */
    me.validatePrev = function(){
      me.$prev.data('page', me.activePage - 1);
       if(me.activePage == 0){
          me.$prev.addClass('disabled');
       }
       else {
           me.$prev.removeClass('disabled');
       }
    }

    /**
    * Checks if the next button has the correct attributes and sets them.
    *
    */
    me.validateNext = function(){
       me.$next.data('page', me.activePage + 1);
       if(me.activePage == me.$paginationPages.length - 1){
          me.$next.addClass('disabled');
       }
       else {
           me.$next.removeClass('disabled');
       }
    }

    /**
    * Find a page that contains a html #id
    *
    */
    me.findPageForId = function(id){
      for (var i = 0; i < me.options.$pages.length; i++) {
         if(id == ('#' + me.options.$pages.eq(i).attr('id')) ||me.options.$pages.eq(i).find(id).length != 0){
              return i;
          }
      };
     
      return null;
    }

    /**
    * Goes to a page. Index starts with zero.
    * Returns a boolean if the page was changed.
    *
    */
    me.gotoPage = function(page){
      if(me.activePage != page){
          var lastPage = me.activePage;
          me.activePage = page;
          me.$paginationPages[lastPage].removeClass('active');
          me.$paginationPages[page].addClass('active');

          if(me.options.hideAndShow != null){
            me.options.hideAndShow(me.options.$pages.eq(lastPage), me.options.$pages.eq(page));
          }
          else {
              me.options.$pages.eq(lastPage).hide();
              me.options.$pages.eq(page).show();
          }

          if(me.options.onPageChanged != null){
            me.options.onPageChanged();
          }

          me.validatePrev();
          me.validateNext();
          return true;
      }
      return false;
    }

    /**
    * Gets triggered when the user clicks on a paginiation page.
    *
    */
    me.paginationPagesClick = function(e){
      e.preventDefault();
      if($(this).hasClass('disabled')){
        return false;
      }
      me.gotoPage($(this).data('page'));
    };

    return me;

 };