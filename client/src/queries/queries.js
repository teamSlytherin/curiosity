import { gql } from 'apollo-boost';

const getUser = gql`
<<<<<<< HEAD
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
        questionId
        answer
        score
        question {
          questionTitle
        }
      }
      transactions {
        id
        questionId
        amount
        receiverId
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
      restriction
      tags
      user {
        id
        username
        rank
      }
      answers {
        id
      }
      createdAt
    }
  }
=======
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
			}
			transactions {
				id
				questionId
				amount
				receiverId
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
			}
			createdAt
		}
	}
>>>>>>> dev
`;

// passing in the questionId
const getAnswer = gql`
  query($id: ID!) {
    answer(id: $id) {
      answer
      score
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
<<<<<<< HEAD
  query {
    questions {
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
=======
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
>>>>>>> dev
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

module.exports = {
  getUser,
  getQuestion,
  getQuestions,
  getAnswer,
  checkUserEmail,
  searchQuestion,
};
