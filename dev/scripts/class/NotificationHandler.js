'use strict';

define('NotificationHandler', function(){

	var _sgd = (window.sgd) ? window.sgd : {};

	var pushNotification = null;

	var deviceToken = null;

	return Backbone.Model.extend({

		getDeviceToken: function(){
			return deviceToken;
		},

		initialize: function(){

			window.onNotification = function(event) {
				if(event.foreground === "0"){
					_sgd.changeSection('detail', { uid: event.messageFrom });
				} else if(event.foreground === "1"){
					_sgd.framework7.alert(event.alert, 'wooishui', function(){
						_sgd.changeSection('detail', { uid: event.messageFrom });
					});
				}
				_sgd.debtsCredits.credits.fetchDatas({ reset: true });
				if (event.badge){
					pushNotification.setApplicationIconBadgeNumber(function(){

					}, function(){

					}, event.badge);
				}
			}
			
		},

		registerDevice: function(pCallback){

				pushNotification = window.plugins.pushNotification;

				pushNotification.register(
					function(result){
						deviceToken = result;
						if(pCallback) pCallback(result);
					}, function(result){
						if(pCallback) pCallback(result);
					}, {
						"badge":"true",
						"sound":"true",
						"alert":"true",
						"ecb":"onNotification"
				});

		}

	});

});
