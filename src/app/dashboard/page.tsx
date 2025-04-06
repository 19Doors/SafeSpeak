"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getScore } from "../lib/actions";

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
    <div className="flex gap-x-4 justify-center">
      <div className="flex flex-col p-4 w-1/3 h-[85vh] max-h-[85vh]  rounded rounded-medium gap-y-2 bg-[#F2F3F7]">
        <div className="flex-grow max-h-[85vh] overflow-auto">
          <div className="flex flex-col gap-y-2 overflow-auto">
            {messages.map((msg: any, id: number) => {
              return (
                <div
                  key={id}
                  className="bg-primary px-2 py-1 rounded rounded-md text-sm font-bold self-end"
                >
		  {msg=="message deleted" && <i>{msg}</i>}
                  {msg!="message deleted" && <p>{msg}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-x-4">
          <Input
            type="text"
            placeholder="type..."
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
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="font-bold font-spaceG">Max Toxicity Score</p>
          <Input
            type="number"
            placeholder="0.5"
            onChange={(e: any) => {
              setToxicScore(e.target.value);
            }}

	    className="border-black"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-bold font-spaceG">Max Harmful Score</p>
          <Input
            type="number"
            placeholder="0.5"
            onChange={(e: any) => {
              setHarmfulScore(e.target.value);
            }}

	    className="border-black"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-bold font-spaceG">Max NSFW Score</p>
          <Input
            type="number"
            placeholder="0.5"
            onChange={(e: any) => {
              setNSFWScore(e.target.value);
            }}

	    className="border-black"
          />
        </div>
      </div>
    </div>
  );
}
