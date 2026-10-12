"use client"; // we need this for useState, ChangeEffect...

import { useState, ChangeEvent } from 'react';

export default function Home() {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) { 
      setPreview(URL.createObjectURL(file)) // previewing without upload
      setFile(file) // the actual file object we send to the API
      setCaption("") // reset old results
      setError("")
    }
  }

  const handleAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);
    setError("");
    setCaption("");

    try {
      const formData = new FormData()
      formData.append("image", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      })

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setCaption(data.caption);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 text-center sm:py-5">🍳 AI Recipe Remix</h1>
    
      <section>
        <h2 className="text-black text-center">Upload photo of your fridge/pantry</h2>
        <form>
          
          <div className="flex items-center justify-center p-6">
            <label className="group relative w-full max-w-md cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-12 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/50 group-hover:shadow-lg">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-40 w-40 rounded-xl object-cover shadow-md ring-2 ring-indigo-200"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-base font-semibold text-gray-700">
                    {preview ? "Change image" : "Upload image"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>

                {!preview && (
                  <span className="mt-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                    Browse files
                  </span>
                )}
              </div>
            </label>
          </div>
        </form>

        {file && (
          <div className="flex justify-center pb-4">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "🔍 Analyzing..." : "✨ Analyze Ingredients"}
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600">{error}</p>
        )}


        {/* Caption */}
        {caption && (
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              🥕 Caption
            </h3>
            <p className='rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800'>{caption}</p>
          </div>
        )}
      </section>
    </main>
  );
}
