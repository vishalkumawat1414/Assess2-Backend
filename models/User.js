const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		// select:false //hiding password while finding user
	},
	name: {
		type: String,
		required: true,
	},
	contentType: {
		type: String,
		required: true,
	},
	resumeFile: {
		type: Buffer,
		required: true,
	},
});

module.exports = mongoose.model("ResumeUser", userSchema); //schema with above formate with name "ResumeUser" is created in atlas mongoodb
