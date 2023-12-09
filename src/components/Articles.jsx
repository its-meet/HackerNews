import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "./Loader";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const hitsPerPage = 30;

  const fetchSearchNews = async (query = searchQuery) => {
    const resp = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`
    );
    const answer = await resp.json();
    setSearchData(answer.hits);
    setIsLoading(false);
  };

  const fetchNews = async () => {
    const resp = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=${hitsPerPage}&page=${page}`
    );
    const answer = await resp.json();

    setData(answer.hits);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSearchNews();
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    fetchNews();
  }, [page]);

  const handleNext = async () => {
    setPage(page + 1);
  };
  const handlePrev = async () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  return (
    <div className="h-[90vh] px-8  md:px-24">
      <div className="flex justify-between">
        <h3 className="text-2xl cursor-pointer mb-4 text-gray-300 spacing tracking-wider pt-8">
          Hacker News
        </h3>
        <div className="text-2xl cursor-pointer mb-4 text-gray-300 spacing tracking-wider pt-8">
          <input
            type="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder=" Search News..."
            className="transition-all duration-200 ease-in-out delay-200 bg-[#1D1D1D] text-white rounded-lg hover:border focus:outline-none focus:border-2 focus:border-[#20BD5F] hover:border-[#20BD5F]"
          />
        </div>
      </div>

      {searchQuery.length > 1 ? (
        <div className="flex flex-wrap">
          {isLoading ? (
            <Loader />
          ) : (
            searchData.map((val, index) => {
              return (
                <Card
                  data={val}
                  index={index}
                  key={val.story_id}
                  UID={val.objectID}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="flex flex-wrap">
          {isLoading ? (
            <Loader />
          ) : (
            data.map((val, index) => {
              return (
                <Card
                  data={val}
                  index={index}
                  key={val.story_id}
                  UID={val.objectID}
                />
              );
            })
          )}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          className=" shadow-gray-900 mb-2 shadow-lg border-[#1D1D1D] border-2 px-4 py-2 rounded-xl hover:border-[#20BD5F] disabled:cursor-not-allowed"
          onClick={handlePrev}
          disabled={page <= 0}
        >
          ⬅️ Prev
        </button>
        <div className=" shadow-gray-900 mb-2 shadow-lg border-[#1D1D1D] border-2 px-4 py-2 rounded-xl hover:border-[#20BD5F]">
          {page}
        </div>
        <button
          className=" shadow-gray-900 mb-2  shadow-lg border-[#1D1D1D] border-2 px-4 py-2 rounded-xl hover:border-[#20BD5F]"
          onClick={handleNext}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Articles;
