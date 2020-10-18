import gql from 'graphql-tag';

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
        readDueDate
        submissionDueDate
        state
        name
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
