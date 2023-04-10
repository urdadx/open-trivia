import { useState } from "react";
import axios  from "axios";
import QuizContext from "./QuizContext";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

// match categories key-value-pair
const matchCategories = {
    vehicles: 28,
    geography: 22,
    music:12,
    sports: 21,
    mathematics: 19,
    politics: 24,
};


const QuizState = ({ children }) => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // API ROUTE
    const BASE_URL = "https://opentdb.com/api.php?";
    const router = useRouter();

    // success and error messages
    const errorToast = (message, duration=1000) => toast.error(message, {duration: duration});
    const successToast = (message) => toast.success(message, {duration: 1000});

    let url = "";

    const [quiz, setQuiz] = useState(
       {
        amount: "",
        category: "",
        difficulty:""
       }
    )
    
    // handle changes to all input states
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setQuiz({ ...quiz, [name]: value });
    };
    
    // submit form to fetch data from API
    const handleSubmit = (event) => {
        event.preventDefault();
        const { amount, category, difficulty } = quiz;
        const regex = /^[1-8]$/ 

        if(!amount || !category || !difficulty){
            errorToast("All fields must be selected");
        }
        else{
            if(!regex.test(amount)){
                setError(true);
                errorToast("Number of questions (1-8 max)", 3400)
            }
            else{
                url = `${BASE_URL}amount=${amount}&difficulty=${difficulty}&category=${matchCategories[category]}&type=multiple`;
                fetchData(url);
                router.push("/quiz");
                setError(false)
            }

        }

    };

    // fetch quiz questions from API
    const fetchData = async (url) => {
        setLoading(true);
        const response = await axios(url).catch((error) => console.log(error));
    
        if (response) {
          const data = response.data.results;
    
          if (data.length > 0) {
            setQuestions(data);
            setLoading(false);
          } 
          else{
            errorToast("There was an error fetching data");
          }
        } 
    }

    // global context values to be used across the app
    const value = {
        questions,
        fetchData,
        loading, 
        quiz,
        url,
        error,
        setError,
        errorToast,
        successToast,
        handleChange,
        handleSubmit,
    }


    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizState;