import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Contacts = new Mongo.Collection('Contacts');

Contacts.schema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  "owner": {
    type: String,
  },
  "createdAt": {
    type: Date,
  },
});

Contacts.attachSchema(Contacts.schema);
