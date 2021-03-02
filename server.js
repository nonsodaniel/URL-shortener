const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/url");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
  const shorturls = await ShortUrl.find();
  res.render("index", { shorturls: shorturls });
});
app.post("/shortUrls", async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect("/");
  } catch (error) {
    console.log("error", error.message);
  }
});
app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
  } catch (error) {
    console.log(error.message);
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