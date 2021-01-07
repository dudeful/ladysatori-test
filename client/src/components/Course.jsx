import '../styles/Course.css';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Axios from 'axios';

const Course = () => {
  const classURL = 'https://www.youtube.com/watch?v=XXvuUp-KY5g';

  const [cookies, setCookies] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:5000/course/signURL')
      .then((res) => {
        setCookies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(cookies);

  return (
    <div className='course_body'>
      <div className='react_player'>
        <ReactPlayer controls light={true} url={classURL} />
      </div>
    </div>
  );
};

export default Course;
