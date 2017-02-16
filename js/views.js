 


/*global view*/
App.Views.App = Backbone.View.extend({

	initialize:function(){

		var loadImage = new App.Views.LoadImages({collection: App.photos});
		loadImage.boxImg();
		 
		var thumbView = new App.Views.ThumbsView({collection: App.photos});
		thumbView.render().el; 

		var gallery = new App.Views.GalleryView({collection: App.photos});
	}
 
});


	

/*load images*/
App.Views.LoadImages = Backbone.View.extend({

	el: '#add-images',

	initialize: function(){

		$('#files')[0].addEventListener('change', this.loadImages, false);
	},

	template: App.template('selection-template'),

	render:function(){
		this.$el.html(this.template);
		return this
	},

	boxImg: function(){

		 var button = Dropbox.createChooseButton({
            success: function(files) {
                var linkTag = document.getElementById('link');
                linkTag.href = files[0].link;
                var x = linkTag.href.slice(11)
                linkTag.textContent = files[0].link;
                App.photos.create({
 						thumb_image: ' <img src=" '+ "https://dl" + x + ' "> ', 
					    p: ''
 					}, {wait:true});
            },
            linkType: 'preview'
        });
		document.getElementById('container').appendChild(button);
		
	},
	 

});
				                              


/*single image view*/
App.Views.DisplayImage = Backbone.View.extend({

	collection: App.imageArray,	

	template: App.template('carousel-template'),

	initialize: function(){

		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
 		this.$el.html(this.template(this.model.toJSON()));
		return this
	},


});



 /*carousel view*/
 App.Views.Carousel = Backbone.View.extend({

 	collection: App.imageArray,

 	el:'#carousel',

 	initialize:function(){
 	  	this.arr = [];
 	  	this.currentImage = null;
 	 	this.$addImages = this.$('#add-images');

 	},


	setCurrentImage: function(){
		var self = this;
		App.imageArray.each(function(item){

			var image = new App.Views.DisplayImage({model:item});
			var element = image.render().el;
			self.arr.push(element);
		})	
			this.currentImage = this.arr[0];
			this.$el.html(this.currentImage);
			this.render();
	},


	showView:function(){
		$('#container').hide()
		$('#about-container').hide();
		$('#contact-container').hide();
		$('#gallery-container').hide();
		$('#gallery-list').hide();
		$('#gallery-img').hide();
		$('#add-images').hide();
		$('#thumb-list').hide();
		$('#control-panel').hide(); 
		$('#background-img').show();
		$('#image-overlay').show();
		$('#carousel-container').show();
		$('#carousel').show();
		$('#sidebar').show();
		$('.slide').show();
	},


	render:function(){
	  	var self = this;
	  	var counter = 0;
		setInterval(function(){
		    counter = (counter + 1) % self.arr.length;
		    self.currentImage = self.arr[counter];
		    self.$el.html(self.currentImage) 
		},5000) 
		return this
	}           
 })


  
 /*select-image view*/
App.Views.SelectImages = Backbone.View.extend({

	collection: App.photos,
	 
 	el: '#control-panel',

 	template: App.template('selection-template'),


	initialize: function(){
		 
		this.render();
	},

	render:function(){	

		this.$el.html(this.template);
		this.$el.show();
		return this
	},

	showView: function(){
		$('#second-image').hide()
		$('#background-front').hide()
		$('#background-front-left').hide()
		$('#about-container').hide();
		$('#contact-container').hide();
		$('#add-images').show();
		$('#sidebar').hide();
		$('#image-overlay').hide();
		$('#gallery-container').hide();
		$('#gallery-img').hide();
		$('#carousel').hide();
		$('#gallery-list').hide();
		$('#thumb-list').show();
		$('#select').show();
		$('#container').show();
	}
	 
 });



/*single thumb view*/
App.Views.ThumbView = Backbone.View.extend({

	collection: App.photos,

	tagName: 'li',

	events:{
		'click .thumb-btn':'removeItem',
	},

	template: App.template('thumb-template'),

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
		var x = this.$el.html(this.template(this.model.toJSON()));
		return this
	},

	removeItem: function(e){
		 $(e.target).remove();
		 this.$el.remove();
		 this.model.destroy();
	}

})



/*thumbs list view*/
App.Views.ThumbsView = Backbone.View.extend({

	collection: App.photos,

	tagName: 'ul',

	el:'#thumb-list',

	initialize: function(){
		this.listenTo(App.photos, 'add', this.addOne);
		this.listenTo(App.photos, 'change', this.addOne);
		 
	},

	render: function(){
		App.photos.each(this.add, this);
		return this;
	},

	addOne: function(item){
		var thumb = new App.Views.ThumbView({model: item});
		this.$el.append(thumb.render().el);
	}    


})


/*modal container*/
 App.Views.ModalContainer = Backbone.View.extend({

 	el: '#modal-container',
                                            
 	events:{
 		'click #submit':'validate',
 		'click #cancel':'cancel',
 		'keypress #password': 'accessOnEnter'
 	},

 	template: App.template('modal-template'),

 	render: function(){
 		this.$el.append(this.template);
		return this
 	},

 	showView: function(){
 		$('#background-front').hide()
		$('#background-front-left').hide()
 		$('#about-container').hide();
 		$('#gallery-list').hide();
 		$('#gallery-container').hide();
 		$('#carousel-container').hide();
 		$('#add-images').hide();
 		$('#thumb-list').hide();
 		$('#control-panel').hide();
 		$('#modal-container').show();
 		$('#contact-container').hide();
 		
 	},

 	cancel: function(){
 		this.$("#password").val('');
		this.$el.hide();
		window.location.replace('');
	},

	accessOnEnter: function(e){
		if(e.which === 13){
			this.validate();
		}
	},

	validate: function(){ 
		this.$email = this.$("#email").val().trim();
		this.$input = this.$("#password").val().trim(); 
		this.pass = ''//App.photos.at(0).get('p');
		console.log(this.pass)
		if(this.$input === this.pass && this.$email === 'billborges@ymail.com'){
			  this.$el.hide();
			  window.location.replace('#select');
		}
		else{
		 	this.$("#password").val('');
		}
	},

 });
                                 


/*all gallery images*/
App.Views.GalleryView = Backbone.View.extend({

	el: '#gallery-list',

	events:{ 
		'click .thumb':'displayImg'
	},

	displayImg: function(e){
		var arr = [];
		App.photos.each(function(item){
			var ecurrent = e.currentTarget.attributes[0].ownerElement.innerHTML;
			arr.push(ecurrent)
			$('#gallery-display').html(arr[0]);
		});
	},


	initialize: function(){

		this.listenTo(App.photos, 'add', this.addOne);
		this.listenTo(App.photos, 'change', this.addOne);
		this.listenTo(App.photos, 'add', this.setImage);
	},

	render: function(){
		App.photos.each(this.addOne, this);
		return this
	},

	addOne: function(item){
		var galleryImg = new App.Views.ThumbView({model: item});
		this.$el.append(galleryImg.render().el);
	}, 

	setImage: function(){
		App.photos.each(function(item){
			var current = item.attributes.thumb_image
			$('#gallery-display').html(current)
		})

	},

	showView:function(){
		$('#background-front').hide()
		$('#background-front-left').hide()
		$('#container').hide();
		$('#about-container').hide();
		$('#contact-container').hide();
		$('#carousel').hide();
		$('#carousel-container').hide();
		$('#add-images').hide();
		$('#sidebar').hide();
		$('#image-overlay').hide();
		$('#background-img').hide();
		$('.thumb-btn').hide();
		$('#thumb-list').hide();
		$('#control-panel').hide();
		$('#gallery-container').show();
		$('#gallery-list').show();
	}

})
		

/*contact view*/
App.Views.Contact = Backbone.View.extend({

	el: '#contact-container',

	template: App.template('contact-template'),

	render: function(){
		this.$el.html(this.template);
	},

	showView: function(){	
		$('#background-front').hide()
		$('#background-front-left').hide()
		$('#container').hide();
		$('#about-container').hide();
		$('#gallery-list').hide();
 		$('#gallery-container').hide();
 		$('#carousel-container').hide();
 		$('#add-images').hide();
 		$('#thumb-list').hide();
 		$('#control-panel').hide();
 		$('#modal-container').hide();
 		$('#background-img').hide();
 		$('#contact-container').show();
 	}

})

App.Views.About = Backbone.View.extend({

	el: '#about-container',

	template: App.template('about-template'),

	render: function(){

		this.$el.html(this.template);
	},

	showView: function(){
		$('#background-front').hide()
		$('#background-front-left').hide()
		$('#container').hide();
		$('#gallery-list').hide();
 		$('#gallery-container').hide();
 		$('#carousel-container').hide();
 		$('#add-images').hide();
 		$('#thumb-list').hide();
 		$('#control-panel').hide();
 		$('#modal-container').hide();
 		$('#background-img').hide();
 		$('#contact-container').hide();
 		$('#about-container').show();
	}




})