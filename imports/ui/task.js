import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
  'click .unvote'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
      $inc: { votes: -1 },
      $pull: { voted: Meteor.user().username , voteYes: Meteor.user().username, voteNo: Meteor.user().username  },
    });
  },
  'click .vote-yes'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
      $inc: { votes: 1 },
      $addToSet: { voted: Meteor.user().username , voteYes: Meteor.user().username  },
    });
  },
  'click .vote-no'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
      $inc: { votes: 1 },
      $addToSet: { voted: Meteor.user().username , voteNo: Meteor.user().username  },
    });
  },
});

Template.tasksingle.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
  'click .unvote'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
      $inc: { votes: -1 },
      $pull: { voted: Meteor.user().username , voteYes: Meteor.user().username, voteNo: Meteor.user().username  },
    });
  },
  'click .vote-yes'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
      $inc: { votes: 1 },
      $addToSet: { voted: Meteor.user().username , voteYes: Meteor.user().username  },
    });
  },
  'click .vote-no'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
      $inc: { votes: 1 },
      $addToSet: { voted: Meteor.user().username , voteNo: Meteor.user().username  },
    });
  },
});
