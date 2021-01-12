import { useState } from 'react';
import '../../styles/ClassRoom.css';
import ClassRoomNav from './Nav/ClassRoomNav';
import Lesson from './Lesson';

const modules = [
  {
    id: 'introdução',
    icon: '/images/ClassRoom/hideNavArrow.png',
    isActive: 'active navArrowTransition',
    show: 'show',
  },
  { id: 'module_1', icon: '/images/ClassRoom/hideNavArrow.png' },
  { id: 'module_2', icon: '/images/ClassRoom/hideNavArrow.png' },
  { id: 'module_3', icon: '/images/ClassRoom/hideNavArrow.png' },
  { id: 'module_4', icon: '/images/ClassRoom/hideNavArrow.png' },
  { id: 'module_5', icon: '/images/ClassRoom/hideNavArrow.png' },
  { id: 'conclusão', icon: '/images/ClassRoom/hideNavArrow.png' },
];

const youtubeURL = [
  'https://www.youtube.com/watch?v=-5zeJyQ31rM',
  'https://www.youtube.com/watch?v=btAbU1sPqIM',
  'https://www.youtube.com/watch?v=6GQiMThft7I',
  'https://www.youtube.com/watch?v=mx6MzHYzEfY',
  'https://www.youtube.com/watch?v=CQ_eDE0OMds',
  'https://www.youtube.com/watch?v=avdiI_iYPXE',
  'https://www.youtube.com/watch?v=M0pOMVCUY50',
  'https://www.youtube.com/watch?v=gISE5ublbQA',
  'https://www.youtube.com/watch?v=zIoqlLU4E74',
  'https://www.youtube.com/watch?v=FDVrM929s70',
  'https://www.youtube.com/watch?v=JPGMKXUXiI8',
  'https://www.youtube.com/watch?v=6Dh-RL__uN4',
  'https://www.youtube.com/watch?v=HTXTVfBCeSY',
  'https://www.youtube.com/watch?v=RwooaLFDOd0',
  'https://www.youtube.com/watch?v=mdr2eLAAPuw',
  'https://www.youtube.com/watch?v=fn3KWM1kuAw',
  'https://www.youtube.com/watch?v=k1W5wAGzCpU',
  'https://www.youtube.com/watch?v=_8wwAwEDeGo',
  'https://www.youtube.com/watch?v=pKO9UjSeLew',
  'https://www.youtube.com/watch?v=KMX_FuOLoCI',
  'https://www.youtube.com/watch?v=2wOuUKpevdo',
  'https://www.youtube.com/watch?v=zHL9GP_B30E',
  'https://www.youtube.com/watch?v=lsL9ycdynQk',
  'https://www.youtube.com/watch?v=orad8gIfCiY',
  'https://www.youtube.com/watch?v=TfXbzbJQHuw',
  'https://www.youtube.com/watch?v=pY8VDYTFb70',
  'https://www.youtube.com/watch?v=dbzSSb3HCaU',
  'https://www.youtube.com/watch?v=TJnDohGSg_4',
  'https://www.youtube.com/watch?v=hE0Y0Us4h84',
  'https://www.youtube.com/watch?v=GltlJO56S1g',
  'https://www.youtube.com/watch?v=JG6x4MHdTWM',
];

const lessonResources = {
  briefing:
    'Ea fugiat deserunt occaecat aute ipsum non. Amet aliquip ea cupidatat ut magna exercitation sint elit minim non ex nisi amet dolore. Veniam ipsum ullamco cupidatat consectetur nostrud voluptate incididunt tempor deserunt deserunt ea. Veniam nulla duis aliquip laborum incididunt in. Veniam aute amet dolor dolor esse esse ullamco elit. Ipsum non mollit commodo nisi exercitation mollit fugiat. Laboris cupidatat ea Lorem aliqua dolore. Veniam nulla anim aute eiusmod tempor ex. Quis ad magna do officia quis aliquip ex incididunt reprehenderit officia voluptate ut. Elit laboris officia aliqua cillum duis. Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore. Eiusmod exercitation consequat ad id adipisicing nostrud laboris id veniam culpa. Velit officia nostrud anim id qui esse quis aliquip. Amet ipsum minim et est. In aliqua et occaecat nostrud occaecat veniam officia pariatur. Deserunt quis cillum aliqua labore pariatur elit sint irure. Dolore deserunt in quis nulla voluptate. Ullamco minim anim quis laboris sit sint laborum. Nulla nostrud ea ipsum occaecat esse pariatur dolore irure sint culpa est anim. Ipsum nostrud consequat culpa nulla labore ipsum aute. Nostrud sunt laboris amet proident incididunt fugiat irure consequat reprehenderit ipsum commodo aute. In id quis occaecat labore ex est duis et.',
  questions: [
    {
      question: 'Aliquip laborum incididunt in?',
      answer:
        'Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore.',
    },
    {
      question: 'Aliquip laborum incididunt in?',
      answer:
        'Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore.',
    },
    {
      question: 'Aliquip laborum incididunt in?',
      answer:
        'Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore.',
    },
    {
      question: 'Aliquip laborum incididunt in?',
      answer:
        'Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore.',
    },
    {
      question: 'Aliquip laborum incididunt in?',
      answer:
        'Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore.',
    },
    {
      question: 'Aliquip laborum incididunt in?',
      answer:
        'Velit ex aute sint mollit quis adipisicing sunt reprehenderit. Eu elit irure dolor in ut fugiat aliquip dolore.',
    },
  ],
  complements: ['link_1', 'link_2', 'link_3', 'link_4', 'link_5', 'link_6'],
  about:
    'Ipsum amet mollit occaecat ex deserunt eu aute laborum culpa voluptate do. Ut eiusmod mollit consequat elit cillum nostrud. Mollit consequat dolore aliquip et cillum et ea dolor in consectetur. Eu occaecat cupidatat eu qui eu adipisicing tempor id dolore. Do laboris id culpa irure fugiat aliquip ullamco dolore id. Nisi amet reprehenderit laboris duis laboris pariatur consequat. Mollit do est et aute cupidatat veniam eu eiusmod quis reprehenderit aliquip eiusmod proident. Fugiat aliqua nisi duis cillum id consectetur veniam mollit cupidatat minim adipisicing voluptate nisi commodo. Occaecat et id sit ea cupidatat ad veniam nostrud. Aute amet et aliqua eu culpa id cupidatat tempor excepteur cillum qui officia id.',
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

const ClassRoom = () => {
  const [lessonURL, setLessonURL] = useState('https://www.youtube.com/watch?v=JG6x4MHdTWM');
  const [resources, setResources] = useState(lessonResources);

  const currentLesson = (lesson) => {
    console.log(lesson);
    const random = Math.floor(Math.random() * 32);
    setLessonURL(youtubeURL[random]);
    setResources(lessonResources);
  };

  return (
    <div>
      <ClassRoomNav lessons={lessons} currentLesson={currentLesson} modules={modules} />
      <div className='course_body'>
        <Lesson lessonURL={lessonURL} resources={resources} />
      </div>
    </div>
  );
};

export default ClassRoom;
