import {
    Paper,
    Typography,
    List,
    ListItem,
    Chip,
    ListItemAvatar,
    Box,
    ListItemText,
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

    if (!attendees || attendees.length === 0) {
        return (
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        background:
                            'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d9488 100%)',
                        color: 'white',
                        p: 4,
                    }}
                >
                    <People sx={{ fontSize: 56, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        No one is going yet
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                        Be the first to join this activity!
                    </Typography>
                </Box>
            </Paper>
        );
    }

    return (
        <Box>
            <Paper
                elevation={3}
                square
                sx={{
                    textAlign: 'center',
                    background:
                        'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d9488 100%)',
                    color: 'white',
                    p: 3,
                    borderRadius: '12px 12px 0 0',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2.5,
                    }}
                >
                    {attendees.length === 1 ? (
                        <Person sx={{ fontSize: 60 }} />
                    ) : attendees.length === 2 ? (
                        <People sx={{ fontSize: 60 }} />
                    ) : (
                        <Groups2Icon sx={{ fontSize: 60 }} />
                    )}

                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        gap={2}
                    >
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 500, lineHeight: 1.2 }}
                        >
                            {attendees.length}
                        </Typography>
                        <Typography
                            variant="h6"
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
                    borderRadius: '0 0 12px 12px',
                    overflow: 'hidden',
                }}
            >
                <List sx={{ width: '100%', p: 0 }}>
                    {attendees.map((attendee, index) => (
                        <ListItem
                            key={attendee.id}
                            divider={index < attendees.length - 1}
                            sx={{
                                py: 2.5,
                                px: 2.5,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    transform: 'translateX(4px)',
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <AvatarPopover
                                    profile={attendee}
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        mr: 2,
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
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                textDecoration: 'none',
                                                color: 'text.primary',
                                                transition: 'color 0.2s ease',
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
                                                fontSize: '0.75rem',
                                                border: '1.5px solid #836dffff',
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5,
                                                px: 1,
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
