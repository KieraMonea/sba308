// Declare variables properly using let and const where appropriate.
let result = [];

// Sample data
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Use functions to handle repeated tasks.
function calculateWeightedAverage(submissions, assignments) {
  let totalScore = 0;
  let totalWeight = 0;

  submissions.forEach((submission) => {
    const assignment = assignments.find((a) => a.id === submission.assignment_id);

    // Check if assignment is not late and due date has passed
    if (new Date(submission.submission.submitted_at) <= new Date(assignment.due_at)) {
      const adjustedScore = Math.max(submission.submission.score - 0.1 * assignment.points_possible, 0);
      totalScore += adjustedScore;
      totalWeight += assignment.points_possible;
    }
  });

  return totalWeight !== 0 ? totalScore / totalWeight : 0;
}

function processLearnerSubmissions(course, assignmentGroup, submissions) {
  if (assignmentGroup.course_id !== course.id) {
    throw new Error("Invalid input: AssignmentGroup does not belong to the specified course.");
  }

  const learnerData = {};

  submissions.forEach((submission) => {
    const learnerId = submission.learner_id;

    if (!learnerData[learnerId]) {
      learnerData[learnerId] = {
        id: learnerId,
        avg: 0,
      };
    }

    const weightedAverage = calculateWeightedAverage([submission], assignmentGroup.assignments);
    learnerData[learnerId].avg += weightedAverage;
    learnerData[learnerId][submission.assignment_id] = weightedAverage;
  });

  // Convert learnerData object to an array
  return Object.values(learnerData);
}

function getLearnerData(course, assignmentGroup, submissions) {
  try {
    // Implement error handling for invalid input
    if (!course || !assignmentGroup || !submissions || submissions.length === 0) {
      throw new Error("Invalid input: Please provide valid course, assignmentGroup, and submissions.");
    }

    // Process learner submissions
    result = processLearnerSubmissions(course, assignmentGroup, submissions);

    return result;
  } catch (error) {
    console.error(error.message);
  }
}

// Program outputs processed data as described above.
{
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
}
