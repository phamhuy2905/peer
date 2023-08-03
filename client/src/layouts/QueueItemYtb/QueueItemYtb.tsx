import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiStreamOn } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { InfoYtbType, updateCurrentId, updateStatusYoutube } from "../../redux/slice/youtubeSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import PeerService from "../../services/peerService";
import { useSelector } from "react-redux";
interface PropType {
    data: InfoYtbType;
}
function QueueItemYtb({ data }: PropType) {
    const { currentId } = useSelector((state: RootState) => state.youtube);
    const dispatch = useAppDispatch();

    const handleUpdateIdYtb = (id: string) => {
        if (!PeerService.clientId) return;
        if (currentId === id) {
            toast.info("Bài hát hiện tại, vui lòng chọn bài khác");
            return;
        }
        dispatch(updateCurrentId(id));
        dispatch(updateStatusYoutube());
        PeerService.sendAll("updateIdYtb", { currentId: id });
    };

    return (
        <div className="flex flex-col py-2 border-b-[1px] border-gray-700">
            <div className="flex items-center justify-between">
                <div className="w-[60px] h-[60px] overflow-hidden rounded-[5px]">
                    <img className="w-full h-full object-cover" src={data.thumbnail} alt="" />
                </div>
                <div className="flex flex-col flex-1 mx-5 items-start">
                    <p className="text-[14px] text-gray-400 mb-2 truncate">{data.title}</p>
                    <p className="px-2 py-1 bg-[#141414] border-[1px] border-[#424242] rounded-[5px] text-gray-400 text-[13px] ">
                        {data.duration === "Live" ? (
                            <span className="text-red-500 flex items-center">
                                <CiStreamOn className="text-red-500 mr-1" />
                                Live
                            </span>
                        ) : (
                            data.duration
                        )}
                    </p>
                </div>
                <div className="flex items-center">
                    <BsTrash className="text-red-400 text-[20px] mr-5 cursor-pointer" />
                    <AiOutlinePlayCircle
                        className="text-blue-400 text-[20px] cursor-pointer"
                        onClick={() => handleUpdateIdYtb(data.videoId)}
                    />
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div>
    );
}

export default QueueItemYtb;
