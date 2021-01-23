import '../../styles/Lesson.css';
import { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import LessonResourcesNav from './Nav/LessonResourcesNav';

const Lesson = (props) => {
  const player = useRef();

  const resume = () => player.current.seekTo(29);

  useEffect(() => {
    player.current.showPreview();
  }, [props.lessonURL.thumbnail]);

  return (
    <div>
      <div className='react_player'>
        <ReactPlayer
          onStart={() => resume()}
          ref={player}
          className='bg-dark'
          width={'100%'}
          height={'100%'}
          controls
          url={props.lessonURL.video}
          light={props.lessonURL.thumbnail}
        />
      </div>
      <div className='lesson_resources'>
        <LessonResourcesNav intro={props.lessonURL.intro} active={props.lessonURL.active} resources={props.resources} />
      </div>
    </div>
  );
};

export default Lesson;
