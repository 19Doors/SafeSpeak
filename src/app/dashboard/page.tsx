"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Settings2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getScore } from "../lib/actions";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import ParticleFilter from "../particles";
import ThreeScene from "../particles";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const [toxicScore, setToxicScore] = useState(0.5);
  const [harmfulScore, setHarmfulScore] = useState(0.5);
  const [nsfwScore, setNSFWScore] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    setLoading(true);
    let scores = await getScore(currentMsg);
    scores = JSON.parse(scores);
    console.log(scores);
    let detected = false;
    if (scores.toxicity.score > toxicScore) {
      detected = true;
    } else if (scores.harmfulness.score > harmfulScore) {
      detected = true;
    } else if (scores.nsfw.score > nsfwScore) {
      detected = true;
    }
    if (detected) {
      setMessages([...messages, "message deleted"]);
    } else {
      setMessages([...messages, currentMsg]);
    }
    setCurrentMsg("");
    setLoading(false);
  };
  return (
    <div className="flex gap-x-4 justify-center gap-x-8">
      <div className="max-w-1/2">
        <p className="text-5xl font-spaceG max-w-1/2 leading-13">
          <strong className="text-7xl">Modera</strong> <br />
          <br />
          "Because everyone deserves to feel safe and respected online - toxic
          content ruins that experience in seconds"
        </p>
      </div>
      <div className="flex flex-col p-4 w-1/3 h-[85vh] max-h-[85vh]  rounded rounded-medium gap-y-2 bg-[#FFECDB]">
        <p className="font-bold">chatBox</p>
        <Separator className="border-2" />
        <div className="flex-grow max-h-[85vh] overflow-auto">
          <div className="flex flex-col gap-y-2 overflow-auto">
            {messages.map((msg: any, id: number) => {
              return (
                <div
                  key={id}
                  className="bg-primary px-2 py-1 rounded rounded-md text-sm font-bold self-end text-[#FFECDB]"
                >
                  {msg == "message deleted" && <i>message deleted as the content was not appropriate</i>}
                  {msg != "message deleted" && <p>{msg}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-x-2">
          <Input
            type="text"
            placeholder="Enter your query"
            onChange={(e: any) => {
              setCurrentMsg(e.target.value);
            }}
            className="border-black"
          />
          {!loading && (
            <Button onClick={sendMessage} className="cursor-pointer">
              <Send />
            </Button>
          )}
          {!loading && (
            <Sheet>
              <SheetTrigger asChild>
                <Button className="cursor-pointer">
                  <Settings2 />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#FFEDFA]">
                <SheetHeader>
                  <SheetTitle className="text-xl">
                    Tolerance Settings
                  </SheetTitle>
                  <SheetDescription>
                    Fine-tune the threshold of acceptance—where flexibility
                    meets precision
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-y-8 mx-4">
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold font-spaceG">Max Toxicity Score</p>
		    <Slider defaultValue={[toxicScore]} max={1} step={0.1} onChange={(e: any)=>{setToxicScore(e.target.value)}}/>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold font-spaceG">Max Harmful Score</p>
		    <Slider defaultValue={[harmfulScore]} max={1} step={0.1} onChange={(e: any)=>{setHarmfulScore(e.target.value)}}/>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold font-spaceG">Max NSFW Score</p>
		    <Slider defaultValue={[nsfwScore]} max={1} step={0.1} onChange={(e: any)=>{setNSFWScore(e.target.value)}}/>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
}
