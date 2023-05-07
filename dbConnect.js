const mongoose = require("mongoose");

module.exports = async () => {
	const mongoUrl =
		"mongodb+srv://vishal1414:vA1PIkmGAGeeNp8y@cluster0.1phxpu5.mongodb.net/?retryWrites=true&w=majority";

	try {
		await mongoose.connect(mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("mongoose connected");
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
