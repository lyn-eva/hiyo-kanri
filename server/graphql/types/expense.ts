import { GraphQLScalarType } from 'graphql'

const ExpenseScalar = new GraphQLScalarType({ name: 'Expense', description: 'Expense object custom scalar type' })
