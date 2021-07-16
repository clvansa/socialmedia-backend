const router = require("express").Router();
const Conversation = require('../models/Conversation');
const { Auth } = require('../middleware/authorize');



// Create a new Conversation 

router.post('/', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const conversation = await Conversation.findOne({
            members: {
                $all: [req.body.senderId, req.body.receiverId]
            }
        })

        if (conversation) return res.status(200).json(conversation)
        const saveConversation = await newConversation.save()
        return res.status(201).json(saveConversation);

    } catch (errr) {
        console.log(err)
        res.status(500).json(err)
    }
})


// Get Conversation of a user

router.get('/', Auth, async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {
                $in: [String(req.user._id)]
            }
        })
        res.status(200).json(conversation)
    } catch (errr) {
        console.log(err)
        res.status(404).json(err)

    }
})


// Get coversation includes two Id's
router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
        })
        res.status(200).json(conversation)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})
module.exports = router