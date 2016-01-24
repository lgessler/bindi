Forms.allow({
	insert: function (userId, doc) {
		return Forms.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Forms.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Forms.userCanRemove(userId, doc);
	}
});

Forms.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.lastEdited = doc.createdAt;
	doc.lastEditor = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Forms.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.lastEdited = new Date();
	modifier.$set.lastEditor = userId;

	modifier.$push = modifier.$push || {};
	modifier.$push.history = doc;
});

Forms.before.remove(function(userId, doc) {
	
});

Forms.after.insert(function(userId, doc) {
	
});

Forms.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Forms.after.remove(function(userId, doc) {
	
});
