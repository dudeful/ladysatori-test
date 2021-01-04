import './App.css';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <ReactPlayer
          controls
          // playbackRate={2}
          light={true}
          url='https://lady-satori-vod-mediaconvert-output.s3-sa-east-1.amazonaws.com/test/MVI_0201.m3u8'
        />
      </header>
    </div>
  );
}

export default App;
