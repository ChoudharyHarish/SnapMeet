import User from "../Models/user.js";
import forge from "node-forge";

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  //Implement address and Contact number functionality by accepting it here and then if user wants to update create endpoint for that

  if (confirmPassword !== password)
    res.status(404).json({ msg: "Password not matches" });
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(404).json({ msg: "Email Already in Use Try Another" });
    }

    const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

    const user = await User.create({
      name,
      email,
      password,
      publicKey: publicKeyPem,
      privateKey: privateKeyPem,
    });
    const token = user.createJWT();
    // console.log(user);
    res
      .status(200)
      .json({ name: user.name, email: user.email, token, id: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(202).json({ msg: "Invalid Email" });
  }
  // console.log(user);
  const isCorrect = user.comparePassword(password);
  if (!isCorrect) {
    res.status(202).json({ msg: "Invalid Credentials" });
  }
  const token = user.createJWT();
  res.status(200).json({
    name: user.name,
    email: user.email,
    token,
    id: user._id,
    privateKey: user.privateKey,
    publicKey: user.publicKey,
  });
};

export { signUp, signIn };
