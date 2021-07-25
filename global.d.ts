

declare module 'bootstrap/js/src/*' {
    export default unknown;
}

declare module '*.gql' {
    import { DocumentNode } from 'graphql';


    const Schema: DocumentNode;

    export = Schema;
  }

