// Make sure to require your models in the files where they will be used.
const db = require('./models');

const healthCreateTest = async () => {
    const newhealthy = await db.health.create({
      
        email: 'qurewil474@gmail.com',
        password:'Mother',
        age:28,
        sex:'male',
        tobaccoUse:'yes',
        sexuallyActive:'yes'
    })
    console.log('Created: ', newhealthy.name)
}
// pokemonCreateTest()

const healthFindTest = async () => {
    const foundhealth = await db.health.findOne({
        where: {
            nameId: 'user'
        }
    })
    console.log('Found: ', foundhealth.name)
}
// pokemonFindTest();

const userTest = async () => {
    try {
        const newUser = await db.user.create({
            email: "string",
            password: "string"
        })
        console.log('Created a new user!', newUser.username)


        const foundUser = await db.user.findOne({
            where: {
                username: "test"
            }
        })
        console.log('Found the user!', foundUser.username)
    } catch (err) {
        console.log(err)
    }
}
userTest();