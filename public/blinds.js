(function(exports,$) {

  var positions = ['center','left','center','right'];
  var sway_cycle = [0,1,0,2];
  var durations = [375,400,350,450];

  Blind = function(blind_div,offset) {
    this.blind_div = blind_div;
    this.offset = offset;
    this.cycle = new Cycle(sway_cycle);
    this.init();
  };

  Blind.prototype.init = function() {
      this.random_index = Math.floor(Math.random() * 4);
      var beginning_blind_position = positions[this.random_index];

      this.cycle.setCurrent(this.random_index);
      $.each(['center','left','right'],function(i,position) {
        var opacity = 0;
        if( position === beginning_blind_position )
        {
          opacity = 1;
        }
        var img = 
          $('<img/>')
            .attr('src','public/images/blind_' + position + '.gif')
            .css('position','absolute')
            .css('top','0')
            .css('left',this.offset * 20 + 'px')
            .css('opacity',opacity)
            .css('display','block')
            .css('margin','-3px auto 0')
            .css('z-index',this.random_index);
        $(this.blind_div).append(img);
      }.bind(this));
        
  };

  Blind.prototype.getDuration = function() {
      return durations[this.random_index];
  };

  Blind.prototype.sway = function(duration) {
      if( typeof duration === 'undefined' ) {
        duration = this.getDuration();
      }
      move($(this.blind_div).find('img')[this.cycle.current()])
        .set('opacity','0')
        .duration(duration)
        .ease('out')
        .on('start',function() {
          move($(this.blind_div).find('img')[this.cycle.next()])
            .set('opacity','1')
            .duration(duration)
            .ease('out')
            .end();
        }.bind(this))
        .end();
        setTimeout(function() {
          this.sway();
        }.bind(this),duration);
  };


  $.fn.blinds = function(options) {

    var defaults = {};
    options = $.extend({},defaults,options);
    
    this.each(function(i) {
      // create blind objects
      var blind = new Blind(this,i);
      // run
      blind.sway();
    });
    return this;
  };

})(this,jQuery);
