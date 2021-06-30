const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  dob: {
    type: String, // keeping  any user provided dates in MM-DD-YYYY format avoids any timezone related bugs
    required: true
  },
  profileImageId: {
    type: mongoose.Types.ObjectId
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  createdBy: {
    type: mongoose.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  modifiedBy: {
    type: mongoose.Types.ObjectId
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.isPasswordMatch = async function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('update', async function(next) {
  const { password } = this.getUpdate();
  if (!password) {
    return next();
  }

  this.getUpdate().password = await bcrypt.hash(password, 8);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
