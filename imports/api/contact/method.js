import { Contacts } from './contact';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

export const insertContact = new ValidatedMethod({
  name: 'contacts.insert',
  validate: new SimpleSchema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
  }).validator(),
  run({firstName, lastName, email }) {
      return new Promise((resolve, reject) => {
        Contacts.insert({
        firstName,
        lastName,
        email,
        createdAt: new Date(),
        owner: Meteor.userId(), 
      }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
});

export const updateContact = new ValidatedMethod({

  name: 'contacts.update',

  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    firstName: {
      type: String,
      optional: true,
    },
    lastName: {
      type: String,
      optional: true,
    },
    email: {
      type: String,
      optional: true,
    },
  }).validator(),

  run({ _id, firstName, lastName, email }) {
    const values = {
      firstName,
      lastName,
      email,
    };
    Contacts.update(_id, { $set: { ...values } });
  },
});

export const removeContact = new ValidatedMethod({
  name: 'contacts.remove',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    Contacts.remove({ _id: id });
  },
});