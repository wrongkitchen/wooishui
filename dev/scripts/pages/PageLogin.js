'use strict';

define('PageLogin', ['PageBase'], function(pb){

	var _sgd = (window.sgd) ? window.sgd : {};

	return pb.extend({

		initialize: function(){
			
			document.addEventListener('deviceready', function(){

				if(_sgd.accessToken && _sgd.userUID){
					_sgd.init();
				} else {
					$('#beforeLogin .page-content').fadeIn();
				}

				$('.facebookLogin').on('click', function(){
					facebookConnectPlugin.login(['public_profile, user_friends'],
						function (pObj) {
							if(pObj.status === 'connected'){
								_sgd.accessToken = pObj.authResponse.accessToken;
								_sgd.userUID = pObj.authResponse.userID;
								window.localStorage.setItem('at', _sgd.accessToken);
								window.localStorage.setItem('uid', _sgd.userUID);
								_sgd.init();
							}
						},
						function (error) { 
							_sgd.framework7.alert('Login error', ['Please try again']);
						}
					);
				});
				
			}, false);

		},
		beforeShow: function(){
			if(_sgd.accessToken && _sgd.userUID){
				$('#beforeLogin .page-content').hide();
			}
		},
		onShow: function(pParam, next){
			if(!_sgd.accessToken || !_sgd.userUID){
				$('#beforeLogin .page-content').fadeIn();
			}

			next();
		}
	});

});
