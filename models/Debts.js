var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Debts Model
 * =============
 */

var Debts = new keystone.List('Debts');

Debts.add({
	creditorUID: { type: String },
	creditorName: { type: Types.Name, required: true, initial: true },
	debtorsUID: { type: String },
	debtorsName: { type: Types.Name, required: true, initial: true },
	price: { type: Types.Money, required: true, initial:true },
	desc: { type: Types.Textarea },
	settled: { type: Types.Boolean, default: false },
	fbConnected: { type: Types.Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
});

Debts.defaultSort = '-createdAt';
Debts.defaultColumns = 'creditorName, debtorsName, price, createdAt';
Debts.register();
