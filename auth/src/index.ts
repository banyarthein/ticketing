import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());



app.get('/api/users/currentuser', (request, response)=> {
    response.send('Hey Thar Khit');
});

app.listen(3000, () =>{
  console.log('Listening on port 3000! yayyy!!!');
})
