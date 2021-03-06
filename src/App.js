import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './Router'

const queryClient = new QueryClient()

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
