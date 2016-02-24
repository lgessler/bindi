/**
 * Created by lukegessler on 1/24/16.
 */

initializeKeybindings = function(specialFieldNames) {
  var result = Keybindings;
  if(!specialFieldNames) {
    specialFieldNames = [
      '#phonetic',
      '#phonemic'
    ];
  }

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

                var i = $(fieldName)[0].selectionStart;
                var currVal = $(fieldName).val();
                console.log(i, currVal, currVal.substr(0, i) , result , currVal.substr(i));
                $(fieldName).val(currVal.substr(0, i) + result + currVal.substr(i));
                $(fieldName)[0].selectionStart = i + result.length;
                $(fieldName)[0].selectionEnd = i + result.length;
              }
            });
            break;
          case "shift":
            $(fieldName).keypress(function(e) {
              var input = String.fromCharCode(e.which);
              if (e.shiftKey && input === key) {
                e.preventDefault();

                var i = $(fieldName)[0].selectionStart;
                var currVal = $(fieldName).val();
                $(fieldName).val(currVal.substr(0, i) + result + currVal.substr(i));
                $(fieldName)[0].selectionStart = i + result.length;
                $(fieldName)[0].selectionEnd = i + result.length;
              }
            });
            break;
        }

      });

    });
  });

};
