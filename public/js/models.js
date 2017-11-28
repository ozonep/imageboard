var ImageModel = Backbone.Model.extend({
    initialize: function() {
        console.log("model initializing");
        this.fetch();  //makes GET req to url (/home)
    },
    defaults: {
        title: "No title",
        description: "No description"
    },
    url: '/home'
});

var UploadModel = Backbone.Model.extend({
    save: function() {
        var formData = new FormData();
        formData.append('file', this.get('file'));
        formData.append('username', this.get('username'));
        formData.append('title', this.get('title'));
        formData.append('description', this.get('description'));
        formData.append('tags', this.get('tags'));
        var view = this;
        $.ajax({
            url: '/upload',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function() {
                // window.location = ''
                router.navigate('', {trigger: true});
                view.fetch();
            }
        });
    },
});

// var Image = Backbone.Model.extend({
//     defaults: {
//         title: "No title",
//         description: "No description"
//     },
//     initialize: function() {
//         console.log("model initializing");
//         this.fetch();
//     },
//     url: '/home'
// });
//
// var Images = Backbone.Collection.extend({
//     model: Image
// });
//
// var imagesCol = new Images();
//
// imagesCol.add(new ImageModel({
//     url: "",
//     tags: "",
//     description: "",
// }));
