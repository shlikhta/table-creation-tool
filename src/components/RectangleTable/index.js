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
      width="120"
      height="121"
      viewBox="0 0 120 121"
    >
      <defs>
        <filter
          id="b"
          width="116.7%"
          height="116.7%"
          x="-8.3%"
          y="-8.3%"
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
        <circle id="a" cx="60" cy="59.5" r="54" />
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(0 1)">
        <g fill="#D8D8D8" transform="translate(5.5)">
          <rect
            width="26"
            height="18"
            x="78.5"
            y="15.5"
            opacity=".756"
            rx="7"
            transform="rotate(45 91.5 24.5)"
          />
          <rect
            width="26"
            height="18"
            x="2.5"
            y="15.5"
            opacity=".756"
            rx="7"
            transform="rotate(130 15.5 24.5)"
          />
          <rect width="26" height="18" x="41" opacity=".76" rx="7" />
        </g>
        <g fill="#D8D8D8" transform="rotate(180 56.75 60)">
          <rect
            width="26"
            height="18"
            x="79.5"
            y="16"
            opacity=".756"
            rx="7"
            transform="rotate(45 92.5 25)"
          />
          <rect
            width="26"
            height="18"
            x="3"
            y="15.5"
            opacity=".756"
            rx="7"
            transform="rotate(130 16 24.5)"
          />
          <rect width="26" height="18" x="41.5" opacity=".76" rx="7" />
        </g>
        <path
          fill="#D8D8D8"
          d="M104.5,49.5 L116.5,49.5 C120.365993,49.5 123.5,52.6340068 123.5,56.5 L123.5,60.5 C123.5,64.3659932 120.365993,67.5 116.5,67.5 L104.5,67.5 C100.634007,67.5 97.5,64.3659932 97.5,60.5 L97.5,56.5 C97.5,52.6340068 100.634007,49.5 104.5,49.5 Z"
          opacity=".762"
          transform="rotate(90 110.5 58.5)"
        />
        <path
          fill="#D8D8D8"
          d="M3,49.5 L15,49.5 C18.8659932,49.5 22,52.6340068 22,56.5 L22,60.5 C22,64.3659932 18.8659932,67.5 15,67.5 L3,67.5 C-0.865993249,67.5 -4,64.3659932 -4,60.5 L-4,56.5 C-4,52.6340068 -0.865993249,49.5 3,49.5 Z"
          opacity=".758"
          transform="rotate(90 9 58.5)"
        />
        <use xlinkHref="#a" fill="#000" filter="url(#b)" />
        <use xlinkHref="#a" fill="#B620E0" />
      </g>
    </svg>
  );
};
