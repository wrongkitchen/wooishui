'use strict';

define('NotificationHandler', function(){

	var pushNotification = null;

	var deviceToken = null;

	return Backbone.Model.extend({

		getDeviceToken: function(){
			return deviceToken;
		},

		initialize: function(){

			document.addEventListener('deviceready', function(){
	
				pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
				
				pushNotification.onDeviceReady({ pw_appid:"01C24-D0542" });

				pushNotification.registerDevice(
					function(status) {
						deviceToken = status['deviceToken'];
						console.warn('registerDevice: ' + deviceToken);
					},
					function(status) {
						console.warn('failed to register : ' + JSON.stringify(status));
						console.log(JSON.stringify(['failed to register ', status]));
					}
				);

				document.addEventListener('push-notification', function(event) {
					var notification = event.notification;
					alert(notification.aps.alert);
					pushNotification.setApplicationIconBadgeNumber(0);
				});
				 
				pushNotification.setApplicationIconBadgeNumber(0);

			}, false);

		}

	});

});
