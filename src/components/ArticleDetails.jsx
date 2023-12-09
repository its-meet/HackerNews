import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";

const ArticleDetails = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams(); //Article ID

  const fetchData = async () => {
    const resp = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
    const answer = await resp.json();
    setData(answer);
    setIsLoading(false);
    setComments(answer.children);
  };

  useEffect(() => {
    fetchData();
    setIsLoading();
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="md:px-24 overflow-hidden">
      <div className="bg-[#81811] p-5 shadow-gray-900  shadow-lg m-4 rounded-xl">
        <div className="mt-8  text-2xl tracking-widest duration-200 transition-all ease-in-out">
          Title:{" "}
          <a
            target="_blank"
            className="hover:underline hover:text-red-500"
            href={data?.url}
          >
            {" "}
            {data?.title}
          </a>
        </div>
        <div className="flex items-center text-gray-400 py-2">
          Author :{" "}
          <span className="text-[#20BD5F] ml-2 opacity-80 text-2xl ">
            {data?.author}
          </span>
        </div>
        <p className="pt-2 text-gray-400 text-lg">
          Points — <span className=" text-white">{data?.points}</span>
        </p>
        <p className="pt-4 text-gray-400 text-lg">
          Created At —{" "}
          <span className=" text-white">
            {" "}
            {new Date(data?.created_at).toDateString()}{" "}
          </span>
        </p>
      </div>
      <h1 className="text-5xl pl-8 pt-10">Comments —</h1>
      <div className="flex flex-wrap justify-between pt-8">
        {comments?.map((val) => {
          return <CommentCard data={val} key={val.id} />;
        })}
      </div>
    </div>
  );
};

export default ArticleDetails;
