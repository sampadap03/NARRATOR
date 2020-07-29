const mongo = require('../../mongo')
const profileSchema = require('./profile')

module.exports = (bot) => {}

module.exports.addCoins = async (guildID, userID, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')
      
      const result = await profileSchema.findOneAndUpdate({
        guildID,
        userID,
      }, {
        guildID,
        userID,
        $inc: {
          coins
        }
      }, 
      {
        upsert: true,
        new: true,
      }
    )
    
    console.log('RESULT:', result)
    
    return result.coins
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.getCoins = async (guildID, userID) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')
      
      const result = await profileSchema.findOne({
        guildID,
        userID,
      })
      
      console.log('RESULT:', result)
      
      let coins = 0
      if (result) {
        coins = result.coins
      } else {
        console.log('Inserting a Document...')
        await new profileSchema({
          guildID,
          userID,
          coins,
        }).save()
      }
      
      return coins
    } finally {
      mongoose.connection.close()
    }
  })
}