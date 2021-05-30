(function($) {
    'use strict';
    window.app = window.app || { };
    // **Item class**: The atomic part of our Model. A model is basically a Javascript object, i.e. key-value pairs, with some helper functions to handle event triggering, persistence, etc.
    window.app.Item = Backbone.Model.extend({
        defaults: {
            name: '',
            brand: '',
            calories: 0,
            index: -1
        }
    });
})(jQuery);