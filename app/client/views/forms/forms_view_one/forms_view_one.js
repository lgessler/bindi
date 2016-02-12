/**
 * Created by lukegessler on 1/22/16.
 */

Template.FormsViewOne.helpers({
  "form": function() {
    var form = Forms.findOne({_id: this.params.id});
    form.phoneticAndPhonemic = "";
    if (form.phonemic)
      form.phoneticAndPhonemic += '/' + form.phonemic + '/';
    if (form.phonetic)
      form.phoneticAndPhonemic += '[' + form.phonetic + ']';
    form.gloss = "'" + form.gloss + "'";
    return _.extend(form, {
      formTitle: form.phonemic || form.phonetic
    });
  }
});