import gql from 'graphql-tag';

export const CLUBS_COUNT = gql`
  query myClubs {
    myClubs(last: 5) {
      edges {
        node {
          id
          name
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
                  title
                  googleBookId
                  authors {
                    edges {
                      node {
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
            totalCount
          }
          selectedBook {
            id
            title
            googleBookId
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
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
                googleBookId
                authors {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
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
              notes {
                edges {
                  node {
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
  }
`;
