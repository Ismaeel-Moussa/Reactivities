import {
    Box,
    Button,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
    activitySchema,
    type ActivitySchema,
} from '../../../lib/schemas/activitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import { categoryOptions } from './categoryOptions';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';
import LocationInput from '../../../app/shared/components/LocationInput';
import { Edit, Add } from '@mui/icons-material';

export default function ActivityForm() {
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema) as any,
        defaultValues: {
            title: '',
            description: '',
            category: '',
            date: undefined as any,
            location: {
                venue: '',
                city: '',
                latitude: 0,
                longitude: 0,
            },
        },
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } =
        useActivities(id);

    useEffect(() => {
        if (activity)
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                },
            });
    }, [activity, reset]);

    const onSubmit = (data: ActivitySchema) => {
        const { location, ...rest } = data;

        const flattenedData = { ...rest, ...location };

        if (activity) {
            updateActivity.mutate(
                { ...activity, ...flattenedData },
                {
                    onSuccess: () => navigate(`/activities/${activity.id}`),
                    onError: (error) => {
                        console.error('Failed to update activity:', error);
                    },
                }
            );
        } else {
            createActivity.mutate(flattenedData, {
                onSuccess: (id) => navigate(`/activities/${id}`),
                onError: (error) => {
                    console.error('Failed to create activity:', error);
                },
            });
        }
    };

    if (isLoadingActivity) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="400px"
                flexDirection="column"
                gap={2}
            >
                <CircularProgress size={48} sx={{ color: '#28969c' }} />
                <Typography color="text.secondary">
                    Loading activity...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 3 },
            }}
        >
            <Paper
                sx={{
                    borderRadius: { xs: 2, sm: 3 },
                    padding: { xs: 2.5, sm: 3, md: 4 },
                    maxWidth: 900,
                    mx: 'auto',
                    boxShadow: { xs: 2, sm: 3 },
                }}
            >
                {/* Header */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={{ xs: 1.5, sm: 2 }}
                    mb={{ xs: 2.5, sm: 3 }}
                >
                    {activity ? (
                        <Edit
                            sx={{
                                color: '#28969c',
                                fontSize: { xs: 28, sm: 32 },
                            }}
                        />
                    ) : (
                        <Add
                            sx={{
                                color: '#28969c',
                                fontSize: { xs: 28, sm: 32 },
                            }}
                        />
                    )}
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{
                            fontWeight: 700,
                            fontSize: {
                                xs: '1.5rem',
                                sm: '1.75rem',
                                md: '2rem',
                            },
                        }}
                    >
                        {activity ? 'Edit Activity' : 'Create New Activity'}
                    </Typography>
                </Box>

                {/* Form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    display="flex"
                    flexDirection="column"
                    gap={{ xs: 2.5, sm: 3 }}
                >
                    <TextInput
                        label="Title"
                        control={control as any}
                        name="title"
                    />

                    <TextInput
                        label="Description"
                        control={control as any}
                        name="description"
                        multiline
                        rows={{ xs: 3, sm: 4 }}
                    />

                    {/* Category and Date - Stack on mobile */}
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        gap={{ xs: 2.5, sm: 3 }}
                    >
                        <Box flex={1}>
                            <SelectInput
                                items={categoryOptions}
                                label="Category"
                                control={control as any}
                                name="category"
                            />
                        </Box>
                        <Box flex={1}>
                            <DateTimeInput
                                label="Date"
                                control={control as any}
                                name="date"
                            />
                        </Box>
                    </Box>

                    <LocationInput
                        control={control as any}
                        label="Enter the location"
                        name="location"
                    />

                    {/* Action Buttons */}
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column-reverse', sm: 'row' }}
                        justifyContent={{ xs: 'stretch', sm: 'end' }}
                        gap={{ xs: 1.5, sm: 2 }}
                        mt={{ xs: 1, sm: 2 }}
                    >
                        <Button
                            color="inherit"
                            onClick={() => navigate(-1)}
                            fullWidth={true}
                            sx={{
                                height: { xs: 48, sm: 44 },
                                fontSize: { xs: '0.95rem', sm: '0.9rem' },
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 2,
                                display: { xs: 'flex', sm: 'inline-flex' },
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth={true}
                            disabled={
                                updateActivity.isPending ||
                                createActivity.isPending
                            }
                            sx={{
                                height: { xs: 48, sm: 44 },
                                fontSize: { xs: '0.95rem', sm: '0.9rem' },
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 2,
                                bgcolor: '#28969c',
                                display: { xs: 'flex', sm: 'inline-flex' },
                                minWidth: { sm: 140 },
                                '&:hover': {
                                    bgcolor: '#227278',
                                },
                                '&:disabled': {
                                    bgcolor: 'rgba(0, 0, 0, 0.12)',
                                },
                            }}
                        >
                            {updateActivity.isPending ||
                            createActivity.isPending
                                ? 'Submitting...'
                                : activity
                                ? 'Update Activity'
                                : 'Create Activity'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
