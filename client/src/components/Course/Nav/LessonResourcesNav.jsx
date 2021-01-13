import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/light.css';
import Tippy from '@tippyjs/react';
import date from './DateCalculator';

const LessonResourcesNav = (props) => {
  return (
    <div>
      <ul className='nav nav-tabs' id='myTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link active'
            id='briefing-tab'
            data-toggle='tab'
            href='#briefing'
            role='tab'
            aria-controls='briefing'
            aria-selected='true'
          >
            Briefing
          </a>
        </li>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link'
            id='questions-tab'
            data-toggle='tab'
            href='#questions'
            role='tab'
            aria-controls='questions'
            aria-selected='false'
          >
            Q&amp;A
          </a>
        </li>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link'
            id='complements-tab'
            data-toggle='tab'
            href='#complements'
            role='tab'
            aria-controls='complements'
            aria-selected='false'
          >
            Complementos
          </a>
        </li>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link'
            id='about-tab'
            data-toggle='tab'
            href='#about'
            role='tab'
            aria-controls='about'
            aria-selected='false'
          >
            Sobre o Curso
          </a>
        </li>
      </ul>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade show active' id='briefing' role='tabpanel' aria-labelledby='briefing-tab'>
          <h5 className='text-muted'>Sobre esta aula</h5>
          {props.resources.briefing.slice(0, 500)}
          <br />
          {props.resources.briefing.slice(450, 1000)}
          <br />
          {props.resources.briefing.slice(700, 1200)}
          <br />
          {props.resources.briefing.slice(1200, 2000)}
          <br />
          {props.resources.briefing.slice(50, 500)}
          <br />
          {props.resources.briefing.slice(500, 1300)}
        </div>
        <div className='tab-pane fade' id='questions' role='tabpanel' aria-labelledby='questions-tab'>
          {props.resources.questions.map((question) => {
            setTimeout(() => {
              if (question.answer) {
                document.getElementById(question.id).classList.add('answered');
              }
            }, 1000);

            return (
              <div key={question.id} id={question.id} className='lesson_resources_questions row m-0 p-0'>
                <div className='lesson_resources_picture col-sm-1 col-2 p-0'>
                  <img src={question.user_picture} alt='...' />
                  <Tippy
                    disabled={question.answer ? false : true}
                    theme='light'
                    content={
                      <div className='lesson_resources_picture row p-2 m-0'>
                        <img className='col-2 p-0 m-0' src={question.answer ? question.answer.picture : ''} alt='...' />
                        <div className='col-10 ml-auto pl-2 text-dark'>
                          {question.answer ? question.answer.body : ''}
                        </div>
                      </div>
                    }
                  >
                    <div className='fas-icon'>
                      <i className='fas fa-comments'></i>
                    </div>
                  </Tippy>
                </div>
                <div className='col-sm-11 col-10 ml-auto pl-2'>
                  <div className='lesson_resources_question_title'>{question.question.title}</div>
                  <div className='lesson_resources_question_body'>{question.question.body}</div>
                  <br />
                  <div className='lesson_resources_details'>
                    <span className='text-info'>{question.user_name} &#xB7; </span>
                    <span className='text-muted'>{date(question.date)}</span>
                  </div>
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
        <div className='tab-pane fade' id='complements' role='tabpanel' aria-labelledby='complements-tab'>
          {props.resources.complements.map((complement) => {
            return (
              <div key={complement} className='lesson_resources_complement'>
                <a href='#0'>{complement}</a>
              </div>
            );
          })}
        </div>
        <div className='tab-pane fade' id='about' role='tabpanel' aria-labelledby='about-tab'>
          <div className='lesson_resources_about'>{props.resources.about}</div>
        </div>
      </div>
    </div>
  );
};

export default LessonResourcesNav;
