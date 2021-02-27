const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for your contact'],
      unique: true,
      minlength: 2,
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, 'Set email for your contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone number for your contact'],
      unique: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// contactSchema.virtual('strName').get(function () {
//   return `${this.name} name`
// })

const Contact = model('contact', contactSchema);

module.exports = Contact;
