import videoSocket from "../socket/videoSocket";

class Peer {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    this.localDescriptionSet = false;
    this.remoteDescriptionSet = false;

    this.peer.onicecandidate = (event) => {
      console.log("Hello here");
      if (event.candidate) {
        videoSocket.sendIceCandidate({ candidate: event.candidate });
      }
    };

    this.peer.ontrack = (event) => {
      console.log("Streams received");
      this.peer.connected = true;
      console.log("Connected");

      if (event.streams && event.streams[0]) {
        this.remoteStream = event.streams[0];
        this.onRemoteStream(this.remoteStream);
      }
    };

    this.peer.onconnectionstatechange = () => {
      if (this.peer.connectionState === "connected") {
        this.peer.connected = true;
        console.log("Peers connected");
      }
    };
  }

  async createOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }

  async acceptOffer(offer) {
    if (!this.localDescriptionSet && !this.remoteDescriptionSet) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(answer));
      this.localDescriptionSet = true;
      this.remoteDescriptionSet = true;
      return answer;
    }
  }

  async setLocalDescription(answer) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async addIceCandidate(candidate) {
    if (candidate && this.peer) {
      await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  addStream(stream) {
    stream.getTracks().forEach((track) => this.peer.addTrack(track, stream));
  }

  onRemoteStream(callback) {
    this.onRemoteStream = callback;
  }
}

export default Peer;
