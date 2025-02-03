import React, { useEffect, useState } from 'react';

const Quizzes = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/quizzes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Failed to fetch questions');
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId, choiceId) => {
        setAnswers({ ...answers, [questionId]: choiceId });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5000/submit', {
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