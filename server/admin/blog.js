const router = require('express').Router();
var S3 = require('aws-sdk/clients/s3');
var s3 = new S3({ apiVersion: '2006-03-01' });
const CF = require('aws-sdk/clients/cloudfront');
const cloudFront = new CF();
const compressor = require('./compressor');
const crypto = require('crypto');
// const postID = crypto.randomBytes(2).toString('hex');

router.route('/').get((req, res) => {
  s3.listObjects({ Bucket: buckets.blog.name, Prefix: 'thumbnails/' }, (err, data) => {
    if (err) console.log(err, err.stack);
  })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return key.Key;
      });

      keys.sort((a, b) => b.split('/').slice(-1)[0] - a.split('/').slice(-1)[0]);

      return keys;
    })
    .then((keys) => {
      let urls = keys.map((objectKey) => {
        return 'https://dizbkwjzdmgp2.cloudfront.net/' + objectKey;
      });

      res.json({ urls });
    })
    .catch((err) => {
      res.json({ err });
      if (err) throw err;
    });
});

router.route('/new-post').post((req, res) => {
  //just setting the date format
  const date = new Date().toLocaleString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' });

  const fullDate = {
    day: new Date().getDate(),
    month: new Date().toLocaleString('pt-BT', { month: 'long' }),
    year: new Date().getFullYear(),
  };

  //calculating the readtime
  let i = 0;
  const bodyBlocks = req.body.body.blocks;
  const readTime = (totalLength, currentLength) => {
    return totalLength + currentLength.split(/\S+/g).length;
  };
  bodyBlocks.map((block) => {
    return (i = i + [block.text].reduce(readTime, -1));
  });
  const roundReadTime = Math.round(i / 130);

  //creating the post primary key
  const s3ObjectKey = 'posts/' + crypto.randomBytes(2).toString('hex') + '/' + Date.now();

  const newPost = {
    key: s3ObjectKey,
    coverImg: 'data:image/png;base64,' + Buffer.from(req.body.coverImg, 'binary').toString('base64'),
    tag: req.body.tag,
    title: req.body.title,
    body: JSON.stringify(req.body.body),
    date: date,
    readTime: roundReadTime,
  };

  const newThumbnail = {
    key: 'thumbnails/' + s3ObjectKey,
    coverImg: undefined,
    tag: req.body.tag,
    title: req.body.title,
    body: undefined,
    date: date,
    readTime: roundReadTime,
  };

  const params = {
    Body: Buffer.from(JSON.stringify(newPost), 'utf-8'),
    Bucket: buckets.blog.name,
    Key: s3ObjectKey,
  };

  s3.putObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
  })
    .promise()
    .then(() => {
      console.log('hello from "putObject"');
      compressor
        .compressThumbnail(req.body.coverImg)
        .then((res) => {
          console.log('Compressed File Size: ' + Math.round(res.length / 1024));
          newThumbnail.coverImg = 'data:image/png;base64,' + res;
        })
        .then(() => {
          if (bodyBlocks.length >= 2) {
            newThumbnail.body = (bodyBlocks[0].text + ' ' + bodyBlocks[1].text).slice(0, 300);
          } else {
            newThumbnail.body = bodyBlocks[0].text.slice(0, 300);
          }
        })
        .then(() => {
          const thumbnailParams = {
            Body: Buffer.from(JSON.stringify(newThumbnail), 'utf-8'),
            Bucket: buckets.blog.name,
            Key: 'thumbnails/' + s3ObjectKey,
          };
          return thumbnailParams;
        })
        .then((thumbnailParams) => {
          s3.putObject(thumbnailParams, (err, data) => {
            if (err) console.log(err, err.stack);
          })
            .promise()
            .then(() => {
              res.json({
                console: 'Artigo Publicado!',
                key: newPost.key,
              });
            });
        });
    })
    .catch((err) => res.json({ error: true, err }));
});

router.route('/update-post/posts/:id/:timestamp').post((req, res) => {
  //just setting the date format

  const date = new Date().toLocaleString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' });

  let i = 0;
  const bodyBlocks = req.body.body.blocks;
  const readTime = (totalLength, currentLength) => {
    return totalLength + currentLength.split(/\S+/g).length;
  };
  bodyBlocks.map((block) => {
    return (i = i + [block.text].reduce(readTime, -1));
  });
  const roundReadTime = Math.round(i / 130);

  const updatedPost = {
    key: req.body.key,
    coverImg: 'data:image/png;base64,' + Buffer.from(req.body.coverImg, 'binary').toString('base64'),
    tag: req.body.tag,
    title: req.body.title,
    body: JSON.stringify(req.body.body),
    date: req.body.date,
    updateDate: req.body.updateDate,
    readTime: roundReadTime,
  };

  const updatedThumbnail = {
    key: 'thumbnails/' + req.body.key,
    coverImg: undefined,
    tag: req.body.tag,
    title: req.body.title,
    body: undefined,
    date: req.body.date,
    updateDate: date,
    readTime: roundReadTime,
  };

  const params = {
    Body: Buffer.from(JSON.stringify(updatedPost), 'utf-8'),
    Bucket: buckets.blog.name,
    Key: updatedPost.key,
  };

  s3.putObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    //   else console.log(data);
  })
    .promise()
    .then(() => {
      const params = {
        DistributionId: 'E2O0NTPYA9ZBTG',
        InvalidationBatch: {
          CallerReference: Date.now().toString(),
          Paths: {
            Quantity: 2,
            Items: ['/' + req.body.key, '/thumbnails/' + req.body.key],
          },
        },
      };

      cloudFront.createInvalidation(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Data: ' + JSON.stringify(data));
      });
    })
    .then(() => {
      compressor
        .compressThumbnail(req.body.coverImg)
        .then((res) => {
          console.log('Compressed File Size: ' + Math.round(res.length / 1024));
          updatedThumbnail.coverImg = 'data:image/png;base64,' + res;
        })
        .then(() => {
          if (bodyBlocks.length >= 2) {
            updatedThumbnail.body = (bodyBlocks[0].text + ' ' + bodyBlocks[1].text).slice(0, 300);
          } else {
            updatedThumbnail.body = bodyBlocks[0].text.slice(0, 300);
          }
        })
        .then(() => {
          const thumbnailParams = {
            Body: Buffer.from(JSON.stringify(updatedThumbnail), 'utf-8'),
            Bucket: buckets.blog.name,
            Key: 'thumbnails/' + req.body.key,
          };
          return thumbnailParams;
        })
        .then((thumbnailParams) => {
          s3.putObject(thumbnailParams, (err, data) => {
            if (err) console.log(err, err.stack);
          })
            .promise()
            .then(() => {
              res.json({
                console: 'Artigo Publicado!',
                key: updatedPost.key,
              });
            });
        });
    })
    .catch((err) => res.json({ error: true, err }));
});

router.route('/delete-post').delete((req, res) => {
  const params = {
    Bucket: buckets.blog.name,
    Delete: {
      Objects: [
        {
          Key: req.body.key,
        },
        {
          Key: 'thumbnails/' + req.body.key,
        },
      ],
      Quiet: false,
    },
  };

  s3.deleteObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  })
    .promise()
    .then(() => {
      const cfParams = {
        DistributionId: 'E2O0NTPYA9ZBTG',
        InvalidationBatch: {
          CallerReference: Date.now().toString(),
          Paths: {
            Quantity: 2,
            Items: ['/' + req.body.key, '/thumbnails/' + req.body.key],
          },
        },
      };

      return cfParams;
    })
    .then((cfParams) => {
      cloudFront.createInvalidation(cfParams, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Data: ' + JSON.stringify(data));
      });
    })
    .then((data) => res.send({ deleted: true, data }))
    .catch((err) => {
      res.send({ error: true, err });
    });
});

router.route('/deleted-posts').get((req, res) => {
  s3.listObjectVersions(thumbParams, function (err, data) {
    if (err) console.log(err, err.stack);
    // else console.log(data);
  })
    .promise()
    .then((res) => {
      let markers = res.DeleteMarkers.map((marker) => {
        let objParam = { Key: marker.Key, VersionId: marker.VersionId };
        return objParam;
      });

      return markers;
    })
    .then((markers) => {
      res.send({ markers });
    });
});

router.route('/recover-post').post((req, res) => {
  const postParams = {
    Bucket: buckets.blog.name,
    Prefix: 'posts/2020/dezembro/1607917890785@pellentesque-in-ipsum-id-orci-porta-dapibus',
  };

  const thumbParams = {
    Bucket: buckets.blog.name,
    Prefix: 'thumbnails/posts/2020/dezembro/1607917890785@pellentesque-in-ipsum-id-orci-porta-dapibus',
  };

  s3.listObjectVersions(thumbParams, function (err, data) {
    if (err) console.log(err, err.stack);
    // else console.log(data);
  })
    .promise()
    .then((res) => {
      let markers = res.DeleteMarkers.map((marker) => {
        let objParam = { Key: marker.Key, VersionId: marker.VersionId };
        return objParam;
      });

      return markers;
    })
    .then((markers) => {
      const params = {
        Bucket: buckets.blog.name,
        Delete: {
          Objects: markers,
          Quiet: false,
        },
      };
      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
    })
    .then(() => {
      s3.listObjectVersions(postParams, function (err, data) {
        if (err) console.log(err, err.stack);
        // else console.log(data);
      })
        .promise()
        .then((res) => {
          let markers = res.DeleteMarkers.map((marker) => {
            let objParam = { Key: marker.Key, VersionId: marker.VersionId };
            return objParam;
          });

          return markers;
        })
        .then((markers) => {
          const params = {
            Bucket: buckets.blog.name,
            Delete: {
              Objects: markers,
              Quiet: false,
            },
          };
          s3.deleteObjects(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
          });
        });
    })
    .catch((err) => res.send({ error: true, err }));
});

module.exports = router;
