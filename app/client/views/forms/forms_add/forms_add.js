Template.FormsAdd.onCreated(function() {
  Session.set('formsAddErrors', null);
});

Template.FormsAdd.helpers({
  errorClass: function(field) {
    if (!Session.get('formsAddErrors') || $("#" + field).attr('disabled'))
      return '';
    return !!Session.get('formsAddErrors')[field] ? 'invalid' : 'valid';
  },
  labelErrorClass: function(field) {
    if (!Session.get('formsAddErrors') || $("#" + field).attr('disabled'))
        return '';
    return !!Session.get('formsAddErrors')[field] ? 'active' : '';
  }
});

Template.FormsAdd.events({
  'submit form': function(e) {
    e.preventDefault();

    // see schema in forms.js
    var form = {
      phonetic: $('#phonetic').val(),
      phonemic: $('#phonemic').val(),
      gloss: $('#gloss').val(),
      tags: $('#tags').val(),
      dateCollected: new Date($('#dateCollected').val())
    };

    var errors = validateForm(form);
    if (errors.phonemic || errors.phonetic || errors.gloss)
      return Session.set('formsAddErrors', errors);

    Meteor.call('formsAdd', form, function (error, result) {
      if (error) {
        console.log(error);
        return Materialize.toast("Error with form '" + (form.phonemic || form.phonetic) + "': " + error.reason, 4000);
      }
      // reset form
      $('#phonetic').val("");
      $('#phonemic').val("");
      $('#gloss').val("");
      $('#tags').val("");
      if ($('#phonemic').attr('disabled'))
        $('#phonetic').focus();
      else
        $('#phometic').focus();
    });
  }
});

Template.FormsAdd.rendered = function() {
  initializeKeybindings();

  // Set focus to first active field
  if ($('#phonemic').attr('disabled'))
    $('#phonetic').focus();
  else
    $('#phometic').focus();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  // All the following assumes a weekly meeting time of Wednesday 5PM.
  var oneDay = 24*3600000,
    now = new Date(),
    day = now.getDay(),
    hours = now.getHours(),
    daysSinceLastWednesday = (now.getDay() + 4) % 7 ,
    dateCollected = now;

  // case Wednesday
  if (day === 3) {
    if (hours < 17) {
      dateCollected.setTime(now.getTime() - oneDay * 7);
    }
  } else {
    dateCollected.setTime(now.getTime() - oneDay * daysSinceLastWednesday);
  }

  $('.datepicker').val(dateCollected.toString().split(' ').slice(1, 4).join(' '));
  $('#datelabel').addClass('active');
  // since we pre-set the value of the date, make it unselectable with tab
  $('.picker').attr('tabindex', '-1');

};
