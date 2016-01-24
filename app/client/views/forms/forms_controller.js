this.FormsController= RouteController.extend({
	template: "Forms",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('forms.view', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		// don't sub here--view_forms_controller takes care of it
		var subs = [
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
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
