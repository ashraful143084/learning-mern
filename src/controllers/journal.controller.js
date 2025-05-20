const {
  createJournalProvider,
} = require("../providers/createJournal.provider");

const handlePostJournal = async (req, res) => {
  return await createJournalProvider(req, res);
};

// const Journal = require("../schema/journal.schema");

// const createJournal = async (req, res) => {
//   console.log("Data", req);
//   try {
//     const {
//       title,
//       journalProfile,
//       editorInChief = [],
//       editors = [],
//     } = req.body;

//     const journal = new Journal({
//       title,
//       journalProfile,
//       editorialBoard: {
//         editorInChief,
//         editors,
//       },
//     });

//     await journal.save();

//     res.status(201).json({ message: "Journal created", journal });
//   } catch (error) {
//     console.error("Error creating journal:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = { handlePostJournal };
