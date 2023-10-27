export enum AREA_TYPES {
  SARJAPUR = "SARJAPUR",
  BELLANDUR = "BELLANDUR",
}

export type Timing = {
  startTime: any;
  endTime: any;
};

export type SetTiming = React.Dispatch<React.SetStateAction<Timing[]>>;