Cicadas.Collections.SearchResults = Backbone.Collection.extend({

	initialize: function () {
		this.searchInfo = {};
	},

	parse: function (response) {
		this.searchInfo.totalPages = response.total_pages;
		// response.search_results.forEach(function (result) {
		// 	this.populate(result);
		// }.bind(this));
		return response.search_results;
	},

	url: "/api/search",

	model: function (attrs) {
		var type = attrs._type;
		debugger;
		delete attrs._type;
		var newModel;
		newModel = new Cicadas.Models[type](attrs);
		return newModel;
	},

	populate: function (attrs) {
		var type = attrs._type
		this.add(new Cicadas.Models[type](attrs));
	}



});
