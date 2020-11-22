import gql from 'graphql-tag';

export const CREATE_SUBMISSION = gql`
  mutation createSubmission($input: CreateSubmissionInput!) {
    createSubmission(input: $input) {
      submission {
        id
        user {
          id
        }
        session {
          id
          submissions {
            edges {
              node {
                id
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
          }
        }
      }
      errors {
        attribute
        error
        message
        path
      }
    }
  }
`;
