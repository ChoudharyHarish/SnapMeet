import forge from "node-forge";

export function verifyMessage(message, signature, publicKeyPem) {
  try {
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKeyPem);

    const decodedSignature = forge.util.decode64(signature);

    const md = forge.md.sha256.create();
    md.update(message, "utf8");

    const isValid = publicKeyObj.verify(md.digest().bytes(), decodedSignature);

    return isValid;
  } catch (error) {
    console.error("Signature verification error:", error);
    throw new Error("Signature verification failed: " + error.message);
  }
}
