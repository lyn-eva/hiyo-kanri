import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ExpensePage } from './components/expense'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const router = createBrowserRouter([{ path: '/expenses', element: <ExpensePage /> }])

const client = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 0, cacheTime: 60 * 1000, retry: false } },
})

const apolloClient = new ApolloClient({
	// uri: 'http://hiyo-kanri.onrender.app/',
	uri: 'http://localhost:5000/',
	cache: new InMemoryCache(),
})

function App() {
	return (
		<QueryClientProvider client={client}>
			<ApolloProvider client={apolloClient}>
				<header>
					<div className='mx-auto w-[90%] py-2'>
						<span className='font-bold'>Hiyo Kanri</span>
					</div>
				</header>
				<RouterProvider router={router} />
			</ApolloProvider>
		</QueryClientProvider>
	)
}

export default App
