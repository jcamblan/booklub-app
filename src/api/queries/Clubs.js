import gql from 'graphql-tag';

export const CLUBS_COUNT = gql`
  query myClubs {
    myClubs {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const MY_CLUBS = gql`
  query myClubs {
    myClubs {
      edges {
        node {
          id
          name
          bannerUrl
          users {
            totalCount
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
            averageNote
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
        sessions(
          filter: { state: { in: [conclusion, archived] } }
          order: { by: read_due_date, direction: desc }
        ) {
          edges {
            node {
              id
              name
              state
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
