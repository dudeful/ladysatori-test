import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header(props) {
  return (
    <div className='header'>
      <nav className='navbar navbar-expand-md navbar-light'>
        <Link to={'/'} className='navbar-brand'>
          lady Satori
        </Link>
        <button
          className='navbar-toggler border-0'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <img className='navbar-toggler-icon' src='/images/ClassRoom/hamburguer-menu.png' alt='...' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav ml-auto'>
            <li className={props.current === 'home' ? 'nav-item active' : 'nav-item'}>
              <Link to={'/'} className='nav-link'>
                Home
              </Link>
            </li>
            <li className={props.current === 'aulas' ? 'nav-item active' : 'nav-item'}>
              <Link to={'/yoga-class'} className='nav-link'>
                Aulas de Yoga{' '}
              </Link>
            </li>
            <li className={props.current === 'blog' ? 'nav-item active' : 'nav-item'}>
              <Link to={'/blog'} className='nav-link'>
                Blog{' '}
              </Link>
            </li>
            <li className={props.current === 'sobre' ? 'nav-item active' : 'nav-item'}>
              <Link to={'/sobre'} className='nav-link'>
                Sobre{' '}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
