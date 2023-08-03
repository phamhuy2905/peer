import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useRef, useState } from "react";
import PeerService from "../../services/peerService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
    addPeer,
    addProfile,
    emptyDisonnectPeer,
    endFetching,
    removeOnePeer,
    startFetching,
} from "../../redux/slice/appSlice";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { InfoYtbType, addArrayYoutube, emptyDisonnecYtb, updateCurrentId } from "../../redux/slice/youtubeSlice";
import Modal from "../../components/Modal";
import { sendAllMessage, sendOneMessage } from "../../redux/slice/chatSlice";
function FormConnect() {
    const [userName, setUserName] = useState("");
    const userNameRef = useRef<HTMLInputElement>(null);
    const [isModal, setIsModal] = useState(true);
    const [idClient, setIdClient] = useState<string>("");
    const { profile, profileClients } = useSelector((state: RootState) => state.app);
    const { infomation, currentId } = useSelector((state: RootState) => state.youtube);
    const { dataMessage } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userName) return;
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            PeerService.sendAll("dispatchConnect", { id: PeerService.clientId });
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        PeerService.initialization(userName);
        dispatch(addProfile({ id: PeerService.clientId, userName: PeerService.userName }));

        PeerService.onConnection = (connection) => {
            connection.send({
                type: "peer",
                data: {
                    clientIds: PeerService.clientIds,
                    userName: PeerService.userName,
                    dataYtb: encodeURIComponent(JSON.stringify(infomation)),
                    dataMessage: encodeURIComponent(JSON.stringify(dataMessage)),
                    currentMusic: currentId,
                },
            });
        };
        PeerService.onDataConnection = (data: any, connection) => {
            switch (data["type"]) {
                case "peer":
                    const foundClient = profileClients.some((val) => val.id === connection.peer);
                    if (foundClient) return;
                    dispatch(addPeer({ id: connection.peer, userName: data.data.userName }));
                    if (!PeerService.isConnected) {
                        dispatch(addArrayYoutube(JSON.parse(decodeURIComponent(data.data.dataYtb)) as InfoYtbType[]));
                        dispatch(updateCurrentId(data.data.currentMusic));
                        dispatch(sendAllMessage(JSON.parse(decodeURIComponent(data.data.dataMessage))));
                        PeerService.isConnected = true;
                    }
                    const peerRest = data.data.clientIds.filter(
                        (val: string) => !PeerService.clientIds?.includes(val) && PeerService.clientId !== val
                    );
                    if (!peerRest.length) return;

                    peerRest.forEach((val: string) => PeerService.connect(val));
                    return;
                case "youtube":
                    dispatch(addArrayYoutube(JSON.parse(decodeURIComponent(data.data.ytb)) as InfoYtbType[]));
                    return;
                case "updateIdYtb":
                    dispatch(updateCurrentId(data.data.currentId as string));
                    return;
                case "dispatchConnect":
                    PeerService.listenerDisconect(data.data.id);
                    dispatch(removeOnePeer(data.data.id));
                    return;
                case "sendOneMessage":
                    dispatch(sendOneMessage(data.data.message));
                    return;
                default:
                    break;
            }
        };

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [dispatch, profileClients, infomation, userName, dataMessage, currentId]);

    const handleDispatchConnect = async () => {
        if (PeerService.clientIds.includes(idClient) || !PeerService.clientId) return;
        else if (PeerService.clientIds.length) {
            console.log("Nhung connect truoc do cua ban se mat, ban co muon khong?");
        }
        PeerService.dispatchDisconnect();
        dispatch(emptyDisonnecYtb());
        dispatch(emptyDisonnectPeer());
        dispatch(startFetching());
        await PeerService.connect(idClient)
            .then(() => {
                toast.success("Connect thành công!", {
                    position: "top-center",
                    autoClose: 1000,
                });
                setIdClient("");
            })
            .catch(() =>
                toast.warn("Connect không hợp lệ", {
                    position: "top-center",
                    autoClose: 1000,
                })
            )
            .finally(() => dispatch(endFetching()));
    };

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(profile.id);
    }, [profile.id]);
    return (
        <>
            <div className="flex flex-col">
                <div className="flex items-center mb-5">
                    <p className="px-3 py-1 rounded-[5px] text-[13px] text-gray-400 bg-[#393737] truncate">
                        {profile.id || "Do you realize what this mean?"}
                    </p>
                    <Tippy
                        trigger="click"
                        theme="dark"
                        duration={100}
                        render={() => {
                            return (
                                <span className="px-2 py-1 text-gray-400 rounded-[7px] text-[12px] bg-[#393737]">
                                    Copy
                                </span>
                            );
                        }}
                    >
                        <span
                            className="ml-3 px-2 py-1 rounded-[5px] text-[12px] text-gray-400 bg-[#393737] whitespace-nowrap cursor-pointer hover:bg-[#2d2a2a]"
                            onClick={handleCopy}
                        >
                            Copy id
                        </span>
                    </Tippy>
                </div>
                <div className="flex items-center">
                    <input
                        value={idClient}
                        onChange={(e) => setIdClient(e.target.value)}
                        className="border-[1px] py-1 text-[13px] text-gray-400 border-gray-300 rounded-[7px] bg-[#141414] flex-1 outline-none px-3"
                        type="text"
                        placeholder="Id connect..."
                    />
                    <button
                        onClick={handleDispatchConnect}
                        className="ml-2 px-2 py-1 text-[13px] text-white bg-blue-500 rounded-[5px]"
                    >
                        Connect
                    </button>
                </div>
            </div>
            <Modal
                isXmark={false}
                isModal={isModal}
                setIsModal={() => {
                    setIsModal(false);
                }}
            >
                <div className="flex flex-col items-center py-4">
                    <h4 className="text-[15px] text-gray-400 ">Vui lòng nhập tên của bạn</h4>
                    <input
                        className="my-7 text-[12px] text-gray-400 py-2 px-2 border-gray-300 border-[1px] rounded-[7px] bg-[#141414] outline-none userName"
                        type="text"
                        placeholder="Name...."
                        ref={userNameRef}
                        onKeyDown={(e) => {
                            const name = userNameRef.current?.value;
                            if (e.keyCode === 13 && name) {
                                setUserName(name);
                                setIsModal(false);
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            const name = userNameRef.current?.value;
                            if (!name) return;
                            setUserName(name);
                            setIsModal(false);
                        }}
                        className="py-2 px-7 bg-blue-500 text-white text-[12px] rounded-[7px] "
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default FormConnect;
