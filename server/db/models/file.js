const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fileSie: {
        type: Number
    },
    metadata: {
      type: Object
    },
    mimeType: {
      type: String,
      required: true  
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
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;