import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../TabPanel';
import EggSettings from './settings/EggSettings';
import NodeSettings from './settings/NodeSettings';
import MainSettings from './settings/MainSettings';
import PackageSettings from './settings/PackageSettings';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export default function AdminSettingsComponent() {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Main" {...a11yProps(0)} />
          <Tab label="Eggs" {...a11yProps(1)} />
          <Tab label="Nodes" {...a11yProps(2)} />
          <Tab label="Packages" {...a11yProps(3)} />
        </Tabs>
      </div>
      <TabPanel value={value} id="0">
        <MainSettings />
      </TabPanel>
      <TabPanel value={value} id="1">
        <EggSettings />
      </TabPanel>
      <TabPanel value={value} id="2">
        <NodeSettings />
      </TabPanel>
      <TabPanel id="3" value={value}>
        <PackageSettings />
      </TabPanel>
    </div>
  );
}
