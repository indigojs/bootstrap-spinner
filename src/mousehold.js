/**
 * jQuery mousehold plugin - fires an event while the mouse is clicked down.
 * Additionally, the function, when executed, is passed a single
 * argument representing the count of times the event has been fired during
 * this session of the mouse hold.
 *
 * @author Remy Sharp (leftlogic.com)
 * @date 2006-12-15
 * @example $("img").mousehold(200, function(i){  })
 * @desc Repeats firing the passed function while the mouse is clicked down
 *
 * @name mousehold
 * @type jQuery
 * @param Number timeout The frequency to repeat the event in milliseconds
 * @param Function fn A function to execute
 * @cat Plugin
 */

+function ($) {
  'use strict';

  // MOUSEHOLD PLUGIN DEFINITION
  // ===========================

  $.fn.mousehold = function(timeout, fn) {
    if (timeout && typeof timeout == 'function') {
      fn = timeout
      timeout = 100
    }

    if (fn && typeof fn == 'function') {
      var interval = 0
      var fireStep = 0
      var clearMousehold = undefined;

      return this.each(function() {
        $(this).mousedown(function() {
          fireStep = 1
          var ctr = 0
          var t = this

          interval = setInterval(function() {
            ctr++
            fn.call(t, ctr)
            fireStep = 2
          }, timeout)
        })

        clearMousehold = function() {
          clearInterval(interval)
          if (fireStep == 1) fn.call(this, 1)
          fireStep = 0
        }

        $(this).mouseout(clearMousehold)
        $(this).mouseup(clearMousehold)
      })
    }
  }

}(jQuery);
