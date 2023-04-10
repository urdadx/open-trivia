import React, { useContext } from 'react';
import { quizCategories, difficultyModes } from '@/utils/data'; 
import QuizContext from '@/context/QuizContext';
import { Toaster } from 'react-hot-toast';

const Index = () => {
    
    // global states
    const { quiz, handleChange, handleSubmit } = useContext(QuizContext);


    return (
        <main className='flex min-h-screen flex-col items-center px-4 lg:mt-20 mt-40 sm:px-8 md:px-16 lg:px-24'>
            <div className=''>
                <Toaster />
            </div>
            <div className='my-8'>
                <h3 className='text-white font-semibold text-3xl text-center'>
                    Create a new quiz 🎉
                </h3>
            </div>
            <div className='w-full max-w-md'>
                <select
                    name="category"
                    value={quiz.category} 
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5'
                >
                    <option selected>Choose a category</option>
                    {
                        quizCategories?.map((category) => {
                            return (
                                <option key={category.name} value={category.name.toLowerCase()}>
                                    {category.name}
                                </option>
                            )
                        })
                    }
                </select>
                <input 
                    min={1}
                    max={10}
                    name="amount"
                    value={quiz.amount}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5'
                />
            

                <select 
                    name="difficulty"
                    value={quiz.difficulty}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5'
                >
                    <option selected >Select difficulty</option>
                    {
                        difficultyModes?.map((diff) => {
                            return (
                                <option value={diff.toLowerCase()} key={diff}>{diff}</option>
                            )
                        })
                    }
                </select>
                <div className='w-full h-auto flex justify-center'>
                    <button onClick={handleSubmit} className='w-full h-auto p-4 tex-md rounded-md border-none text-white bg-red-500 
                        cursor-pointer hover:bg-red-600'
                    >
                        Create Quiz
                    </button>
                </div>
            </div>
        </main>
  )
}

export default Index;
