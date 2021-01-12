import '../../styles/Lesson.css';
import ReactPlayer from 'react-player';
import LessonResourcesNav from './Nav/LessonResourcesNav';

const Lesson = (props) => {
  return (
    <div>
      <div className='react_player'>
        <ReactPlayer width={'100%'} height={'100%'} controls url={props.lessonURL} />
      </div>
      <div className='lesson_resources'>
        <LessonResourcesNav resources={props.resources} />
      </div>
    </div>
  );
};

export default Lesson;
