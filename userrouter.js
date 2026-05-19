

const express=require('express');
const userrouter=express.Router();
const path=require('path');
const {registeredhomes}=require('./hostrouter');

userrouter.get('/',(req,res,next)=>{
console.log('Campusly is a student-focused marketplace designed for campuses like Banaras Hindu University, where students can buy, sell, and exchange items such as books, electronics, and daily essentials within a trusted community.........Meeting up to trade a textbook or a cycle is as easy and casual as grabbing a coffee at VT." /');

    res.render('store/item', { 
        pageTitle: 'Welcome to Campusly' 
    });
});
// Inside routes/userrouter.js or your storeController.js
userrouter.get('/buyer/dashboard', (req, res, next) => {
    // 1. Fetch buyer metrics (e.g., from an orders/wishlist JSON or MongoDB collection)
    const buyerMetrics = {
        activeOffers: 5,
        totalSpent: 4500,
        chatsCount: 14,
        wishlistCount: 6
    };

    // 2. Fetch recent transactions or activities for this student
    const recentActivities = [
        { message: 'Offer sent for "HP Laptop" to Amit Singh', time: '2 hours ago' },
        { message: 'Neha Sharma (Seller) accepted your offer for "Engineering Books"', time: '5 hours ago' }
    ];

    // 3. Render the view template with the custom buyer data points
    res.render('store/buyer-dashboard', {
        metrics: buyerMetrics,
        activities: recentActivities,
        pageTitle: 'Buyer Dashboard'
    });
});

// Inside routes/userrouter.js or your storeController.js
userrouter.get('/buyer/dashboard', (req, res, next) => {
    // 1. Fetch buyer metrics (e.g., from an orders/wishlist JSON or MongoDB collection)
    const buyerMetrics = {
        activeOffers: 5,
        totalSpent: 4500,
        chatsCount: 14,
        wishlistCount: 6
    };

    // 2. Fetch recent transactions or activities for this student
    const recentActivities = [
        { message: 'Offer sent for "HP Laptop" to Amit Singh', time: '2 hours ago' },
        { message: 'Neha Sharma (Seller) accepted your offer for "Engineering Books"', time: '5 hours ago' }
    ];

    // 3. Render the view template with the custom buyer data points
    res.render('store/buyer-dashboard', {
        metrics: buyerMetrics,
        activities: recentActivities,
        pageTitle: 'Buyer Dashboard'
    });
});

module.exports=userrouter;
