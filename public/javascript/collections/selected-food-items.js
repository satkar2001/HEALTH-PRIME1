(function($) {
	'use strict';
    window.app = window.app || { };
    // **List class**: A collection of `Item`s. Basically an array of Model objects with some helper functions.

    window.app.SelectedList = Backbone.Collection.extend({
        model: window.app.Item
    });

})(jQuery);