/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let ruleSchema = new Schema({
	name  : String,
	searchIn   : String,
	criteria : Number,
	date  : {
		creationDate: Date,
		lastModifiedDate: Date
	},
	user  : {
		createdBy: String,
		lastModifiedBy: String
	}
});

// Create a model using schema
let Rule = mongoose.model("rules", ruleSchema);

// make this model available
module.exports = Rule;