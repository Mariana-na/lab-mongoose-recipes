const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  //ADD ONE

  .then(() => {

    const newRecipe = {
      title: "Beer Chicken",
      level: "Easy Peasy",
      ingredients: ["Chicken Drumsticks", "Beer", "Onion Soup Powder"],
      cuisine: "Comfort Food",
      dish_type: "main-course",
      duration: 40,
      creator: "Chef"
    };

    return Recipe.create (newRecipe)
    .then((beerChickenRecipe) => {
      console.log("Recipe title: ${createdRecipe.title}");
    })
    .catch((error) => {
      console.error("Error creating recipe", error);
    });
  })

  //ADD MANY

  .then (async () => {
    try {
      const recipeList = await Recipe.insertMany(data);
      recipeList.forEach((recipeFromList) => {
        console.log("Recipe title: ${recipeFromList.title}");
      });
      } catch (error) {
        console.log("Error creating many recipes", error);
      }
    })

    //UPDATE ONE

    .then (async () => {
      try {
        const updateRigatoni = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new:true});
        console.log ("Success Message! Updated Recipe:", updateRigatoni);
      } catch (error) {
        console.log("Error updating recipe", error);
      }
    })

    //REMOVE ONE

    .then (async () => {
      try {
        const deleteCarrotCake = await Recipe.deleteOne({title: "Carrot Cake"});
        console.log ("Success Message! Deleted Recipe:", deleteCarrotCake);
      } catch (error) {
        console.log ("Error deleting recipe", error);
      }
    })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .then (async () => {
    try {
      await mongoose.connection.close();
      console.log("Mongoose connection closed successfully");
    } catch (error) {
      console.log ("Connection Close Error:", error);
    }
  })
