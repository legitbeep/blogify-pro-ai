// import React, { Suspense } from "react";
// import * as Spline from "@splinetool/react-spline";

// interface SplineSceneProps {
//   sceneUrl?: string;
//   onLoad?: (splineApp: any) => void;
//   className?: string;
// }

// const SplineScene: React.FC<SplineSceneProps> = ({
//   sceneUrl = "https://prod.spline.design/ByLQLHHsIMDeCxdf/scene.splinecode",
//   onLoad,
//   className = "w-full h-96",
// }) => {
//   return (
//     <div className="p-0 h-full">
//       <Suspense
//         fallback={
//           <div className="w-full h-full flex items-center justify-center bg-gray-100">
//             <p className="text-gray-500">Loading 3D scene...</p>
//           </div>
//         }
//       >
//         <Spline.default
//           scene={sceneUrl}
//           onLoad={onLoad}
//           className="w-full h-full"
//         />
//       </Suspense>
//     </div>
//   );
// };

// export default SplineScene;
import { Suspense } from "react";
// const Spline = lazy(() => import("@splinetool/react-spline"));
// const Spline = lazy(() =>
//   import("@splinetool/react-spline").then((module: any) => ({
//     default: module.Spline,
//   }))
// );
// const Spline = lazy(() => import("../atoms/spline-wrapper"));
import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export default SplineScene;
