import PeerService from "../../services/peerService";
import { RootState, useAppDispatch } from "../../redux/store";
import { getApiYtb } from "../../redux/slice/youtubeSlice";
import { endFetching, startFetching } from "../../redux/slice/appSlice";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { dangerousRegex, regexYtb as regex } from "../../utils/regex";

function FormYtb() {
    const [url, setUrl] = useState("");
    const dispatch = useAppDispatch();
    const { infomation } = useSelector((state: RootState) => state.youtube);

    const handleDispatchYoutube = useCallback(() => {
        if (!PeerService.clientId) return;
        if (dangerousRegex.test(url)) return;
        if (!regex.test(url)) return;
        const match = url.match(regex);
        const id = match && match[7].length === 11 ? match[7] : false;
        if (!id) return;
        dispatch(startFetching());
        dispatch(getApiYtb(id))
            .unwrap()
            .then((res) => {
                const data = encodeURIComponent(JSON.stringify([...infomation, res]));
                PeerService.sendAll("youtube", { ytb: data });
                setUrl("");
            })
            .finally(() => {
                dispatch(endFetching());
            });
    }, [infomation, url, dispatch]);
    return (
        <div className="flex items-center mt-1 mb-3 px-3">
            <input
                className=" text-[13px] text-gray-400 py-2 px-3 border-gray-300 border-[1px] rounded-[7px] bg-[#141414] flex-1 outline-none"
                type="text"
                placeholder="Send link youtbe...."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                onClick={handleDispatchYoutube}
                className="py-2 px-10 bg-blue-500 text-white text-[14px] rounded-[7px] ml-2"
            >
                Submit
            </button>
        </div>
    );
}

export default FormYtb;
