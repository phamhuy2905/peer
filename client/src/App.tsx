import "./App.css";
import Loading from "./components/Loading/Loading";
import Content from "./layouts/Content";
import User from "./layouts/User";

function App() {
    return (
        <Loading>
            <div className=" h-full py-7" style={{ backgroundColor: "rgb( 0, 0, 0 )" }}>
                <div className="w-[1400px] mx-auto">
                    <div className="grid grid-cols-4 gap-6 ">
                        <Content />
                        <User />
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default App;
