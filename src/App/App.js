import React, { useState } from "react";
import Statistics from "../components/Statistics";
import Section from "../components/Section";
import FeedbackOptions from "../components/FeedbackOptions";
import Notification from "../components/Notification";
import { GlobalStyle } from "../theme/GlobalStyle.styled";

function App() {
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // const countTotalFeedback = () => good + neutral + bad;

  const countTotalFeedback = () => {
    return Object.values(state).reduce((ac, item) => (ac += item));
    // return Object.values({ good, neutral, bad }).reduce(
    //   (ac, item) => (ac += item)
    // );
  };

  const countPositiveFeedbackPercentage = () => {
    const res = Math.round((state.good / countTotalFeedback()) * 100);
    return !Number.isNaN(res) ? res : 0;
  };

  const onLeaveFeedback = (option) => {
    //первый вариант записи
    // switch (option) {
    //   case "good":
    //     setGood((prev) => prev + 1);
    //     break;
    //   case "neutral":
    //     setNeutral((prev) => prev + 1);
    //     break;
    //   case "bad":
    //     setBad((prev) => prev + 1);
    //     break;

    //   default:
    //     break;
    // }

    //второй вариант записи
    setState((prev) => ({ ...prev, [option]: prev[option] + 1 }));
  };

  const keys = Object.keys(state);
  // const keys = Object.keys({ good, neutral, bad });
  const { good, neutral, bad } = state;
  return (
    <>
      <GlobalStyle />
      <Section title="Please leave feedback">
        <FeedbackOptions options={keys} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
}

export default App;
