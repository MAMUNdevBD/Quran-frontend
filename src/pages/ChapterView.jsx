import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChapterView = () => {
  const { id } = useParams();
  console.log(id);

  const [chapter, setChapter] = useState(null);
  const [chapterInfo, setChapterInfo] = useState(null);
  const [verses, setVerses] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v3/chapters/" + id + "?language=bn")
      .then((res) => setChapter(res.data.chapter));
    axios
      .get("https://api.quran.com/api/v3/chapters/" + id + "/info?language=bn")
      .then((res) => setChapterInfo(res.data.chapter_info));
    axios
      .get(
        "https://api.quran.com/api/v3/chapters/" +
          id +
          "/verses?language=bn&limit=20&page=1"
      )
      .then((res) => setVerses(res.data));
  }, [id]);

  const versesView = (verses) =>
    verses.map((verse, index) => (
      <div className="" key={index}>
        1
      </div>
    ));

  return (
    <div>
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
      <div className="">{chapterInfo ? chapterInfo.short_text : ""}</div>
      <div className="">
        <div className="">{verses ? versesView(verses.verses) : ""}</div>
      </div>
    </div>
  );
};

export default ChapterView;
