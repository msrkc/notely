const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  password: String
});

userSchema.set("timestamps", true);

userSchema.statics.passwordMatches = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.pre("save", function(next) {
  this.username = this.username.toLowerCase();
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();
  const unsafePassword = this.password;
  this.password = bcrypt.hashSync(unsafePassword);
  next();
});

module.exports = mongoose.model("user", userSchema);
