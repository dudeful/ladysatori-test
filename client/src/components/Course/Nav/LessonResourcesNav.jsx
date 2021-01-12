const LessonResourcesNav = (props) => {
  return (
    <div>
      <ul class='nav nav-tabs' id='myTab' role='tablist'>
        <li class='nav-item' role='presentation'>
          <a
            class='nav-link active'
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
        <li class='nav-item' role='presentation'>
          <a
            class='nav-link'
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
        <li class='nav-item' role='presentation'>
          <a
            class='nav-link'
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
        <li class='nav-item' role='presentation'>
          <a
            class='nav-link'
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
      <div class='tab-content' id='myTabContent'>
        <div class='tab-pane fade show active' id='briefing' role='tabpanel' aria-labelledby='briefing-tab'>
          {props.resources.briefing}
        </div>
        <div class='tab-pane fade' id='questions' role='tabpanel' aria-labelledby='questions-tab'>
          {props.resources.questions.map((question) => {
            return (
              <div className='lesson_resources_questions'>
                <div className='lesson_resources_question'>{question.question}</div>
                <div className='lesson_resources_answer'>{question.answer}</div>
              </div>
            );
          })}
        </div>
        <div class='tab-pane fade' id='complements' role='tabpanel' aria-labelledby='complements-tab'>
          {props.resources.complements.map((complement) => {
            return (
              <div className='lesson_resources_complement'>
                <a href='#0'>{complement}</a>
              </div>
            );
          })}
        </div>
        <div class='tab-pane fade' id='about' role='tabpanel' aria-labelledby='about-tab'>
          <div className='lesson_resources_about'>{props.resources.about}</div>
        </div>
      </div>
    </div>
  );
};

export default LessonResourcesNav;
