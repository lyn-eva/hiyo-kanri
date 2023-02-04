import { ApolloServer } from '@apollo/server'
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers } from 'graphql-scalars'
import { createExpense, getExpenses } from './resolvers/expense.resolver'

const typeDefs = [
	...scalarTypeDefs,
	`#graphql 
  input CreateExpenseArgs {
    name: String!, amount: Float!, tags: [String], userId: String!
  }
  

  type EXPENSE {
    id: String
    name: String
    amount: Float
    tags: [String]
    userId: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    expenses(from: String, to: String): [EXPENSE]
  }

  type Mutation {
    createExpense(data: CreateExpenseArgs): EXPENSE
  }
  `,
]

const resolvers = {
	...scalarResolvers,
	Query: {
		expenses: async (parent: any, args: any) => {
			return getExpenses(args)
		},
	},
	Mutation: {
		createExpense: async (parent: any, args: any) => {
			console.log({ args })
			return createExpense(args)
		},
	},
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
