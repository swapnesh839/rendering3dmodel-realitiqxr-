import { BrowserRouter,Routes,Route } from "react-router-dom";
import RenderFile from "./Component/RenderFile/RenderFile";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/:model" element={<App2 />} />
      <Route path="/" element={<App2 />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;


const App2 = () => {
  return (
    <div className="App" style={{backgroundColor:"#1D062F",height:"100vh"}}>
      <RenderFile/>
    </div>
  )
}

