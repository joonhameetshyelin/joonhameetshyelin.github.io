// src/react-svg-pan-zoom.d.ts
declare module "react-svg-pan-zoom" {
  import { Component, RefObject } from "react";

  export interface Value {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    viewerWidth: number;
    viewerHeight: number;
    SVGWidth: number;
    SVGHeight: number;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
    miniatureOpen?: boolean;
  }

  export interface ReactSVGPanZoomProps {
    width: number;
    height: number;
    tool?: string;
    value?: Value;
    onChangeValue?: (value: Value) => void;
    onChangeTool?: (tool: string) => void;
    background?: string;
    SVGBackground?: string;
    detectAutoPan?: boolean;
    miniaturePosition?: string;
    scaleFactorOnWheel?: number;
    ref?: RefObject<SvgPanZoomElement>;
    children: any;
  }

  export interface SvgPanZoomElement extends Component<ReactSVGPanZoomProps> {
    zoomOnViewerCenter(scaleFactor: number): void;
    fitToViewer(): void;
    pan(SVGDeltaX: number, SVGDeltaY: number): void;
    zoom(SVGPointX: number, SVGPointY: number, scaleFactor: number): void;
    setPointOnViewerCenter(
      SVGPointX: number,
      SVGPointY: number,
      scaleFactor: number
    ): void;
    reset(): void;
    autoPan: boolean;
    setValue: any;
    setTool: any;
  }

  export class ReactSVGPanZoom extends Component<ReactSVGPanZoomProps> {}
  export const TOOL_NONE: string;
  export const TOOL_AUTO: string;
  export const TOOL_PAN: string;
  export const TOOL_ZOOM_IN: string;
  export const TOOL_ZOOM_OUT: string;
  export const INITIAL_VALUE: Value;
}
