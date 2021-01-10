const ClassLessonsNav = (props) => {
  const random = Math.random();

  return (
    <div>
      <nav className='navLesson nav flex-column'>
        {props.lessons.map((lesson) => {
          return (
            <a
              onClick={() => props.activeLesson(lesson + random)}
              key={lesson}
              id={lesson + random}
              className={'nav-link lesson ' + props.isActive}
              href='#0'
            >
              {lesson}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default ClassLessonsNav;
