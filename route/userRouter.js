
const utils    = require("../utils/utils.js"),
    connection = require("../utils/connection.js");

// CREATES A NEW USER
exports.updateUser = function (req, res) {
    let user = req.params.id;
    utils.log("[updateDish] Request received to create / update the information of a rule " + user);
    if (!user) {
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
        connection.createUser(user, req.body, function (err, success) {
            if (err) {
                res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
                return;
            }
            res.status(200).json({msg: success});
        });
    });
};

// RETURNS ALL THE USERS IN THE DATABASE
exports.getUsers = function (req, res) {
// To check if the connection is available / To establish the Database connection
    connection.connectToDb(function (error) {
        if (error) {
            return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
        }
        // To get the information of a Dish
        connection.getUsers(function (err, success) {
            if (err) {
                res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
                return;
            }
            res.status(200).json({doc: success});
        });
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.getUser = function (req, res) {
    let user = req.params.id;
    utils.log("[getDishes] Request received to get the information of rule " + user);
    if (!user) {
        res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        return;
    }
    // To check if the connection is available / To establish the Database connection
    connection.connectToDb(function (error) {
        if (error) {
            return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
        }
        // To get the information of a Dish
        connection.getUser(user, function (err, success) {
            if (err) {
                res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
                return;
            }
            res.status(200).json({doc: success});
        });
    });
};

// DELETES A USER FROM THE DATABASE
exports.deleteUser = function (req, res) {
    let user = req.params.id;
    utils.log("[deleteDish] Request received to delete the information of a rule " + user);
    if (!user) {
        res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        return;
    }
    // To check if the connection is available / To establish the Database connection
    connection.connectToDb(function (error) {
        if (error) {
            return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
        }
        // To get the information of a Dish
        connection.deleteUser(user, function (err, success) {
            if (err) {
                res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
                return;
            }
            res.status(200).json({doc: success});
        });
    });
};
