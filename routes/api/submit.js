var keystone = require('keystone'),
	uuid = require('node-uuid'),
	Users = keystone.list('Users'),
	Debts = keystone.list('Debts');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		curUser = req.session.passport.user;
	var isCreatorDebt  = (req.body.isCreatorDebt == 'true'),
		price = parseFloat(req.body.price) || 0,
		desc = req.body.desc,
		otherUserID = req.body.otherUserID,
		otherUserName = req.body.otherUserName;
	
	var insertData = function(){
		if(price > 0){
			var newDebt = new Debts.model({
				creatorUID: curUser.id,
				creditorUID: (isCreatorDebt) ? otherUserID : curUser.id,
				creditorName: (isCreatorDebt) ? otherUserName : curUser.name,
				debtorsUID: (isCreatorDebt) ? curUser.id : otherUserID,
				debtorsName: (isCreatorDebt) ? curUser.name : otherUserName,
				price: price,
				desc: desc
			});
			newDebt.save(function(err) {
				if(err){
					res.json({ status:false, error: err });
				} else {
					res.json({ status: true, message: "success" });
				}
			});
		} else {
			res.json({ status:true });
		}
	};
	if(curUser){
		if(otherUserID){
			Users.model.findOne()
			.where('uid', otherUserID)
			.exec(function(err, user){
				if(err){
					res.status(500).json({ status:false, error: err });
				} else {
					if(user){
						otherUserName = user.name;
						insertData();
					} else {
						res.json({ status: true });
					}
				}
			});
		} else {
			otherUserID = uuid.v1();
			insertData();
		}
	} else {
		res.status(500).json({ error: 'Please login to our system' });
	}

};
