import { useState, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import empty from "../../assest/empty.png";
import PeerService from "../../services/peerService";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { sendOneMessage } from "../../redux/slice/chatSlice";
import { dangerousRegex, regexLink } from "../../utils/regex";

function Chat() {
    const [message, setMessage] = useState("");
    const { dataMessage } = useSelector((state: RootState) => state.chat);
    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLInputElement>(null);
    const handleSendMessage = () => {
        const _message = message.trim();
        if (dangerousRegex.test(_message)) return;
        if (!_message || !PeerService.clientId) return;
        const data = {
            id: PeerService.clientId,
            userName: PeerService.userName,
            message: _message,
        };
        dispatch(sendOneMessage(data));
        PeerService.sendAll("sendOneMessage", { message: data });
        setMessage("");
        setTimeout(() => {
            handleScroll();
        }, 50);
    };
    const handleScroll = () => {
        scrollRef.current?.scroll({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="mt-5 bg-[#393737] pt-2 rounded-[7px] h-[400px] relative  overflow-hidden ">
            <h4 className="text-gray-400 px-2">Box chat</h4>
            {dataMessage.length === 0 ? (
                <div className="h-full flex-col flex items-center justify-center">
                    <img className="w-[60px] h-[60px]" src={empty} alt="" />
                    <p className="mt-3 text-gray-400">Don't have message??</p>
                </div>
            ) : (
                <div className="flex flex-col overflow-y-scroll h-[350px] px-2 pb-5" ref={scrollRef}>
                    {dataMessage.map((val, index) => {
                        return (
                            <div key={index}>
                                {PeerService.clientId === val.id ? (
                                    <div className="flex   justify-end mt-3">
                                        {regexLink.test(val.message) ? (
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                href={val.message}
                                                className="text-blue-400 text-[12px] underline"
                                            >
                                                Liên kết: {val.message.slice(0, 10)}...
                                            </a>
                                        ) : (
                                            <span className="text-blue-400 text-[12px]">{val.message}</span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-start  mt-3">
                                        {regexLink.test(val.message) ? (
                                            <a href={val.message} className="text-gray-400 text-[12px] underline">
                                                <span className="text-white text-[12px] mr-2 whitespace-nowrap">
                                                    {val.userName}:
                                                </span>
                                                Liên kết: {val.message.slice(0, 10)}...
                                            </a>
                                        ) : (
                                            <p className="text-gray-400 text-[12px]">
                                                <span className="text-white text-[12px] mr-2 whitespace-nowrap">
                                                    {val.userName}:
                                                </span>
                                                {val.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="flex items-center absolute bottom-[4px] w-full px-2">
                <input
                    className="border-[1px] py-1 text-[13px] text-gray-400 border-gray-300 rounded-[7px] bg-[#141414] flex-1 outline-none pl-3 pr-8  w-full"
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            handleSendMessage();
                        }
                    }}
                />
                <button onClick={handleSendMessage} className="absolute right-[12px] ">
                    <AiOutlineSend className=" text-[20px] text-blue-500 " />
                </button>
            </div>
        </div>
    );
}

export default Chat;
