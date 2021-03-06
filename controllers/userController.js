const router = require('express').Router()
const { default: axios } = require('axios')
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')
// const jwt = require('jsonwebtoken');

// Display login page
router.get('/login', (req, res) => {
    res.render('users/login')
})
// Logout the user, remove cookie
router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})
// Display signup page
router.get('/new', (req, res) => {
    res.render('users/new')
})
// Create user
router.post('/', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    try {
        if(!req.body.email || !req.body.password) {
            res.render('users/new', { errors: 'Invalid username/password'})
            return;
        }
        const user = await db.user.create({
            email: req.body.email,
            password: hashedPassword
        })
        console.log(res.locals.user)
        const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
        res.cookie('userId', encryptedId)
        res.redirect('/')
    } catch(err) {
        console.log(err);
        res.render('users/new', { errors: 'Error creating user, try again w/ different name?'})
    }
})
// Log in user
router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: { email: req.body.email }
        })
        if(user && bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
            res.cookie('userId', encryptedId)
            res.redirect('/')
        } else {
            res.render('users/login', { errors: 'Invalid email/password' })
        }
    } catch(err) {
        console.log(err);
        res.render('users/login', { errors: 'Invalid email/password' })
    }
})
// router.get('/', async (req, res) => {
//     if(!res.locals.user) {rs
//         res.redirect('/users/login')
//     } else {
//         try {
//             const user = await db.user.findOne({
//                 where: { id: res.locals.user.id }, 
//                 include: db.user
//             })
    
//             // console.log(user)
//             res.render('user/index', { users: user.dataValues.users } )
//         } catch (err) {
//             console.log(err)
//         }
//     }
// })

// router.post('/', async (req, res) => {
//     const hashedPassword = bcrypt.hashSync(req.body.password, 12)

//     try {
//         if(!req.body.email || !req.body.password) {
//             res.render('users/new', { errors: 'Invalid email/password'})
//             return;
//         }


//         const user = await db.user.create({
//             email: req.body.email,
//             password: hashedPassword
//         })

//         console.log(res.locals.user)

//         const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
//         res.cookie('userId', encryptedId)
//         res.redirect('/')
//     } catch (err) {
//         console.log( err)
//         res.render('users/new', { errors: 'Error creating user, try again w/ different name?'})
//     }
// })

// router.get('/new', (req, res) => {
//     res.render('users/new', { errors: null })
// })

// // Show user login page
// router.get('/login', (req, res) => {
//     res.render('users/login')
// })
// // Show users profile page
// router.get('/main', (req, res) => {
//     res.render('users/main')
// })

// // Show new user creation page
// router.get('/new', (req, res) => {
//     res.render('users/new')
//     res.redirect('users/login')
// })

// router.get('/logout', (req, res) => {
//     res.clearCookie('userId')
//     res.redirect('/')
// })

// // Log in the user
// router.post('/login', async (req, res) => {
//     try {
//         const user = await db.user.findOne({
//             where: { username: req.body.username }
//         })
//         if(user && bcrypt.compareSync(req.body.password, user.password)) {
//             const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
//             res.cookie('userId', encryptedId)
//             res.redirect('/')
//         } else {
//             res.render('users/login', { errors: 'Invalid email/password' })
//         }
//     } catch(err) {
//         console.log(err);
//         res.render('users/login', { errors: 'Invalid email/password' })
//     }
// })


router.get('/:id', async (req, res) => {
    try {
        const userApiUrl = `https://health.gov/myhealthfinder/api/v3/topicsearch.json${req.params.name}`
        const response = await axios.get(userApiUrl)
        const user = response.data


        res.render('user/show', { user: user })
    } catch (err) {

    }
})

module.exports = router;