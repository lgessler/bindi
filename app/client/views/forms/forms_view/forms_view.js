/**
 * Created by lukegessler on 1/22/16.
 */

Template.FormsView.helpers({
  "forms": function() {
    return _.map(Forms.find({}, {sort: {dateCollected: -1, phonetic: 1}}).fetch(), function(form) {
      form.dateCollected = form.dateCollected.toString().split(' ').slice(1,4).join(' ');
      return form;
    });
  }
});