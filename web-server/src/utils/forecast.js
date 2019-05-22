const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/05d7f07cc790b4d48493ec44c4e64514/'+ latitude + "," + longitude

    //request({ url: url, json: true}, (error,response) => {
    request({ url, json: true}, (error,{body}) => { //using shorthand and destructuring property  
        if(error){ // low level error
            callback('Unable to reach out !!', undefined)
        }
        else if(body.error){ //coordinate error
            callback('Unable to find location.', undefined)
        }
        else{ //success string 
            //here there are two arguments, error and data, since we know there is no error we are putting there undefined
            callback(undefined, body.daily.data[0].summary 
                            + " It is currently "+ 
                        body.currently.temperature 
                            + " degrees out.")
        }
    })
}

module.exports = forecast

// request({ url:url, json:true }, (error, response) => {
//      //const data = JSON.parse(response.body)

//     //console.log("It is currently"+ response.body.currently.temperature + "degrees out.")

//     if(error){
//         console.log("Unable to reach out");
//     }
//     else if(response.body.error){
//         console.log("Unable to find location")
//     } 
//     else{
//         console.log(response.body.daily.data[0].summary + " It is currently "+ response.body.currently.temperature + " degrees out.")
//     }
// })