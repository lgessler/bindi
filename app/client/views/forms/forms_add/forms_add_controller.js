/**
 * Created by lukegessler on 1/22/16.
 */

this.FormsAddController= RouteController.extend({
	template: "Forms",

	yieldTemplates: {
		'FormsAdd': { to: 'FormsSubcontent'}
	},

	onBeforeAction: function() {

		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
	},

	isReady: function() {
		var subs = [
			Meteor.subscribe('forms')
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		return {
			params: this.params || {}
		};
	},

	rendered: function() {

	},

	onAfterAction: function() {

	}
});
