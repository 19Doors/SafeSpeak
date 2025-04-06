import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FeatureList } from "./components";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-y-4 ml-28 h-[80vh]">
        <div className="flex flex-col mt-40 gap-y-8">
          <div>
            <h1 className="font-barlowC text-5xl ">Modera</h1>
            <h2 className="font-inter text-8xl font-bold">
              Chat Smart, Chat Safe.
            </h2>
          </div>
          <Link href="/dashboard">
            <Button className="text-2xl p-8 bg-black font-bold cursor-pointer">
              Scan Chat
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <FeatureList />
      </div>
    </div>
  );
}
