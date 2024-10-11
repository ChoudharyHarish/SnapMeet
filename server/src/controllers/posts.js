import Post from "../models/post.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $project: {
          title: 1,
          description: 1,
          images: 1,
          video: 1,
          createdAt: 1,
          updatedAt: 1,
          creator: {
            _id: 1,
            image: 1,
          },
        },
      },
    ]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { creatorId, title, description, images, video } = req.body;

  const newPost = new Post({ creatorId, title, description, images, video });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, images, video } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, description, images, video, _id: id };

  try {
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Post.findByIdAndRemove(id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getPosts, updatePost, createPost, deletePost };
