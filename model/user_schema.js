const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    profileImage: {
      type: String,
      default: "user.jpg",
    },
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
      select: false,
    },
    phoneNo: {
      type: Number,
      require: [true, "Phonne Number is required"],
    },
    address: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      enum: ["customer", "opticial", "admin", "salesman"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    let salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  if (this.isModified("password")) {
    let salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("user", userSchema, "user");
