const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } }
            );
            !user
                ? res.status(404).json({ message: 'ID is invalid' })
                : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                return User.findOneAndUpdate(
                    { thought: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } }
                );
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } }
            );
            !thought
                ? res.status(404).json({ message: 'ID is invalid' })
                : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } }
            );
            !thought
                ? res.status(404).json({ message: 'ID is invalid' })
                : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};