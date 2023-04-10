import React from 'react';
import { useRouter } from 'next/router';

const ScoreScreen = ({ score }) => {

  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center px-4">
        <h3 className="text-center text-2xl md:text-3xl lg:text-4xl text-white font-semibold mt-12">
          Quiz Completed
        </h3>
        <h3 className="text-center text-lg md:text-xl lg:text-2xl text-white font-semibold mt-4">
          Your calculated score was {score} points 🎉
        </h3>
        <button
          onClick={() => router.push("/")}
          className="w-full md:w-[200px] h-10 md:h-12 lg:h-14 bg-red-500 text-white 
          rounded-md mt-8 md:mt-12 lg:mt-16 text-lg md:text-xl hover:bg-red-600"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default ScoreScreen;
