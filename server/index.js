const express = require("express");
const cors = require("cors");
const app = express();
const data = require("../src/json/f2h.json");

app.use(cors());

const categoriesdata = data.shopCategory;
const viewcategoriesdata = data.categoryList;

// console.log(categoriesdata,"categories");
console.log(viewcategoriesdata,"viewallcategories");

//For Getting all data's for all categories
app.get("/allcategories", (req, res) => {
  res.send(categoriesdata);
});

app.get("/viewcategories", (req, res)=>{
  res.send(viewcategoriesdata);
});

//PORT
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
