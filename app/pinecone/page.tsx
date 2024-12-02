"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Database, LucideLoader2, MoveUp, RefreshCcw } from "lucide-react";
import React, { useState, useEffect } from "react";

type Props = {};

const VectorDBPage = (props: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [indexname, setIndexname] = useState("");
  const [namespace, setNamespace] = useState("");
  const [fileListAsText, setfileListAsText] = useState("");

  const [filename, setFilename] = useState("");
  const [progress, setProgress] = useState(0);

  // Dark mode setup
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const onFileListRefresh = async () => {
    setfileListAsText("");
    const response = await fetch("api/getfilelist", { method: "GET" });
    const filenames = await response.json();
    console.log(filenames);
    const resultString = (filenames as [])
      .map((filename) => `📄 ${filename}`)
      .join("\n");
    setfileListAsText(resultString);
  };

  const onStartUpload = async () => {
    setProgress(0);
    setFilename("");
    setisUploading(true);
    const response = await fetch("api/updatedatabase", {
      method: "POST",
      body: JSON.stringify({
        indexname,
        namespace,
      }),
    });
    console.log(response);
    await processStreamedProgress(response);
  };

  async function processStreamedProgress(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) {
      console.error("Reader was not found");
      return;
    }
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setisUploading(false);
          break;
        }

        const data = new TextDecoder().decode(value);
        console.log(data);
        const { filename, totalChunks, chunksUpserted, isComplete } =
          JSON.parse(data);
        const currentProgress = (chunksUpserted / totalChunks) * 100;
        setProgress(currentProgress);
        setFilename(`${filename} [${chunksUpserted}/${totalChunks}]`);
      }
    } catch (error) {
      console.error("Error reading response: ", error);
    } finally {
      reader.releaseLock();
    }
  }

  return (
    <main
      className={`
        ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}
        flex flex-col items-center p-24 min-h-screen transition-colors duration-300
      `}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`
          fixed top-4 right-4 p-2 rounded-full z-50
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

      <Card
        className={`
          ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-100"
              : "bg-white border-gray-200"
          }
          w-full max-w-4xl transition-colors duration-300
        `}
      >
        <CardHeader>
          <CardTitle
            className={`
              ${isDarkMode ? "text-gray-100" : "text-gray-900"}
              transition-colors duration-300
            `}
          >
            Update Knowledge Base
          </CardTitle>
          <CardDescription
            className={`
              ${isDarkMode ? "text-gray-400" : "text-gray-500"}
              transition-colors duration-300
            `}
          >
            Add new documents to your vector DB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`
                col-span-2 grid gap-4 border rounded-lg p-6
                ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
                }
                transition-colors duration-300
              `}
            >
              <div className="gap-4 relative">
                <Button
                  onClick={onFileListRefresh}
                  className={`
                    absolute -right-4 -top-4
                    ${
                      isDarkMode
                        ? "hover:bg-gray-600 text-gray-300"
                        : "hover:bg-gray-100"
                    }
                  `}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <RefreshCcw />
                </Button>
                <Label
                  className={`
                    ${isDarkMode ? "text-gray-300" : "text-gray-700"}
                    transition-colors duration-300
                  `}
                >
                  Files List:
                </Label>
                <Textarea
                  readOnly
                  value={fileListAsText}
                  className={`
                    min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm
                    ${
                      isDarkMode
                        ? "bg-gray-600 text-gray-200 border-gray-500"
                        : "bg-white text-gray-600 border-gray-300"
                    }
                    transition-colors duration-300
                  `}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    className={`
                      ${isDarkMode ? "text-gray-300" : "text-gray-700"}
                      transition-colors duration-300
                    `}
                  >
                    Index Name
                  </Label>
                  <Input
                    value={indexname}
                    onChange={(e) => setIndexname(e.target.value)}
                    placeholder="index name"
                    disabled={isUploading}
                    className={`
                      disabled:cursor-default
                      ${
                        isDarkMode
                          ? "bg-gray-600 text-gray-200 border-gray-500 placeholder-gray-400"
                          : "bg-white text-gray-900 border-gray-300"
                      }
                      transition-colors duration-300
                    `}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    className={`
                      ${isDarkMode ? "text-gray-300" : "text-gray-700"}
                      transition-colors duration-300
                    `}
                  >
                    Namespace
                  </Label>
                  <Input
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    placeholder="namespace"
                    disabled={isUploading}
                    className={`
                      disabled:cursor-default
                      ${
                        isDarkMode
                          ? "bg-gray-600 text-gray-200 border-gray-500 placeholder-gray-400"
                          : "bg-white text-gray-900 border-gray-300"
                      }
                      transition-colors duration-300
                    `}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={onStartUpload}
              variant={"outline"}
              className={`
                w-full h-full
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                    : "bg-white hover:bg-gray-100"
                }
                transition-colors duration-300
              `}
              disabled={isUploading}
            >
              <span className="flex flex-row">
                <Database size={50} className="stroke-[#D90013]" />
                <MoveUp className="stroke-[#D90013]" />
              </span>
            </Button>
          </div>
          {isUploading && (
            <div className="mt-4">
              <Label
                className={`
                  ${isDarkMode ? "text-gray-300" : "text-gray-700"}
                  transition-colors duration-300
                `}
              >
                File Name: {filename}
              </Label>
              <div className="flex flex-row items-center gap-4">
                <Progress
                  value={progress}
                  className={`
                    ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}
                    transition-colors duration-300
                  `}
                />
                <LucideLoader2 className="stroke-[#D90013] animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default VectorDBPage;
