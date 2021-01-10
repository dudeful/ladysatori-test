import ClassLessonsNav from './ClassLessonsNav';
import ClassModulesNav from './ClassModulesNav';

const VerticalNav = (props) => {
  const activeModule = (module) => {
    const elementId = document.getElementById(module);
    if (elementId) {
      Array.from(document.getElementsByClassName('module')).forEach((el) => el.classList.remove('active'));
      elementId.classList.toggle('active');
      elementId.classList.toggle('navArrowTransition');
    }
  };

  const activeLesson = (lesson) => {
    const elementId = document.getElementById(lesson);
    if (elementId) {
      Array.from(document.getElementsByClassName('lesson')).forEach((el) => el.classList.remove('active'));
      elementId.classList.toggle('active');
    }
    props.currentLesson(lesson);
  };

  const lessons = [
    'lesson_1',
    'lesson_2',
    'lesson_3',
    'lesson_4',
    'lesson_5',
    'lesson_6',
    'lesson_7',
    'lesson_8',
    'lesson_9',
    'lesson_10',
  ];

  return (
    <div className='navbar-expand-md'>
      <div className='collapse navbar-collapse' id='navbarVNavDropdown'>
        <div className='v-navbar'>
          <hr className='mt-0' />
          <nav className='nav flex-column' role='tablist'>
            {props.modules.map((module) => {
              return (
                <div key={module.id}>
                  <ClassModulesNav
                    module={module.id}
                    icon={module.icon}
                    activeModule={activeModule}
                    isActive={module.isActive}
                  />
                  <div className={'collapse ' + module.show} id={module.id + 1}>
                    <ClassLessonsNav activeLesson={activeLesson} lessons={lessons} />
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;
