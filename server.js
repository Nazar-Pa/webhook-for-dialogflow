const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
var request = require('request');

app.listen(process.env.PORT || 1000);




app.get('/', async (req, res) => {
    var steps = [];
    try {
        await axios.post('https://www.googleapis.com/oauth2/v4/token', {
            grant_type: 'refresh_token',
            refresh_token: '1//03Ma10PgtC_wPCgYIARAAGAMSNwF-L9Ir13xUM5G0pPDWs0CAswlu26bhZ58oBolEo-pJoYjZ_hL8Fjz9asPeHw-JqYQ9UJmOrV4',
            client_id: '310819386881-88t831k9e1lemvqu8r7vgu0em6ak7nrk.apps.googleusercontent.com',
            client_secret: 'isUWLFS7BSdQDu-tG_lazm3K'

        }).then(async (res) => {
            console.log(res.data.access_token);
            var start = new Date();
            start.setHours(0, 0, 0, 0);
            start.setDate(start.getDate() - 1);
            //console.log(start.getTime());

            var end = new Date();
            end.setHours(23, 59, 59, 999);
            end.setDate(end.getDate() - 1);
            //console.log(end.getTime());

            data = {
                "aggregateBy": [{
                    "dataTypeName": "com.google.step_count.delta",
                    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }],
                "bucketByTime": { "durationMillis": 86400000 },
                "startTimeMillis": start.getTime(),
                "endTimeMillis": end.getTime()
            }

            await axios({
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + res.data.access_token
                },
                'Content-Type': 'application/json',
                url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
                data: {
                    aggregateBy: [{
                        dataTypeName: "com.google.step_count.delta",
                        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
                    }
                    ],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: 1593640800000,
                    endTimeMillis: 1593727199999,
                },
            }).then((response) => {
                steps = response.data.bucket[0].dataset[0].point[0].value[0].intVal;
                console.log("Response is: ", response.data.bucket[0].dataset[0].point[0].value[0].intVal)
                //res.send((`${JSON.stringify(steps)}`));

            }).catch((err) => console.log(err))



        }).catch((err) => console.log(err))
    }
    catch{
        res.send('error');
    }
    res.send((`${JSON.stringify(steps)}`));
})








// app.get('/', async (req, res) => {
//     try {

//         await axios.post('https://www.googleapis.com/oauth2/v4/token', {
//             grant_type: 'refresh_token',
//             refresh_token: '1//03Ma10PgtC_wPCgYIARAAGAMSNwF-L9Ir13xUM5G0pPDWs0CAswlu26bhZ58oBolEo-pJoYjZ_hL8Fjz9asPeHw-JqYQ9UJmOrV4',
//             client_id: '310819386881-88t831k9e1lemvqu8r7vgu0em6ak7nrk.apps.googleusercontent.com',
//             client_secret: 'isUWLFS7BSdQDu-tG_lazm3K'

//         }).then((res) => {

//             var start = new Date();
//             start.setHours(0, 0, 0, 0);
//             start.setDate(start.getDate() - 1);
//             //console.log(start.getTime());

//             var end = new Date();
//             end.setHours(23, 59, 59, 999);
//             end.setDate(end.getDate() - 1);
//             //console.log(end.getTime());

//             data = {
//                 "aggregateBy": [{
//                     "dataTypeName": "com.google.step_count.delta",
//                     "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
//                 }],
//                 "bucketByTime": { "durationMillis": 86400000 },
//                 "startTimeMillis": start.getTime(),
//                 "endTimeMillis": end.getTime()
//             }

//             var options = {
//                 method: 'POST',
//                 body: data,
//                 json: true,
//                 url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
//                 headers: {
//                     'Authorization': 'Bearer ' + res.data.access_token
//                 },

//             };

//             async function callback(error, response, body) {
//                 //console.log(error)
//                 //console.log(response)
//                 var array = [];
//                 if (!error && response.statusCode == 200) {

//                     var stepAmount = body.bucket[0].dataset[0].point[0].value[0].intVal;
//                     array = stepArray.push(`${JSON.stringify(stepAmount)}`);
//                     console.log(stepArray);
//                     console.log(body.bucket[0].dataset[0].point[0].value[0].intVal);


//                 }
//             }

//             request(options, callback);
//             //access_token = res.data.access_token
//             //console.log(res.data.access_token)
//         })
//             .catch((err) => console.log(err))
//     }
//     catch {
//         res.send('error');
//     }
//     console.log("I got: ", array)
//     //res.sendStatus(stepAmount);
// });