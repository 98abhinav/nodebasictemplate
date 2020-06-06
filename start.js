/*
    Project: Sample application to demonstrate the CURD operation with Nodejs and MongoDB
    Author: abhinav
*/

/*globals require, process */
/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const express   = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	ruleRouter  = express.Router(),
	userRouter  = express.Router(),
	rule        = require("./route/ruleRouter.js");
	user        = require("./route/userRouter.js"),
	authRouter  = require("./auth/AuthController");

// Body-parser (To parse the request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 
    Add to avoid cross origin access.
    Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
    By setting domain name to some value, the API access can be restricted to only the mentioned domain. 
    Eg, Access-Control-Allow-Origin: 'mywebsite.com'
*/
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});

// Set the port no
app.set("port", process.env.PORT || 3000);

// Api to get the all rules information.
ruleRouter.get("/", rule.getRules);
// Api to get the rule information.
ruleRouter.get("/:id", rule.getRule);
// Api to create / update the rule.
ruleRouter.put("/:name", rule.updateRule);
// Api to delete the rule not required
ruleRouter.delete("/:id", rule.deleteRule);

app.use("/api/rules", ruleRouter);


// Api to get the all rules information.
userRouter.get("/", user.getUsers);
// Api to get the rule information.
userRouter.get("/:id", user.getUser);
// Api to create/ update the rule.
userRouter.put("/:id", user.updateUser);
// Api to delete the rule not required
userRouter.delete("/:id", user.deleteUser);

app.use("/api/users", userRouter);

app.use("/api/auth", authRouter);


// Start the service
app.listen(app.get("port"));
console.log("Sample node server Started @ " + new Date() + " Running on port no: " + app.get("port"));
