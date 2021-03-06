import {GraphQLServer} from 'graphql-yoga';
import { fetchData, removeDuplicate } from './utils';

const typeDefs = `

type Query{
    character(id: Int!): Character!
    characters(page: Int, size: Int, name: String, status: String, planet: String): [Character!]!
    planets: [String!]!
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
                    planet: character.location.name,
                }
            },
            characters: (parent, args, ctx, info) => {
                const page = args.page || 1;
                const size = args.size || 20;
                let start = size*(page-1);
                let finish = start + size;
                if(args.name){
                    const listNames = data.filter(element => element.name == args.name);
                    const array = listNames.slice(start, finish);
                    return array.map(character => {
                        return {
                            id: character.id,
                            name: character.name,
                            status: character.status,
                            planet: character.location.name,
                        }   
                    });
                }else if(args.status){
                    const listStatus = data.filter(element => element.status == args.status);
                    const array = listStatus.slice(start, finish);
                    return array.map(character => {
                        return {
                            id: character.id,
                            name: character.name,
                            status: character.status,
                            planet: character.location.name,
                        } 
                    });
                }else if(args.planet){
                    const listPlanet = data.filter(element => element.origin.name == args.planet);
                    const array = listPlanet.slice(start, finish);
                    return array.map(character => {
                        return {
                            id: character.id,
                            name: character.name,
                            status: character.status,
                            planet: character.origin.name,
                        } 
                    });
                }else{
                    const array = data.slice(start, finish);
                    return array.map(character => {
                        return {
                            id: character.id,
                            name: character.name,
                            status: character.status,
                            planet: character.location.name
                        }   
                    });
                }
            },
            planets: (parent, args, ctx, info) => {
                const list = [];
                data.forEach(element => {
                    list.push(element.origin.name);
                });
                return removeDuplicate(list);;
            }
        }
    }
    
    const server = new GraphQLServer({typeDefs, resolvers});
    server.start( () => console.log("listenting"));
}

fetchData(runApp, url);