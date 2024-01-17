const express = require('express');
const router = express.Router();
const List = require('../models/List')
  
   // Get all list
router.get('/', async (req, res) => {
    try {
        const lists = await List.find()
        res.json({ success: true, data: lists })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
    }    
   });
   
   // get single list
router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.json({ success: true, data: list });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
    }
});

// Add a List
router.post('/', async (req, res) => {
    const list = new List({
        title: req.body.title, 
        text: req.body.text, 
        plan: req.body.plan, 
        tag: req.body.tag, 
        event: req.body.event, 
    });

    try {
        const savedList = await list.save();
        res.json({ success: true, data: savedList});
    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, error: 'Someting went wrong'})

    }
    res.json
})

// Update list
router.put('/:id', async (req, res) => {
    try {
     const list = await List.findById(req.params.id);

     // Match the title
     if(list.title === req.body.title) {
        const updatedList = await List.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    text: req.body.text,
                    plan: req.body.plan,
                    tag: req.body.tag,
                    event: req.body.event,
                }
            },
            { new: true }
        );
         return res.json({ success: true, data: updatedList });
       }

       // title do not match
       return res.status(403).json({ success: false, error: 'You are not authorized to update this resource' });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ success: false, error: 'Something went wrong'});
        
    }
})

// Delete list
router.delete('/:id', async (req, res) => {
   try {
    const list = await List.findById(req.params.id);

    // Match the title
   if(list.title === req.body.title) {
    await List.findByIdAndDelete(req.params.id);
    return res.json({ success: true, data: {} });
   }

    // title do not match
    return res.status(403).json({ success: false, error: 'You are not authorized to delete this resource' });
   } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
   }
});

module.exports = router;