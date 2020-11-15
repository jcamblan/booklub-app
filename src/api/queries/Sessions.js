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
              id
              user {
                id
                username
              }
              book {
                id
                authors {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
                title
              }
            }
          }
          totalCount
        }
        selectedBook {
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
          averageNote
        }
        selectedBookSubmitters {
          nodes {
            id
            username
          }
        }
        notes {
          edges {
            node {
              id
              value
              user {
                id
                username
              }
            }
          }
        }
        userNote {
          id
          value
        }
        canNote {
          value
        }
      }
    }
  }
`;
