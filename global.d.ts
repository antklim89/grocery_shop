

declare module 'bootstrap/js/src/*' {
    export default unknown;
}

declare module '*.gql' {
    import { DocumentNode } from 'graphql';


    declare const SchemaObj: {
        readonly [key: string]: DocumentNode
    } & DocumentNode;

    export default SchemaObj;
}

