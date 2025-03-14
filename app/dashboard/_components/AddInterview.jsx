"use client";
import { Loader2, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getInterviewQuestions } from "@/lib/GeminiAi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddInterview() {
  const [isLoading, setIsloading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useUser();
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const jobRole = e.target.jobRole.value;
    const jobDescription = e.target.jobDesc.value;
    const jobExperience = e.target.experience.value;
    setIsloading(true);
    try {
      const jsonMockResp = await getInterviewQuestions(
        jobRole,
        jobDescription,
        jobExperience
      );
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobRole,
          jobDescription,
          jobExperience,
          jsonMockResp,
          createdBy: user?.user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const result = await res.json();
      if (res.status == "201") {
        setDialogOpen(false);
        router.push(`/dashboard/interview/${result.id}`);
      }
    } catch (e) {
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={dialogOpen}>
      <div className="flex justify-center sm:justify-start">
        <div
          onClick={() => setDialogOpen(true)}
          className="rounded-md border-primary bg-[#c2e8d0] bg-opacity-100 text-primary py-12 px-16 w-fit flex items-center gap-2 mt-4 cursor-pointer hover:shadow-lg hover:bg-opacity-90 active:scale-95 duration-200"
        >
          <p className="font-semibold">Add interview</p>
          <PlusCircleIcon />
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-tighter">
            Tell us more about your job interview..
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col mt-4 text-black">
                <label className="mb-1">Job Role/Job Position:</label>
                <Input
                  placeholder="Ex. Full stack web developer"
                  id="jobRole"
                  type="text"
                  required
                />
                <label className="mt-4 mb-1">
                  Job Description/Tech Stack in short:
                </label>
                <Textarea
                  placeholder="Ex. MERN"
                  type="text"
                  required
                  id="jobDesc"
                />
                <label className="mt-4 mb-1">Experience (in years):</label>
                <Input
                  placeholder="Ex. 2"
                  type="number"
                  required
                  min={0}
                  max={100}
                  id="experience"
                />
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <Button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  variant="outline"
                >
                  cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Generating.." : "Start Interview"}
                  {isLoading && <Loader2 className="animate-spin" />}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddInterview;
