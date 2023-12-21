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
  query ($userId: uuid! = "9e094feb-6c38-4742-a723-9e2d2b61405e") {
    favorites(where: { userId: { _eq: $userId } }) {
      id
      type
      value
      userId
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation (
    $type: String!
    $value: String!
    $userId: uuid! = "9e094feb-6c38-4742-a723-9e2d2b61405e"
  ) {
    insert_favorites(
      objects: [{ type: $type, value: $value, userId: $userId }]
    ) {
      returning {
        id
        type
        value
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
