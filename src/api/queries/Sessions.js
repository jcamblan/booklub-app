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
                googleBookId
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
          googleBookId
          averageNote
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

export const SESSIONS = gql`
  query mySessions {
    mySessions(last: 100, order: { by: next_step_date, direction: desc }) {
      edges {
        node {
          id
          name
          readDueDate
          state
          submissionDueDate
          club {
            id
            name
          }
          submissions {
            totalCount
          }
          selectedBook {
            id
            googleBookId
          }
        }
      }
    }
  }
`;
