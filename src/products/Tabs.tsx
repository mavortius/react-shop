import React, { useState } from "react";

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

export const Tab: React.FC<TabProps> = (props) => (
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

export const Tabs: React.FC = (props) => {
  const [tabsState, setTabState] = useState<TabsState>();

  const handleTabClick = (name: string, content: React.ReactNode) => {
    setTabState({ activeName: name, activeContent: content });
  };

  return (
    <TabsContext.Provider value={{
      activeName: tabsState ? tabsState.activeName : "",
      handleTabClick
    }}>
      <ul className="tabs">{props.children}</ul>
      <div>{tabsState && tabsState.activeContent}</div>
    </TabsContext.Provider>
  )
};

