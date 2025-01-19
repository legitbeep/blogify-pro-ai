import { useId } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Grid, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import BlogService, { BlogResponse } from "@/api/services/blogService";
import { useNavigate } from "@tanstack/react-router";
import AuthService from "@/api/services/authService";

export function FeaturesSectionWithCardGradient({
  publicBlogs,
  isLoading = false,
}: {
  publicBlogs: BlogResponse[];
  isLoading: boolean;
}) {
  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });
  const navigate = useNavigate();
  const onBlogClick = (blog: BlogResponse) => {
    if (
      window.location.pathname?.includes("my-drafts") ||
      (blog?.user_id == userQuery?.data?.id && !blog.is_blog)
    ) {
      navigate({
        to: `/blogs/${blog.id}/edit`,
      });
    } else {
      navigate({
        to: `/blogs/${blog.id}`,
      });
    }
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-auto">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-500"
            >
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-24 w-full rounded-lg mb-4"></div>
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-4 w-1/2 rounded-lg mb-2"></div>
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-4 w-3/4 rounded-lg mb-2"></div>
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-4 w-1/2 rounded-lg mb-2"></div>
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-4 w-3/4 rounded-lg mb-2"></div>
            </div>
          ))
        ) : !!publicBlogs?.length ? (
          publicBlogs.map((feature) => (
            <div
              key={feature.title}
              onClick={() => onBlogClick(feature)}
              className="relative cursor-pointer bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-500"
            >
              <Grid size={20} />

              {/* Title and Description */}
              <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.title}
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm font-normal relative z-20">
                {feature.content?.slice(0, 50)}...
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 mt-2 relative z-20">
                {feature.tags?.map((tag) => (
                  <Badge
                    key={tag?.value}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag?.label}
                  </Badge>
                ))}
              </div>
              {/* Author and Date */}
              <div className="flex items-center mt-auto space-x-2 relative z-20">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={feature.user?.picture} />
                  <AvatarFallback>
                    {feature.user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {feature.user?.name}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {new Date(feature.timestamp || "").toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="flex items-center justify-end mt-4 space-x-4 relative z-20">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4 text-neutral-500" />
                  <span className="text-xs text-neutral-500">
                    {feature.views?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-neutral-500" />
                  <span className="text-xs text-neutral-500">
                    {feature.likes?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              No Blogs Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export { Grid, GridPattern };
