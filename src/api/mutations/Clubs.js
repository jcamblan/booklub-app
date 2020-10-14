import gql from 'graphql-tag';

export const JOIN_CLUB = gql`
  mutation joinClub($input: JoinClubInput!) {
    joinClub(input: $input) {
      club {
        name
        id
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

export const CREATE_CLUB = gql`
  mutation createClub($input: CreateClubInput!) {
    createClub(input: $input) {
      club {
        name
        id
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
