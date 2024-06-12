import useMetronomeContext from '../../hooks/useMetronomeContext';

interface MetronomeButtonProps {
  className?: string;
  buttonTexts?: [string, string];
}

function PlayButton({ className = '', buttonTexts = ['Play', 'Pause'] }: MetronomeButtonProps) {
  const { isPlaying, handleTogglePlaying } = useMetronomeContext();

  return (
    <button className={className} onClick={handleTogglePlaying}>
      {isPlaying ? buttonTexts[1] : buttonTexts[0]}
    </button>
  );
}

export default PlayButton;
