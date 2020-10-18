import gql from 'graphql-tag';

export const SESSION_FULL_DETAILS = gql`
  query session($id: ID!) {
    node(id: $id) {
      id
      ... on Session {
        id
        name
        state
        readDueDate
        submissionDueDate
        canParticipate {
          value
        }
        submissions {
          edges {
            node {
              user {
                id
                username
              }
              book {
                id
                author
                title
              }
            }
          }
          totalCount
        }
        selectedBook {
          id
          title
          author
        }
        selectedBookSubmitters {
          nodes {
            id
            username
          }
        }
        notes {
          nodes {
            id
            value
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
