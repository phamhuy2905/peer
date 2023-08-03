import { HiOutlineXMark } from "react-icons/hi2";
interface TypeProp {
    children?: JSX.Element;
    isXmark?: boolean;
    isModal: boolean;
    setIsModal: () => void;
}
function Modal({ children, isXmark = true, isModal = false, setIsModal }: TypeProp) {
    return (
        <>
            {isModal && (
                <div
                    className="fixed w-full h-full top-0 left-0 z-10 "
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                >
                    <div className="relative left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] w-[300px] z-50 rounded-[10px] border-gray-300 border-[1px] bg-[#141414]">
                        {isXmark && (
                            <span
                                onClick={setIsModal}
                                className="absolute right-[-2px] top-[-3px] bg-[#141414] rounded-full overflow-hidden border-[1px] border-red-500 px-1 py-1 cursor-pointer"
                            >
                                <HiOutlineXMark className="text-red-500" />
                            </span>
                        )}
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
