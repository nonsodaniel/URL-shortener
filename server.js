const express = require("express");
const mongoose = require("mongoose");
const shortUrl = require("./models/url");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  // const shorturls = await shortUrl.find
  res.render("index");
});
app.post("/shortUrls", async (req, res) => {
  try {
    //  return console.log(req.body)
    await shortUrl.create({ full: req.body.fullUrl });
    res.redirect("/");
  } catch (error) {
    console.log("error", error.message);
  }
});

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://nonso:nonsodan@cluster0.cj0um.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);