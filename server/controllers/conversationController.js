import Converstation from "../models/conversation.js";

export const createConverstation = async (req, res) => {
    try {
        const newConverstation = new Converstation({
            members: [req.body.senderId, req.body.receiverId]
        });
        const savedConverstation = await newConverstation.save();
        res.status(200).json(savedConverstation);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getConverstation = async (req, res) => {
    try {
        
        const converstation = await Converstation.find({
            members: {$in:[req.params.converstationId]}
        })
        console.log(converstation);
        res.status(200).json(converstation)
    } catch (error) {
        res.status(500).json(error);
    }
}