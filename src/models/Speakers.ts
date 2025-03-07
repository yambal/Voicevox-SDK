type StyleType = "talk" | "singing_teacher" | "frame_decode" | "sing"

type SpeakerStyle = {
  name: string
  id: number
  type: StyleType
}

type SpeakerSupportedFeatures = {
  permitted_synthesis_morphing: "ALL" | "SELF_ONLY" | "NOTHING"
}

export type Speaker = {
  name: string
  speaker_uuid: string
  styles: SpeakerStyle[],
  version: string
  supported_features: SpeakerSupportedFeatures
}