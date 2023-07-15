export interface APIResults {
  guid: number;
  type: number;
  datetime: string;
  account: number;
  name: string;
  level: number;
  race: number;
  class: number;
  gender: number;
}

export interface Row extends APIResults {
  position: number;
}
