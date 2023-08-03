import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function ListConnect() {
    const { profileClients } = useSelector((state: RootState) => state.app);
    return (
        <div className="flex flex-col mt-5 bg-[#393737] pt-2 px-2 rounded-[7px] h-[170px] overflow-y-scroll">
            <p className="text-[12px] text-gray-400">Số người đang kết nối: {profileClients.length}</p>
            <div className="max-h-[300px] mt-2">
                <ul className="flex items-center flex-wrap">
                    {profileClients.map((val, index) => {
                        return (
                            <li
                                key={index}
                                className="text-[12px] text-gray-500 mb-3 rounded-[10px] px-2 py-1 truncate bg-[#141414] mx-[1px]   "
                            >
                                {val.userName}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ListConnect;
