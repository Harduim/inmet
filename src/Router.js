import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './features/Home'
import Estacoes from './features/Estacoes'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/estacoes' component={Estacoes} />
        <Route exact path='/estacoes/:cdEstacao' component={Estacoes} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
