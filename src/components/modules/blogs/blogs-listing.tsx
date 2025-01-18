import { Blog } from "@/types/blog";
import { useState } from "react";
import SearchBar from "./search-bar";
import FilterBar from "./filter-bar";
import BlogGrid from "./blog-grid";

const DUMMY_BLOGS: Blog[] = [
  {
    id: "1",
    title: "Getting Started with React 18",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "JavaScript"],
    createdAt: "2023-07-01",
    author: {
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    title: "Advanced TypeScript Techniques",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["TypeScript", "Programming"],
    createdAt: "2023-07-05",
    author: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  // Add more dummy blogs as needed
];

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTagFilter = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const filteredBlogs = DUMMY_BLOGS.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => blog.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 text-primary">Our Blog</h1>
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:space-x-4">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilter={handleTagFilter} />
      </div>
      <BlogGrid blogs={filteredBlogs} />
    </div>
  );
}
