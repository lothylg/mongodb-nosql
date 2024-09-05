const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and remove them from the Thought
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

 async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add a thought to a student
  async addThought(req, res) {
    console.log('You are adding a thought');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No users found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove thought from a user
  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend to a user's friend list
async addFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json({ message: 'Friend added!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
},
// Delete a friend from a user's friend list
async deleteFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json({ message: 'Friend Removed' } );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
},
};