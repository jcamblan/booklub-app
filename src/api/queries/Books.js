import gql from 'graphql-tag';

export const BOOKS = gql`
  query books(
    $orderBy: BookOrderBy!
    $orderDirection: OrderDirection
    $search: String
    $after: String
    $first: Int
  ) {
    books(
      order: { by: $orderBy, direction: $orderDirection }
      search: $search
      first: $first
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
