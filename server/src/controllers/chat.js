import {
  encryptMessage,
  decryptMessage,
  makeId,
  signMessage,
} from "../helpers/index.js";
import Message from "../models/message.js";
import User from "../models/user.js";

const createMessage = async ({ message, receiverId, senderId }) => {
  try {
    const receiverUser = await User.findById(receiverId);
    if (!receiverUser || !receiverUser.publicKey) {
      return res
        .status(404)
        .json({ msg: "Receiver not found or public key missing" });
    }
    const publicKeyPem = receiverUser.publicKey;

    const encryptedMessage = encryptMessage(message, publicKeyPem);

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: encryptedMessage,
      status: "sent",
    });

    return { msg: "Message sent successfully", messageId: newMessage._id };
  } catch (error) {
    console.error("Error creating message:", error);
    return { msg: "Internal Server Error" };
  }
};

const getMessages = async (req, res) => {
  const { userId } = req.user;
  const { receiverId } = req.params;
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: makeId(userId), receiverId: makeId(receiverId) },
            { senderId: makeId(receiverId), receiverId: makeId(userId) },
          ],
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    const senderUser = await User.findById(userId);
    if (!senderUser || !senderUser.privateKey) {
      return res
        .status(404)
        .json({ msg: "Sender not found or private key missing" });
    }
    const senderPrivateKeyPem = senderUser.privateKey;

    const receiverUser = await User.findById(receiverId);
    if (!receiverUser || !receiverUser.privateKey) {
      return res
        .status(404)
        .json({ msg: "Receiver not found or private key missing" });
    }
    const receiverPrivateKeyPem = receiverUser.privateKey;

    const decryptedMessages = messages.map((msg) => {
      try {
        const privateKeyPem = msg.senderId.equals(makeId(userId))
          ? receiverPrivateKeyPem
          : senderPrivateKeyPem;
        const decryptedMessage = decryptMessage(msg.message, privateKeyPem);
        return { ...msg, message: decryptedMessage };
      } catch (error) {
        console.error(`Decryption error for message ${msg._id}:`, error);
        return { ...msg, message: "Decryption failed" };
      }
    });
    return res.status(200).json({ data: decryptedMessages });
  } catch (error) {
    console.log(error);
  }
};

export { createMessage, getMessages };
