import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

/* tslint:disable:no-var-requires */
const modules = [
  require("./types/geo.type"),
  require("./types/violation.type"),
  require("./types/inspection.type"),
  require("./types/location.type"),
  require("./queries/location.query")
];

const mainDefs = [`
    schema {
        query: Query
    }
`,
];

const resolvers = modules.reduce((state, m) => {
  if ( !m.resolver ) {
    return state;
  }

  return {
    ...state,
    ...m.resolver,
  };
}, {});

const typeDefs = mainDefs.concat(modules.map((m) => m.typeDef).filter((res) => !!res));

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export {Schema};
