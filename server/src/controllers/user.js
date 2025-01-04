import User from "../models/user.js";
import { makeId } from "../helpers/makeId.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: { _id: { $ne: makeId(req.user.userId) } },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          publicKey: 1,
        },
      },
    ]);

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUsers };
