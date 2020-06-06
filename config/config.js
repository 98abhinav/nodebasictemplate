/*globals module */
/*
    Module to define all the Configurations required
*/
let Config = function () {
	return {
		dbPath : "mongodb//xxxxxxxxxxxxxxxxxxxxxxxxxx",
		secret: 'supersecret'
	};
};

module.exports = new Config();
