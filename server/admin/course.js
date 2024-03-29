const express = require('express');
const router = express.Router();
const CF = require('aws-sdk/clients/cloudfront');
const cfSigner = new CF.Signer(process.env.AWS_CLOUDFRONT_KEY_PAIR_ID, process.env.AWS_CLOUDFRONT_PRIVATE_KEY);

router.route('/signCookie').get((req, res) => {
  const cfURL = 'https://d15zoa5q4bilog.cloudfront.net/';
  const objectKey = 'C35.jpg';
  const expiration = Math.floor((new Date().getTime() + 60 * 60 * 1000) / 1000); // 1 hour

  const signedCookie = (cfURL, objectKey) => {
    const options = {
      url: cfURL + objectKey,
      expires: expiration,
    };

    return new Promise((resolve) => {
      let url = cfSigner.getSignedCookie(options);
      resolve(url);
    });
  };

  signedCookie(cfURL, objectKey)
    .then((cookies) => {
      res.cookie('CloudFront-Key-Pair-Id', cookies['CloudFront-Key-Pair-Id'], {
        // domain: 'd15zoa5q4bilog.cloudfront.net',
        path: '/',
        // sameSite: 'none',
        // secure,
        httpOnly: true,
      });

      res.cookie('CloudFront-Expires', cookies['CloudFront-Expires'], {
        // domain: 'd15zoa5q4bilog.cloudfront.net',
        path: '/',
        // sameSite: 'none',
        // secure,
        httpOnly: true,
      });

      res.cookie('CloudFront-Signature', cookies['CloudFront-Signature'], {
        // domain: 'd15zoa5q4bilog.cloudfront.net',
        path: '/',
        // sameSite: 'none',
        // secure,
        httpOnly: true,
      });

      return cookies;
    })
    .then((cookies) => {
      res.json(cookies);
    })
    .catch((err) => res.json({ error: true, err }));
});

router.route('/signURL').get((req, res) => {
  const cfURL = 'https://d15zoa5q4bilog.cloudfront.net/';
  const objectKey = 'C35.jpg';
  const expiration = Math.floor((new Date().getTime() + 60 * 60 * 10000) / 1000);

  const signedURL = (cfURL, objectKey) => {
    const options = {
      url: cfURL + objectKey,
      expires: expiration, // 1 hour
    };

    return new Promise((resolve) => {
      let url = cfSigner.getSignedUrl(options);
      resolve(url);
    });
  };

  signedURL(cfURL, objectKey)
    .then((url) => {
      res.json(url);
    })
    .catch((err) => res.json({ error: true, err }));
});

module.exports = router;
