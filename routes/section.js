const express = require("express");
const router = express.Router();
const Section = require("../models/section");

// GET /sections
router.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().sort({ updatedAt: -1 });
    res.json({ sections });
  } catch (error) {
    console.error("Error fetching section data:", error);
    res.status(500).json({ error: "Failed to fetch section data" });
  }
});
// GET /sections
router.get("/new-sections", async (req, res) => {
  try {
    const sections = await Section.find();
    res.json({ sections: sections });
  } catch (error) {
    console.error("Error fetching section options:", error);
    res.status(500).json({ error: "Failed to fetch section options" });
  }
});

// POST /sections
router.post("/new-sections", async (req, res) => {
  console.log(req.body);
  try {
    const { section, subSection,customValue } = req.body;

    const newSection = new Section({
      section,
      subsections: [subSection],
      customValue,
    });

    const savedSection = await newSection.save();
    res.json(savedSection);
  } catch (error) {
    console.error("Error creating new section:", error);
    res.status(500).json({ error: "Failed to create new section" });
  }
});
// POST /sections/add-section
router.post("/add-section", async (req, res) => {
  try {
    const { section, subsections } = req.body;

    // Create a new Section document
    const newSection = new Section({
      section,
      subsections,
    });

    // Save the new section to the database
    const savedSection = await newSection.save();

    res.json(savedSection);
  } catch (error) {
    console.error("Error adding new section:", error);
    res.status(500).json({ error: "Failed to add new section" });
  }
});

// DELETE /sections/sections/:sectionId
router.delete("/sections/:sectionId", async (req, res) => {
  try {
    const { sectionId } = req.params;

    // Find and remove the section
    await Section.findByIdAndRemove(sectionId);

    res.json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ error: "Failed to delete section" });
  }
});

// DELETE /sections/subsections/:subsectionId
router.delete("/subsections/:subsectionId", async (req, res) => {
  try {
    const { subsectionId } = req.params;

    // Find the section containing the subsection and remove it
    await Section.findOneAndUpdate(
      { "subsections._id": subsectionId },
      { $pull: { subsections: { _id: subsectionId } } }
    );

    res.json({ message: "Subsection deleted successfully" });
  } catch (error) {
    console.error("Error deleting subsection:", error);
    res.status(500).json({ error: "Failed to delete subsection" });
  }
});

// PUT /sections/sections/:sectionId
router.put("/sections/:sectionId", async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { section } = req.body;

    // Find and update the section
    await Section.findByIdAndUpdate(sectionId, { section });

    res.json({ message: "Section updated successfully" });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ error: "Failed to update section" });
  }
});

// PUT /sections/subsections/:subsectionId
router.put("/subsections/:subsectionId", async (req, res) => {
  try {
    const { subsectionId } = req.params;
    const { subsection } = req.body;

    // Find the section containing the subsection and update it
    await Section.findOneAndUpdate(
      { "subsections._id": subsectionId },
      { $set: { "subsections.$.subsection": subsection } }
    );

    res.json({ message: "Subsection updated successfully" });
  } catch (error) {
    console.error("Error updating subsection:", error);
    res.status(500).json({ error: "Failed to update subsection" });
  }
});

module.exports = router;
