import BlogService from "@/api/services/blogService";
import TranscriptService from "@/api/services/transcriptService";
import MarkdownEditor from "@/components/atoms/markdown-editor";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/preview")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<string | null>(null);
  const searchParams = useSearch({
    from: "/_auth/dashboard/preview",
  });
  // Destructure the array to get just the searchParams

  useEffect(() => {
    const fetchData = async () => {
      const fileType = localStorage.getItem("fileType");

      if (fileType === "text") {
        const textData = localStorage.getItem("textData");

        if (textData) {
          try {
            const apiResponse = await BlogService.getBlog({
              content: textData,
            });

            setResponse(apiResponse.response);
          } catch (error) {
            console.error("Error calling TranscriptService:", error);
            setResponse("Failed to fetch transcript data");
          }
        } else {
          setResponse("No text data found in local storage");
        }
      } else {
        setResponse("Invalid file type");
      }

      setLoading(false);
    };

    fetchData();
  }, [searchParams]); // Dependency array remains the same

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Preview Page</h1>
      {response ? (
        <MarkdownEditor value={response} setValue={setResponse} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
