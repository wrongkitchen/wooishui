define(function(){
	var _ctrl = Backbone.Model.extend({

		credits: null,

		userUID: sgd.userUID,

		initialize: function(){
			var _this = this;
			var creditModel = Backbone.Model.extend({});
			var credits = Backbone.Collection.extend({
				model: creditModel,
				url: '/api/debtsCredits'
			});

			_this.credits = new credits();
			_this.credits.fetch();

			var _creditsDetail = Backbone.Collection.extend({
				model: creditModel
			});
			var creditsDetail = new _creditsDetail();
			var _creditView = Backbone.View.extend({
				el: '#dataList',
				mainListTemplate: _.template($("#mainListTmpl").html()),
				events: {
					'click .item-content' : 'showDetail'
				},
				initialize: function(options){
					this.options = options;
					this.listenTo(this.options.credits, 'all', this.render);
				},
				render: function(){
					var _view = this;
					var allData = new Backbone.Collection();
					_view.$el.empty();
					_view.options.credits.each(function(credit){
						var obj = credit.toJSON();
						var checkDataModel = function(pObj, pIndexKey){
							var dataModel = allData.where(pObj);
							if(dataModel.length<=0){
								var _name = (pIndexKey == 'debtorsUID') ? (obj.debtorsName.first + " " + obj.debtorsName.last) : (obj.creditorName.first + " " + obj.creditorName.last);
								allData.add({ 
									id: obj[pIndexKey],
									name: _name,
									price: (pIndexKey == 'debtorsUID') ? obj.price : (obj.price * -1),
									fbConnected: obj.fbConnected
								});
							} else {
								var curPrice = dataModel[0].get('price');
								dataModel[0].set({ price: curPrice + ((pIndexKey == 'debtorsUID') ? obj.price : (obj.price * -1)) });
							}
						}
						if(obj.creditorUID == _this.userUID){
							checkDataModel({ id: obj.debtorsUID }, 'debtorsUID');
						} else {
							checkDataModel({ id: obj.creditorUID }, 'creditorUID');
						}
					});
					allData.each(function(pModel){
						var obj = pModel.toJSON();
						_view.$el.append(_view.mainListTemplate(obj));
					});
				},
				showDetail: function(e){
					var cid = $(e.currentTarget).find('.cid').val();
					var modelCredits = this.options.credits.where({ creditorUID : cid });
					var modelDebts = this.options.credits.where({ debtorsUID : cid });
					creditsDetail.reset();
					creditsDetail.add(modelCredits.concat(modelDebts));
					sgd.changeSection('deail');
				}
			});
			var _creditDetailView = Backbone.View.extend({
				el: '#dataListDetail',
				detailTemplate: _.template($("#detailTmpl").html()),
				initialize: function(options){
					this.options = options;
					this.listenTo(this.options.credits, 'all', this.render);
				},
				events: {
					'click .settleBtn' : 'settleItem'
				},
				render: function(){
					var _view = this;
					_view.$el.empty();
					_view.options.credits.each(function(credit){
						var obj = credit.toJSON();
						if(obj.creditorUID == _this.userUID){
							obj.creatorName = (obj.creatorUID == _this.userUID) ? obj.creditorName.first + " " + obj.creditorName.last : obj.debtorsName.first + " " + obj.debtorsName.last;
						} else {
							obj.price *= -1;
							obj.creatorName = (obj.creatorUID == _this.userUID) ? obj.debtorsName.first + " " + obj.debtorsName.last : obj.creditorName.first + " " + obj.creditorName.last;
						}
						obj.settlable = (obj.creatorUID == _this.userUID) ? true : false;
						_view.$el.append(_view.detailTemplate(obj));
					});
				},
				settleItem: function(e){
					var itemID = $(e.currentTarget).data('itemid');
					$.ajax({
						url: '/api/debtsSettle',
						type: 'post',
						data: { itemid: itemID },
						success: function (data) {
							if(data.status){
								$("#item_" + itemID).remove();
								_this.credits.fetch();
							}
						}
					});
				}
			});
			
			var creditView = new _creditView({
				credits: _this.credits
			});
			creditView.comparator = 'createdAt';

			var creditDetailView = new _creditDetailView({
				credits: creditsDetail
			});
			creditDetailView.comparator = 'createdAt';
		}
	});

	return _ctrl;
});