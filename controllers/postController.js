const User = require("../models/User");

const getAllPostController = async (req, res) => {
	// const email = await req.params.email;
  
	//  console.log("postController email",email);
	                                              //check
    //  console.log(req.params.email);

	 const obj ={
		email:req.params.email
	 }
	const posts = await User.find(obj);
	
	// console.log(posts)
	// return res.send(this all are posts")
	res.status(200).send({posts});
};

module.exports = { 
	getAllPostController, 
};
