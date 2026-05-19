const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
Home_sql.fetchAll.then(([registeredHomes,fields]) =>
{
res.render("models/itemadded", {
registeredHomes: registeredHomes,
pageTitle: "airbnb Home",
currentPage: "index",
})
})
}


exports.getHomes = (req, res, next) => {
Home. fetchAll.then(([registeredHomes]) =>
res.render("store/home-list", {
registeredHomes: registeredHomes,
pageTitle: "Homes List",
currentPage: "Home",
})
);
}   
exports.getBookings = (req, res, next) => {
res.render("store/bookings", {
pageTitle: "My Bookings",
currentPage: "bookings",
}
)
};
exports.getFavouriteList = (req, res, next) => {
Favourite.getFavourites(favourites => {
Home. fetchAll(([registeredHomes]) => {
const favouriteHomes = registeredHomes. filter(home =>
favourites. includes(home.id) );
res.render("store/favourite-list", {
favouriteHomes: favouriteHomes,
pageTitle: "My Favourites",
currentPage: "favourites",
}
)
}
);
}
);
}



