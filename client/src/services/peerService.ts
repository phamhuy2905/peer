import Peer, { DataConnection } from "peerjs";
import { v4 as uuidv4 } from "uuid";

class PeerService {
    static instance?: any;
    client?: Peer;
    clientId: string = "";

    clientPeers: DataConnection[] = [];
    clientIds: string[] = [];
    isConnected: boolean = false;
    userName: string = "";

    onConnection: (connection: DataConnection) => void = () => {};
    onDataConnection: (data: any, connection: DataConnection) => void = () => {};

    onListenerDataYtb: (data: any) => void = () => {};

    initialization(name: string) {
        if (!this.client) {
            const id: string = uuidv4();
            this.client = new Peer(id);
            this.clientId = id;
            this.userName = `${name}-${id.slice(0, 6)}`;
            this.client.on("connection", (connnection) => {
                connnection.on("open", () => {
                    this.isConnected = true;
                    this.addClient(connnection);
                    this.onConnection(connnection);
                });
                connnection.on("data", (data: any) => {
                    this.onDataConnection(data, connnection);
                });
                connnection.on("close", () => {
                    console.log("close");
                });
                connnection.on("error", (err) => {
                    console.log(err);
                });
            });
        }
    }

    connect(id: string) {
        const conn = this.client?.connect(id);

        return new Promise((resolve, reject) => {
            conn?.on("open", () => {
                this.addClient(conn);
                this.onConnection(conn);
                resolve(conn);
            });
            conn?.on("data", (data: any) => {
                this.onDataConnection(data, conn);
                this.onListenerDataYtb(data);
            });
            conn?.on("close", () => {
                conn.send("Disconnect");
            });
            this.client?.on("error", () => {
                reject();
            });
        });
    }
    dispatchDisconnect() {
        this.clientPeers.forEach((conn) => conn.send({ type: "dispatchConnect", data: { id: this.clientId } }));
        this.clientIds = [];
        this.clientPeers = [];
        this.isConnected = false;
    }
    listenerDisconect(id: string) {
        this.clientIds = this.clientIds.filter((val) => val !== id);
        this.clientPeers = this.clientPeers.filter((val) => val.peer !== id);
    }

    addClient(connection: DataConnection) {
        const foundClient = this.clientIds?.some((val) => val === connection.peer);

        if (!foundClient) {
            this.clientIds?.push(connection.peer);
            this.clientPeers?.push(connection);
        }
    }

    static PeerServiceInstance() {
        if (!PeerService.instance) {
            PeerService.instance = new PeerService();
        }
        return PeerService.instance;
    }

    sendAll(type: string, data: any): void {
        this.clientPeers.forEach((cl) => cl.send({ type, data }));
    }
}

// export default PeerService.PeerServiceInstance();
const peerService = new PeerService();
export default peerService;
