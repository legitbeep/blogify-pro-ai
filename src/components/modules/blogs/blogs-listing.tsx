import { Blog } from "@/types/blog";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import FilterBar from "./filter-bar";
import BlogGrid from "./blog-grid";
import { FeaturesSectionWithCardGradient } from "@/components/feature-section-with-card-gradient";
import { useQuery } from "@tanstack/react-query";
import BlogService, { BlogResponse, TagType } from "@/api/services/blogService";

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogResponse[]>([]);

  const blogsQuery = useQuery({
    queryKey: BlogService.queryKeys.getBlogs(),
    queryFn: BlogService.getBlogs,
  });

  useEffect(() => {
    if (blogsQuery.isSuccess) {
      setFilteredBlogs(blogsQuery.data || []);
    }
  }, [blogsQuery.isSuccess]);

  const filterBlogs = (tags: TagType[], searchTerm: string) => {
    let filtered = blogsQuery.data?.filter((blog) => {
      return tags.every((tag) => {
        return blog.tags.some((blogTag) => blogTag?.value === tag.value);
      });
    });
    filtered = filtered?.filter((blog) => {
      return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredBlogs(filtered || []);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterBlogs(selectedTags, term);
  };

  const handleFilter = (tags: TagType[]) => {
    // filter blogs based on tags then if search exist filter them with search term
    setSelectedTags(tags);
    filterBlogs(tags, searchTerm);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-transparent max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-primary">Our Blog</h1>
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:space-x-4 ">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilter={handleFilter} />
      </div>
      <FeaturesSectionWithCardGradient
        isLoading={blogsQuery.isLoading}
        publicBlogs={filteredBlogs}
      />
    </div>
  );
}
