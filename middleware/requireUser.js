const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	if (
		!req.headers ||
		!req.headers.authorization ||
		!req.headers.authorization.startsWith("Bearer")
	) {
		 return res.status(401).send("authorization is required");
	}
	const accessToken = req.headers.authorization.split(" ")[1];
	//
	try {
		const decoded = jwt.verify(accessToken, 'skjdkasrnaskkdjk4ri3ujkd9js');
		req._id = decoded._id; //passing this data for other middlewares
		next();
	} catch (e) {
		console.log(e);
		return res.status(401).send("invalid access key");
	}
	//next();
};
