# brgndy-react-metronome

React Metronome Library Component

## installing

```
npm install brgndy-react-metronome
```

## Usage

Import components

```javascript
import {
  MetronomeButton,
  Metronome,
  MetronomeProvider,
} from "brgndy-react-metronome";

export default function Component() {
  return (
    <MetronomeProvider>
      <Metronome />
      <MetronomeButton />
    </MetronomeProvider>
  );
}
```

## Metronome Component Props

| Name      | Datatype | Default | Description                                                       |
| --------- | -------- | ------- | ----------------------------------------------------------------- |
| type      | string   | number  | The style you want to apply BPM style. Can choose number or range |
| className | string   | ""      | className you want to apply that component.                       |
| minBpm    | number   | 1       | number you want to apply minimum. default minimum is 1            |
| maxBpm    | number   | 300     | number you want to apply maximum. default minimum is 300          |

## Metronome Button Component Props

| Name        | Datatype         | Default              | Description                                                                                                                                                |
| ----------- | ---------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonTexts | [string, string] | ["재생", "일시정지"] | texts you want to insert. if the metronome is playing, component shows buttonTexts[1]. and if the metronome is not playing, component shows buttonTexts[0] |
| className   | string           | ""                   | className you want to apply that component.                                                                                                                |

## Author

- brgndyy [github](https://github.com/brgndyy)

## License

it's MIT License
