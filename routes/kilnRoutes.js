const express = require("express");
const router = express.Router();
const Section = require("../models/section");

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const sectionData = req.body;
    const section = new Section(sectionData);
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ error: "Failed to create section" });
  }
});

module.exports = router;
