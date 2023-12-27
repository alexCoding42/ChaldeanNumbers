import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    deleteUser(id: $id) {
      id
      displayName
      email
    }
  }
`;

export const GET_FAVORITES = gql`
  query ($userId: uuid!) {
    favorites(where: { userId: { _eq: $userId } }) {
      id
      type
      value
      chaldeanNumber
      userId
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation (
    $type: String!
    $value: String!
    $chaldeanNumber: Int!
    $userId: uuid!
  ) {
    insert_favorites(
      objects: [
        {
          type: $type
          value: $value
          chaldeanNumber: $chaldeanNumber
          userId: $userId
        }
      ]
    ) {
      returning {
        id
        type
        value
        chaldeanNumber
        userId
      }
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation ($id: uuid!) {
    delete_favorites(where: { id: { _eq: $id } }) {
      returning {
        id
        value
        type
      }
    }
  }
`;

export const DELETE_FAVORITES_BY_USER_ID = gql`
  mutation ($userId: uuid!) {
    delete_favorites(where: { userId: { _eq: $userId } }) {
      affected_rows
      returning {
        id
        chaldeanNumber
        type
        value
      }
    }
  }
`;
