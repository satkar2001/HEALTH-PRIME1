(function($) {
    'use strict';
    window.app = window.app || { };

    window.app.DailyTotalView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element
        self: this,
        dayTotals: [0, 0, 0, 0, 0, 0, 0],
        dayProtein:[0, 0, 0, 0, 0, 0, 0],
        dayCarbs:[0, 0, 0, 0, 0, 0, 0],
        dayFats:[0, 0, 0, 0, 0, 0, 0],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

        events: {
            "click button#clear": "clearData"
        },

        initialize: function() {
            _.bindAll(this, 'render', "updateDayTotal"); // every function that uses 'this' as the current object should be in here
            self = this;
            var sunday = 0,
                saturday = 6;
            var localStore = window.localStorage;
            for (var i = sunday; i < saturday; i++) {
                var dayItemStorage = localStore.getItem(i);
                if (dayItemStorage) {
                    var jsonDayItemStorage = JSON.parse(dayItemStorage);
                    var totalCaloriesInDay = 0;
                    var totalProteinInDay=0;
                    var totalCarbsInDay=0;
                    var totalFatsInDay=0;

                    for (var j = 0; j < jsonDayItemStorage.length; j++) {
                        var dayItem = jsonDayItemStorage[j];
                        totalCaloriesInDay += dayItem["calories"];
                        totalProteinInDay += dayItem["protein"];
                        totalCarbsInDay += dayItem["carbs"];
                        totalFatsInDay +=dayItem["fats"];
                    }
                    this.dayTotals[i] = totalCaloriesInDay;
                    this.dayProtein[i]=totalProteinInDay;
                    this.dayCarbs[i]=totalCarbsInDay;
                    this.dayFats[i]=totalFatsInDay;
                }
            }
        },
        updateDayTotal: function(e) {
            var todayDateIndex = new Date().getDay();
            var dateTotal = parseFloat(this.dayTotals[todayDateIndex]);
            var dateProtein=parseFloat(this.dayProtein[todayDateIndex]);
            var dateCarbs=parseFloat(this.dayCarbs[todayDateIndex]);
            var dateFats=parseFloat(this.dayFats[todayDateIndex]);
            dateTotal += parseFloat(e.get("calories"));
            dateProtein += parseFloat(e.get("protein"));
            dateCarbs +=parseFloat(e.get("carbs"));
            dateFats += parseFloat(e.get("fats"));
            this.dayTotals[todayDateIndex] = dateTotal;
            this.dayProtein[todayDateIndex]=dateProtein;
            this.dayCarbs[todayDateIndex]=dateCarbs;
            this.dayFats[todayDateIndex]=dateFats;
            this.render();
        },
        clearData: function() {
            window.localStorage.clear();
        },
        render: function() {
             var cl=0;
             var pr=0;
             var ca=0;
             var ft=0;
            $("#totals-by-day").empty();
            for (var i = 0; i < this.dayTotals.length,i<this.dayProtein.length,i < this.dayCarbs.length,i < this.dayFats.length; i++) {
                $("#totals-by-day").append("<tr> <td> " + this.dayNames[i] + " </td> <td>  cal: " + parseInt(this.dayTotals[i]) + "  </td><td> prot: " + parseInt(this.dayProtein[i]) + " </td> <td>  carb: " + parseInt(this.dayCarbs[i]) + " </td>  <td> fats: " +parseInt(this.dayFats[i]) + "</td> </tr>");
                cl+=parseInt(this.dayTotals[i]);
                pr+=parseInt(this.dayProtein[i]);
                ca+=parseInt(this.dayCarbs[i]);
                ft+=parseInt(this.dayFats[i])
            }

            let myChart = document.getElementById('myChart').getContext('2d');
            let nutriChart = new Chart(myChart, {
                type: 'bar',
            data: {
                labels: ['Calories', 'Protein', 'Carbs', 'Fats'],
                datasets: [{
                    label: 'Nutrients',
                    data: [cl, pr, ca, ft],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
            });

        }

    });
})(jQuery);
