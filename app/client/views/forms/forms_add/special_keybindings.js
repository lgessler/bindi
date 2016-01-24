/**
 * Created by lukegessler on 1/24/16.
 */

initializeKeybindings = function() {
  Meteor.call('getKeybindingsObject', function(error, result) {
    if (error)
      throw new Meteor.Error("Unknown error while fetching keybindings object");

    var specialFieldNames = [
      '#phonetic',
      '#phonemic'
    ];

    // looks like this:
    // {
    //   "no_mod": {"a": "b"},
    //   "shift": {"c": "d", "e": "f"},
    //   "ctrl": {"g": "h"}
    // }
    var bindingsObject = result;
    _.forEach(bindingsObject, function(bindingPairs, mod) {
      _.forEach(bindingPairs, function(result, key) {

        specialFieldNames.forEach(function(fieldName){

          switch(mod) {
            case "no_mod":
              $(fieldName).keypress(function(e) {
                var input = String.fromCharCode(e.which);
                if (input === key) {
                  e.preventDefault();
                  $(fieldName).val($(fieldName).val() + result);
                }
              });
              break;
            case "shift":
              $(fieldName).keypress(function(e) {
                var input = String.fromCharCode(e.which);
                if (e.shiftKey && input === key) {
                  e.preventDefault();
                  $(fieldName).val($(fieldName).val() + result);
                }
              });
              break;
            case "ctrl":
              $(fieldName).keypress(function(e) {
                var input = String.fromCharCode(e.which);
                if (e.ctrlKey && input === key) {
                  $(fieldName).val($(fieldName).val() + result);
                  e.preventDefault();
                }
              });
              break;
          }

        });

      });
    });

  });

};
