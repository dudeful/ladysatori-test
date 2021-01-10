import '../../styles/VideoClass.css';
// import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
// import Axios from 'axios';

const VideoClass = () => {
  const classURL = 'https://d1or0rfi63vb4e.cloudfront.net/test2/mvi_0201/mvi_0201.m3u8';

  // const [url, setUrl] = useState('');
  // const [cookies, setCookies] = useState(false);

  // useEffect(() => {
  //   Axios.get('http://localhost:5000/course/signCookie', { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //       // setCookies(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className='react_player'>
      <ReactPlayer controls light={true} url={classURL} />
    </div>
  );
};

export default VideoClass;
