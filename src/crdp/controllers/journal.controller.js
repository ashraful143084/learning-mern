const {
  createJournalProvider,
  fetchJournalProvider,
} = require("../providers/journal.provider");

const handlePostJournal = async (req, res) => {
  return await createJournalProvider(req, res);
};

const handleGetJournals = async (req, res) => {
  return await fetchJournalProvider(req, res);
};

module.exports = { handlePostJournal, handleGetJournals };
