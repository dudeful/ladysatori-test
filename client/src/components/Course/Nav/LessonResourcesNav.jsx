import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/light.css';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import Tippy from '@tippyjs/react';
import date from './DateCalculator';

const LessonResourcesNav = (props) => {
  return (
    <div>
      <ul className='nav nav-tabs' id='myTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <a
            className={'nav-link active ' + props.intro}
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
            className={'nav-link ' + props.intro}
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
        <li className='nav-item dropdown' role='presentation'>
          <a
            className={'nav-link dropdown-toggle ' + props.intro}
            data-toggle='dropdown'
            href='#0'
            role='button'
            aria-haspopup='true'
            aria-expanded='false'
          >
            Complementos
          </a>
          <div className='dropdown-menu'>
            <a
              className='dropdown-item'
              id='complements-tab1'
              data-toggle='tab'
              href='#complements1'
              role='tab'
              aria-controls='complements1'
              aria-selected='false'
            >
              desta aula
            </a>
            <div className='dropdown-divider'></div>
            <a
              className='dropdown-item'
              id='complements-tab2'
              data-toggle='tab'
              href='#complements2'
              role='tab'
              aria-controls='complements2'
              aria-selected='false'
            >
              todos
            </a>
          </div>
        </li>
        <li className='nav-item' role='presentation'>
          <a
            className={'nav-link ' + props.active}
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
          {props.resources.briefing ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(draftToHtml(JSON.parse(props.resources.briefing.body)), {
                  ADD_TAGS: ['iframe'],
                }),
              }}
            />
          ) : (
            ''
          )}
        </div>
        <div className='tab-pane fade' id='questions' role='tabpanel' aria-labelledby='questions-tab'>
          {props.resources.questions && !props.intro ? (
            props.resources.questions.map((question) => {
              return (
                <div
                  key={question.id}
                  id={question.id}
                  className={'lesson_resources_questions row m-0 p-0 ' + (question.answer ? 'answered' : '')}
                >
                  <div className='lesson_resources_picture col-sm-1 col-2 p-0'>
                    <img src={question.user_picture} alt='...' />
                    <Tippy
                      disabled={question.answer ? false : true}
                      theme='light'
                      content={
                        <div className='lesson_resources_picture row p-2 m-0'>
                          <img
                            className='col-2 p-0 m-0'
                            src={question.answer ? question.answer.picture : ''}
                            alt='...'
                          />
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
            })
          ) : (
            <i className='text-info'>Seja o primeiro a perguntar &#x1F920;</i>
          )}
        </div>
        <div className='tab-pane fade' id='complements1' role='tabpanel' aria-labelledby='complements-tab1'>
          {props.resources.complements ? (
            props.resources.complements.body.map((complement) => {
              return (
                <div key={complement.title + complement.link} className='lesson_resources_complement'>
                  <a className='text-decoration-none text-info' href={complement.link} target='_blank' rel='noreferrer'>
                    <i className='fas fa-folder-open mr-2 text-muted'></i>
                    {complement.title}
                  </a>
                </div>
              );
            })
          ) : (
            <i className='text-muted'>
              Nenhum complemento foi adicionado a <b>esta aula</b> ainda
            </i>
          )}
        </div>
        <div className='tab-pane fade' id='complements2' role='tabpanel' aria-labelledby='complements-tab2'>
          {props.resources.complements_all ? (
            props.resources.complements_all.map((complements) => {
              return complements.body.map((complement) => {
                return (
                  <div key={complements.key + Math.random()}>
                    <a
                      className='text-decoration-none text-info'
                      href={complement.link}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='lesson_resources_complement'>
                        <i className='fas fa-folder-open mr-2 text-muted'></i>
                        <span className='text-dark'>{'Módulo ' + complements.key.split('/')[2].slice(-1)} - </span>
                        <span className='text-muted'>{complements.key.split('/')[5].replaceAll('_', ' ')}:</span>{' '}
                        {complement.title}
                      </div>
                    </a>
                  </div>
                );
              });
            })
          ) : (
            <i className='text-muted'>
              Nenhum complemento foi adicionado <b>ao curso</b> ainda
            </i>
          )}
        </div>
        <div className='tab-pane fade' id='about' role='tabpanel' aria-labelledby='about-tab'>
          <div className='lesson_resources_about'>{props.resources.about}</div>
        </div>
      </div>
    </div>
  );
};

export default LessonResourcesNav;
