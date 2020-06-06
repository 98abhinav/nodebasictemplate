/*globals  require, exports */

const mongoose = require("mongoose"),
	config     = require("../config/config.js"), 
	Rule       = require("../models/rule.js"),
	utils      = require("../utils/utils.js"),
	User 	   = require('../models/user');


// Function to establish connection for the Database
exports.connectToDb = function(callback) {
	// If the connection is already established, Then don't create one more connection
	if (mongoose.connection.readyState) {
		callback(undefined, {msg: "connected", code: 200});
		return;
	}
	// Establish the DB connection
	mongoose.connect(config.dbPath);


	// Event for successfully connecting database
	mongoose.connection.on("connected", function () {
		callback(undefined, {msg: "connected", code: 200});
	});
	// Event when there is an error connecting for database
	mongoose.connection.on("error",function (err) {
		utils.log("[connectToDb] Error connecting to DB " + err);
		callback(err);
	});
};

// Function to get the information of all document
exports.getRules = function (params, callback) {
	// Fetch the rule information
	var mysort = { name: 'desc' };
	Rule.find({}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	}).sort(mysort);
};

// Function to get the information of a matched document
exports.getRule = function (rule, callback) {
	// Fetch the rule inforation
	Rule.find({_id: rule}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// Function to create / update the Document for a rule
exports.createRule = function(ruleName, ruleInfo, callback) {
	let rule;
	Rule.find({name: ruleName}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		// If the rule is available, Then update the existing document
		if (success.length > 0) {
			rule = success[0];
			rule.save(function(err, success) {
				if (err) {
					utils.log("[createDish] Error updating the doc " + err);
					callback(err);
					return;
				}
				callback(undefined, success);
			});
			return;
		}
		// If the rule is not available then create new document for Dish
		let date = new Date().toISOString();
		// To create the model for new Dish
		rule = Rule({
			"name"  : ruleName,
			"searchIn"   : ruleInfo.searchIn,
			"criteria" : ruleInfo.criteria,
			"user"  : {
				"createdBy"      : ruleInfo.user.createdBy,
				"lastModifiedBy" : ruleInfo.user.lastModifiedBy
			},
			"date"  : {
				"creationDate"     : date,
				"lastModifiedDate" : date
			}
		});
		// Saving the Dish model
		rule.save(function (err, success) {
			if (err) {
				utils.log("[createDish] Error creating the doc " + err);
				callback(err);
				return;
			}
			callback(undefined, success);
		});
	});
};

exports.deleteRule = function (rule, callback) {
	Rule.findOneAndRemove({name: rule}, function (err, success) {
		if (err) {
			utils.log("[deleteDoc] Error deleting the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// CREATES A NEW USER
exports.createUser = function (userName, userInfo, callback) {
	let user;
	User.find({name: userName}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		// If the rule is available, Then update the existing document
		if (success.length > 0) {
			user = success[0];
			user.save(function(err, success) {
				if (err) {
					utils.log("[createDish] Error updating the doc " + err);
					callback(err);
					return;
				}
				callback(undefined, success);
			});
			return;
		}
		// If the rule is not available then create new document for User
		// To create the model for new User
		user = User({
			name : userInfo.name,
			email : userInfo.email,
			password : userInfo.password
		});
		// Saving the Dish model
		user.save(function (err, success) {
			if (err) {
				utils.log("[createDish] Error creating the doc " + err);
				callback(err);
				return;
			}
			callback(undefined, success);
		});
	});
};

// RETURNS ALL THE USERS IN THE DATABASE
exports.getUsers = function (callback) {
	// Fetch the rule information
	User.find({}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// GETS A SINGLE USER FROM THE DATABASE
exports.getUser = function (user, callback) {
	// Fetch the rule information
	User.findOne({name: user}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// DELETES A USER FROM THE DATABASE
exports.deleteUser = function (user, callback) {
	User.findOneAndRemove({name: user}, function (err, success) {
		if (err) {
			utils.log("[deleteDoc] Error deleting the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};
