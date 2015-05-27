Cicadas.Views.SearchBar = Backbone.View.extend({

	initialize: function (options) {
		if (options) {
			this.query = options.query
		}
		this.collection = new Cicadas.Collections.SearchResults();
		this.listenToOnce(this.collection, "sync", this.renderResults);
		this.render();
	},

	events: {
		"submit .search-bar": "search",
		"click .next-page": "nextPage"
	},

	template: JST["static_pages/search_bar"],

	render: function () {
		this.$el.html(this.template({search_query: this.query}))

		return this;
	},

	search: function (event) {
		event.preventDefault();
		var $input = this.$el.find("#query");
		this.collection.searchInfo.query = $input.val();
		this.collection.searchInfo.page = 1;
		var that = this;
		Backbone.history.navigate("#search/?" + $input.val().replace(/\s/, "+"), {trigger: true} )
	},


});
