import { GraphQLClient } from 'graphql-request';


const token = typeof window !== 'undefined' && localStorage.getItem('token');

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    },
});


export default client;
