const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupcontroller = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		const { resumeFile } = req.file.buffer;
		const { contentType } = req.file.mimetype;
		// console.log("jfkdheiuwrhewf", resumeFile);

		if (!email ||  !name ) {
			return res.status(400).send("All fields are required");
		}
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(409).send("User already exist");
		}

		const hashedPassword = await bcrypt.hash(password, 5);

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			resumeFile: req.file.buffer,
			contentType: req.file.mimetype,
		});
 
		await user.save();

		// res.json({ success: true, message: "Resume uploaded successfully" });
		return res.status(201).json({
			user,
			message: "Resume uploaded successfully",
		});
	} catch (error) {
		console.log("from signupcontroller", error);
		res.status(500).json({ success: false, message: "Error uploading resume" });
	}
};

const logincontroller = async (req, res) => {
	try {
		const email = req.body.Lemail;
		const password = req.body.Lpassword;

		// console.log("email and passswrd  from client", email, password); //check

		if (!email || !password) {
			return res.status(400).send("All fields are required");
		}
		// console.log("hey") //check

		const oldUser = await User.findOne({ email });
 
		//  console.log("ewrgfff", oldUser);//check
		if (!oldUser) {
			return res.status(404).send("User not registered");
		}
		
		//  console.log("old",oldUser.password) //check

		const matched = await bcrypt.compare(password, oldUser.password);

		if (!matched) {
			return res.status(403).send("Incorrect password");
		}

		const accessToken = generateAccessToken({
			_id: oldUser._id,
			email: oldUser.email,
		});

		return res.send( { accessToken });

	} catch (error) {
		console.log(error.message);
	}
};


//function to generate access token
const generateAccessToken = (data) => {
	try {
		const token = jwt.sign(data, 'skjdkasrnaskkdjk4ri3ujkd9js', {
			expiresIn: "1y",
		});
		return token;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	signupcontroller,
	logincontroller,
};
