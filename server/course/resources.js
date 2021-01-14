const express = require('express');
const router = express.Router();
var S3 = require('aws-sdk/clients/s3');
var s3 = new S3({ apiVersion: '2006-03-01' });

router.route('/questions').get((req, res) => {
  s3.listObjectsV2({ Bucket: 'lady-satori-course', Prefix: req.body.prefix }, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.json({ err });
    }
  })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return key.Key;
      });

      return keys;
    })
    .then((keys) => {
      let questions = keys.map((objectKey) => {
        return 'https://d1or0rfi63vb4e.cloudfront.net/' + objectKey;
      });

      res.json({ questions });
      console.log(questions);
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

router.route('/complements').get((req, res) => {
  s3.listObjectsV2({ Bucket: 'lady-satori-course', Prefix: 'resources/complements/' }, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.json({ err });
    }
  })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return key.Key;
      });

      return keys;
    })
    .then((keys) => {
      let complements = keys.map((objectKey) => {
        return {
          module: objectKey.split('/').slice(2, 3)[0],
          lesson: objectKey.split('/').slice(3, 4)[0],
          complement: 'https://d1or0rfi63vb4e.cloudfront.net/' + objectKey,
        };
      });

      res.json({ complements });
      console.log(complements);
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

router.route('/about').get((req, res) => {
  s3.getObject({ Bucket: 'lady-satori-course', Key: 'about' }, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.json({ err });
    }
  })
    .promise()
    .then((data) => res.json({ data }));
});

module.exports = router;
