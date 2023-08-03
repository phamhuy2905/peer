import Chat from "../Chat";
import FormConnect from "../FormConnect";
import ListConnect from "../ListConnect";

function User() {
    return (
        <div className="col-span-1 overflow-hidden relative">
            <div
                className="fixed w-[332px] h-[708px] px-4 py-3 rounded-[10px]"
                style={{ backgroundColor: "rgb( 23, 23, 23 )" }}
            >
                <FormConnect />
                <ListConnect />
                <Chat />
            </div>
        </div>
    );
}

export default User;
