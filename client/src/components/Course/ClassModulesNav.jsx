const ClassModulesNav = (props) => {
  return (
    <div>
      <a
        onClick={() => props.activeModule(props.module)}
        className={'nav-link module ' + props.isActive}
        href='#0'
        data-toggle='collapse'
        data-target={'#' + props.module + 1}
        aria-controls={props.module + 1}
        aria-expanded='false'
        role='tab'
        aria-selected='true'
        id={props.module}
      >
        <img className='dropdownNavArrow navArrowTransition' src={props.icon} alt='...' />
        <span className='font-italic'>{props.module}</span>
      </a>
    </div>
  );
};

export default ClassModulesNav;
