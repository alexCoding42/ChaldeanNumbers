import { gql } from "@apollo/client";

export const getNumberList = gql`
  query GetNumbers {
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
