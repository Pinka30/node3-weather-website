// to run this file use: nodemon src/app.js

const path = require('path') // There is no need to install this module since its a core module and inbuilt module
const express = require('express')
//express is a function here
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//console.log(__dirname) -- nln
//console.log(path.join(__dirname, '../public'))  --nln

const app = express()

//Define paths for Express config
//dirname points to source
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//it helps to create dynamic templates
app.set('view engine','hbs')// to set up handlebars engine
app.set('views', viewsPath) //set up views location
hbs.registerPartials(partialsPath)

//setup static directory to serve
//Now static takes the path to the folder we want to serve up and we have that.
app.use(express.static(publicDirectoryPath)) // app.use() : way to customise your server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Pinka is Strong'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pinka is very Strong'
    })
})

// app.get('/weather',(req, res) => {
//     res.send([
//     {
//         forecast: '50C'
//     },
//     {
//         location: 'Philedelphia'
//     }])
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address here'
        })
    }

/* ..............................Start */ 
    //data written in {} is the destructured data
//     geocode(req.query.address, (error, { latitude, longitude, location }) =>{
//         if(error){
// //we are sending back object with error property and its value with same name as error
//         //return res.send({error: error}) 
// //hence we can use the shorthand method            
//         return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if(error){
//                 return res.send({ error })
//             }
            
//             res.send({
//                 forecast: forecastData,
//                 location, //using shorthand method as the variable name is same as the value 
//                 address: req.query.address
//             })
//         })
//     })
/* ..............................End .................localhost:3000/weather?address=boston*/     

/* ..............................Start */ 
    //data written in {} is the destructured data
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error){
// //we are sending back object with error property and its value with same name as error
        //return res.send({error: error}) 
// //hence we can use the shorthand method            
        return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: 'It is snowing',
                location, //using shorthand method as the variable name is same as the value 
                address: req.query.address
            })

            console.log(forecastData)
        })
    })
/* ..............................End .................localhost:3000/weather?address=boston*/     

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philedilphia',
    //     address: req.query.address
    // })
})


/*
    localhost:3000?search=games&rating=5
*/
app.get('/products', (req,res) => {

    if(!req.query.search){
        return res.send({ //by using return we are stopping the function execution right here
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    //res.send("Help article not found")
    res.render('404',{
        title: 'Help 404',
        name: 'Pinka',
        errorMessage: 'Help article not found'
    })
})

//* : Wild card character provided by express which can be used in URLs, 
//it means match anything that hasn't been matched so far
app.get('*',(req,res) => { 
   // res.send("Page not found")
   res.render('404',{
        title: '404',
        name: 'Pinka',
        errorMessage: 'Page not found'
   })
})

/* Express is going to work through your application until it finds a match for that route.
In the case of our Express static call it is indeed going to find a match.
It's going to find index.html and that's going to match the route URL because the file has
a special name which means that this is never actually going to run.*/
// //Start
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Pinka'
//     },
//     {
//         name: "Vin"        
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send("<h1> About </h1>")
// })
/* End */


//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})