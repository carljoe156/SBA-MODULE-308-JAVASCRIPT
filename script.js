// //Sample code from CodeSandbox

// // The provided course information.
// const CourseInfo = {
//     id: 451,
//     name: "Introduction to JavaScript"
//   };
  
//   // The provided assignment group.
//   const AssignmentGroup = {
//     id: 12345,
//     name: "Fundamentals of JavaScript",
//     course_id: 451,
//     group_weight: 25,
//     assignments: [
//       {
//         id: 1,
//         name: "Declare a Variable",
//         due_at: "2023-01-25",
//         points_possible: 50
//       },
//       {
//         id: 2,
//         name: "Write a Function",
//         due_at: "2023-02-27",
//         points_possible: 150
//       },
//       {
//         id: 3,
//         name: "Code the World",
//         due_at: "3156-11-15",
//         points_possible: 500
//       }
//     ]
//   };
  
//   //The provided learner submission data.
//   const LearnerSubmissions = [
//     {
//       learner_id: 125,
//       assignment_id: 1,
//       submission: {
//         submitted_at: "2023-01-25",
//         score: 47
//       }
//     },
//     {
//       learner_id: 125,
//       assignment_id: 2,
//       submission: {
//         submitted_at: "2023-02-12",
//         score: 150
//       }
//     },
//     {
//       learner_id: 125,
//       assignment_id: 3,
//       submission: {
//         submitted_at: "2023-01-25",
//         score: 400
//       }
//     },
//     {
//       learner_id: 132,
//       assignment_id: 1,
//       submission: {
//         submitted_at: "2023-01-24",
//         score: 39
//       }
//     },
//     {
//       learner_id: 132,
//       assignment_id: 2,
//       submission: {
//         submitted_at: "2023-03-07",
//         score: 140
//       }
//     }
//   ];
  
//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [ 
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   //const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);
  



console.log ('========================================================================================================================================================================')


//Same thing as above, I'm using this for better visbility and understanding

//Course & Assignment Data Array
const CourseInfo = { id: 451, name: "Introduction to JavaScript" };


const AssignmentGroup = { 
    id: 12345, 
    name: "Fundamentals of JavaScript", 
    course_id: 451, 
    group_weight: 25, 
    assignments: [
        { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
        { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
        { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
    ]
};

// Learner Submissions object in Array 
const LearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];



// I need a script that gathers data
//So there are multiple Objects and Arrays all nested, so I guess I need to distill everything into a managable way


// Beginning/Start
function getLearnerData(course, ag, submissions) {}
   let newlearnerData = {} //this gotta be a new a new object and should  probaly hold  the results 

   let dueDate
   let pointsPossible

 submission.forEach submissions => {
    let learnerId = submissions.learner_id;
    let assignmentId = submissions.assignment_id;
    let score = submissions.submission.score;
   


   try {
    const loggedAssignment = ag.assignments.find(assignment.id === assignmentId);       //using helper function
    if (!loggedAssignment) {
        throw new Error (`Your assignment was not found in "Introduction to Javascript!".`);
    }
        //return loggedAssignment; // should show the logged assignment 

        dueDate = new Date (loggedAssignment.due_at);
        pointsPossible = loggedAssignment.points_possible;

        //newlearnerData.dueDate = dueDate; //may revist this 
        //newlearnerData.pointsPossible = pointsPossible; //may revist this 

   // } else { newLearnerData.loggedAssignment = loggedAssignment; // Displays the logged assignment if there

    // } else if (!learnerData[learnerId]) {        // I think I'll probably circle back to this 
    //     learnerData[learnerId] = {
    //     id: learnerId,
    //     assignmentScores:{},
    //     sumScore:0,
    //     sumPointsPossible:0,
    //     lateAssignmentPenalty:0
    // };
}
    // If can't find the assignment this will show up
 catch (error) {
    console.error(`Sorry, we don't have any record of your assignment:`);
    return;     
}

if (dueDate > new Date()) {         // This can be a future checker
    return;
} else if (!learnerData[learnerId]) {        // Circled back, for when a new student/learner don't exist, the scores it should go here  
        learnerData[learnerId] = {
        id: learnerId,
        assignmentScores:{},
        sumScore:0,
        sumPointsPossible:0,
       lateAssignmentPenalty:0
        };
}

//So we want to do the Math aspect of the problem to return the output as shown in the example
learnerData[learnerId].assignmentScores= {                  //using the spread operator in this case to get the the scores possible 
    ...learnerData[learnerId].assignmentScores,
    [assignmentId]: score
}

learnerData[learnerId] = {
    ...learnerData[learnerId],                               //using the spread operator in this case to cal. the total "sum" and total "possible" if late 
    sumScore: learnerData[learnerId].sumScore + score,
    sumPointsPossible: learnerData[learnerId].sumPointsPossible.pointsPossible
}

                    // Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
const submittedDate = new Date (submissions.submissions.submitted_at);
const lateAssignmentPenalty = submittedDate > dueDate ? (score *0.10) : 0; // this should do the math for deduction if late, tired to implement ternary operator
learnerData[learnerId].lateAssignmentPenalty += latePenalty;


//For the weighted averages and further manipulating of data 

function calculateWeightedAverge(learner) {
    
}

const result = Object.vaules(learnerData).map(learner => ({

    id: learner.id,
    avg: calcul



})








// Disregard this for now 
// function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
//     validateData(courseInfo, [assignmentGroups]);

//     const results = [];
//     const learnerData = {};

// }
//     //Maybe a for in would work here

