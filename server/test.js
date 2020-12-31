const router = require('express').Router();
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({ apiVersion: '2006-03-01' });

/////////////////////////--list deleted objects--/////////////////////////
const deletedObjects = () => {
  s3.listObjectVersions({ Bucket: 'lady-satori-blog' }, function (err, data) {
    if (err) console.log(err, err.stack);
  })
    .promise()
    .then((data) => {
      let deleted = data.Versions.map((v) => {
        if (v.IsLatest === false) {
          return v;
        }
      });
      return deleted;
    })
    .then((deleted) => {
      console.log(deleted);
    })
    .catch((err) => console.log(err));
};
// deletedObjects();

module.exports = router;
