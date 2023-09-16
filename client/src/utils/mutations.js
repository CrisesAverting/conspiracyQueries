import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(username: $name, email: $email, password: $password) {
      token
      profile {
        userId
        username
        password
        email
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        userId
        username
      }
    }
  }
`;
