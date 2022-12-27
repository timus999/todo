import "./App.css";
import Inputtodo from "./component/Inputtodo";
import Listtodo from "./component/Listtodo";
function App() {
  return (
    <>
      <div className="m-20">
        <Inputtodo />
        <Listtodo />
      </div>
    </>
  );
}

export default App;
