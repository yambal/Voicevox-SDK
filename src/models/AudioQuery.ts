type Mora = {
  text: string,
  consonant: string,
  consonant_length: number,
  vowel: string,
  vowel_length: number,
  pitch: number
}

type AccentPherase = {
  moras: Mora[],
  accent: number,
  pause_mora?: {
    text: string,
    consonant: string,
    consonant_length: number,
    vowel: string,
    vowel_length: number,
    pitch: number
  },
  is_interrogative: boolean
}

export type AudioQuery = {
  accent_phrases: AccentPherase[],
  speedScale: Number,
  pitchScale: Number,
  intonationScale: Number,
  volumeScale: Number,
  prePhonemeLength: Number,
  postPhonemeLength: Number,
  pauseLength: Number,
  pauseLengthScale: Number,
  outputSamplingRate: Number,
  outputStereo: Boolean,
  kana: string
}