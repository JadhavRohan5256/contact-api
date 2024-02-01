const express = require("express");
const dotenv = require("dotenv").config();

const contactRoutes = require("./routes/contact-routes.js");
const userRoutes = require("./routes/user-routes.js");
const errorHandler = require("./middleware/error-handler.js");
const connectDB = require("./config/db-connection.js");

const app = express();
const port = process.env.PORT || 5000;

connectDB()
app.use(express.json()); //body parser middleware
app.use("/api/contacts", contactRoutes); // routes middleware
app.use("/api/user", userRoutes); // routes middleware

//custome middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`app is listen on port ${port}`);
})