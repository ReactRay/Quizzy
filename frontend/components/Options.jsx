

export function Options({ question, dispatch, answer }) {

    const hasAnswered = answer !== null

    return (
        <div className="options"  >
            {question.options.map
                ((option, index) =>
                    <button disabled={hasAnswered}
                        onClick={() => {
                            dispatch
                                ({ type: 'newAnswer', payLoad: index })
                        }}
                        key={option}
                        className=
                        {`btn btn-option ${index === answer ? 'answer' : ''}
                         ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}>
                        {option}
                    </button>)} </div>
    )
}