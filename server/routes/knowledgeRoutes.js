const express = require("express");
const router = express.Router();

const {
  createKnowledge,
  getKnowledge,
  deleteKnowledge,
} = require("../controllers/knowledgeController");

router.get("/", getKnowledge);

router.post("/", createKnowledge);

router.delete("/:id", deleteKnowledge);

module.exports = router;