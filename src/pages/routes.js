import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import { Bar } from './bar';
import { Home } from './home';
import { HomeButton } from './pageTeste';
import { AnimationPlot } from "./animationPlot";

export const MyRoutes = () => {

  return (
    <BrowserRouter>
    <HomeButton />
      <Routes>
        <Route path={`teste/`} element={<HomeButton />}/>
        <Route path={`animation/`} element={<AnimationPlot />}/>
        <Route path={`scatter/:idEstacao`} element={<Home />}/>
        <Route path={`bar/:id`} element={<Bar />}/>
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path={`scatter/A${estacaoId}`} element={<Home />}/>
    //     <Route path={`bar/A${estacaoId}`} element={<Bar />}/>
    //   </Routes>
    // </BrowserRouter>
  )
}