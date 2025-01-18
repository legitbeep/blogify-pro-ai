import { useId } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Grid, Heart } from "lucide-react";

// Extended type for blog features
interface BlogFeature {
  title: string;
  description: string;
  tags?: string[];
  author?: {
    name: string;
    avatar: string;
  };
  createdAt?: string;
  views?: number;
  likes?: number;
}

export function FeaturesSectionWithCardGradient() {
  const publicBlogs: BlogFeature[] = [
    {
      title: "HIPAA and SOC2 Compliant",
      description:
        "Our applications are HIPAA and SOC2 compliant, your data is safe with us, always.",
      tags: ["HIPAA", "SOC2"],
      author: {
        name: "John Doe",
        avatar: "/api/placeholder/32/32",
      },
      createdAt: "2025-01-15",
      views: 1234,
      likes: 89,
    },
    {
      title: "Automated Social Media Posting",
      description:
        "Schedule and automate your social media posts across multiple platforms to save time and maintain a consistent online presence.",
      tags: ["Automation", "Social Media"],
      author: {
        name: "Jane Smith",
        avatar: "/api/placeholder/32/32",
      },
      createdAt: "2025-01-14",
      views: 2156,
      likes: 167,
    },
    {
      title: "Automated Social Media Posting",
      description:
        "Schedule and automate your social media posts across multiple platforms to save time and maintain a consistent online presence.",
      tags: ["Automation", "Social Media"],
      author: {
        name: "Jane Smith",
        avatar: "/api/placeholder/32/32",
      },
      createdAt: "2025-01-14",
      views: 2156,
      likes: 167,
    },
    {
      title: "Automated Social Media Posting",
      description:
        "Schedule and automate your social media posts across multiple platforms to save time and maintain a consistent online presence.",
      tags: ["Automation", "Social Media"],
      author: {
        name: "Jane Smith",
        avatar: "/api/placeholder/32/32",
      },
      createdAt: "2025-01-14",
      views: 2156,
      likes: 167,
    },
    // ... other blog items with similar structure
  ];

  const onBlogClick = (blog: BlogFeature) => {
    // Navigate to the blog post page
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-auto">
        {publicBlogs.map((feature) => (
          <div
            key={feature.title}
            onClick={() => onBlogClick(feature)}
            className="relative cursor-pointer bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-200"
          >
            <Grid size={20} />

            {/* Title and Description */}
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>

            <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm font-normal relative z-20">
              {feature.description?.slice(0, 50)}...
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 mt-2 relative z-20">
              {feature.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            {/* Author and Date */}
            <div className="flex items-center mt-auto space-x-2 relative z-20">
              <Avatar className="h-8 w-8">
                <AvatarImage src={feature.author?.avatar} />
                <AvatarFallback>
                  {feature.author?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {feature.author?.name}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(feature.createdAt || "").toLocaleDateString()}
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
        ))}
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
