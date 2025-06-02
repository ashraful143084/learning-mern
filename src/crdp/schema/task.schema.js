const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [false, "Task title is required"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [false, "Task description is required"],
      trim: true,
      maxLength: [500, "Description cannot be more than 500 characters"],
    },
    status: {
      type: String,
      required: [false, "Task status is required"],
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      required: [false, "Task priority is required"],
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    dueDate: {
      type: Date,
      required: [false, "Task due date is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    attachment: {
      path: String,
      originalName: String,
      mimetype: String,
      size: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

const Task = model("Task", taskSchema);

module.exports = Task;
