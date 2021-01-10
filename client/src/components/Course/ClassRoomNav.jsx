import '../../styles/ClassRoomNav.css';
import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';

const ClassRoomNav = () => {
  return (
    <div>
      <HorizontalNav />
      <VerticalNav
        modules={[
          { id: 'introdução', icon: '/images/ClassRoom/hideNavArrow.png', isActive: 'active' },
          { id: 'module_1', icon: '/images/ClassRoom/hideNavArrow.png' },
          { id: 'module_2', icon: '/images/ClassRoom/hideNavArrow.png' },
          { id: 'module_3', icon: '/images/ClassRoom/hideNavArrow.png' },
          { id: 'module_4', icon: '/images/ClassRoom/hideNavArrow.png' },
          { id: 'module_5', icon: '/images/ClassRoom/hideNavArrow.png' },
          { id: 'conclusão', icon: '/images/ClassRoom/hideNavArrow.png' },
        ]}
      />
    </div>
  );
};

export default ClassRoomNav;
