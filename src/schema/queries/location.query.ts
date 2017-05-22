import { GraphQLList } from 'graphql';


export const typeDef = `
# Location Querys
type Query {
  getAllLocations(city: String): [Location]
}
`;

export const resolver = {
  Query: {
     getAllLocations(root, args, ctx) {
       console.log(args);
       return ctx.Locations.find(args).toArray();
     },
   },
};
