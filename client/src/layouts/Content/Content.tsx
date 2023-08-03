import FormYtb from "../FormYtb";
import QueueItemYtb from "../QueueItemYtb";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import empty from "../../assest/empty.png";
import { updateCurrentId } from "../../redux/slice/youtubeSlice";

function Content() {
    const { infomation, currentId } = useSelector((state: RootState) => state.youtube);
    const dispatch = useAppDispatch();
    const opst = {
        height: "490",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handelEndVideo = () => {
        const foundId = infomation.findIndex((val) => val.videoId === currentId);
        if (foundId === infomation.length - 1) {
            dispatch(updateCurrentId(infomation[0].videoId));
        } else {
            dispatch(updateCurrentId(infomation[foundId + 1].videoId));
        }
    };

    return (
        <div className="col-span-3 ">
            <div className="rounded-[10px] min-h-[534px] pb-2" style={{ backgroundColor: "rgb( 23, 23, 23 )" }}>
                <div className="flex flex-col py-5 px-5">
                    <YouTube opts={opst} videoId={currentId} onEnd={handelEndVideo} />
                </div>
                <FormYtb />
            </div>
            {infomation.length ? (
                <div className="mt-4 py-3 px-5 rounded-[10px]" style={{ backgroundColor: "rgb( 23, 23, 23 )" }}>
                    {infomation.map((val, index) => {
                        return <QueueItemYtb key={index} data={val} />;
                    })}
                </div>
            ) : (
                <div
                    className="mt-4 py-3 px-5 rounded-[10px] flex items-center justify-center"
                    style={{ backgroundColor: "rgb( 23, 23, 23 )" }}
                >
                    <p className="text-gray-400 mr-2 text-[18px]">Nothing data</p>
                    <div className="flex items-center justify-center">
                        <img className="w-[50px] h-[50px] object-cover" src={empty} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Content;
