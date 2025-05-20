const { body } = require("express-validator");

const createJournalValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("journalProfile")
    .trim()
    .notEmpty()
    .withMessage("Journal profile is required"),

  body("editorInChief")
    .optional()
    .custom((value) => {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) throw new Error();
        parsed.forEach((person) => {
          if (
            typeof person.name !== "string" ||
            typeof person.designation !== "string"
          ) {
            throw new Error(
              "Each editorInChief must have name and designation as strings"
            );
          }
        });
        return true;
      } catch {
        throw new Error("Invalid editorInChief array format");
      }
    }),

  body("editors")
    .optional()
    .custom((value) => {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) throw new Error();
        parsed.forEach((person) => {
          if (
            typeof person.name !== "string" ||
            typeof person.designation !== "string"
          ) {
            throw new Error(
              "Each editor must have name and designation as strings"
            );
          }
        });
        return true;
      } catch {
        throw new Error("Invalid editors array format");
      }
    }),

  body("announcement")
    .optional()
    .custom((value) => {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) throw new Error();
        parsed.forEach((item) => {
          if (typeof item.title !== "string" || isNaN(Date.parse(item.date))) {
            throw new Error(
              "Each announcement must have title as string and a valid date"
            );
          }
        });
        return true;
      } catch {
        throw new Error("Invalid announcement array format");
      }
    }),
];

module.exports = { createJournalValidator };
