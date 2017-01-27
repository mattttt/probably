import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Mongo} from 'meteor/mongo';

import '../lib/routes.js';

import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';
import '../imports/api/tasks.js';
import '../imports/api/locations.js';
import '../imports/api/game.js';

import './main.html';