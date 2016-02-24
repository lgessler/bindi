/**
 * Created by lukegessler on 1/22/16.
 */
var combining = [
  '\u031E', // shift down
  '\u0318', // shift left
  '\u0303', // nasalized
  '\u0325' // devoiced
];

var pgrep = function() {
  var pat = Session.get('searchText');
  var whichForm = Session.get('textLabel');
  if (pat === "" || !pat) {
    var forms = Forms.find().fetch();
    forms.forEach(function(form) {
      if (whichForm === 'Phonetic')
        form.form = form.phonetic;
      else
        form.form = form.phonemic;
      form.dateCollected = form.dateCollected.toString().split(' ').slice(1,4).join(' ');
    });
    return forms;
  }

  var regex = new RegExp(pat, "g");
  var occ;
  var results = [];
  var maxInd = 0;

  var query = {};
  if (whichForm === 'Phonetic')
    query.phonetic = regex;
  else
    query.phonemic = regex;

  var docs = Forms.find(query).fetch();
  docs.forEach(function(doc) {
    var form;
    if (whichForm === 'Phonetic')
      form = doc.phonetic;
    else
      form = doc.phonemic;
    while((occ = regex.exec(form)) != null) {
      if (maxInd < occ.index) maxInd = occ.index;
      results.push([occ, doc]);
    }
  });

  //just do this so we get consistent results
  maxInd = 20;
  var mergedResults = [];

  console.log(" ".repeat(maxInd) + "v");
  results.forEach(function(pair) {
    var occ = pair[0];
    var padding = (" ".repeat(maxInd-occ.index));
    // account for combining characters
    var beforeMatch = occ.input.substring(0, occ.index);
    combining.forEach(function(c) {
      padding += " ".repeat((beforeMatch.match(new RegExp(c, "g"))||[]).length);
    });
    console.log(padding + occ.input);

    pair[1].form = padding + occ.input;
    pair[1].dateCollected = pair[1].dateCollected.toString().split(' ').slice(1,4).join(' ');
    mergedResults.push(pair[1]);

    //console.log(padding + occ.input.substring(0, occ.index) + " " + occ.input.substring(occ.index, occ.index+1) + " " + occ.input.substring(occ.index+1));
  });

  console.log(mergedResults[0]);
  return mergedResults;
};

Template.FormsConcordance.helpers({
  "forms": function() {
    return pgrep();
    /*
    var query = {};
    if(Session.get('textLabel') === 'Phonetic')
      query.phonetic = new RegExp(Session.get('searchText'));
    else
      query.phonemic = new RegExp(Session.get('searchText'));

    console.log(query);

    var forms = _.map(Forms.find(query, {}).fetch(), function(form) {
      form.dateCollected = form.dateCollected.toString().split(' ').slice(1,4).join(' ');
      if (Session.get('textLabel') === 'Phonetic') {
        form.form = form.phonetic;
      } else {
        form.form = form.phonemic;
      }
      return form;
    });
    return forms;
    */
  },
  "textLabel": function() {
    return Session.get('textLabel');
  }
});


Template.FormsConcordance.events({
  'click #phonetic': function() {
    Session.set('textLabel', 'Phonetic');
  },
  'click #phonemic': function() {
    Session.set('textLabel', 'Phonemic');
  },
  'keyup #searchText': function() {
    Session.set('searchText', $('#searchText').val());
  }
});

Template.FormsConcordance.rendered = function() {
  // from special_keybindings.js
  initializeKeybindings(['#searchText']);

  // Set focus to first active field
  $('#searchText').focus();
  Session.set('textLabel', 'Phonetic');
  Session.set('searchText', '');
};





