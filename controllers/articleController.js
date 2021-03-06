const router = require('express').Router()
const db = require('../models')
const axios = require('axios')



// Show all topics 
router.get('/', async (req, res) => {
    try {
        const topicURL = 'https://health.gov/myhealthfinder/api/v3//topicsearch.json'
        const response = await axios.get(topicURL)
        const topics = response.data.articles
        // console.log(topics[0])
        res.render('topics/index', { topics: topics })
        } catch (
    error) {
        console.log(error); }
    })
    



    router.post('/:id', async (req, res) => {
        try {
        
            } catch (
        error) {
            console.log(error); }
        })
        
    
    
    

    module.exports = router



