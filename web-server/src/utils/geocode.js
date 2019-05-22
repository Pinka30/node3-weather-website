const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
                    + encodeURIComponent(address) +
    '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicGlua2EiLCJhIjoiY2p1anVpb3c3MDQ4azQzcHdycGZjbDd2eSJ9.A0WRF1g2pqLS1mGbxm4n1Q'

    request({ url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            //here there are to arguments, error and data, since we know there is no error we are putting there undefined
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode