import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState, type SyntheticEvent } from 'react';
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';
import { Info, Photo, Event, People, PersonAdd } from '@mui/icons-material';

export default function ProfileContent() {
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabContent = [
        { label: 'About', content: <ProfileAbout />, icon: <Info /> },
        { label: 'Photos', content: <ProfilePhotos />, icon: <Photo /> },
        { label: 'Events', content: <ProfileActivities />, icon: <Event /> },
        {
            label: 'Followers',
            content: <ProfileFollowings activeTab={value} />,
            icon: <PersonAdd />,
        },
        {
            label: 'Following',
            content: <ProfileFollowings activeTab={value} />,
            icon: <People />,
        },
    ];

    return (
        <Box
            component={Paper}
            mt={2}
            p={{ xs: 1.5, sm: 2, md: 3 }}
            elevation={0}
            sx={{
                borderRadius: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                minHeight: { xs: 'auto', md: 530 },
            }}
        >
            {/* Mobile: Horizontal Tabs at Top */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        mb: 2,
                        minHeight: 48,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            minHeight: 48,
                            minWidth: 90,
                            px: 1.5,
                        },
                        '& .Mui-selected': {
                            color: '#28969c',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#28969c',
                            height: 3,
                        },
                        '& .MuiTabs-scrollButtons': {
                            color: '#28969c',
                        },
                    }}
                >
                    {tabContent.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            sx={{
                                '& .MuiTab-iconWrapper': {
                                    marginRight: 0.5,
                                    marginBottom: 0,
                                },
                            }}
                        />
                    ))}
                </Tabs>

                {/* Mobile Tab Content */}
                <Box sx={{ py: 1 }}>{tabContent[value].content}</Box>
            </Box>

            {/* Desktop: Vertical Tabs on Side */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'flex-start',
                }}
            >
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        minWidth: 200,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            minHeight: 64,
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            px: 3,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(40, 150, 156, 0.08)',
                            },
                        },
                        '& .Mui-selected': {
                            color: '#28969c',
                            bgcolor: 'rgba(40, 150, 156, 0.03)',
                        },
                        '& .MuiTabs-indicator': {
                            left: 0,
                            right: 'auto',
                            width: 4,
                            backgroundColor: '#28969c',
                            borderRadius: '0 4px 4px 0',
                        },
                    }}
                >
                    {tabContent.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            sx={{
                                py: 5,
                                justifyContent: 'flex-start',
                                '& .MuiTab-iconWrapper': {
                                    marginRight: 1.5,
                                    marginBottom: 0,
                                },
                            }}
                        />
                    ))}
                </Tabs>

                <Box
                    sx={{
                        flexGrow: 1,
                        pl: 3,
                        pb: 1,
                    }}
                >
                    {tabContent[value].content}
                </Box>
            </Box>
        </Box>
    );
}
