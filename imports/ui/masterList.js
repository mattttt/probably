import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { Locations } from '../api/locations.js';
import { Game } from '../api/game.js';


import './task.js';
import './location.js';
import './game.js';
import './masterList.html';

Template.masterList.onCreated(function masterListOnCreated() {
  this.state = new ReactiveDict();
});

Template.masterList.helpers({
  tasksr1() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { round: "1" }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({ round: "1" }, { sort: { createdAt: -1 } });
  },
  votetasksr1() {
    return Tasks.find({ round: "1" , "voted" : {$nin : [Meteor.user().username] }}, { limit: 1 });
  },
  votetasksr2() {
    return Tasks.find({ round: "2" , "voted" : {$nin : [Meteor.user().username] }}, { limit: 1 });
  },
  tasksr2() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { round: "2" }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({ round: "2" }, { sort: { createdAt: -1 } });
  },
  incompleteCountr1() {
    return Tasks.find({ round: "1" }, { checked: { $ne: true } }).count();
  },
  incompleteCountr2() {
    return Tasks.find({ round: "2" }, { checked: { $ne: true } }).count();
  },
  locations() {
    const instance = Template.instance();
    return Locations.find({}, { sort: { createdAt: -1 } });
  },
  game() {
    return Game.find();
  },
});

Template.masterList.events({
  'submit .new-task-r1'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      round: "1",
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    target.text.value = '';
  },
  'submit .new-task-r2'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      round: "2",
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    target.text.value = '';
  },
  'submit .new-location'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a location into the collection
    Locations.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    target.text.value = '';
  },

  'submit .game'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const number = target.number.value;

    // Insert a game into the collection
    Game.insert({
      createdAt: new Date(), // current time
      players: number,
    });

    // Clear form
    target.number.value = '';
  },

  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
