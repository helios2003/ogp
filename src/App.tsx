import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./Page";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Page />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}