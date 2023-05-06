const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();



dotenv.config("./.env");
// middlewares
app.use(express.json()); 

//connecting backend and fontend
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);
app.use(bodyParser.urlencoded({extended:true}))
app.use("/post", postRouter); 
app.use("/auth",authRouter)

const PORT = process.env.PORT || 4001;

dbConnect();

module.exports = app;

app.listen(PORT, () => {
	console.log("listening to the port", PORT);
});
