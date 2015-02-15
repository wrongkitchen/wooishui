require(["FacebookHelper", "PopupFriendList", "DebtsCredits"], function(fbh, pfl, dc){
	
	// _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	var $$ = Dom7;
	var _sgd = (window.sgd) ? window.sgd : {};
		_sgd.framework7 = new Framework7({
			pushState: true
		});
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
		_sgd.framework7.onPageBeforeAnimation('*', function(page){
			if(page.container.dataset.nav)
				$("#header").addClass(page.container.dataset.nav);
			else
				$("#header").removeClass();
			if(page.name == "form-second"){
				if($("#otherUserID").val()){
					$(".debtType .right").html("<img src=\"http://graph.facebook.com/" + $("#otherUserID").val() + "/picture\" alt=\"\" />");
				} else if($("#otherUserName").val()){
					$(".debtType .right").html('<span>' + $("#otherUserName").val() + '</span>');
				} else {
					_sgd.framework7.alert('Please enter a name / select a wooishui user', function(){
						_sgd.changeSection('form');
					});
				}
			}
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
			var _q = {
				isCreatorDebt: $(".debtType .middle").hasClass('creatorDebt'),
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
	$(".debtType .left").on('click', function(){
		$(".debtType .middle").addClass('creatorDebt');
	});
	$(".debtType .right").on('click', function(){
		$(".debtType .middle").removeClass('creatorDebt');
	});
	$(".debtType .middle").on('click', function(){
		if($(this).hasClass('creatorDebt'))
			$(this).removeClass('creatorDebt');
		else 
			$(this).addClass('creatorDebt');
	});
	// $('.debtTypeBtn').on('click', function(){
	// 	if($(this).hasClass('active')) return false;
	// 	var targetRole = $(this).data('role');
	// 	var targetValue = $(this).data('value');
	// 	$('.debtTypeBtn[data-role='+ targetRole +']').removeClass('active');
	// 	$(this).addClass('active');
	// 	if(targetRole != 'verb'){
	// 		var otherRole = '.debtTypeBtn[data-role='+ ((targetRole == 'subject') ? 'object' : 'subject') + ']';
	// 		var otherValue = '[data-value='+ ((targetValue == 'otherUser') ? 'currentUser' : 'otherUser') + ']';
	// 		$(otherRole).removeClass('active');
	// 		$(otherRole+otherValue).addClass('active');
	// 	}
	// });
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