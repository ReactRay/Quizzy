


export function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className="start">
            <div>

                <h2>Welcome to the React Quiz!</h2>

                <h3>{numQuestions} question to test your react mastery</h3>
                <button className="btn btn-ui" onClick={() => { dispatch({ type: 'start' }) }}>let's start</button>
            </div>


            <div>
                <img src="/quizzy-unscreen.gif" alt="Quizzy celebration" className="quizzy" />

            </div>
        </div>
    )
}