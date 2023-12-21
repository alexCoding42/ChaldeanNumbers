import { gql } from "@apollo/client";

export const getAllNumbers = gql`
  query GetAllNumbers {
    numbers(where: { locale: { _eq: "en" } }, order_by: { chaldean: asc }) {
      id
      locale
      name
      chaldean
      description
      words
      lifepath
      challenge
      phrase_title
      phrase_description
    }
  }
`;

export const getNumberDetailsById = gql`
  query GetNumberDetailsById($id: uuid) {
    numbers(where: { id: { _eq: $id } }) {
      id
      locale
      chaldean
      challenge
      description
      name
      lifepath
      phrase_description
      phrase_title
      words
    }
  }
`;
