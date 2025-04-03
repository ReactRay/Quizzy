
import { Options } from "./Options"

export function Question({ question, dispatch, answer }) {


    console.log(question, ' test')
    return (
        <div className="question">
            <h4>{question.question}</h4>
            <Options dispatch={dispatch} answer={answer} question={question} />
        </div>
    )
}

