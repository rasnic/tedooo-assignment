import '../App.css';
import Logo from '../assets/tedooo.png';
import React, { useState } from 'react';
import { TextField, Tabs, Tab, InputAdornment } from '@mui/material';
import {
  Search,
  House,
  ChatBubbleOutline,
  NotificationsNone,
} from '@mui/icons-material';
import profilePic from '../assets/profile_pic.jpeg';
function Header() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='header'>
      <div className='inner-header'>
        <div className='inner-left'>
          <img src={Logo} height={40} width={40} alt='img' className='logo' />
          <TextField
            size='small'
            sx={{ marginLeft: '10px' }}
            placeholder='Search'
            variant='standard'
            margin='dense'
            style={{ background: '#f4f5f5', borderRadius: '30px' }}
            inputProps={{
              style: {
                fontSize: 14,
                height: 40,
                width: 176,
                padding: '0',
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search
                      sx={{
                        marginLeft: '5px',
                        marginRight: '5px',
                        height: '20px',
                        width: '20px',
                      }}
                    />
                  </InputAdornment>
                ),
                disableUnderline: true,
              },
            }}
          />
        </div>
        <div className='inner-right'>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ height: '58px' }}
            TabIndicatorProps={{ sx: { color: '#2DB8A1 !important' } }}
          >
            <Tab
              sx={{ fontSize: '16px', fontWeight: 500, textTransform: 'none' }}
              icon={<House />}
              iconPosition='start'
              label='Home'
            />
            <Tab
              sx={{ fontSize: '16px', fontWeight: 500, textTransform: 'none' }}
              icon={<ChatBubbleOutline />}
              iconPosition='start'
              label='Messaging'
            />
            <Tab
              sx={{ fontSize: '16px', fontWeight: 500, textTransform: 'none' }}
              icon={<NotificationsNone />}
              iconPosition='start'
              label='Notifications'
            />
          </Tabs>
          <img
            src={profilePic}
            height={40}
            width={40}
            alt='profile picture'
            className='profile-picture'
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
