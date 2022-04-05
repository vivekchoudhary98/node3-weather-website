const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
// define paths for express config
const publicdirectorypath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebears engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicdirectorypath))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'vivek'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about me',
        name: 'vivek'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'this is a helpful text',
        title: 'Help',
        name: 'vivek choudhary'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'you must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={ })=>{
        if (error){
            return res.send({error })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address

            })
        })
    })
})



app.get('/help/*',(req,res)=>{
        res.render('404',{
        title: '404',
        name: 'vivek',
        errorMessage: 'article not found'
    }
    )
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'vivek',
        errorMessage: 'page not found '
    }
    )
})
app.listen(port,() => {
    console.log('server is up on running on port port' + port)
})