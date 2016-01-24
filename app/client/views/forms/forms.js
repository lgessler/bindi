/**
 * Created by lukegessler on 1/23/16.
 */
Template.Forms.rendered = function() {

};

Template.Forms.events({

});

Template.Forms.helpers({

});

Template.FormsSideMenu.rendered = function() {
	// Why is this here?
	$(".dropdown-button").dropdown();
};

Template.FormsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}

});

Template.FormsSideMenu.helpers({

});
