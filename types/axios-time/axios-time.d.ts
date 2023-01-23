declare module 'axios-time' {
  import { AxiosInstance, AxiosResponse } from 'axios';

  export default function axiosTime(instance: AxiosInstance): void;

  export interface Timings {
    timingEnd: number;
    timingStart: number;
    elapsedTime: number;
  }

  export interface TimeAxiosResponse<T = any> extends AxiosResponse<T> {
    timings: Timings;
  }
}
