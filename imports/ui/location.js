import { Template } from 'meteor/templating';

import { Locations } from '../api/locations.js';

import './location.html';

Template.location.events({
  'click .delete'() {
    Locations.remove(this._id);
  },
});
