var imagesModel = Backbone.Model.extend({
    initialize: function() {
        console.log("model initializing");
        this.fetch();  //makes GET req to url (/home)
    },
    url: '/home'
});

