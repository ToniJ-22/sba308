// // // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores






// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
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
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [

//Submitted on time 
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
//Submitted on time 
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
//Submitted on time 
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
//Submitted on time 
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
//Submitted Late
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
try{

  if(ag.course_id !== course.id ){
    throw new Error("Wrong course!");
  }
  let assignmentMap = {};
  for ( let i = 0; i < ag.assignments.length; i++){
    const a = ag.assignments[i];
  
  if(!a.id || a.points_possible === undefined || !a.due_at) {
    throw new Error("Invalid assignment");
  }
  assignmentMap[a.id]=a;
}
  const learners = {};
  for (let i = 0; i < submissions.length; i ++){
let sub = submissions[i];
let assignment = assignmentMap[sub.assignment_id];
if (!assignment) continue;

let date = new Date(assignment.due_at);
let submitted = new Date(sub.submission.submitted_at);

if(date > new Date ) continue;

if(submitted > new Date){
    score -= assignment.points_possible * 0.1;
}
if (typeof score !== "number" || score < 0)
     score = [];

if (!learners[sub.learner_id]){
    learners[sub.learner_id] = {
        totalScore : 0,
        totalPossible: 0,
        assignments: {}
    };
}
learners[sub.learner_id].totalScore += score;
learners[sub.learner_id].totalPossible += assignment.points_possible;
learners[sub.learner_id].assignments[sub.assignment_id]=
score / assignment.points_possible;
  }
  const result =[];
  for (let learnerId in learners){
    let learner = learners[learnerId];
    let avg = learner.totalScore / learner.totalPossible;
 
    let learnerObj= {
        id: Number(learnerId),
        avg: Number(avg.toFixed(3))
    };
for (const assignmentId in learner.assignments) {
        learnerObj[assignmentId] = learner.assignments[assignmentId];
      }

      result.push(learnerObj);
    }

    return result;

  } catch (error) {
    console.error("Error processing learner data:", error.message);
    return [];
  }
}


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

