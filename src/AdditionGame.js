import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./AdditionGame.css";

const AdditionGame = () => {

    const TOTAL_SCORES = 10,
        BTN_NAME = "Submit",
        KEY_NAME = "Enter",
        N = 100;

    const [state, setState] = useState({
        num1: Math.ceil(Math.random() * N),
        num2: Math.ceil(Math.random() * N),
        input: "",
        score: 0,
        tries: 3,
        palyAgain: false,
    });

    const handleInpute = (e) => {

        if (state.input.trim() === "") return;

        if (e.target.textContent !== BTN_NAME && e.key !== KEY_NAME) return;

        // On success
        if (parseInt(state.input) === (state.num1 + state.num2)) {
            setState(oldState => ({
                ...oldState,
                num1: Math.ceil(Math.random() * N),
                num2: Math.ceil(Math.random() * N),
                score: oldState.score + 1,
                input: "",
                palyAgain: false,
            }))
        }
        else { // On failure
            setState((oldState) => ({
                ...oldState,
                score: state.score > 0 ? oldState.score - 1 : state.score,
                tries: oldState.tries - 1,
                input: "",
                palyAgain: false,
            }))

        }
    }

    const palyAgain = () => (setState({
        num1: Math.ceil(Math.random() * N),
        num2: Math.ceil(Math.random() * N),
        input: "",
        score: 0,
        tries: 3,
        palyAgain: true,
    }))

    const renderProblem = () => {
        return (
            <div className="container-fluid h-100 align-items-center justify-content-center d-flex">
                <div className="row w-100 h-100">
                    <div className="col-6 flex-column align-items-center justify-content-center d-flex">
                        <div className="row w-100">
                            <div className="col-6">
                                <h1 className="text-light">Addtion Game</h1>
                            </div>
                            <div className="col-6">
                                <div className="row w-100">
                                    <div className="score col-12 text-light h5 d-inline-block"><span>{`Your score: ${state.score} of ${TOTAL_SCORES}`}</span></div>
                                    <div className="tries col-12 text-light h5 d-inline-block"><span>{`Number of tries: ${state.tries}`}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100">
                            <div className="col-12">
                                <div className="problem text-primary lead display-5 bg-light p-2 my-2 border border-2 border-warning rounded-2">{`${state.num1} + ${state.num2}`}</div>
                            </div>
                            {/* <div className="offset-6"></div> */}
                        </div>
                        <div className="row w-100">
                            <div className="col-12">
                                <input type="text" className="form-control" placeholder="Answer" autoFocus={true} value={state.input} onKeyPress={handleInpute} onChange={(e) => (setState({ ...state, input: e.target.value }))} />
                            </div>
                            {/* <div className="offset-6"></div> */}
                        </div>
                        <div className="row w-100">
                            <div className="col-12">
                                <button className="btn btn-warning btn-lg my-2 text-primary display-6 w-100 border border-1 border-light" onClick={handleInpute}>Submit</button>
                            </div>
                            {/* <div className="offset-6"></div> */}
                        </div>
                    </div>
                    <div className="right-side col-6"></div>
                </div>
            </div>
        );
    }

    if ((state.score < TOTAL_SCORES && state.tries > 0) || state.palyAgain) {
        console.log("Cont");
        console.log(state);
        return (
            renderProblem()
        );
    }
    else if (state.tries <= 0) {
        console.log("Lost");
        console.log(state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-danger text-center">You Lost</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button onClick={palyAgain} className="btn btn-warning btn-lg my-2 text-primary display-6 border border-1 border-light">Re-play</button>
                    </div>
                </div>
            </div>
        );
    }
    else if (state.score === TOTAL_SCORES) {
        console.log("Won");
        console.log(state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-warning text-center">You Won</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button onClick={palyAgain} className="btn btn-warning btn-lg my-2 text-primary display-6 border border-1 border-light">Re-play</button>
                    </div>
                </div>
            </div>
        );
    }

};

export default AdditionGame;