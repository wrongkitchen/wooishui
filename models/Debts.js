var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Debts Model
 * =============
 */

var Debts = new keystone.List('Debts');

Debts.add({
	creatorUID: { type: String, required: true, initial: true },
	creditorUID: { type: String, required: true, initial: true },
	creditorName: { type: String, required: true, initial: true },
	debtorsUID: { type: String, required: true, initial: true },
	debtorsName: { type: String, required: true, initial: true },
	price: { type: Types.Money, required: true, initial:true },
	desc: { type: Types.Textarea },
	settled: { type: Types.Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
});

Debts.defaultSort = '-createdAt';
Debts.defaultColumns = 'creditorName, debtorsName, price, createdAt';
Debts.register();
