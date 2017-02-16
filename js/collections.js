
App.Collections.Photos = Backbone.Firebase.Collection.extend({

	model: App.Models.Photo,

	url: 'https://homeshow-8c00c.firebaseio.com',

	autoSync: false,


});
  
  App.photos = new App.Collections.Photos();
		 

  App.imageArray = new App.Collections.Photos ([
	 		new App.Models.Photo ({image: 'assets/img7.jpg' }),
	 		new App.Models.Photo ({image: 'assets/img8.jpg' }),
	 		new App.Models.Photo ({image: 'assets/img9.jpg' }),
	 		new App.Models.Photo ({image: 'assets/img10.jpg'}),
 	]);

