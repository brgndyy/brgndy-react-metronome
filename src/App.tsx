import { MetronomeProvider } from './lib/components';
import { Metronome } from './lib/components';
import { MetronomeButton } from './lib/components';

export default function App() {
  return (
    <MetronomeProvider>
      <Metronome />
    </MetronomeProvider>
  );
}
