import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './features/Home'
import { BarPage, MapPage, LinePage } from './features/Estacoes'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/estacoes/map' component={MapPage} />
        <Route path='/estacoes/bar' component={BarPage} />
        <Route path='/estacoes/line' component={LinePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
