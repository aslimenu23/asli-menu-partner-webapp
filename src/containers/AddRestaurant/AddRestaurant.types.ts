export enum AREA_TYPES {
  SARJAPUR = "SARJAPUR",
  BELLANDUR = "BELLANDUR",
}

export type Timing = {
  from: any;
  to: any;
};

export type SetTiming = React.Dispatch<React.SetStateAction<Timing[]>>;