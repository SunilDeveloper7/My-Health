/* Required Modules and Variables */
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const cryptoJS = require('crypto-js')
const db = require('./models')



const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000


//Middleware and config
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(require('cookie-parser')())


// Adds the user to res.locals.user if there's a cookie
app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.COOKIE_SECRET).toString(cryptoJS.enc.Utf8)
        
    
        const user = await db.user.findOne({
            where: {
                id: decryptedId
            }
        })
        
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    
    next()
})



/* Controllers */
app.use('/users', require('./controllers/userController'))
app.use('/article',require('./controllers/articleController'))


//Routes
app.get('/', async (req,res) => {
    try {
        // const healthURL = 'https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?lang=english&age=28&sex=male&tobaccoUse=1&sexuallyActive=1&pregnant=0'
        // const response = await axios.get(healthURL)
        // const healthy = response.data.Result 
        
        res.render('index')
        // res.json({healthy})

    }catch(err) {
        console.log(err)
        res.render( 'index', { healthy: [] })
    }
})

app.listen(PORT, () => {
    rowdyResults.print()
})