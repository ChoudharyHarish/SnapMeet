import forge from "node-forge";

export function encryptMessage(message, publicKeyPem) {
  try {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const messageBytes = forge.util.encodeUtf8(message);
    const chunks = [];

    for (let i = 0; i < messageBytes.length; i += 190) {
      const chunk = messageBytes.slice(i, i + 190);
      const encryptedChunk = publicKey.encrypt(chunk, "RSA-OAEP", {
        md: forge.md.sha256.create(),
      });
      chunks.push(forge.util.encode64(encryptedChunk));
    }

    return chunks.join(":"); // Use a delimiter to join the chunks
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed");
  }
}
