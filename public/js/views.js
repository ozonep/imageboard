var sendImageView = Backbone.View.extend({
    el: '#mymain',
    initialize: function() {
        var view = this;
        this.model.on('change', function() {
            view.render();
        });
    },
    render: function() {
        var ourRenderedTemplate = Handlebars.templates.players(this.model.toJSON());
        this.$el.html(ourRenderedTemplate);
    },
    events: {
        'click #upload-button': function(){
            var file = $('input[type="file"]').get(0).files[0];
            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
                url: '/upload',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false
            });
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
        var ourRenderedTemplate = Handlebars.templates.imagePannel(this.model.toJSON());
        this.$el.html(ourRenderedTemplate);
    },
});