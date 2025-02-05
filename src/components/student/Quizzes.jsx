import React, { useEffect, useState } from 'react';

const Quizzes = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('You must be logged in to view quizzes.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://smart-code-learning-mabethkimani-smart-oqwb.onrender.com/app/quizzes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
                } else {
                    setErrorMessage('Failed to fetch questions. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setErrorMessage('An error occurred while fetching quizzes.');
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId, choiceId) => {
        setAnswers({ ...answers, [questionId]: choiceId });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('https://smart-code-learning-mabethkimani-smart-oqwb.onrender.com/app/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                questions: questions.map(q => ({
                    id: q.id,
                    correct_choice: q.choices.find(c => c.is_correct)?.id,
                })),
                choices: Object.values(answers),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setScore(data.score);
        } else {
            console.error('Failed to submit answers');
        }
    };

    if (loading) {
        return <div>Loading quizzes...</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
        <div>
            <h1>Quizzes</h1>
            {questions.map(question => (
                <div key={question.id}>
                    <h3>{question.text}</h3>
                    {question.choices.map(choice => (
                        <div key={choice.id}>
                            <input
                                type='radio'
                                name={question.id}
                                value={choice.id}
                                onChange={() => handleAnswerChange(question.id, choice.id)}
                            />
                            {choice.text}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {score !== null && <h2>Your score: {score}</h2>}
        </div>
    );
};

export default Quizzes;