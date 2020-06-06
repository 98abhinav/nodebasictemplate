/*globals exports, require */

const utils    = require("../utils/utils.js"),
	connection = require("../utils/connection.js");


exports.getRules = function (req, res) {
	// To check if the connection is available / To establish the Database connection
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Dish
		connection.getRules(req.params, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
}
exports.getRule = function (req, res) {
    /* 
        Function to get the list of Dishes available
        curl -X GET http://localhost:3000/rules/rule-name
    */
	let rule = req.params.id;
	utils.log("[getDishes] Request received to get the information of rule " + rule);
	if (!rule) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Dish
		connection.getRule(rule, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};

exports.updateRule = function (req, res) {
    /* 
        Function to Create / Update the information of a rule
        curl -X PUT http://localhost:3000/rules/rulename
			 -H "Content-Type: application/json"	
		     -d '{
					"searchIn": 'COST',
					"criteria": 100,
					"date": {
						"creationDate": "2017-04-20T17:25:15.417Z",
						"lastModifiedDate": "2017-04-20T17:25:15.417Z"
					},
					"user": {
						"createdBy": "abhinav.sb@gmail.com",
						"lastModifiedBy": "abhinav.sb@gmail.com"
					}
				}'
    */
	let rule = req.params.name;
	utils.log("[updateDish] Request received to create / update the information of a rule " + rule);
	if (!rule) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
			return;
		}
		utils.log("Connection created");
		// If the DB is connected then Create / Update the doc
		connection.createRule(rule, req.body, function (err, success) {
			if (err) {
				res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({msg: success});
		});
	});
};

exports.deleteRule = function (req, res) {
	/* 
        Function to delete the information of a Dish
        curl -X DELETE http://localhost:3000/rules/rule-name
    */
	let rule = req.params.id;
	utils.log("[deleteDish] Request received to delete the information of a rule " + rule);
	if (!rule) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Dish
		connection.deleteRule(rule, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};
