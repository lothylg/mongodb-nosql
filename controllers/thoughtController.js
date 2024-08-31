const { Thought, User } = require('../models')

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}).populate('User');
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //get a single thought by ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.find({ _id: req.params.thoughtId }).populate('users');
            if (!thought) {
                return res.status(404).json({ message: "No thoughts associated with that ID!" });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //create a new thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'no thought associated with that ID!' });
            }
            await User.deleteMany({ _id: { $in: thought.users } });
            res.json({ message: 'Thoughts and users deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req,res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought){
                return res.status(404).json({message: 'no thought with this id!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}