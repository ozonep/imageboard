var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    home: function() {
        var view = new getImageView({
            model: new imagesModel
        });
    }
});