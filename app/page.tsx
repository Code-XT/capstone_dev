"use client";
import { useState, useEffect } from "react";
import { ArrowRightIcon, DatabaseIcon, UploadIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`
        ${
          isDarkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gradient-to-br from-blue-50 to-blue-100"
        }
        flex min-h-screen flex-col items-center justify-center px-4 py-16 transition-colors duration-300
      `}
    >
      <div
        className={`
          ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700 text-gray-100"
              : "bg-white"
          }
          max-w-xl w-full p-8 rounded-2xl shadow-2xl text-center space-y-6 
          transform transition-all hover:scale-[1.02] duration-300 relative
        `}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`
            absolute top-4 right-4 p-2 rounded-full 
            ${
              isDarkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }
            transition-colors duration-300
          `}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {/* Header */}
        <div
          className={`
            ${isDarkMode ? "bg-blue-800" : "bg-blue-500"} 
            text-white p-4 rounded-xl mb-4 shadow-lg flex items-center justify-center space-x-4
          `}
        >
          <DatabaseIcon className="w-10 h-10" />
          <h1 className="text-4xl font-extrabold tracking-tight">
            Vector Knowledge Hub
          </h1>
        </div>

        {/* Description */}
        <p
          className={`
            text-xl 
            ${isDarkMode ? "text-gray-300" : "text-gray-600"}
            mb-4 leading-relaxed
          `}
        >
          Seamlessly expand and refine your AI's knowledge base. Upload, manage,
          and optimize your vector database with precision and ease.
        </p>

        {/* Key Features */}
        <div
          className={`
            grid grid-cols-2 gap-4 mb-6
            ${isDarkMode ? "text-gray-300" : "text-gray-700"}
          `}
        >
          <div
            className={`
              p-4 rounded-lg 
              ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-blue-50 hover:bg-blue-100"
              }
              transition-colors duration-300 flex items-center space-x-3
            `}
          >
            <UploadIcon className="w-6 h-6" />
            <span>Easy Uploads</span>
          </div>
          <div
            className={`
              p-4 rounded-lg 
              ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-blue-50 hover:bg-blue-100"
              }
              transition-colors duration-300 flex items-center space-x-3
            `}
          >
            <DatabaseIcon className="w-6 h-6" />
            <span>Smart Management</span>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`
            border-t 
            ${isDarkMode ? "border-gray-700" : "border-gray-200"} 
            pt-6
          `}
        >
          <Link
            href="/pinecone"
            className={`
              inline-flex items-center justify-center w-full py-3 px-6 rounded-lg 
              transition-colors duration-300 group
              ${
                isDarkMode
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
          >
            <span className="mr-2">Launch Knowledge Center</span>
            <ArrowRightIcon className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
