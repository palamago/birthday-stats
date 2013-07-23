var BDStats;

;(function(global, document, $, d3){

    "use strict";

    BDStats = global.bdstats = global.bdstats || {};

	BDStats.greetingsBars;

	BDStats.greetingsPie;

	BDStats.$greetingsOrder = $('.greetings-order');

    BDStats.init = function () {
    	BDStats.$greetingsOrder.on('click',BDStats.orderGreetingsHandler)
        BDStats.greetingsBars = d3.birthdaybars('bar-stats-container', $('.container').width());
    	BDStats.greetingsBars.setData(GREETINGS);
        BDStats.greetingsPie = d3.birthdaypie('pie-stats-container', $('.container').width());
    	BDStats.greetingsPie.setData(GREETINGS);
    };

    BDStats.orderGreetingsHandler = function(type){
    	if($(this).hasClass('disabled'))
    		return;
	   	BDStats.$greetingsOrder.removeClass('disabled btn-inverse');
    	$(this).addClass('btn-inverse disabled');
    	BDStats.orderGreetings($(this).attr('data-type'));
    }

    BDStats.orderGreetings = function(type){
    	BDStats.greetingsBars.sort(type);
	   	//BDStats.greetingsPie.sort(type);
    }

})(window, document,jQuery, d3);

window.onload = function() {
    BDStats.init(); 
}