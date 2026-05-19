const express=require('express');
const hostrouter=express.Router();
const path=require('path');
const Home=require('../models/home');
const a=require('../controllers/home');
const Favorite = require('../models/Favorite');
const fs=require('fs');

hostrouter.post('/first',(req,res,next)=>{
//res.sendFile(path.join(__dirname,'../','views','additem.html'));
res.render('store/display', { pageTitle: 'who you are...' });
}
);
// 1. Use .post
// --- SELLER ROUTE: Receives form data ---
hostrouter.get('/add-item', (req, res, next) => {
    // This sends the physical HTML file to the browser
    res.sendFile(path.join(__dirname, '../', 'host', 'additem.html'));
});
//sendFile because html file is sent
hostrouter.post('/seller', (req, res, next) => {
    const { productname, price, description, location, photoUrl} = req.body;
    //given as input
    const home = new Home(productname, price, description, location, photoUrl);
    //object to handle class
    home.save(); // This is now instant
    res.redirect('/buyer');// Redirect to the buyer page to see the new listing
});

// --- BUYER ROUTE: Shows all listings ---


hostrouter.get('/buyer', (req, res, next) => {
  Home.fetchAll((allHomes) => {
    //see what allHomes fetch
    // Only items inside the JSON file will be in 'allHomes'
    res.render('itemadded', {
      //itemadded being ejs file
      homes: allHomes, 
      pageTitle: 'Current Listings from JSON'
    });
  });
});
hostrouter.get('/buyer/:id', (req, res, next) => {
  const homeId = req.params.id;
  Home.findbyid(homeId, home => {
  if (!home) {
    // If product isn't found, stop here and go home
    return res.redirect('/'); 
  }
  res.render("store/homedetails", {
    pagetitle: "Home Details",
    description: home.description,
    location: home.location,
    photoUrl: home.photoUrl,
    id: home.id
  });
});
});

hostrouter.post('/favorites', (req, res, next) => {
  const prodId = req.body.id;
  
  // 1. Tell the Model to save this ID to favorites.json
  Favorite.addTofavorites(prodId, (err) => {
    // 2. Once saved, REDIRECT to the GET route to show the list
    res.redirect('/favorites');
  });
});





// Inside your routing or controller file
hostrouter.get('/search', (req, res, next) => {
    // req.query collects all url encoded form variables automatically
    const filters = req.query; 

    // Execute the new complex filtering logic on your array data
    Home.filterAndSort(filters, filteredProducts => {
        res.render('itemadded', {
            homes: filteredProducts,
            pageTitle: 'Filtered Marketplace',
            path: '/search'
        });
    });
});



hostrouter.get('/favorites', (req, res, next) => {
  Favorite.fetchAll(favIds => {
    Home.fetchAll(allProducts => {
      // Find the full details for all favorited IDs
      const favProducts = allProducts.filter(p => favIds.includes(p.id));
      res.render('store/favorites', {
        pageTitle: 'Your Favorites',
        homes: favProducts
      });
    });
  });
});
userrouter.get('/profile', (req, res) => {
    // This profile data placeholder will ideally be drawn from your student log session
    const loggedInUser = {
        name: 'Priya Sharma',
        enrollmentNo: '230101001',
        course: 'B.Tech',
        semester: '4th Semester',
        department: 'Computer Science Engineering',
        email: 'priya@example.com'
    };

    res.render('profile', { 
        user: loggedInUser,
        pageTitle: 'My Profile'
    });
});

module.exports = hostrouter; // Or whatever you named your router


