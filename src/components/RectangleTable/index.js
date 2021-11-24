import React from 'react';

export const RectangleTable = ({
  seatsCount = 0,
  statusIcon,
  progress,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="115"
      height="71"
      viewBox="0 0 115 71"
    >
      <defs>
        <filter
          id="b"
          width="118.6%"
          height="134%"
          x="-9.3%"
          y="-17%"
          filterUnits="objectBoundingBox"
        >
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius=".5"
            result="shadowSpreadOuter1"
          />
          <feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="2.5"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
        <rect id="a" width="97" height="53" x="9" y="9" rx="12" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <rect
          width="26"
          height="18"
          x="22"
          fill="#D8D8D8"
          opacity=".756"
          rx="7"
        />
        <rect
          width="26"
          height="18"
          x="67"
          fill="#D8D8D8"
          opacity=".756"
          rx="7"
        />
        <path
          fill="#D8D8D8"
          d="M100,26.5 L112,26.5 C115.865993,26.5 119,29.6340068 119,33.5 L119,37.5 C119,41.3659932 115.865993,44.5 112,44.5 L100,44.5 C96.1340068,44.5 93,41.3659932 93,37.5 L93,33.5 C93,29.6340068 96.1340068,26.5 100,26.5 Z"
          opacity=".762"
          transform="rotate(90 106 35.5)"
        />
        <rect
          width="26"
          height="18"
          x="22"
          y="53"
          fill="#D8D8D8"
          opacity=".76"
          rx="7"
        />
        <rect
          width="26"
          height="18"
          x="67"
          y="53"
          fill="#D8D8D8"
          opacity=".76"
          rx="7"
        />
        <path
          fill="#D8D8D8"
          d="M3,26.5 L15,26.5 C18.8659932,26.5 22,29.6340068 22,33.5 L22,37.5 C22,41.3659932 18.8659932,44.5 15,44.5 L3,44.5 C-0.865993249,44.5 -4,41.3659932 -4,37.5 L-4,33.5 C-4,29.6340068 -0.865993249,26.5 3,26.5 Z"
          opacity=".758"
          transform="rotate(90 9 35.5)"
        />
        <use xlinkHref="#a" fill="#000" filter="url(#b)" />
        <use xlinkHref="#a" fill="#FFF" />
      </g>
    </svg>
  );
};
