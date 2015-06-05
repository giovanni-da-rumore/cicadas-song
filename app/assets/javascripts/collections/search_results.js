Cicadas.Collections.SearchResults = Backbone.Collection.extend({

	initialize: function () {
		this.searchInfo = {};
		this.model.prototype.idAttribute = "polyId";
	},

	parse: function (response) {
		this.searchInfo.totalPages = response.total_pages;
		return response.search_results;
	},

	url: "/api/search",

	model: function (attrs) {
		var type = attrs._type;
		delete attrs._type;
		var newModel;
		newModel = new Cicadas.Models[type](attrs);
		debugger;
		return newModel;
	},



});


Cicadas.Collections.SearchResults.prototype.model.prototype.idAttribute = "polyId";
