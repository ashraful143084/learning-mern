const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [100, "First name must be 100 characters"],
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      maxLength: [100, "Last name must be 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
            email
          );
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must have 8 characters long"],
      validate: {
        validator: function (password) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/gm.test(
            password
          );
        },
        message:
          "password must be included at least one number , one uppercase letter, one lowercase letter and one special characters, ",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

module.exports = User;
