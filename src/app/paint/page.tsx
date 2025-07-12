"use client";

// import { useState } from "react";



import PaintingSlider from "@/components/PaintingSlider";

// type Poem = {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: string;
// };

export default function Home22() {
 
  // const [poems, setPoems] = useState<Poem[]>([]);
  // const [form, setForm] = useState({ title: "", content: "", author: "" });
  // const [index, setIndex] = useState(-1);
 

  // useEffect(() => {
  //   fetch("/api/poems")
  //     .then((res) => res.json())
  //     .then(setPoems)
  //     .catch((err) => console.error("Error fetching poems:", err));
  // }, []);

  // const flipSound = new Howl({ src: ["/flip.mp3"] });

  // const handleSubmit = async () => {
  //   const res = await fetch("/api/poems", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   });

  //   if (res.ok) {
  //     const newPoem = await res.json();
  //     setPoems((prev) => [newPoem, ...prev]);
  //     setForm({ title: "", content: "", author: "" });
  //     setIndex(0);
  //   } else {
  //     const err = await res.json();
  //     alert(err.error || "Failed to submit poem.");
  //   }
  // };

  // const nextPoem = () => {
  //   if (index < poems.length - 1) {
  //     flipSound.play();
  //     setIndex(index + 1);
  //   }
  // };

  // const prevPoem = () => {
  //   if (index > 0) {
  //     flipSound.play();
  //     setIndex(index - 1);
  //   }
  // };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      
      <PaintingSlider></PaintingSlider>
      
    </main>
  );
}
