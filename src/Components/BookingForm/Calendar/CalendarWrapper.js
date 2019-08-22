import styled from 'styled-components';

export default styled.section`
  .DayPicker-Caption {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .rdrMonthAndYearPickers {
    text-align: center;
  }

  abbr[title] {
    text-decoration: none;
    font-size: 1.2em;
    cursor: pointer;
  }

  .DayPicker-WeekdaysRow, .DayPicker-Week {
    display: grid;
    grid-template-columns: repeat(7, minmax(40px, 1fr));
    grid-auto-rows: 40px;
    text-align: center;
    grid-gap: 1px;
  }

  .DayPicker-Day {
    --webkit-appearance: none;
    background-color: white;
    border-radius: 2px;
    position: flex;
    align-content: center;
    color: #484848;
    border: 1px solid silver;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
    opacity: .9;
  }

  .DayPicker-Day--today {
    font-weight: bolder;
    color: orange;
  }

  .DayPicker-Day:hover {
    background-color: #2ecc71;
    color: white;
    cursor: pointer;
  }

  .DayPicker-Day--selected {
    background-color: #2ecc71;
    color: white;
  }

  .DayPicker-Day--outside {
    opacity: .5;
  }

  .DayPicker-Day--disabled {
    opacity: .2;
    pointer-events: none;
  }

  .DayPicker-NavBar {
    position: absolute;
    width: 320px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .DayPicker-NavButton {
    font-size: 2em;
    color: gray;
  }

  .DayPicker-NavButton--prev::after {
    content: "<";
  }

  .DayPicker-NavButton--next::after {
    content: ">";
  }

  .DayPicker-Caption div {
    font-size: 2em;
  }

  .DayPicker-Weekday abbr {
    font-size: 1em;
    color: gray;
  }
`