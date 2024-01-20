import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-page-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        404
      </h1>
      <h3 className="text-2xl font-semibold tracking-tight mb-8">
        Page Not Found
      </h3>
      <Button>
        <Link to="/">Go to home</Link>
      </Button>
    </div>
  );
}
