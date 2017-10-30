var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'home': 'home',
        'upload': 'upload'
    },
    home: function() {
        main.off();
        var view = new getImageView({
            model: new ImageModel
        });
    },
    upload: function() {
        main.off();
        var view = new sendImageView({
            model: new UploadModel
        });
    }
});