# Voicevox-SDK

## VOICEVOX について

[COICEVOX](https://voicevox.hiroshiba.jp/)

VOICEVOX を起動したうえで、以下が利用できます

- [VOICEVOX SETTINGS](http://localhost:50021/setting)
- [VOICEVOX API DOCS](http://localhost:50021/docs)

## 使い方

> VOICEVOX が起動し`http://localhost:50021/setting`にアクセスできる状態でなければ、エラーが発生します

### 最初に

[VOICEVOX SETTINGS](http://localhost:50021/setting) で CORS Policy Mode を確認してください

### getSpeakers

↓ Promise-Base

```ts
import { getSpeakers } from "voicebox-sdk"
...

const speakers = await getSpeakers()
```

↓ React Custom-Hooks

```tsx
import { useGetSpeakers } from "voicebox-sdk"
...

const {
  speakers,
  getSpeakers,
  isGetting,
  error
} = useGetSpeakers()

useEffect(() => {
  if (!speakers) {
    getSpeakers()
  }
}, [speakers])
```
