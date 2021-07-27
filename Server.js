const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// const API_KEY ="7c3c12edf5e0523209099e036c847ef1";
// const baseUrl =`http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

const generateScrapperUrl =(API_KEY)=>`http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

app.get('/',(req,res)=>{
    res.send("welcome to Amazon Web Scrapper api.");
});


//GET Product Details
app.get('/product/:productId', async(req,res)=>{
   const {productId} =req.params;
   const {API_KEY} = req.query;

   try{
       const response = await request(`${generateScrapperUrl(API_KEY)}&url=https://amazon.com/dp/${productId}`);
       res.json(JSON.parse(response) );
   }catch(error){
       res.json(error)

   }
});


//GET Product Reviews
app.get('/product/:productId/reviews', async(req,res)=>{
    const {productId} =req.params;
    const {API_KEY} = req.query;
    try{
        const response = await request(`${generateScrapperUrl(API_KEY)}&url=https://amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response) );
    }catch(error){
        res.json(error)
 
    }
});

//GET Product Offers
app.get('/product/:productId/offers', async(req,res)=>{
    const {productId} =req.params;
    const {API_KEY} = req.query;
 
    try{
        const response = await request(`${generateScrapperUrl(API_KEY)}&url=https://amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response) );
    }catch(error){
        res.json(error)
 
    }
 });

 

//GET Search  Results
app.get('/search/:searchQuery', async(req,res)=>{
    const {searchQuery} =req.params;
    const {API_KEY} = req.query;
    try{
        const response = await request(`${generateScrapperUrl(API_KEY)}&url=https://amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response) );
    }catch(error){
        res.json(error)
 
    }
});


app.listen(PORT ,()=>{
    console.log("Server Running Start");
});


