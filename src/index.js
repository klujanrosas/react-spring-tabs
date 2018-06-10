import React from "react";
import ReactDOM from "react-dom";
import { Trail, Spring, config } from "react-spring";
import styled, { injectGlobal } from "styled-components";
import { RightArrow, Back } from "@riqra/riqra-icons";

injectGlobal`
  *, *:before, *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Open Sans, sans-serif;
  }
`;

const OuterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TabContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  height: 50px;
  width: 100%;
  position: relative;
  background: #1296e9;
  > * {
    user-select: none;
  }
`;

const TabTracker = styled.div.attrs({
  style: ({ left }) => ({
    transform: `translateX(${left}%)`
  })
})`
  height: 3px;
  width: calc(100% / 3);
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Tab = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  > label {
    font-size: 16px;
    color: white;
    font-weight: 600;
    transition: 0.2s;
    ${props =>
      !props.active &&
      `
      opacity: 0.5;
    `};
  }
`;

const TabContentContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Option = styled.div.attrs({
  style: ({ opacity, left }) => ({
    opacity,
    transform: `translateX(${left}%)`
  })
})`
  display: flex;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  color: #333;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid lightgray;
  transition: background 0.2s;
  :hover {
    cursor: pointer;
    background: #eee;
  }
`;

const OptionContent = styled.div.attrs({
  style: ({ right, opacity }) => {
    return {
      opacity,
      transform: `translateX(${right}%)`,
      display: opacity === 0 ? "none" : "flex"
    };
  }
})`
  background: #fff;
  top: 0;
  position: absolute;
  height: 400px;
  padding: 16px;
  width: 100%;
`;

class App extends React.Component {
  state = {
    activeTab: 0,
    displayingOptionContent: false
  };
  tabContent = [
    { id: 0, content: ["Opción 1", "Opción 2", "Opción 3"] },
    { id: 1, content: ["Opción 4", "Opción 5", "Opción 6"] },
    { id: 2, content: ["Opción 7", "Opción 8", "Opción 9"] }
  ];
  render() {
    return (
      <OuterContainer>
        <TabContainer>
          <Spring
            config={config.gentle}
            from={{ x: -100, opacity: 0 }}
            to={{ x: this.state.activeTab * 100, opacity: 1 }}
          >
            {styles => {
              return <TabTracker left={styles.x} />;
            }}
          </Spring>
          <Tab
            onClick={() => {
              this.setState({ activeTab: 0, displayingOptionContent: false });
            }}
            active={this.state.activeTab === 0}
          >
            <label>Tab 1</label>
          </Tab>
          <Tab
            onClick={() => {
              this.setState({ activeTab: 1, displayingOptionContent: false });
            }}
            active={this.state.activeTab === 1}
          >
            <label>Tab 2</label>
          </Tab>
          <Tab
            onClick={() => {
              this.setState({ activeTab: 2, displayingOptionContent: false });
            }}
            active={this.state.activeTab === 2}
          >
            <label>Tab 3</label>
          </Tab>
        </TabContainer>
        <TabContentContainer>
          <Trail
            config={config.gentle}
            from={{ left: -100, opacity: 0 }}
            to={{
              left: this.state.displayingOptionContent ? -100 : 0,
              opacity: 1
            }}
            keys={this.tabContent[this.state.activeTab].content.map(
              item => item
            )}
          >
            {this.tabContent[this.state.activeTab].content.map(
              item => styles => {
                return (
                  <Option
                    {...styles}
                    onClick={() => {
                      this.setState({ displayingOptionContent: true });
                    }}
                  >
                    {item}
                    <RightArrow isClickable color="#3D99E1" />
                  </Option>
                );
              }
            )}
          </Trail>
          <Spring
            config={config.gentle}
            from={{ right: 100, opacity: 0 }}
            to={{
              right: this.state.displayingOptionContent ? 0 : 100,
              opacity: this.state.displayingOptionContent ? 1 : 0
            }}
          >
            {styles => {
              return (
                <OptionContent {...styles}>
                  <Back
                    isClickable
                    color="#3D99E1"
                    onClick={() => {
                      this.setState({ displayingOptionContent: false });
                    }}
                  />
                </OptionContent>
              );
            }}
          </Spring>
        </TabContentContainer>
      </OuterContainer>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
