const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  s3.listObjectsV2({ Bucket: 'lady-satori-course', Prefix: 'videos/' }, (err, data) => {
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
      let videos = keys.map((objectKey) => {
        return {
          module: objectKey.split('/').slice(-2)[0],
          lesson: objectKey.split('/').slice(-1)[0],
          video: 'https://d1or0rfi63vb4e.cloudfront.net/' + objectKey,
        };
      });

      res.json({ videos });
      // console.log(videos);
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

module.exports = router;
