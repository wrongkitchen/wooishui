require(["FacebookHelper", "PopupFriendList", "DebtsCredits"], function(fbh, pfl, dc){
	
	// _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	var $$ = Dom7;
	var _sgd = (window.sgd) ? window.sgd : {};
		_sgd.framework7 = new Framework7();
		_sgd.framework7.onPageBeforeAnimation('*', function(page,a,b,c){
			if(page.container.dataset.nav)
				$("#header").addClass(page.container.dataset.nav);
			else
				$("#header").removeClass();
		});
		$$("#homeDebts").on("refresh", function(e){
			_sgd.debtsCredits.userRefresh = true;
			_sgd.debtsCredits.credits.fetch();
		});
		_sgd.popupFriendList = new pfl({
			wrapper: "#friendList",
			inviteTarget: "#nonRegFriend",
			friendTarget: "#regFriend",
			getFriendHandler: function(pCallback){
				_sgd.facebookHelper.getFriendList(pCallback);
			},
			getInvitableHandler: function(pCallback){
				_sgd.facebookHelper.getInvitableList(pCallback);
			}
		});
		_sgd.debtsCredits = new dc();
		_sgd.facebookHelper = new fbh(function(){
			_sgd.debtsCredits.credits.fetch();
		});
		_sgd.submitDebt = function(){
			var isCreator = $(".debtTypeBtn.active[data-role=subject]").data('value') === 'currentUser';
			var isDebt = $(".debtTypeBtn.active[data-role=verb]").data('value') === 'own';
			var _q = {
				isCreatorDebt: (isCreator) ? isDebt : !isDebt,
				price: parseFloat($("#debtForm input[name=price]").val()) || 0,
				desc: $("#debtForm input[name=desc]").val(),
				otherUserID: $("#otherUserID").val(),
				otherUserName: $("#otherUserName").val()
			}
			if(_q.price != ''){
				$.ajax({
					url: '/api/debtsSubmit',
					type: 'post',
					data: _q,
					success: function (data) {
						if(data.status){
							_sgd.changeSection('home');
							_sgd.debtsCredits.credits.fetch();
						}
					}
				});
			} else {
				sgd.framework7.alert('Please fill in an amount', ['Amount missing']);
			}
		};

	var mainView = _sgd.framework7.addView('.view-main', {
		dynamicNavbar: true,
		domCache: true
	});
	_sgd.changeSection = function(pPath){
		if(pPath == 'form-second'){
			if($('#otherUserID').val() === "" && $('#otherUserName').val() === ''){
				_sgd.framework7.alert('Please enter a name / select a wooishui user', ['Name missing']);
				return false;
			}
		} else if(pPath == 'home'){
			$('#otherUserID').val('');
			$('#otherUserName').val('');
			$('#debtForm')[0].reset();
		}
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
	    _sgd.framework7.actions(buttons);
	});   

	$('.debtTypeBtn').on('click', function(){
		if($(this).hasClass('active')) return false;
		var targetRole = $(this).data('role');
		var targetValue = $(this).data('value');
		$('.debtTypeBtn[data-role='+ targetRole +']').removeClass('active');
		$(this).addClass('active');
		if(targetRole != 'verb'){
			var otherRole = '.debtTypeBtn[data-role='+ ((targetRole == 'subject') ? 'object' : 'subject') + ']';
			var otherValue = '[data-value='+ ((targetValue == 'otherUser') ? 'currentUser' : 'otherUser') + ']';
			$(otherRole).removeClass('active');
			$(otherRole+otherValue).addClass('active');
		}
	});
	$('#menu a.internal').on('click', function(){
		_sgd.changeSection($(this).attr('href'));
		_sgd.framework7.closePanel();
		return false;
	});
	$('#friendList').on('opened', function () {
		_sgd.popupFriendList.startLoading();
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