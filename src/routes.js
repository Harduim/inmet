import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './features/Home'
import { BarPage, MapPage, LinePage } from './features/Estacoes'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/estacoes/map' component={MapPage} />
        <Route exact path='/estacoes/map/:cd_estacao' component={MapPage} />
        <Route exact path='/estacoes/bar' component={BarPage} />
        <Route exact path='/estacoes/line' component={LinePage} />
        <Route exact path='/teste' component={LinePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
