import React, { useRef, useState } from "react";
import {
  ReactSVGPanZoom,
  TOOL_AUTO,
  INITIAL_VALUE,
  Value,
  SvgPanZoomElement,
} from "react-svg-pan-zoom";
import styled from "styled-components";
import { IMG_GEO } from "@/constants/images";

const locations = [
  { id: 1, x: 200, y: 300, title: "Location 1", description: "Description 1" },
  { id: 2, x: 400, y: 150, title: "Location 2", description: "Description 2" },
  // 추가할 위치 데이터들...
];

const ZoomableMap: React.FC = () => {
  const viewerRef = useRef<SvgPanZoomElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [value, setValue] = useState<Value>(INITIAL_VALUE);

  return (
    <ReactSVGPanZoom
      width={800}
      height={600}
      tool={TOOL_AUTO}
      background="#f0f0f0"
      ref={viewerRef}
      value={value}
      onChangeValue={setValue}
      onChangeTool={(tool) => viewerRef.current?.setTool(tool)}
      detectAutoPan={false}
      // miniaturePosition="none"
      scaleFactorOnWheel={1.1}
    >
      <svg width={800} height={600} viewBox="0 0 800 600">
        <image href={IMG_GEO} width="800" height="600" />

        {/* 동그란 버튼들 */}
        {locations.map((location) => (
          <circle
            key={location.id}
            cx={location.x}
            cy={location.y}
            r={10}
            fill="blue"
            onMouseEnter={() => setHoveredLocation(location.id)}
            onMouseLeave={() => setHoveredLocation(null)}
          />
        ))}

        {/* 호버 카드 */}
        {hoveredLocation && (
          <foreignObject
            x={locations[hoveredLocation - 1].x + 10}
            y={locations[hoveredLocation - 1].y - 10}
            width="150"
            height="100"
          >
            <HoverCard>
              <h3>{locations[hoveredLocation - 1].title}</h3>
              <p>{locations[hoveredLocation - 1].description}</p>
              <button
                onClick={() =>
                  (window.location.href = `/location/${hoveredLocation}`)
                }
              >
                페이지 이동
              </button>
            </HoverCard>
          </foreignObject>
        )}
      </svg>
    </ReactSVGPanZoom>
  );
};

// 호버 카드 스타일
const HoverCard = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: #555;
  }

  button {
    margin-top: 8px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
  }
`;

export default ZoomableMap;
