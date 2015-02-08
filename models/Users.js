var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Users Model
 * ==========
 */

var Users = new keystone.List('Users', {
	nocreate: true,
	noedit: true
});

Users.add({
	uid: { type: String, required: true },
	facebook: { type: Types.Code, required: true, lang: 'json' },
	accessToken: { type: String, required: true },
	refreshToken: { type: String },
	createdAt: { type: Date, default: Date.now }
});

Users.findOne = function(pUser, pCallback){
	Users.model.find().where('uid', pUser.id).exec(function(err, user){
		pCallback(err, user);
	});
};

Users.findOrCreate = function(pAccessToken, pRefreshToken, pProfile, pCallback){
	Users.model.find().where('uid', pProfile.id).exec(function(err, user){
		if(err){
			pCallback(err);
		} else if(user.length){
			pCallback(null, user[0]);
		} else {
			var freshman = new Users.model({
				uid: pProfile.id,
				facebook: pProfile._raw,
				accessToken: pAccessToken,
				refreshToken: pRefreshToken
			});
			freshman.save(function(err){
				pCallback(null, freshman);
			});
		}
	});
};

Users.schema.virtual('name').get(function() {
	return JSON.parse(this.facebook).name;
});


/**
 * Registration
 */

Users.defaultColumns = 'uid, facebook, accessToken, refreshToken, createdAt';
Users.register();
