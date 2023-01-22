import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ExpensePage } from './components/expense'

const router = createBrowserRouter([{ path: '/expenses', element: <ExpensePage /> }])

const client = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 0, cacheTime: 60 * 1000, retry: false } },
})
function App() {
	return (
		<QueryClientProvider client={client}>
			<header>
				<div className='mx-auto w-[90%] py-2'>
					<span className='font-bold'>Hiyo Kanri</span>
				</div>
			</header>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
