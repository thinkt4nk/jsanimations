
/*
 * Context Menu
 *
 * Author: Ryan Bales, 2011
 */
(function(exports,$) {

  function ContextMenu(actions) {
    this.menu_list = $('<ul/>');
    this.menu_container = $('<div/>')
                            .attr('id','_ContextMenuContainer')
                            .append(
                              $('<h5/>')
                                .attr('id','_ContextMenuContainerHeader')
                                .text('jsAnimations Menu')
                            )
                            .append(this.menu_list)
                            .append(
                              $('<span/>')
                                .addClass('command')
                                .text('close')
                                .click(function() {
                                  $().ContextMenu('hide');
                                })
                            )
                            .appendTo('body')
                            .hide();
    this.menu_container.draggable().resizable();
    if( actions.length > 0 )
    {
      _.each(actions,function(action) {
        this.addAction(action.display,action.action,action.onClick);
      }.bind(this));
    }
  };
  /*
   * Inherits EventEmitter
   */
  ContextMenu.prototype = new EventEmitter();
  ContextMenu.prototype.constructor = ContextMenu;

  ContextMenu.prototype.show = function() {
    this.menu_container
      .css('left',this.calculateLeft())
      .css('top',this.calculateTop())
      .show();
  };

  ContextMenu.prototype.calculateLeft = function() {
    // temporary positioning
    return '20px';
  };

  ContextMenu.prototype.calculateTop = function() {
    // temporary positioning
    return '20px';
  };

  ContextMenu.prototype.hide = function() {
    this.menu_container.hide();
  };

  ContextMenu.prototype.addAction = function(display,action,onClick) {
    this.menu_list.append(
      $('<li/>')
        .attr('rel',action)
        .text(display)
        .click(function() {
          onClick.apply(this,arguments);
        })
    );
  };

  ContextMenu.prototype.removeAction = function(action) {
    this.menu_list.find('li[rel=' + action + ']').remove();
  };

  $.fn.ContextMenu = function() {
    if( arguments.length < 1 || typeof arguments[0] !== 'string' )
    {
      var actions = arguments[0] || [];
      this.each(function() {
        if( typeof exports._contextmenu === 'undefined' )
        {
          exports._contextmenu = new ContextMenu(actions);
          // bind to show
          document.onclick = function(e) {
            var isRightMB;
            e = e || window.event;
            e.preventDefault();

            if ('which' in e) // Gecko, Webkit
              isRightMB = e.which == 3;
            else if ('button' in e) // IE
              isRightMB = e.button == 2;

            if( isRightMB )
              exports._contextmenu.show();
          };
        }
      });
    } else { // Command interface
      if( typeof exports._contextmenu[arguments[0]] === 'function' )
      {
        var args = Array.prototype.slice.call(arguments,1);
        ContextMenu.prototype[arguments[0]].apply(exports._contextmenu,args);
      }
    }

    return this;
  };
  
})( this,jQuery ); // window, jQuery
