/**
 * Forms shall have:
 *  - phonetic: utf-8 string, phonetic repr
 *  - phonemic: utf-8 string, phonemic repr
 *  - gloss: utf-8 string, the form's meaning
 *  - tags: array of strings
 *  - dateCollected: date, when collected
 *
 *  - creator: userId of creator
 *  - dateCreated: date
 *  - lastEditor: userId of last user to edit
 *  - lastEdited: date
 *  - history: array of past versions of the doc
 * @type {Mongo.Collection}
 */

this.Forms = new Mongo.Collection("forms");

this.Forms.userCanInsert = function(userId, doc) {
	return true;
}

this.Forms.userCanUpdate = function(userId, doc) {
	return true;
}

this.Forms.userCanRemove = function(userId, doc) {
	return true;
}

if (Meteor.isServer) {
	Meteor.publish('forms', function () {
		return Forms.find();
	});
};


validateForm = function(form) {
	var errors = {};

	if (!form.phonetic && !form.phonemic) {
		errors.phonemic = "Please fill out either a phonemic or a phonetic transcription.";
		errors.phonetic = "Please fill out either a phonemic or a phonetic transcription.";
	}

	if (!form.gloss) {
		errors.gloss = "Please add a gloss.";
	}

	return errors;
};

Meteor.methods({
	'formsAdd': function(form) {

		var errors = validateForm(form);
		if (errors.phonemic || errors.gloss) {
			var reason = "Form invalid. ";
			if (errors.phonemic && errors.gloss)
				reason += "Please add a phonemic or phonetic transcription and a gloss.";
			else if (errors.phonemic)
				reason += "Please add a phonemic or phonetic transcription.";
			else
				reason += "Please add a gloss.";
			throw new Meteor.Error('invalid-form', reason);
		}

		var sameForm = Forms.findOne({
			$or: [
				{
					$and: [
						{phonetic: form.phonetic},
						{phonetic: {$ne: ""}}
					]
				},
				{
					$and: [
						{phonemic: form.phonemic},
						{phonemic: {$ne: ""}}
					]
				}
			]
		});

		if (sameForm)
			throw new Meteor.Error('duplicate-form', "This form already exists in the database.");

		form = _.extend(form, {
			creator: Meteor.userId(),
			dateCreated: new Date(),
			lastEditor: null,
			lastEdited: null,
			history: []
		});

		var formId = Forms.insert(form);
		console.log("Inserted new form: ", form);
		return { _id: formId };
	},
	'formsEdit': function(form) {
		var errors = validateForm(form);
		if (errors.phonemic || errors.gloss) {
			var reason = "Form invalid. ";
			if (errors.phonemic && errors.gloss)
				reason += "Please add a phonemic or phonetic transcription and a gloss.";
			else if (errors.phonemic)
				reason += "Please add a phonemic or phonetic transcription.";
			else
				reason += "Please add a gloss.";
			throw new Meteor.Error('invalid-form', reason);
		}

		/*
		var sameForm = Forms.findOne({
			_id: form._id
		});

		todo: make sure there was actually a change

		if (sameForm)
			throw new Meteor.Error('duplicate-form', "This form already exists in the database.");
		*/

		form = _.extend(form, {
			lastEditor: Meteor.userId(),
			lastEdited: new Date()
		});

		var id = form._id
		delete form._id;
		console.log(form);

		var pushPayload = {
			history: Forms.findOne({_id: id})
		};

		console.log(form);
		var formId = Forms.update({_id: id},
			{$set: form},
			{$push: pushPayload}
		);

		if (formId)
      console.log("Updated form: ", form);
		else
			throw new Meteor.Error('update-error', "Couldn't update form \n" + form);
		return { _id: formId };
	}
});

// fixtures
/*
if (Forms.find().count() === 0) {

	Forms.insert({
		phonetic: "heiˈwʌ̃ŋ",
		phonemic: null,
		gloss: "wild animal",
		tags: ["Noun"],
		dateCollected: new Date(2016, 1, 20),
		creator: Meteor.users.findOne(),
		dateCreated: new Date(),
		lastEditor: null,
		lastEdited: null,
		history: []
	});

	Forms.insert({
		phonetic: "ʃɪ̃mˈbɨɾ̥",
		phonemic: null,
		gloss: "bird",
		tags: ["Noun"],
		dateCollected: new Date(2016, 1, 20),
		creator: Meteor.users.findOne(),
		dateCreated: new Date(),
		lastEditor: null,
		lastEdited: null,
		history: []
	});

  Forms.insert({
		phonetic: "ɗic",
		phonemic: null,
		gloss: "blood",
		tags: ["Noun"],
		dateCollected: new Date(2016, 1, 20),
		creator: Meteor.users.findOne(),
		dateCreated: new Date(),
		lastEditor: null,
		lastEdited: null,
		history: []
	});
}*/