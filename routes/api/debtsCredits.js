var keystone = require('keystone'),
	Debts = keystone.list('Debts');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		curUser = req.session.passport.user,
		creditData = null,
		debtData = null;
	var returnData = function(){
		if(creditData && debtData)
			res.json(creditData.concat(debtData));
	};
	if(curUser){
		Debts.model.find()
		.where('creditorUID', curUser.id)
		.where('settled', false)
		.exec(function(err, data){
			creditData = data;
			returnData();
		});
		Debts.model.find()
		.where('debtorsUID', curUser.id)
		.where('settled', false)
		.exec(function(err, data){
			debtData = data;
			returnData();
		});
	} else {
		res.status(500).json({ error: 'Please login to our system' });
	}
	// locals.section is used to set the currently selected
	// item in the header navigation.

};
