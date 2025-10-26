import { Box, Button } from '@mui/material';
import TextInput from '../../app/shared/components/TextInput';
import {
    editProfileSchema,
    type EditProfileSchema,
} from '../../lib/schemas/editProfileSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';

type Props = {
    setEditMode: (value: boolean) => void;
};

export default function ProfileEditForm({ setEditMode }: Props) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm<EditProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(editProfileSchema),
    });

    const { id } = useParams();
    const { profile, updateProfile } = useProfile(id);

    useEffect(() => {
        if (profile) {
            reset({
                displayName: profile.displayName,
                bio: profile.bio || '',
            });
        }
    }, [profile, reset]);

    const onSubmit = (data: EditProfileSchema) => {
        updateProfile.mutate(data, {
            onSuccess: () => setEditMode(false),
        });
    };

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            alignContent="center"
            gap={3}
            mt={1}
        >
            <TextInput
                label="Display Name"
                name="displayName"
                control={control}
            />
            <TextInput
                label="Add your bio"
                name="bio"
                type="text"
                multiline
                rows={6.5}
                control={control}
            />
            <Button
                type="submit"
                disabled={!isDirty || !isValid || updateProfile.isPending}
                variant="contained"
                size="large"
                fullWidth
            >
                Update Profile
            </Button>
        </Box>
    );
}
