const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : User.deleteMany({ _id: { $in: User.thought } });
            })
            .then(() => {
                res.json({ message: 'User has been removed' });
            })
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendsId } }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendsId } }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'ID is invalid' })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },
};