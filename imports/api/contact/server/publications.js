import { Meteor } from 'meteor/meteor';
import { Contacts } from '../contact';

Meteor.publish('contacts', () => Contacts.find());