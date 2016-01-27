/**
 * Created by lukegessler on 1/22/16.
 */

Template.FormsViewOne.helpers({
  "form": function() {
    return Forms.findOne({_id: this.params.id});
  }
});