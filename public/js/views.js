var sendImageView = Backbone.View.extend({
    el: '#myupload',
    initialize: function() {
        var view = this;
        view.render();
    },
    render: function() {
        let ourTemplate = Handlebars.templates.images();
        this.$el.html(ourTemplate);
    },
    events: {
        'click #upload-button': function() {
            this.model.set({
                file: $('input[type="file"]').get(0).files[0],
                username: $("#username").val(),
                title: $("#title").val(),
                description: $("#description").val(),
                tags: $("#tags").val()
            });
            this.model.save()
        }
    }
});

var getImageView = Backbone.View.extend({
    el: "#mymain",
    initialize: function() {
        var view = this;
        this.model.on('change', function () {
            view.render();
        });
    },
    render: function() {
        var ourRenderedTemplate = Handlebars.templates.images(this.model.toJSON());
        this.$el.html(ourRenderedTemplate);
    },
});


// var imageCollectionView =
// newImage: function(data) {
//     return this.collection.create(data);
// }