"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const userModel = require("../models/user")

module.exports={

    list: async(req, res) => {
        res.status(200).send({
            error:false,
            details:await res.getModelListDetails(userModel),
            data:await res.getModelList(userModel)
        })
    },

    read: async(req, res) => {
        res.status(200).send({
            error: false,
            data: await userModel.findOne({_id:req.params.id})
        })
    },

    create: async(req, res) => {

        res.status(201).send({
            error:false,
            data: await userModel.create(req.body)

        })
    },

    update: async(req, res) => {

        res.status(202).send({
            error:false,
            data: await userModel.updateOne({_id:req.params.id}, req.body, {runValidators:true} ),
            new: await userModel.findOne({_id:req.params.id})
        })
    },

    delete: async(req, res) => {

        const data = await userModel.deleteOne({_id:req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error:!data.deletedCount,
            data
        })
    },
}
