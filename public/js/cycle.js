
(function(exports) {

var Cycle = function(list) {
  if( list.length > 1 )
  {
    this._list = list;
    this._current = 0;
  }
  this.length = this._list.length;
};

Cycle.prototype.next = function() {
  if( typeof this._list[this._current + 1] !== 'undefined' )
  {
    this._current++;
  } else {
    this._current = 0;
  }
  return this.current();
};

Cycle.prototype.current = function() {
  return this._list[this._current];
};

Cycle.prototype.setCurrent = function(i) {
  if( typeof this._list[i] !== 'undefined' )
  {
    this._current = i;
  }
};

exports.Cycle = Cycle;

})( this ); // window
