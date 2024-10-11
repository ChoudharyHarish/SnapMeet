import forge from "node-forge";

export function decryptMessage(encryptedMessageBase64, privateKeyPem) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedChunks = encryptedMessageBase64.split(":");
    const decryptedChunks = encryptedChunks.map((chunk) => {
      const decryptedChunk = privateKey.decrypt(
        forge.util.decode64(chunk),
        "RSA-OAEP",
        {
          md: forge.md.sha256.create(),
        }
      );
      return decryptedChunk;
    });

    const decryptedMessage = decryptedChunks.join("");
    return forge.util.decodeUtf8(decryptedMessage);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
}
