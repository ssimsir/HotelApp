"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const roomModel = require('../models/room')

module.exports = {
    
    list: async (req, res) => {

        const data = await res.getModelList(roomModel)
        res.status(200).send({
            error:false,
            details:await res.getModelListDetails(roomModel),
            data
        })
    },

    read: async (req, res) => {

        const data = await roomModel.findOne({_id:req.params.id})
        res.status(200).send({
            error:false,
            data
        })
    },

    create: async (req, res) => {

        console.log(req.body)
        const data = await roomModel.create(req.body)
        res.status(200).send({
            error:false,
            data
        })
    },

    update: async (req, res) => {

        const data = await roomModel.updateOne({_id:req.params.id}, req.body, {runValidators:true})
        res.status(202).send({
            error:true,
            data,
            new: await roomModel.findOne({_id:req.params.id})
        })
    },

    delete: async (req, res) => {

        const data = await roomModel.deleteOne({_id:req.params.id})

        res.status(data.deleteCount ? 204 : 404).send({
            error:!data.deleteCount,
            data
        })
    },

}