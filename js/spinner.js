/* ========================================================================
 * Bootstrap: spinner.js v3.1.1
 * http://github.com/indigojs
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

    // Check for insane values
    var value = new Number(this.$element.val())
    if (isNaN(value)) this.$element.val(this.options.min)
  }

  Spinner.DEFAULTS = {
    step: 1,
    min: 0,
    max: Infinity,
    precision: 0
  }

  Spinner.prototype.increase = function() {
    this.step(this.options.step)
  }

  Spinner.prototype.decrease = function() {
    this.step(-this.options.step)
  }

  Spinner.prototype.step = function (value) {
    if (typeof value !== "number") value = new Number(value)
    if (isNaN(value)) return

    var current = new Number(this.$element.val())
    if (isNaN(current)) current = this.options.min

    this.change(current + value)
  }

  Spinner.prototype.change = function(value) {
    if (typeof value !== "number") value = new Number(value)
    if (isNaN(value)) value = this.options.min

    if (value < this.options.min) value = this.options.min
    if (value > this.options.max) value = this.options.max

    var e = $.Event('change.bs.spinner', { value: value })
    this.$element.trigger(e)

    e = $.Event('changed.bs.spinner')

    this.$element.val(value.toFixed(this.options.precision)).change().trigger(e)
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

  $(window).on('load', function () {
    $('[data-ride="spinner"]').each(function () {
      var $spinner = $(this)
      $spinner.spinner($spinner.data())
    })
  })

}(jQuery);
