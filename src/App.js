import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './routes'
import { EstacaoProvider } from './context/EstacaoContext'

const queryClient = new QueryClient()

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <EstacaoProvider>
        <Router />
      </EstacaoProvider>
    </QueryClientProvider>
  )
}

export default App
