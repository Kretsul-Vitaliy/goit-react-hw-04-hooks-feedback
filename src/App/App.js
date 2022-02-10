import React, { Component } from "react";
import Statistics from "../components/Statistics";
import Section from "../components/Section";
import FeedbackOptions from "../components/FeedbackOptions";
import Notification from "../components/Notification";
import { GlobalStyle } from "../theme/GlobalStyle.styled";

class App extends Component {
  // состояние. публичное свойство state. свойство экземпляра, всегда объект. от свойств этого объекта зависит разметка
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  // countTotalFeedback = () =>
  //   this.state.good + this.state.neutral + this.state.bad;

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((ac, item) => (ac += item));
  };

  countPositiveFeedbackPercentage = () => {
    const res = Math.round((this.state.good / this.countTotalFeedback()) * 100);
    return !Number.isNaN(res) ? res : 0;
  };

  onLeaveFeedback = (option) => {
    this.setState((prevState) => ({
      [option]: prevState[option] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const keys = Object.keys(this.state);
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <>
        <GlobalStyle />
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={keys}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}

export default App;

// ---------------------------------------------------
// метод класса
// countPositiveFeedbackPercentage() {}-нет привязки контекста
// публичное свойство и стрелка
//   countPositiveFeedbackPercentage = () => {}

// публичное свойство класса- - передать коллбек как обработчик события в эл делать публичн.свой.класса в которую закидую стрелку

//super-это вызов контсруктора родителя(React.Component), до того как использовать this внутри конструктора ребенка(this.state = {};)

// компоненты одной сущности хранить в одной папке

// записать, не основываясь на предыдущем - объект
// this.setState({value: 123123123})
// записать основываясь на предыдущем - функция
//  this.setState(prevState => {
// return { value: prevState.value + 1 };
// });
// или
// this.setState(prevState => ({
// value: prevState.value + 1,
// }));

// массив объектов const colors =[{},{},{}]
//  <FeedbackOptions options={colors}/>
// в отдельном файле компонента что бы обратиться к options - this.props.options

// делегирование встроено в реакт по умолчанию
// onClick-это регистрация функции, при клики на кнопку. те addEventListener не вешается.

// onClick={this.setActiveIdx(index)}-на это место будет возвращаен вызов функции-результат- те вернет undefind
// onClick={() => this.setActiveIdx(index)}-вернут ссылку на функцию с индеком
