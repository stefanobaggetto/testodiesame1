/**
 * Created by fabio on 04/12/2017.
 * Here we only test for success cases and valid data
 */

const root = process.env.SERVER_URL || 'http://127.0.0.1:8080'
const fetch = require("node-fetch")
const assignmentsRoot = root+'/api/assignments'
const exampleAssignment_post_delete =  {
    "workerID": "w11",
    "taskID": "t11",
    "assignmentResult": "as11",
    "assignmentID": "11"
}

const exampleAssignment_getOne=  {
    "workerID": "w2",
    "taskID": "t2",
    "assignmentResult": "as2",
    "assignmentID": "2"
}

const exampleAssignment_put=  {
    "workerID": "w3",
    "taskID": "t3",
    "assignmentResult": "as3",
    "assignmentID": "3"
}

const exampleAssignment_put_ar=  {
    "assignmentResult": "as3",
}




// helper methods - you can put these  in a separate file if you have many tests file and want to reuse them

const postAssignment = function (newAssignment) {
    return fetch(assignmentsRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newAssignment)
    })
}

const putAssignment = function (assignmentID, assignmentResult) {
    //console.log(assignmentResult);
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(assignmentResult)
    })
}

const getOneAssignment = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}
const deleteAssignments = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }//,
    })
}



/*________TEST_____________*/

test('post', () => {
    return postAssignment(exampleAssignment_post_delete)
        .then(postResponse => {  return postResponse.json()})
        .then(postResponseJson => {
       
            expect(postResponseJson.assignmentID).toEqual(exampleAssignment_post_delete.assignmentID)
          });
});


test('getOneAssignment', () => {
    return getOneAssignment(exampleAssignment_getOne.assignmentID)
        .then(getOneResponse => {return getOneResponse.json()})
        .then(getOneResponseJson => {
            expect(getOneResponseJson[0].assignmentID).toEqual(exampleAssignment_getOne.assignmentID)
          });
});

test('delete by assignmentID', () => {
    return deleteAssignments(exampleAssignment_post_delete.assignmentID)
        .then(response => { expect(response.status).toBe(200) })
        //.catch(e => {console.log(e)})
});

test('put test', ()=>{
  return putAssignment(exampleAssignment_put.assignmentID, exampleAssignment_put_ar)
      .then(putResponse => {return putResponse.json()})
      .then(putResponseJson => {
          return getOneAssignment(exampleAssignment_put.assignmentID);
      })
      .then(getResponse => {return getResponse.json()})
      .then(getResponseJson => {
          expect(getResponseJson[0].assignmentResult).toEqual(exampleAssignment_put.assignmentResult)})
      //.catch(e => {console.log(e)})

});
