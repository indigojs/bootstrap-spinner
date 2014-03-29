/* ========================================================================
 * Bootstrap: spinner.js v3.1.1
 * http://
 * ========================================================================
 * Copyright 2014 Márk Sági-Kazár
 * Licensed under MIT (https://github.com/indigojs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // SPINNER CLASS DEFINITION
  // =========================

  var Spinner = function (element, options) {
    this.$element = $(element)
    this.options  = options
  }

  Spinner.DEFAULTS = {
    min: 0,
    max: Infinity,
    precision: 0
  }

  Spinner.prototype.add = function (relatedTarget) {
    this.change($(relatedTarget).data('value'))
  }

  Spinner.prototype.change = function (num) {
    if (typeof num !== "number") num = new Number(num)
    var current = new Number(this.$element.val())

    // TODO: improve insane data handling
    if (isNaN(num) || isNaN(current) || num == 0) return
    var newVal = current + num
    newVal = newVal.toFixed(this.options.precision);

    var e = $.Event('change.bs.spinner', { target: this.$element, relatedTarget: num })
    this.$element.trigger(e)

    if (num < 0) {
      if (newVal <= this.options.min) newVal = this.options.min
    } else {
      if (newVal >= this.options.max) newVal = this.options.max
    }

    this.$element.val(newVal)
  }

  // SPINNER PLUGIN DEFINITION
  // =========================

  var old = $.fn.spinner

  $.fn.spinner = function (option, relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.spinner')
      var options = $.extend({}, Spinner.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : 'add'

      if (!data) $this.data('bs.spinner', (data = new Spinner(this, options)))

      if (typeof option == 'number') data.change(option)
      else if (action) data[action](relatedTarget)
    })
  }

  $.fn.spinner.Constructor = Spinner

  // SPINNER NO CONFLICT
  // ===================

  $.fn.spinner.noConflict = function () {
    $.fn.spinner = old
    return this
  }

  // SPINNER DATA-API
  // ================

  $(document).on('click.bs.spinner.data-api', '[data-toggle="spinner"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.spinner') ? 'add' : $target.data()

    if ($this.is('a')) e.preventDefault()

    $target.spinner(option, this)
  })

}(jQuery);
