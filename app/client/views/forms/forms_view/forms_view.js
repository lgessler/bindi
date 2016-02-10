/**
 * Created by lukegessler on 1/22/16.
 */

Template.FormsView.helpers({
  "forms": function() {
    var sortArray = Session.get('sortArray');
    var sortOrder = {};
    sortOrder[sortArray[0]] = sortArray[1];
    sortOrder[sortArray[2]] = sortArray[3];

    return _.map(Forms.find({}, {sort: sortOrder}).fetch(), function(form) {
      form.dateCollected = form.dateCollected.toString().split(' ').slice(1,4).join(' ');
      return form;
    });
  }
});

var sortButtonClicked = function(field) {
  var sortArray = Session.get('sortArray');

  if (sortArray.indexOf(field) === 0) {
    sortArray[1] = sortArray[1] * -1;
  }
  else if (sortArray.indexOf(field) === 2) {
    var tmp1, tmp2;
    tmp1 = sortArray[0];
    tmp2 = sortArray[1];
    sortArray[0] = sortArray[2];
    sortArray[1] = sortArray[3];
    sortArray[2] = tmp1;
    sortArray[3] = tmp2;
  }
  else {
    sortArray[2] = sortArray[0];
    sortArray[3] = sortArray[1];
    sortArray[0] = field;
    sortArray[1] = 1;
  }

  Session.set('sortArray', sortArray);
};

Template.FormsView.events({
  'click #phonemic': function(e) {
    e.preventDefault();
    sortButtonClicked('phonemic');
  },
  'click #phonetic': function(e) {
    e.preventDefault();
    sortButtonClicked('phonetic');
  },
  'click #gloss': function(e) {
    e.preventDefault();
    sortButtonClicked('gloss');
  },
  'click #tags': function(e) {
    e.preventDefault();
    sortButtonClicked('tags');
  },
  'click #dateCollected': function(e) {
    e.preventDefault();
    sortButtonClicked('dateCollected');
  }
});