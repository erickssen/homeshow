App.Router = Backbone.Router.extend({

	routes:{

		'': 'mainPage',

		'main': 'mainPage',

		'select': 'showSelect',

		'login': 'login',

		'gallery': 'gallery',

		'contact': 'contact',

		'about': 'about'
		 
	},


	about: function(){
		var about = new App.Views.About();
		about.showView();
		about.render();
	},


	contact:function(){
		var contact = new App.Views.Contact();
		contact.showView();
		contact.render();
	},
	

	gallery: function(){
		var gallery = new App.Views.GalleryView();
		gallery.showView();
	},


	login: function(){
		var modalContainer = new App.Views.ModalContainer();
		modalContainer.showView();
		modalContainer.render();
	},

	
	mainPage: function(){
		var displayCarousel = new App.Views.Carousel({collection: App.imageArray});
		displayCarousel.setCurrentImage();
		displayCarousel.showView();
		displayCarousel.render();
	},


	showSelect: function(){  
		 var select = new App.Views.SelectImages();
		 select.showView();
	}
	 

	




});