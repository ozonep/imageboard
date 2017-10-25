var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    home: function() {
        var view = new sendImageView({
            model: new imagesModel
        });
    }
});