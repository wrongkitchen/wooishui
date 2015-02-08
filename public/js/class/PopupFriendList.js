define([], function(){
	return Backbone.Model.extend({

		invitableFds: null,

		regFds: null,

		friendCollection: null, 

		startLoading: function(){
			var _this = this;
			
			$(_this.get("wrapper")).addClass("preloading");

			if(!_this.regFds){
				_this.get("getFriendHandler")(function(pRes){
					if(pRes.data.length){
						_this.regFds = new Backbone.Collection(pRes.data);
						_this.fetchData($(_this.get("friendTarget")), _this.regFds);
						$(_this.get("wrapper")).removeClass("preloading");
					}
				});
			}
			
			if(!_this.invitableFds){
				_this.get("getInvitableHandler")(function(pRes){
					if(pRes.data.length){
						_this.invitableFds = new Backbone.Collection(pRes.data);
						_this.fetchData($(_this.get("inviteTarget")), _this.invitableFds);
						$(_this.get("inviteTarget")).show();
					}
					$(_this.get("wrapper")).removeClass("preloading");
				});
			}
		},

		fetchData: function(pTarget, pColl){
			var _this = this;
			var tmpl = _.template($(_this.get("templateID")).html());
			pTarget.show();
			_.each(pColl.toJSON(), function(pObj){
				pTarget.find("ul").append(tmpl(pObj));
			});
		}
	});
});