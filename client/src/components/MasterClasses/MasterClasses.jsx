import Countdown from '../Countdown';

const MasterClasses = () => {
  return (
    <div className='text-center'>
      <div className='mt-5 text-secondary h4'>
        <span>👷‍♀️</span>
        <br />
        <br />
        <i>esta seção ficará pronta em:</i>
      </div>
      <Countdown endTime={Date.UTC(2021, 1, 10, 12, 0, 0, 0)} />
      <button onClick={() => window.history.back()} className='btn btn-warning mt-5 mr-3'>
        voltar
      </button>
      <button onClick={() => window.location.assign('/')} className='btn btn-outline-warning mt-5'>
        home
      </button>
    </div>
  );
};

export default MasterClasses;
