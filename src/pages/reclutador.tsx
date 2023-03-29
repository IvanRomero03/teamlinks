import React, { useState } from "react";
import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import type { RadioChangeEvent } from "antd";
import { Radio, Space, Tabs, ConfigProvider, Card } from "antd";

type TabPosition = "left";

const Reclutador: NextPage = () => {
  const testArray: string[] = [
    "monica1 testing the space of the div content card ",
    "space monica",
    "monica 3",
  ];
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorPrimary: "#00b96b",
            },
            Tabs: {
              colorPrimary: "#00b96b",
            },
          },
        }}
      >
        <Card className="h-4/6 w-9/12">
          <Tabs
            tabPosition={tabPosition}
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Tab ${id}`,
                key: id,
                children: <div className="h-4/6">{testArray[i]}</div>,
              };
            })}
          />
        </Card>
      </ConfigProvider>
    </>
  );
};

export default Reclutador;
