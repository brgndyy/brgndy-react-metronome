import Metronome from './lib/components/Metronome/Metronome';

export default function App() {
  return (
    <Metronome>
      <Metronome.BPMInput />
      <Metronome.PlayButton />
    </Metronome>
  );
}
