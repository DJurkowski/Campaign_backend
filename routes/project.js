const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const Campaign = require('../models/Campaign');

/**  
* GET api/projects
* Purpose: Get all projects
*/
router.get('/', async (req, res) => {
    try {
        const project = await Project.find();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**  
* Post api/projects
* Purpose: Create a project
*/
router.post('/', async (req, res) => {

    try {
        const { name } = req.body;
        const project = new Project({
            name
        });

        await project.save();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/**  
* PATCH /projects/:id
* Purpose: Update a specified project
*/
router.patch('/:id', async (req, res) => {
    try {
        await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
            );

            res.json({messgae: 'Updated successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/**  
* DELETE /project/:id
* Purpose: Delete a project
*/
router.delete('/:id', async (req, res) => {

    try {
        await Project.findOneAndRemove({
            _id: req.params.id
            });

        await deleteProjectCampaign(req.params.id);

        res.status(200).json({msg: 'Project removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

let deleteProjectCampaign = async (_projectId) => {
    try {
        
        await Campaign.deleteOne({ _projectId });
    }catch(err) {
        if(err.kind === 'ObjectId') { 
            return res.status(404).json({msg: 'Campaign not found '});
         }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**  
* GET api/projects/:projectId/campaign
* Purpose: Get campaign from a specific project
*/
router.get('/:projectId/campaign', async (req, res) => {
    try {
        const campaign = await Campaign.find({ _projectId: req.params.projectId });

        res.json(campaign);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**  
* POST api/projects/:projectId/campaign
* Purpose: Create a new campaign in a specific project
*/
router.post('/:projectId/campaign', async (req, res) => {
    try {
        let newCampaign = new Campaign({
            name: req.body.name,
            keywords: req.body.keywords,
            bidAmount: req.body.bidAmount,
            fund: req.body.fund,
            status: req.body.status,
            town: req.body.town,
            radius: req.body.radius,
            _projectId: req.params.projectId  
        });

        await newCampaign.save();

        res.json(newCampaign);
    } catch (err) {
        console.error(err.message);
        console.log(err);
        res.status(500).send('Server Error');
    }
});

/**  
* PATCH api/projects/:projectId/campaign
* Purpose: Update campaign
*/
router.patch('/:projectId/campaign/:id', async (req, res) => {
    try {
        await Campaign.findOneAndUpdate({ 
            _id: req.params.id,
            _projectId: req.params.projectId
            },
            { $set: req.body }
        );

        res.json({messgae: 'Updated successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**  
* DELETE api/projects/:projectId/campaign/:id
* Purpose: Create a new campaign in a specific project
*/
router.delete('/:projectId/campaign/:id', async (req, res) => {
    try {

        const project = await Project.findOne({
            _id: req.params.projectId
        });
    
        await Campaign.findOneAndRemove({ 
            _id: req.params.id,
            _projectId: req.params.projectId
        });

        res.status(200).json({msg: 'Removed'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') { 
           return res.status(404).json({msg: 'Object not found (Project/Campaign)'});
        }
        res.status(500).send('Server Error');
    }
});




module.exports = router;