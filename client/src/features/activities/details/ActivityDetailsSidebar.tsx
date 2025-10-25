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

type Props = {
    activity: Activity;
};

export default function ActivityDetailsSidebar({ activity }: Props) {
    const isCurrentUserFollowing = true;
    const { currentUser } = useAccount();
    const { attendees, hostId } = activity;

    if (!attendees || attendees.length === 0) {
        return (
            <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2">No one is going yet.</Typography>
            </Paper>
        );
    }

    return (
        <Box>
            <Paper
                elevation={0}
                square
                sx={{
                    textAlign: 'center',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {attendees.length}{' '}
                    {attendees.length === 1 ? 'Person' : 'People'} Going
                </Typography>
            </Paper>

            <Paper elevation={1} square sx={{ borderTop: 'none' }}>
                <List sx={{ width: '100%', p: 0 }}>
                    {attendees.map((attendee) => (
                        <ListItem
                            key={attendee.id}
                            divider
                            sx={{ pt: 1.5, pb: 1.5 }}
                        >
                            <ListItemAvatar>
                                <AvatarPopover
                                    profile={attendee}
                                    sx={{ width: 75, height: 75, mr: 3 }}
                                />
                            </ListItemAvatar>
                            <ListItemText>
                                <Box
                                    display={'flex'}
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    sx={{ width: '100%' }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                            component={Link}
                                            to={`/profiles/${attendee.id}`}
                                        >
                                            {attendee.displayName}
                                        </Typography>

                                        {currentUser?.id !== attendee.id &&
                                            isCurrentUserFollowing && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'warning.main',
                                                    }}
                                                >
                                                    Following
                                                </Typography>
                                            )}
                                    </Box>

                                    {attendee.id === hostId && (
                                        <Chip label="Host" color="secondary" />
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
