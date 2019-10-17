import {GraphQLServer} from 'graphql-yoga';
import { fetchData, storeData } from './utils';

const typeDefs = `

type Query{
    character(id: Int!): Character!
}

type Character{
    id: Int!
    name: String!
    status: Boolean!
    planet: String!
}
`

const url = 'https://rickandmortyapi.com/api/character/';

const resolvers = {
    Query: {
        character: (parent, args, ctx, info) => {
            //Search object character using id from file
            return{
                //Show object character data
                id: args.id,
                name: 'NAme',
                status: 'True',
                planet: 'Earth',
            }
        }
    }
}

/** 
 * Main App
 * @param data all rickyandmortyapi.com database
 */
const runApp = data => {
    const server = new GraphQLServer({typeDefs, resolvers});
    server.start();
}

fetchData(runApp, url);
