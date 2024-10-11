import forge from "node-forge";

export function signMessage(message, privateKeyPem) {
  try {
    const privateKeyObj = forge.pki.privateKeyFromPem(privateKeyPem);
    const md = forge.md.sha256.create();
    md.update(message, "utf8");
    const signature = privateKeyObj.sign(md);
    return forge.util.encode64(signature);
  } catch (error) {
    console.error("Signature creation error:", error);
    throw new Error("Signature creation failed");
  }
}
