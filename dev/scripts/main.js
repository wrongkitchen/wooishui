'use strict';

// @codekit-prepend "../bower_components/jquery/dist/jquery.js";
// @codekit-prepend "../bower_components/underscore/underscore.js";
// @codekit-prepend "../bower_components/backbone/backbone.js";
// @codekit-prepend "../bower_components/momentjs/moment.js";
// @codekit-prepend "../bower_components/framework7/dist/js/framework7.js";
// @codekit-prepend "../bower_components/framework7-keypad/dist/framework7.keypad.js";
// @codekit-prepend "../bower_components/requirejs/require.js";
// @codekit-prepend "class/CreditDetailView.js";
// @codekit-prepend "class/NotificationHandler.js";
// @codekit-prepend "class/CreditView.js";
// @codekit-prepend "class/DebtsCredits.js";
// @codekit-prepend "class/FacebookHelper.js";
// @codekit-prepend "class/PopupFriendList.js";
// @codekit-prepend "class/RejectedView.js";
// @codekit-prepend "pages/PageBase.js";
// @codekit-prepend "pages/PageLogin.js";
// @codekit-prepend "pages/PageHome.js";
// @codekit-prepend "pages/PageDetail.js";
// @codekit-prepend "pages/PageForm.js";
// @codekit-prepend "pages/PageFormSecond.js";

require([
		'NotificationHandler', 
		'FacebookHelper', 
		'PopupFriendList', 
		'DebtsCredits', 
		'PageLogin',
		'PageHome',
		'PageDetail',
		'PageForm',
		'PageFormSecond'
	], function(nh, fbh, pfl, dc, pageLogin, pageHome, pageDetail, pageForm, pageFormSecond){
	
	var $$ = Dom7, _sgd = (window.sgd) ? window.sgd : {};

	_sgd.accessToken = window.localStorage.getItem('at');
	_sgd.userUID = window.localStorage.getItem('uid');

	_sgd.notification = new nh();
	_sgd.framework7 = new Framework7();
	_sgd.mainView = _sgd.framework7.addView('.view-main', { domCache: true });
	_sgd.pageList = {
		login: new pageLogin(),
		home: new pageHome(),
		detail: new pageDetail(),
		form: new pageForm(),
		'form-second': new pageFormSecond()
	};
	_sgd.resetForm = function(){
		$('#otherUserID').val('');
		$('#otherUserName').val('');
		$("#debtForm input[name=itemid]").val('');
		$("#debtForm input[name=callback]").val('');
		$('#debtForm')[0].reset();
	};
	_sgd.init = function(){
		if(_sgd.debtsCredits){
			_sgd.debtsCredits.credits.fetchDatas();
		} else {
			_sgd.debtsCredits = new dc();
		}
		if(_sgd.accessToken && _sgd.userUID){

			$('.userImageContain').html('<img src="http://graph.facebook.com/' + _sgd.userUID + '/picture" height="50" alt="" />');

			_sgd.changeSection('home');

			_sgd.notification.registerDevice(function(_deviceToken){
				if(_deviceToken){
					_sgd.deviceToken = _deviceToken;
				}
				_sgd.facebookHelper.getPersonalData(function(fbdata){
					$.ajax({
						url: _sgd.apiPrefix + '/api/login',
						dataType: 'jsonp',
						data: { 
							uid: _sgd.userUID, 
							accessToken: _sgd.accessToken, 
							deviceToken: _sgd.notification.getDeviceToken(),
							facebook: fbdata
						},
						success: function(pResult){
							if(!pResult.status){
								_sgd.framework7.alert('Login error', ['Access Token & Facebook UID invaild']);
								logoutToLogin();
							} 
						}
					});
				});
			});

		} else {
			_sgd.framework7.alert('Login error', ['Access Token & Facebook UID invaild']);
			_sgd.changeSection('login');
		}
	};
	_sgd.changeSection = function(pPath, pParam){
		if(_sgd.pageList[pPath]) {
			_sgd.pageList[pPath].onShow(pParam, function(){
				_sgd.mainView.router.load({ pageName: pPath, query: pParam });
			});
		} else {
			_sgd.mainView.router.load({ pageName: pPath, query: pParam });
		}
	};
	_sgd.framework7.onPageAfterAnimation('*', function(page){
		var path = page.name;
		if(_sgd.pageList[path]) _sgd.pageList[path].afterShow(page);
	});
	_sgd.framework7.onPageBeforeAnimation('*', function(page){
		var path = page.name;
		var from = page.fromPage.name;
		if(_sgd.pageList[from]) _sgd.pageList[from].hide(page);
		if(_sgd.pageList[path]) _sgd.pageList[path].beforeShow(page);
	});
	_sgd.popupFriendList = new pfl({
		wrapper: '#friendList',
		inviteTarget: '#nonRegFriend',
		friendTarget: '#regFriend',
		getFriendHandler: function(pCallback){
			_sgd.facebookHelper.getFriendList(pCallback);
		},
		getInvitableHandler: function(pCallback){
			_sgd.facebookHelper.getInvitableList(pCallback);
		}
	});
	_sgd.facebookHelper = new fbh(function(){
		_sgd.debtsCredits.credits.fetchDatas();
	});
	_sgd.submitDebt = function(){
		var _q = {
			isCreatorDebt: $('.debtType .middle').hasClass('creatorDebt'),
			price: parseFloat($('#debtForm input[name=price]').val()) || 0,
			desc: $('#debtForm input[name=desc]').val(),
			otherUserID: $('#otherUserID').val(),
			otherUserName: $('#otherUserName').val(),
			itemid: $("#debtForm input[name=itemid]").val(),
			uid: sgd.userUID,
			accessToken: sgd.accessToken
		};
		if(_q.price != ''){
			$.ajax({
				url: _sgd.apiPrefix + '/api/debtsSubmit',
				dataType: 'jsonp',
				data: _q,
				success: function (data) {
					if(data.status){
						if($('#debtForm input[name=callback]').val() != ''){
							_sgd.debtsCredits.credits.fetchDatas();
							_sgd.changeSection('detail', { uid: $('#debtForm input[name=callback]').val() });
							_sgd.resetForm();
						} else {
							_sgd.changeSection('home');
						}
					}
				},
				error: function(e){
					console.log(e);
				}
			});
		} else {
			sgd.framework7.alert('Please fill in an amount', ['Amount missing']);
		}
	};
	var logoutToLogin = function(){
		_sgd.accessToken = '';
		_sgd.userUID = '';
		window.localStorage.setItem('at', '');
		window.localStorage.setItem('uid', '');
		_sgd.changeSection('login');
	};
	$$('.menu-link').on('click', function () {
		var buttons = [
			{
				text: 'Invite friend',
				onClick: function () {
					facebookConnectPlugin.showDialog({
						method: 'apprequests',
						title : 'wooishui',
						message: 'Lets use wooishui to maintain your debts!',
						filters: ['app_non_users']
					}, function(response){
						
					});
				}
			},
			{
				text: 'Sign Out',
				onClick: function () {
					facebookConnectPlugin.logout(function(){
						logoutToLogin();
					}, function(){
						_sgd.framework7.alert('Logout fail', ['Please try again']);
					});
				}
			}
		];
		_sgd.framework7.actions(buttons);
	});
	$("#dataListDetailWrap .icon-plus").on('click', function(){
		var _userUID = $(this).data('uid');
		var _userData = _sgd.debtsCredits.getUserByUID($(this).data('uid')).toJSON();
		var _userName = (_userData.debtorsUID === _userUID) ? _userData.debtorsName : _userData.creditorName;
		$('input#otherUserName').val(_userName);
		$('input#otherUserID').val(_userUID);
		_sgd.changeSection('form-second');
	});
	$('#menu a.internal').on('click', function(){
		_sgd.changeSection($(this).attr('href'));
		_sgd.framework7.closePanel();
		return false;
	});
	$('#inviteFriend').on('opened', function () {
		_sgd.popupFriendList.startLoading();
	});
	$('#friendList').on('opened', function () {
		_sgd.popupFriendList.startLoading();
	});
	$('.friendListSearch').on('input', function(){
		var curText = $(this).val();
		var target = $(this).data('target');
		if(curText != ''){
			var filtered = $(target + ' .item-content').filter(function(pIndex, pEl){
				return $(pEl).find('.item-title').text().indexOf(curText) > -1;
			});
			$(target + ' .item-content').hide();
			filtered.show();
		} else {
			$(target + ' .item-content').show();
		}
	});
});