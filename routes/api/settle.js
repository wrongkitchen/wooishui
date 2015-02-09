var keystone = require('keystone'),
	Debts = keystone.list('Debts');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		curUser = req.session.passport.user;
	var itemID = req.body.itemid;
	
	if(curUser){
		if(itemID){
			Debts.model.findOne()
			.where('_id', itemID)
			.where('settled', false)
			.where('creatorUID', curUser.id)
			.exec(function(err, data){
				if(err){
					res.status(500).json({ error: 'api error' });
				} else {
					if(data){
						data.settled = true;
						data.save();
						res.json({ status: true });
					} else {
						res.json({ status: false, error: 'no such data' });
					}
				}
			});
		} else {
			res.status(500).json({ error: 'api error' });
		}
	} else {
		res.status(500).json({ error: 'Please login to our system' });
	}

};
