'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // aligns right
          background: "transparent"
        }}
      >
        <Spline
          scene={scene}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent"
          }}
        />
      </div>
    </Suspense>
  )
}
