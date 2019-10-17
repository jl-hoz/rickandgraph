import {GraphQLServer} from 'graphql-yoga';
import { fetchData, storeData } from './utils';

const typeDefs = `

type Query{
    character(id: Int!): Character!
    characters(page: Int, size: Int): [Character!]
}

type Character{
    id: Int!
    name: String!
    status: String!
    planet: String!
}
`

const url = 'https://rickandmortyapi.com/api/character/';



/** 
 * Main App
 * @param data all rickyandmortyapi.com database
 */
const runApp = data => {

    const resolvers = {
        Query: {
            character: (parent, args, ctx, info) => {
                //Search object character using id from file
                const character = data.find(element => element.id == args.id);
                return{
                    //Show object character data
                    id: args.id,
                    name: character.name,
                    status: character.status,
                    planet: character.origin.name,
                }
            },
            characters: (parent, args, ctx, info) => {
                return{

                }
            }
        }
    }
    
    const server = new GraphQLServer({typeDefs, resolvers});
    server.start( () => console.log("listenting"));
}

fetchData(runApp, url);
