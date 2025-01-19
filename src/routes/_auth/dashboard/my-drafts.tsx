import BlogService from "@/api/services/blogService";
import Footer from "@/components/atoms/footer";
import { FeaturesSectionWithCardGradient } from "@/components/feature-section-with-card-gradient";
import BlogNavbar from "@/components/modules/blogs/blog-navbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/dashboard/my-drafts")({
  component: RouteComponent,
});

function RouteComponent() {
  const draftsQuery = useQuery({
    queryKey: BlogService.queryKeys.getDrafts(),
    queryFn: BlogService.getDrafts,
  });

  useEffect(() => {
    if (!draftsQuery.isFetching && !draftsQuery.data && !draftsQuery.isError) {
      draftsQuery.refetch();
    }
  }, [draftsQuery.isFetching]);

  return (
    <>
      <BlogNavbar />
      <div className="container mx-auto md:px-4 px-2 mt-[100px] min-h-screen">
        <FeaturesSectionWithCardGradient
          isLoading={draftsQuery.isLoading}
          publicBlogs={draftsQuery.data ?? []}
        />
      </div>
      <Footer />
    </>
  );
}
