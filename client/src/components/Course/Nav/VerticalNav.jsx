import ClassModulesNav from './ClassModulesNav';
import ClassLessonsNav from './ClassLessonsNav';

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

  return (
    <div className='class_room_nav'>
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
                      <ClassLessonsNav activeLesson={activeLesson} lessons={props.lessons} />
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;
