const { Bookmark } = require("../models")
const axios = require('axios')

class BookmarkController {
  static async getAllBookmark(req, res, next) {
    try {
      const getAllBookmark = await Bookmark.findAll()

      res.status(201).json({
        message: "Find all bookmark success",
        getAllBookmark
      })
    } catch (error) {
      next(error)
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { id } = req.params
      const { userId } = req.loginInfo
      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      if (!data) {
        throw ({ name: "NotFound", id })
      }

      const addBookmark = await Bookmark.create({
        userId,
        monsterId: id,
        monsterName: data.name
      })

      //console.log(addBookmark, "<<<< ini bookmark"); //success add bookmark, uncomment for proof

      res.status(201).json({
        message: "Successfully add bookmark",
        addBookmark
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params
      let findBookmark = await Bookmark.findByPk(id)

      if (!findBookmark) {
        throw ({ name: "NotFound", id })
      }

      await Bookmark.destroy({
        where: {
          id
        },
      })

      res.status(200).json({
        message: `Successfully delete bookmark with id ${id}`,
        findBookmark
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookmarkController