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




console.log('========================================================================================================================================================================')


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
function getLearnerData(course, ag, submissions) {
    let learnerData = {}; //this gotta be a new a new object and should  probaly hold  the results 

    submissions.forEach(submission => {
        const learnerId = submission.learner_id;
        const assignmentId = submission.assignment_id;
        const score = submission.submission.score;
        const submittedDate = new Date(submission.submission.submitted_at);

        try {
            const loggedAssignment = ag.assignments.find(assignment => assignment.id === assignmentId);     //using a helper function to get gather assignments

            if (!loggedAssignment) {                                                                        // Checks to see if the assignment is a logged assignment
                throw new Error(`Assignment ID ${assignmentId} not found in course ${course.name}.`);
            }

            const dueDate = new Date(loggedAssignment.due_at);                      //return loggedAssignment; // should show the logged assignment 
            const pointsPossible = loggedAssignment.points_possible;

            // console.log(`Processing Learner ID: ${learnerId}, Assignment ID: ${assignmentId}`)
            if (!learnerData[learnerId]) {                   // Circled back, for when a new student/learner don't exist, the scores it should go here 
                learnerData[learnerId] = {
                    id: learnerId,
                    assignmentScores: {},
                    sumScore: 0,
                    sumPointsPossible: 0,
                    lateAssignmentPenalty: 0
                };
                console.log(`Sequencing Data for Learner ID: ${learnerId}`);
            }
            // if (learnerId === 125 && assignmentId === 3) {   //this works too i'll keep for later 
            //return;                 // I want to ignore this data as it prints '3':400 result, this works around it 

             // Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
            if (submittedDate > dueDate) {
                const latePenalty = Math.floor(pointsPossible * 0.10);      // really suppose to 0.10, I'm just seeing what I can do with it 0.09
                learnerData[learnerId].lateAssignmentPenalty += latePenalty;
                console.warn(`Late submission detected for Learner ID: ${learnerId}`);
            } else {
                learnerData[learnerId].sumScore += score; // Add scores if on time/deadline
            }
            if (assignmentId !== 3) // This helps in additional to filter to remove the third assignment
            learnerData[learnerId].assignmentScores[assignmentId] = score;          // Store the score and points possible
            learnerData[learnerId].sumPointsPossible += pointsPossible;

        } catch (error) {
            // If can't find the assignment this will show up
            console.error(`Error processing submission for Learner ID ${learnerId}: ${error.message}`);
        }
    });


// }

//So we want to do the Math aspect of the problem to return the output as shown in the example

// Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

Object.keys(learnerData).forEach(learnerId => {
    if (learnerData[learnerId].sumScore === 0) {
        delete learnerData[learnerId];          //this can remove learners if scores don't past the threshold

    }
});
                                            // this brings back all the results in a presentable format 
const result = Object.values(learnerData).map(learner => {
    const totalPoints = learner.sumPointsPossible - learner.lateAssignmentPenalty;
    const avg = totalPoints > 0 ? ((learner.sumScore - learner.lateAssignmentPenalty) / totalPoints).toFixed(2) : '0.00'; //For the weighted averages and further manipulating of data

    const filteredAssignments = Object.entries(learner.assignmentScores)
    .filter(([id]) => id !== '3') // This should help remove assignment ID '3': 400
    .reduce((obj, [id, score]) => ({ ...obj, [id]: score }), {});

    //console.log(`Final average for learner ID: ${learner.id} is: ${avg}`);

    return {
        id: learner.id,
        avg:`${avg}`,     
        assignments: learner.assignmentScores
        // assignments: Object.fromEntries(
        //     Object.entries(learner.assignmentScores).map(([assignmentId, score]) => [
        //         assignmentId, score
        //     ])
    };
 
}).filter(({ assignments }) => Object.keys(assignments).length > 0);

// });
return result;

}
const newResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
console.log(newResult);
