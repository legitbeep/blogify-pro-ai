import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">
          {blog.title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Created on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center">
        <img
          src={blog.author.image || "/placeholder.svg"}
          alt={blog.author.name}
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <span className="text-sm font-medium">{blog.author.name}</span>
      </CardFooter>
    </Card>
  );
}
