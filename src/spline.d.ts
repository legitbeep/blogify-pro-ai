declare module "@splinetool/react-spline" {
  import { Component } from "react";

  export interface SplineProps {
    scene: string;
    className?: string;
    onLoad?: (splineApp: any) => void;
    onMouseDown?: (e: any) => void;
    onMouseHover?: (e: any) => void;
    onMouseUp?: (e: any) => void;
    onStart?: () => void;
  }

  export default class Spline extends Component<SplineProps> {}
}
