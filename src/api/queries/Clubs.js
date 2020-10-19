import gql from 'graphql-tag';

export const CLUBS = gql`
  query myClubs {
    myClubs(last: 5) {
      edges {
        node {
          id
          name
          users {
            totalCount
          }
          sessions(last: 1) {
            nodes {
              readDueDate
            }
          }
          currentSession {
            id
            name
            state
            readDueDate
            submissionDueDate
            submissions {
              edges {
                node {
                  book {
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
          }
        }
      }
    }
  }
`;

export const CLUB_FULL_DETAILS = gql`
  query club($id: ID!) {
    node(id: $id) {
      ... on Club {
        id
        name
        invitationCode
        canCreateSession {
          value
        }
        users {
          edges {
            node {
              id
              username
            }
            sessionCount
            selectionCount
            bonusScore
          }
          totalCount
        }
        currentSession {
          id
          name
          state
          readDueDate
          submissionDueDate
          submissions {
            edges {
              node {
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
        }
        manager {
          id
          username
        }
        sessions {
          edges {
            node {
              id
              name
              state
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
              readDueDate
              submissionDueDate
              submissions {
                edges {
                  node {
                    book {
                      id
                      author
                      title
                    }
                  }
                }
                totalCount
              }
              notes {
                nodes {
                  id
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
