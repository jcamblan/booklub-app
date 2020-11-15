import gql from 'graphql-tag';

export const BOOKS = gql`
  query books($search: String, $after: String, $first: Int) {
    books(search: $search, first: $first, after: $after) {
      edges {
        node {
          id
          title
          authors {
            edges {
              node {
                id
                name
              }
            }
          }
          googleBookId
          averageNote
          submissionCount
          noteCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
