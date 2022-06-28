var express = require('express'),
  app = express(),
  cors = require('cors'),
  fs = require('fs'),
  bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**********
 * ROUTES *
 **********/

app.get('/api/fetch-blogs', async function create(req, res) {
  fs.readFile('blogs.json', (err, data) => {
    if (err) throw err;
    let blogs = JSON.parse(data);

    blogs = blogs.slice(0, 5);

    res.send({ blogs });
  });
});

app.post('/api/create-new-blog', function create(req, res) {
  const param = req.body;
  fs.readFile('blogs.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      obj.unshift(param);
      json = JSON.stringify(obj);
      fs.writeFile('blogs.json', json, (err) => {
        if (err) {
          res.send({ status: false, msg: 'Something went wrong' });
        } else {
          res.send({ status: true, msg: 'Successfully created new blog.' });
        }
      }); // write it back
    }
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3001
app.listen(3001, function () {
  console.log('Server running on http://localhost:3001');
});
