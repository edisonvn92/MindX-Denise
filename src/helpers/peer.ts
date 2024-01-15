// eslint-disable-next-line import/no-extraneous-dependencies
import Peer, { DataConnection, MediaConnection } from 'peerjs';
// @ts-ignore
const { getUserMedia } = navigator.mediaDevices;

export interface Message {
  messageType?: 'chat' | 'endSession' | 'liveBlock';
  file?: Blob;
  fileName?: string;
  fileType?: string;
  message?: string;
  createdAt?: string;
  userName?: string;
}
export interface ChatMessageData extends Message {
  peerId: string;
}

let peer: Peer | undefined;
const connectionMap: Map<string, DataConnection> = new Map<string, DataConnection>();

export const PeerConnection = {
  getPeer: () => peer,
  startPeerSession: () =>
    new Promise<string>((resolve, reject) => {
      try {
        peer = new Peer();
        console.log('Peer started', peer);
        peer
          .on('open', (id) => {
            console.log(`My ID: ${id}`);
            resolve(id);
          })
          .on('error', (err) => {
            reject(err);
          });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    }),
  startPeerSessionWithId: (_id: string) =>
    new Promise<string>((resolve, reject) => {
      try {
        peer = new Peer(_id);
        console.log('Peer started', peer);
        peer
          .on('open', (id) => {
            console.log(`My ID: ${id}`);
            resolve(id);
          })
          .on('error', (err) => {
            reject(err);
            console.error(err.message);
          });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    }),
  closePeerSession: () =>
    new Promise<void>((resolve, reject) => {
      try {
        if (peer) {
          peer.destroy();
          peer = undefined;
        }
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }),
  connectPeer: (id: string) =>
    new Promise<DataConnection>((resolve, reject) => {
      if (!peer) {
        reject(new Error("Peer doesn't start yet"));
        return;
      }
      if (connectionMap.has(id)) {
        reject(new Error('Connection existed'));
        return;
      }
      try {
        const conn = peer.connect(id, { reliable: true });
        if (!conn) {
          reject(new Error("Connection can't be established"));
        } else {
          conn
            .on('open', () => {
              console.log(`Connect to: ${id}`);
              connectionMap.set(id, conn);

              resolve(conn);
            })
            .on('error', (err) => {
              console.log(err);
              reject(err);
            });
        }
      } catch (err) {
        reject(err);
      }
    }),
  onIncomingConnection: (callback: (conn: DataConnection) => void) => {
    peer?.on('connection', (conn) => {
      console.log(`Incoming connection: ${conn.peer}`);
      connectionMap.set(conn.peer, conn);
      callback(conn);
    });
  },
  onIncomingCall: (callback: (call: MediaConnection) => void) => {
    peer?.on('call', (call) => {
      console.log(`Incoming call: ${call.peer}`);
      callback(call);
    });
  },
  onConnectionDisconnected: (id: string, callback: () => void) => {
    if (!peer) {
      throw new Error("Peer doesn't start yet");
    }
    if (!connectionMap.has(id)) {
      throw new Error("Connection didn't exist");
    }
    const conn = connectionMap.get(id);
    if (conn) {
      conn.on('close', () => {
        console.log(`Connection closed: ${id}`);
        connectionMap.delete(id);
        callback();
      });
    }
  },
  chat: (id: string, message: Message): Promise<void> =>
    new Promise((resolve, reject) => {
      if (!connectionMap.has(id)) {
        reject(new Error("Connection didn't exist"));
      }
      try {
        const conn = connectionMap.get(id);
        if (conn) {
          conn.send(message);
        }
      } catch (err) {
        reject(err);
      }
      resolve();
    }),
  call: async (id: string, stream: MediaStream): Promise<MediaStream> => {
    peer = PeerConnection.getPeer();
    if (!peer) {
      throw new Error("Peer doesn't start yet");
    }
    return new Promise((resolve, reject) => {
      if (!peer) {
        throw new Error("Peer doesn't start yet");
      }
      const call: MediaConnection = peer.call(id, stream);
      call.on('stream', (mediaStream) => {
        console.log(stream);
        resolve(mediaStream);
      });
      call.on('error', (err) => {
        reject(err);
      });
    });
  },
  onConnectionReceiveData: (id: string, callback: (m: Message) => void) => {
    if (!peer) {
      throw new Error("Peer doesn't start yet");
    }
    if (!connectionMap.has(id)) {
      throw new Error("Connection didn't exist");
    }
    const conn = connectionMap.get(id);
    if (conn) {
      conn.on('data', (receivedData) => {
        console.log(`Receiving data from ${id}`);
        const data = receivedData as Message;
        callback(data);
      });
    }
  },
};
