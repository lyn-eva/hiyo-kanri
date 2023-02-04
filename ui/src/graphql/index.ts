import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
	// uri: 'http://hiyo-kanri.onrender.app/',
	uri: 'http://localhost:5000/',
	cache: new InMemoryCache(),
})
