import gql from 'graphql-tag';

export const BOOKS = gql`
  query books(
    $orderBy: BookOrderBy!
    $orderDirection: OrderDirection
    $search: String
    $after: String
  ) {
    books(
      order: { by: $orderBy, direction: $orderDirection }
      search: $search
      first: 10
      after: $after
    ) {
      edges {
        node {
          id
          title
          author
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
