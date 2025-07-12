"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

interface Painting {
  id: number;
  title: string;
  painter: string;
  description: string;
  imagePath: string;
}

const slideSound = new Howl({
  src: ["/slide-sound.mp3"],
  volume: 0.5,
});

export default function PaintingSlider() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/paintings")
      .then((res) => res.json())
      .then(setPaintings)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/paintings", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const newPainting = await res.json();
      setPaintings((prev) => [newPainting, ...prev]);
      e.currentTarget.reset();
      setIndex(0);
    } else {
      alert("Upload failed");
    }
  };

  const nextPainting = () => {
    if (paintings.length === 0) return;
    setIndex((prev) => (prev + 1) % paintings.length);
    slideSound.play();
  };

  const painting = paintings[index];

  return (
    <div className="max-w-4xl  max-h-xl mx-auto p-4 space-y-6">
      {/* <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-4 rounded shadow"
      >
        <h2 className="text-xl text-black font-semibold mb-3">
          Add New Painting
        </h2> 
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full text-black mb-2 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="painter"
          placeholder="Painter"
          required
          className="w-full text-black mb-2 px-3 py-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full text-black mb-2 px-3 py-2 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full mb-4 border-1 px-2 py-2 text-black bg-grey-700"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit
        </button>
      </form> */}
      {painting && (
        <div className="text-center">
          <motion.img
            key={painting.id}
            src={painting.imagePath}
            alt={painting.title}
            className="rounded-lg shadow-lg w-full h-xl object-cover"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <h2 className="text-2xl font-bold mt-4">{painting.title}</h2>
          <h3 className="text-purple-600 text-lg">By {painting.painter}</h3>
          <p className="mt-2 text-sm">{painting.description}</p>
          <button
            onClick={nextPainting}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Next Painting
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          🎨 Add New Painting
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="border px-4 py-2 rounded text-gray-800"
          />
          <input
            type="text"
            name="painter"
            placeholder="Painter"
            required
            className="border px-4 py-2 rounded text-gray-800"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full border px-4 py-2 rounded text-gray-800"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full border px-4 py-2 rounded text-gray-800 bg-gray-50"
        />

        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2 rounded transition"
        >
          Upload Painting
        </button>
      </form>
    </div>
  );
}
