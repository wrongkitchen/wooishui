require(["FacebookHelper", "PopupFriendList", "DebtsCredits"], function(fbh, pfl, dc){
	
	// _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	var $$ = Dom7;
	var sgd = (window.sgd) ? window.sgd : {};
		sgd.facebookHelper = new fbh();
		sgd.framework7 = new Framework7();
		sgd.framework7.onPageBeforeAnimation('*', function(page,a,b,c){
			if(page.container.dataset.nav)
				$("#header").addClass(page.container.dataset.nav);
			else
				$("#header").removeClass();
		});
		sgd.popupFriendList = new pfl({
			wrapper: "#friendList",
			inviteTarget: "#nonRegFriend",
			friendTarget: "#regFriend",
			getFriendHandler: function(pCallback){
				sgd.facebookHelper.getFriendList(pCallback);
			},
			getInvitableHandler: function(pCallback){
				sgd.facebookHelper.getInvitableList(pCallback);
			}
		});
		sgd.debtsCredits = new dc();

	var mainView = sgd.framework7.addView('.view-main', {
		dynamicNavbar: true,
		domCache: true
	});
	sgd.changeSection = function(pPath){
		mainView.router.load({ pageName: pPath });
	};

	$$('.menu-link').on('click', function () {
    	var buttons = [
	        {
	            text: 'Sign Out',
	            onClick: function () {
	                window.location.href = "/logout";
	            }
	        }
	    ];
	    sgd.framework7.actions(buttons);
	});   


	$('#menu a.internal').on('click', function(){
		sgd.changeSection($(this).attr('href'));
		sgd.framework7.closePanel();
		return false;
	});
	$('#friendList').on('opened', function () {
		sgd.popupFriendList.startLoading();
	});
	$(".friendListSearch").on('input', function(){
		var curText = $(this).val();
		var target = $(this).data('target');
		if(curText != ""){
			var filtered = $(target + " .item-content").filter(function(pIndex, pEl){
				return $(pEl).find(".item-title").text().indexOf(curText) > -1;
			});
			$(target + " .item-content").hide();
			filtered.show();
		} else {
			$(target + " .item-content").show();
		}
	});
});