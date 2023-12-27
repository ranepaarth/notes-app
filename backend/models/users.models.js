const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signupUser = async function (userName, email, password) {
  const exists = await this.findOne({ email });

  if (exists) throw new Error("Email already exists.\nPlease try logging in.");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  //saving the user in db
  const user = this.create({ userName, email, password: hashPwd });

  return user;
};

userSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("Incorrect email.");

  const match = bcrypt.compare(password,user.password)

  if(!match) throw new Error("Incorrect password.")

  return user
};

module.exports = mongoose.model("User", userSchema);
