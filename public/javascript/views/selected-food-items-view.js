(function($) {
    'use strict';
    window.app = window.app || { };

    window.app.SelectedListView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element
        self: this,
        template: _.template($('#fooditem-template').html()),
        selectedItemsForToday: [],
        events: {
            "click button[name='addToTotal']": "selectItem"
            // "click button#save": "saveData"
        },
        initialize: function() {
            _.bindAll(this, 'render', 'getCollection', 'selectItem');
            this.collection = new window.app.SelectedList();
        },
        selectItem: function(event) {
            var currentElement = event.currentTarget;
            var $currentIndex = $(currentElement).attr("data-index");
            var e = new window.app.Item({
                name: this.collection.models[$currentIndex].get("name"),
                calories: this.collection.models[$currentIndex].get("calories"),
                protein:this.collection.models[$currentIndex].get("protein"),
                carbs:this.collection.models[$currentIndex].get("carbs"),
                fats:this.collection.models[$currentIndex].get("fats"),
                index: $currentIndex
            });
            $('#selected-items', this.el).append(this.template(e.attributes));
            this.addToTotal(e);
            $("#search-results").empty();
            this.clearCollection();
        },
        getCollection: function() {
            return this.collection;
        },
        clearCollection: function() {
            this.collection.reset();
        },
        render: function() {
            var localStore = window.localStorage;
            var currentDay = new Date().getDay();
            var dayItemStorage = localStore.getItem(currentDay);
            if (dayItemStorage) {
                var jsonDayItemStorage = JSON.parse(dayItemStorage);
                for (var j = 0; j < jsonDayItemStorage.length; j++) {
                    var jsonItem = jsonDayItemStorage[j];
                    $('#selected-items', this.el).append(this.template(jsonItem));
                    var e = new window.app.Item({
                        name: jsonItem["name"],
                        calories: jsonItem["calories"],
                        protein:jsonItem["protein"],
                        carbs:jsonItem["carbs"],
                        fats:jsonItem["fats"],
                        index: jsonItem["Index"]
                    });

                    this.selectedItemsForToday.push(e);
                }
            }
        },
        // saveData: function() {
        //     var todayDateIndex = new Date().getDay();
        //     var stringifiedObject = JSON.stringify(this.selectedItemsForToday);
        //     window.localStorage.setItem(todayDateIndex, stringifiedObject);
        // },
        addToTotal: function(e) {
            this.selectedItemsForToday.push(e);
            self.totalView.updateDayTotal(e);
            //TODO
        }
    });
})(jQuery);
