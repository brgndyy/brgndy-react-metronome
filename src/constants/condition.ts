import deepFreeze from "../utils/deepFreeze";

const CONDITION = deepFreeze({
  min_bpm: 1,
  max_bpm: 300,
  min_metronome_count: 1,
  max_metronome_count: 4,
});

export default CONDITION;
