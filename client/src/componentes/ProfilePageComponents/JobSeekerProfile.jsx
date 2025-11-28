"use client";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Profile from '../reuseable/Profile';

const JobSeekerProfile = ({ user }) => {
  return (
    <Tabs>
      <TabList className={"grid grid-cols-2 text-center"}>
        <Tab className={"py-2 focus:outline-0 cursor-pointer"} selectedClassName={'border-b border-[#00000055]'}>Profile</Tab>
        <Tab className={"py-2 focus:outline-0 cursor-pointer"} selectedClassName={'border-b border-[#00000055]'}>Job Applied</Tab>
      </TabList>

      <TabPanel className='pt-10'>
        <Profile user={user} />
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  )
}

export default JobSeekerProfile