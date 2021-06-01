(function($) {
    'use strict';
    var AppView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element
        self: this,

        // `events`: Where DOM events are bound to View methods. Backbone doesn't have a separate controller to handle such bindings; it all happens in a View.
        events: {
            "click button#search": "getJSONResults",
            "click button#clear": "clearResults",
            "keypress input#search-val" : "checkAndSubmitresults"
        },

        initialize: function() {
            _.bindAll(this, 'render', 'getJSONResults', 'clearResults'); // every function that uses 'this' as the current object should be in here
            this.totalView = new window.app.DailyTotalView();
            this.selectedListView = new window.app.SelectedListView();
            self = this;
            this.selectedListView.getCollection().bind('add', this.appendItem); // collection event binder
            _(this.selectedListView.getCollection().models).each(function(item) { // in case collection is not empty
                self.appendItem(item);
            }, this);
            this.render();
            this.totalView.render();
            this.selectedListView.render();
        },
        // `render()` now introduces a button to add a new list item.
        render: function() {
            $(this.el).append("<main id='app'><header> <h1>log your today's diet </h1> <form><input type='text' placeholder='Search' name='focus' class='search-box' id='search-val'>  <button type='button' class='appButton' id='search' > Search </button> <button class='appButton' id='clear' > Clear </button>  </form> </header><div id='food-options'> <h2> Food Search Results </h2> <ul id='search-results'> </ul> </div><div id='selected-food'> <h2> Selected Food Items </h2> <ul id='selected-items'> </ul> </div><div id='daily-totals'> <h2> Daily Totals </h2> <table id='totals-by-day'> </table></div><div id='hii'> </div>  </main>");
        },
        getJSONResults: function() {
            self.clearResults();
            self.selectedListView.clearCollection();
            var e = $("#search-val").val(),
                a = "https://api.nutritionix.com/v1_1/search/" + e + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_protein,nf_total_carbohydrate,nf_total_fat&appId=323fe4ef&appKey=9b8af06a3904049cbd7fea787d4088a6";
            $.ajax({
                method: "GET",
                url: a,
                dataType: "json",
                success: function(e) {
                    if(e.hits.length === 0) {
                        $("#search-results").append("<p>Couldn't find any food of that name</p>");
                    }

                    for (var a = e.hits, i = 0; i < 8; i++) {
                        var fields = a[i].fields;
                        var item = new window.app.Item();
                        // modify item defaults

                        item.set({
                            name: fields['item_name'],
                            brandName: fields['brand_name'],
                            calories: fields['nf_calories'],
                            protein:fields['nf_protein'],
                            carbs:fields['nf_total_carbohydrate'],
                            fats:fields['nf_total_fat'],
                            index: i
                        });

                        self.selectedListView.getCollection().add(item);
                        //add item to collection; view is updated via event 'add'
                    }
                },
                error: function() {
                    $("#search-results").append("<p>Couldn't get food data. Check your internet connection or try again later.</p>");
                }
            });
        },
        checkAndSubmitresults : function(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                self.getJSONResults();
            }
        },
        clearResults: function() {
            $("#search-results").empty();
        },
        appendItem: function(item) {
            $('#search-results', this.el).append("<li class='foodItem'>  <span class='foodName'>" + item.get('name') + "</span><span class='calorieValue'> cal:  " + item.get('calories') + "  </span> <span class='proteinValue'>  protein:  "+item.get('protein') +" g </span> <span class='carbValue'>  carbs: "+item.get('carbs')+" g </span> <span class='fatValue'>  fats : "+item.get('fats')+ " g </span> <button name='addToTotal' class='appButton' data-index='" + item.get('index') +"'> Add </button> </li>");
        }
    });

    var appView = new AppView();
})(jQuery);
