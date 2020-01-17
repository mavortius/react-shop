import React from "react";

interface ITabsContext {
  activeName?: string,
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

const TabsContext = React.createContext<ITabsContext>({});

type TabProps = {
  name: string,
  initialActive?: boolean,
  heading: () => string | JSX.Element;
}

type TabsState = {
  activeName: string,
  activeContent: React.ReactNode
}

class Tabs extends React.Component<{}, TabsState> {
  static Tab: React.FC<TabProps> = (props) => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
            ? props.name
            : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li onClick={handleTabClick} className={props.name === activeName ? "active" : ""}>{props.heading()}</li>
        );
      }}
    </TabsContext.Consumer>
  );

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };

  render() {
    return (
      <TabsContext.Provider value={{
        activeName: this.state ? this.state.activeName : "",
        handleTabClick: this.handleTabClick
      }}>
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    )
  }
}

export default Tabs
