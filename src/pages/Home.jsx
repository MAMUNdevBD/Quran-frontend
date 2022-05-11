import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v3/chapters?language=bn")
      .then((res) => setChapters(res.data.chapters));
  }, []);

  const chapterView = () =>
    chapters.map((chapter, index) => (
      <>
        <div className="" key={index}>
          <Link to={"/chapter/" + chapter.id}>
            <div className="">
              {chapter.chapter_number +
                ". " +
                chapter.name_simple +
                " (" +
                chapter.translated_name.name +
                ")"}
            </div>
          </Link>
        </div>
      </>
    ));
  return (
    <>
      <h1>Chapters</h1>
      <div className="grid grid-cols-4">{chapterView()}</div>
    </>
  );
};

export default Home;
