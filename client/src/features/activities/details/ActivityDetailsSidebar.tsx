import {
    Paper,
    Typography,
    List,
    ListItem,
    Chip,
    ListItemAvatar,
    Box,
    ListItemText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import AvatarPopover from '../../../app/shared/components/AvatarPopover';
import { useAccount } from '../../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { People, Person } from '@mui/icons-material';
import Groups2Icon from '@mui/icons-material/Groups2';

type Props = {
    activity: Activity;
};

export default function ActivityDetailsSidebar({ activity }: Props) {
    const { currentUser } = useAccount();
    const { attendees, hostId } = activity;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (!attendees || attendees.length === 0) {
        return (
            <Paper
                elevation={3}
                sx={{
                    borderRadius: isMobile ? 2 : 3,
                    overflow: 'hidden',
                    textAlign: 'center',
                    mb: isMobile ? 2 : 0,
                }}
            >
                <Box
                    sx={{
                        background:
                            'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d9488 100%)',
                        color: 'white',
                        p: isMobile ? 3 : 4,
                    }}
                >
                    <People
                        sx={{
                            fontSize: isMobile ? 48 : 56,
                            mb: 2,
                            opacity: 0.9,
                        }}
                    />
                    <Typography
                        variant={isMobile ? 'body1' : 'h6'}
                        sx={{ fontWeight: 700 }}
                    >
                        No one is going yet
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            opacity: 0.9,
                            fontSize: isMobile ? '0.85rem' : '0.875rem',
                        }}
                    >
                        Be the first to join this activity!
                    </Typography>
                </Box>
            </Paper>
        );
    }

    return (
        <Box
            sx={{
                mb: isMobile ? 2 : 0,
                position: isMobile ? 'relative' : 'sticky',
                top: isMobile ? 0 : 24,
                maxHeight: isMobile ? '26.7rem' : '39.5rem',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Paper
                elevation={3}
                square
                sx={{
                    textAlign: 'center',
                    background:
                        'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d9488 100%)',
                    color: 'white',
                    p: isMobile ? 2.5 : 3,
                    borderRadius: isMobile ? '8px 8px 0 0' : '12px 12px 0 0',
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? 2 : 2.5,
                    }}
                >
                    {attendees.length === 1 ? (
                        <Person sx={{ fontSize: isMobile ? 48 : 60 }} />
                    ) : attendees.length === 2 ? (
                        <People sx={{ fontSize: isMobile ? 48 : 60 }} />
                    ) : (
                        <Groups2Icon sx={{ fontSize: isMobile ? 48 : 60 }} />
                    )}

                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        gap={isMobile ? 1.5 : 2}
                    >
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            sx={{ fontWeight: 500, lineHeight: 1.2 }}
                        >
                            {attendees.length}
                        </Typography>
                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            sx={{ opacity: 0.95, fontWeight: 500 }}
                        >
                            {attendees.length === 1
                                ? 'Person Going'
                                : 'People Going'}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper
                elevation={3}
                square
                sx={{
                    borderTop: 'none',
                    borderRadius: isMobile ? '0 0 8px 8px' : '0 0 12px 12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    flex: 1,
                    maxHeight: isMobile ? '400px' : 'none',
                }}
            >
                <List
                    sx={{
                        width: '100%',
                        p: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        // Desktop webkit browsers
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(0,0,0,0.05)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#0d9488',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: '#0f766e',
                            },
                        },
                        // Firefox
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#0d9488 rgba(0,0,0,0.05)',
                        // Smooth scrolling for mobile
                        WebkitOverflowScrolling: 'touch',
                        // Reserve space for scrollbar
                        scrollbarGutter: 'stable',
                    }}
                >
                    {attendees.map((attendee, index) => (
                        <ListItem
                            key={attendee.id}
                            divider={index < attendees.length - 1}
                            sx={{
                                py: isMobile ? 2 : 2.5,
                                px: isMobile ? 2 : 2.5,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    transform: isMobile
                                        ? 'none'
                                        : 'translateX(4px)',
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <AvatarPopover
                                    profile={attendee}
                                    sx={{
                                        width: isMobile ? 52 : 64,
                                        height: isMobile ? 52 : 64,
                                        mr: isMobile ? 1.5 : 2,
                                        border: '3px solid',
                                        borderColor:
                                            attendee.id === hostId
                                                ? '#0d9488'
                                                : 'divider',
                                        transition: 'transform 0.2s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                />
                            </ListItemAvatar>

                            <ListItemText>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    flexWrap="wrap"
                                    gap={1}
                                    sx={{ width: '100%' }}
                                >
                                    <Box>
                                        <Typography
                                            variant={isMobile ? 'body1' : 'h6'}
                                            sx={{
                                                fontWeight: 700,
                                                textDecoration: 'none',
                                                color: 'text.primary',
                                                transition: 'color 0.2s ease',
                                                fontSize: isMobile
                                                    ? '0.95rem'
                                                    : '1.25rem',
                                                '&:hover': {
                                                    color: '#0d9488',
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                            component={Link}
                                            to={`/profiles/${attendee.id}`}
                                        >
                                            {attendee.displayName}
                                        </Typography>

                                        {currentUser?.id !== attendee.id &&
                                            attendee.following && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#f59e0b',
                                                        fontWeight: 600,
                                                        mt: 0.25,
                                                        fontSize: isMobile
                                                            ? '0.8rem'
                                                            : '0.875rem',
                                                    }}
                                                >
                                                    Following
                                                </Typography>
                                            )}
                                    </Box>

                                    {attendee.id === hostId && (
                                        <Chip
                                            label="Host"
                                            size="small"
                                            sx={{
                                                bgcolor: '#e3f2fd',
                                                color: '#2600ffff',
                                                fontWeight: 700,
                                                fontSize: isMobile
                                                    ? '0.7rem'
                                                    : '0.75rem',
                                                border: '1.5px solid #836dffff',
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5,
                                                px: isMobile ? 0.75 : 1,
                                            }}
                                        />
                                    )}
                                </Box>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}
