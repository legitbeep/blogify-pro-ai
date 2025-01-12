import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-100vh">
      <img src="/404.svg" alt="404" className="w-full h-full max-w-[400px]" />
      <div className="text-2xl font-bold ">Page Not Found</div>
      <Button className="mt-4">Go Home</Button>
    </div>
  );
};

export default NotFound;
