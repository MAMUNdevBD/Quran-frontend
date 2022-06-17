import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChapterView = () => {
  const { id } = useParams();
  const lang = "en";

  const [chapter, setChapter] = useState(null);
  const [chapterInfo, setChapterInfo] = useState(null);
  const [verses, setVerses] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v3/chapters/" + id + "?language=" + lang)
      .then((res) => setChapter(res.data.chapter));
    axios
      .get(
        "https://api.quran.com/api/v3/chapters/" + id + "/info?language=" + lang
      )
      .then((res) => setChapterInfo(res.data.chapter_info));
    axios
      .get(
        "https://api.quran.com/api/v3/chapters/" +
          id +
          "/verses?language=" +
          lang +
          "&limit=20&page=1"
      )
      .then((res) => setVerses(res.data));
  }, [id]);

  // const versesView = (verses) =>
  //   ;

  return (
    <div className="container mx-auto text-xl">
      <div className="">
        {chapter ? (
          <h1 className="text-center font-bold text-3xl mt-10">
            {chapter.name_arabic +
              " " +
              chapter.name_simple +
              " (" +
              chapter.translated_name.name +
              ")"}
          </h1>
        ) : (
          ""
        )}
        <div className="text-center">
          {chapterInfo ? chapterInfo.short_text : ""}
        </div>
        <div className="flex flex-col gap-10 mt-10 items-end">
          {verses?.verses.map((verse, index) => (
            <div className="flex gap-2" key={index}>
              <div className="flex flex-row-reverse gap-2">
                {verse.words.map((word, i) => (
                  <div
                    key={i}
                    className="relative group cursor-pointer hover:text-sky-500"
                  >
                    {word.text_madani}
                    <div className="hidden group-hover:flex w-max z-10 absolute -top-6 right-0 bg-gray-600 rounded text-white text-base px-2">
                      {word.translation.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterView;
