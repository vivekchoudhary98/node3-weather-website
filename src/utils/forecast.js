const request=require('request')
const forecast = (latitude,longitude,callback)  => {
    const url='http://api.weatherstack.com/current?access_key=9932c9041d7850168c85743616a4691f&query='+ latitude + ',' + longitude +'&units=f'
request({url,json: true},(error, {body})=> {
        if (error) {
            callback('unable toconnect to service',undefined)
        }
        else if(body.error){
            callback('unable tofiind location',undefined)   
        }else {
            callback(undefined,'it is currently' +  body.current.temperature + 'degrees out it eels like' + body.current.feelslike)
        }
    })

}

module.exports = forecast