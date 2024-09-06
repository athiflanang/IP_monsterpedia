const axios = require('axios')
const { GoogleGenerativeAI } = require("@google/generative-ai");

class MonsterController {
  static async getAllMonster(req, res, next) {
    try {
      const { data } = await axios.get(`https://mhw-db.com/monsters`)

      // console.log(data); //sucess get all data, uncomment for proof

      res.status(200).json({
        message: "Successfully get all article",
        data
      })
    } catch (error) {
      next(error)
    }
  }
  static async findMonsterById(req, res, next) {
    try {
      const { id } = req.params

      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      // console.log(data); //sucess get data by id, uncomment for proof
      if (!data) {
        throw ({ name: "NotFound", id })
      }

      res.status(200).json({
        message: `Successfully find monster with id ${data.id}`,
        data
      })
    } catch (error) {
      next()
    }
  }

  static async GoogleGenerativeAI(req, res, next) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const { id } = req.params
      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      const monsterId = data.id
      const monsterName = data.name
      const monsterDesc = data.description

      const prompt = `please make a short and informative fun fact on this monster with id: ${monsterId} and name: ${monsterName} with this description: ${monsterDesc}, from the game monster hunter world`

      //`please make a short and informative fun fact on this monster with id: ${monsterId} and name: ${monsterName} with this description: ${monsterDesc}, from the game monster hunter world`
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.status(200).json({
        text
      })
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = MonsterController