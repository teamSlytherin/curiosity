import { gql } from 'apollo-boost';

const getUser = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      rank
      credit
      email
      questions {
        id
        questionTitle
        bounty
      }
      answers {
        id
        answer
        score
        question {
          id
          questionTitle
        }
      }
      transactions {
        id
        questionId
        amount
        receiverId
        recipient {
          username
        }
        sender {
          username
        }
        questionName {
          questionTitle
        }
      }
    }
  }
`;

const getQuestion = gql`
  query($id: ID!) {
    question(id: $id) {
      questionTitle
      questionContent
      category
      bounty
      bountyPaid
      restriction
      tags
      score
      user {
        id
        username
        rank
      }
      answers {
        id
        answerChosen
      }
      createdAt
    }
  }
`;

// passing in the questionId
const getAnswer = gql`
  query($id: ID!) {
    answer(id: $id) {
      answer
      score
      answerChosen
      createdAt
      user {
        id
        username
        rank
      }
    }
  }
`;

const getQuestions = gql`
  query {
    questions {
      id
      category
      questionTitle
      questionContent
      score
      user {
        username
      }
      bounty
      restriction
      tags
      createdAt
      answers {
        id
      }
    }
  }
`;

const checkUserEmail = gql`
  query($email: String!) {
    checkUserEmail(email: $email) {
      id
      username
      email
      rank
      credit
    }
  }
`;

const searchQuestion = gql`
  query($term: String!) {
    searchQuestion(term: $term) {
      id
      category
      questionTitle
      questionContent
      user {
        username
      }
      bounty
      restriction
      tags
      createdAt
      answers {
        id
      }
    }
  }
`;

const getMessages = gql`
  query($receiverId: ID!) {
    userMessages(receiverId: $receiverId) {
      id
      receiverId
      senderId
      createdAt
      sender {
        id
        username
      }
      messageTitle
      messageContent
    }
  }
`;

module.exports = {
  getUser,
  getQuestion,
  getQuestions,
  getAnswer,
  checkUserEmail,
  searchQuestion,
  getMessages,
};
