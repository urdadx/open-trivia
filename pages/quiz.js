import React, { useState, useContext } from 'react';
import QuizContext from '@/context/QuizContext';
import { decode } from "html-entities"; 
import Loader from '@/components/utils/Loader';
import { Toaster } from 'react-hot-toast';
import ScoreScreen from '@/components/core/ScoreScreen';
import { optionMatcher } from '@/utils/data';

// randomize quiz answers
const randomizeOptions = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const quiz = () => {

    // global states
    const { 
      questions, 
      loading, 
      successToast,
      errorToast
    } = useContext(QuizContext);
    
    // states
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [points, setPoints] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
     
    // display a spinner if questions are loading
    if(loading){
      return (
        <Loader />
      )
    }
    
    // display the results page if quiz is completed
    if(isCompleted){
      return (
        <ScoreScreen score={points} />
      )
    }
    
    const { correct_answer, incorrect_answers, question } = questions[currentQuestion];
    
    // insert answers into an array for easier manipulation
    let answers = [...incorrect_answers];
    answers.splice(
      randomizeOptions(incorrect_answers.length),
      0,
      correct_answer
    )
    
    // moves to next question by increasing current questions' index by 1
    const handleNextQuestion = () => {
    
      setCurrentQuestion((index) => {
        const newIndex = index + 1;
        if (newIndex > questions.length - 1) {
          setIsCompleted(true)
          return 0;
        } 
        else {
          return newIndex;
        }
      });
    };
    
    // verifies answers and increases score when users' correct
    const verifyAnswer = (value) => {
      if (value) {
        successToast("Correct answer");
        setPoints((val) => val + 1);
        handleNextQuestion()
      }
      else{
        errorToast("Incorrect answer");
        handleNextQuestion();
      }
    };

  return (
    <main className='flex min-h-screen flex-col items-center p-8'>
      
        <div>
          <Toaster />
        </div>

        <div className='flex items-center gap-4 w-full h-auto mx-auto mb-8 lg:w-4/5 sm:max-w-screen md:max-w-screen'>
              <hr className='bg-white w-full lg:w-4/5'></hr>
              <button className='w-[100px] h-auto bg-white font-semibold text-black p-2 rounded-sm border-none'>
                {`${currentQuestion + 1} / ${questions.length}`}
              </button>
        </div>

        <div className='w-full max-w-screen-md h-auto mx-auto mb-8'>
            <h3 className='text-white font-semibold text-center text-lg lg:text-2xl'>
              {decode(question)}
            </h3>
        </div>

        <div className='mb-4'>
            {
              answers ? answers.map((answer, index) => {
                  return(
                    <button onClick={() => verifyAnswer(correct_answer === answer)}  
                        className='flex items-center max-w-screen-md mb-4 p-4 rounded-md 
                          border-none bg-white text-black w-[300px] lg:w-[500px] '>
                        <div class="flex items-center gap-5 cursor-pointer">
                          <div className='flex justify-center w-[20px] h-[20px] border-2
                               border-blue-400 items-center rounded-full'>
                            <small className='text-center text-md font-bold text-blue-400'>
                                {optionMatcher[index + 1]}
                            </small>
                          </div>
                          <label class=" cursor-pointer text-md font-medium text-gray-800 ml-2 block">
                              <h3 className='font-semibold'>{decode(answer)}</h3>
                          </label>
                      </div>
                    </button>
                     
                  )
              }) : "Loading..."
            }
        </div>

    </main>
  )
}

export default quiz;
