'use client'

import { useState } from 'react';
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
  IconCalendarClock,
  IconCircleCheck,
  IconTriangleSquareCircle
} from '@tabler/icons-react';
import { useColorScheme } from '@mantine/hooks';

import { Code, Group } from '@mantine/core';
import classes from './navbarSimple.module.css';

const data = [
      { link: '../../dashboard/experiments', label: 'Participate', icon: IconTriangleSquareCircle },
  //{ link: '../../dashboard/notifications', label: 'Notifications', icon: IconBellRinging },
  { link: '../../dashboard/schedule', label: 'Scheduled', icon: IconCalendarClock },
 // { link: '../../dashboard/completed', label: 'Completed', icon: IconCircleCheck },

];

export function NavbarSimple({onSelect, selected}) {
  const [active, setActive] = useState(selected);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      /*onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        onSelect(item.label)
      }}*/
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
   /* <!--nav className={classes.navbar}-->*/
   <>
     {/* <div className={classes.navbarMain}>*/}
   
        <Group className={classes.header} justify="space-between">
        </Group>
        {links}
      {/*</div>*/}

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div> 
    {/*</nav>*/}
    </>
  );
}