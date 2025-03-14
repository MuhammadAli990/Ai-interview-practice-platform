'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push('/dashboard');
  return (
    <div className='container'>
      <Button>Button</Button>
    </div>
  );
}
