const express = require("express");
const app = express();
const port = 8001;
const mongoose = require("mongoose");
const cors = require("cors");
const Kiln = require("./models/kiln");
const kilnRoutes = require("./routes/kilnRoutes");
const sectionRoutes = require("./routes/section");
app.use(cors());
app.use("/kilns", kilnRoutes);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://arun:1234@cluster0.ubrme.mongodb.net/kiln-stats?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => { 
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on connection error
  });

// Middleware
app.use(express.json());
app.use("/sections", sectionRoutes);

// Routes
app.get("/", async (req, res) => {
  console.log(res);
  try {
    const sections = await Section.find({}, "section subsections");
    const sectionData = sections.reduce(
      (acc, section) => {
        acc.sections.push(section.section);
        acc.subsections.push(...section.subsections);
        return acc;
      }, 
      { sections: [], subsections: [] }
    ); 

    res.status(200).json(sectionData);
  } catch (error) {
    console.error("Error retrieving sections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
