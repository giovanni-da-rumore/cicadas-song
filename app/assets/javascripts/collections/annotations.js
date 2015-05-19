Cicadas.Collections.Annotations = Backbone.Collection.extend({

	url: "/api/annotations",

	model: Cicadas.Models.Annotation,

	comparator: "start_index",



});
