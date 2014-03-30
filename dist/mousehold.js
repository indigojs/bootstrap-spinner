/* ========================================================================
 * mousehold.js v1.0.0
 * http://github.com/indigojs
 * ========================================================================
 * Copyright 2014 Márk Sági-Kazár
 * Original author 2006 Remy Sharp (leftlogic.com)
 * Licensed under MIT (https://github.com/indigojs/bootstrap-spinner/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // MOUSEHOLD PLUGIN DEFINITION
  // ===========================

  $.fn.mousehold = function(timeout) {
    timeout = typeof timeout !== 'undefined' ? timeout : 100;
    var interval = 0
    var fireStep = 0
    var clearMousehold = undefined;
    var e = $.Event('mousehold', { counter: 0 })

    return this.each(function() {
      $(this).mousedown(function() {
        fireStep = 1
        var t = this

        interval = setInterval(function() {
          e.counter++
          $(t).trigger(e)
          fireStep = 2
        }, timeout)
      })

      clearMousehold = function() {
        clearInterval(interval)
        if (fireStep == 1) {
          e.counter = 1
          $(this).trigger(e)
        }

        fireStep = 0
      }

      $(this).mouseout(clearMousehold)
      $(this).mouseup(clearMousehold)
    })
  }

  $(window).on('load', function () {
    $('[data-on="mousehold"]').each(function() {
      var $this = $(this)

      $this.mousehold($this.data('timeout'))
    })
  })

}(jQuery);
