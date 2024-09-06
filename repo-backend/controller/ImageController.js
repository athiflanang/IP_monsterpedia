const { v2: cloudinary } = require('cloudinary')
const { Image } = require("../models")
const { where } = require('sequelize')
const axios = require('axios')

class ImageUrlController {
  static async InsertImage(req, res, next) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      })

      const { id } = req.params
      const file = req.file

      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      if (!data) {
        throw ({ name: "NotFound", id })
      }

      const base64 = file.buffer.toString("base64")

      const output = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`
      )

      let image = await Image.findOne({
        where: {
          monsterId: id
        }
      })

      if (image) {
        await Image.update(
          {
            imgUrl: output.secure_url
          },
          {
            where: {
              monsterId: id
            }
          }
        )
        res.status(200).json({
          message: "Success update image"
        })
      } else {
        await Image.create({
          monsterId: id,
          imgUrl: output.secure_url
        })
        res.status(201).json({
          message: "Success add image",
        })
      }

    } catch (error) {
      next(error)
    }
  }

  static async fetchImageMonsterById(req, res, next) {
    try {
      const { id } = req.params
      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      if (!data) {
        throw ({ name: "NotFound", id })
      }

      const findImageById = await Image.findOne({
        where: {
          monsterId: id
        }
      })

      res.status(200).json({
        message: `Success find image with id ${id}`,
        findImageById
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ImageUrlController