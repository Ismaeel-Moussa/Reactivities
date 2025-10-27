import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { useMemo } from 'react';
import type { EditProfileSchema } from '../schemas/editProfileSchema';

export const useProfile = (id?: string, predicate?: string) => {
    const queryClient = useQueryClient();

    // Check is current user
    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id;
    }, [id, queryClient]);

    // Get Profile
    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`);
            return response.data;
        },
        enabled: !!id && !predicate,
    });

    // Get Photos
    const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id && !predicate,
    });

    // Get Followings
    const { data: followings, isLoading: loadingFollowings } = useQuery<
        Profile[]
    >({
        queryKey: ['followings', id, predicate],
        queryFn: async () => {
            const response = await agent.get<Profile[]>(
                `/profiles/${id}/follow-list?predicate=${predicate}`
            );
            return response.data;
        },
        enabled: !!id && !!predicate,
    });

    // Upload Photo
    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('/profiles/add-photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photos', id],
            });
            queryClient.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url,
                };
            });
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url,
                };
            });
        },
    });

    // Sef photo as main photo
    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/${photo.id}/setMain`);
        },
        onSuccess: (_, photo) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;

                return {
                    ...userData,
                    imageUrl: photo.url,
                };
            });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;

                return {
                    ...profile,
                    imageUrl: photo.url,
                };
            });
        },
    });

    // Delete Photo
    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profiles/${photoId}/photos`);
        },
        onSuccess: (_, photoId) => {
            queryClient.setQueryData(['photos', id], (photos: Photo[]) => {
                return photos?.filter((x) => x.id !== photoId);
            });
        },
    });

    // Update Profile
    const updateProfile = useMutation({
        mutationFn: async (profile: EditProfileSchema) => {
            await agent.put('/profiles', profile);
        },
        onSuccess: (_, newProfileData) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;

                return {
                    ...userData,
                    displayName: newProfileData.displayName,
                };
            });
            queryClient.setQueryData(
                ['profile', id],
                (currentProfileData: Profile) => {
                    if (!currentProfileData) return currentProfileData;

                    return {
                        ...currentProfileData,
                        displayName: newProfileData.displayName,
                        bio: newProfileData.bio,
                    };
                }
            );
        },
    });

    // Update Following
    const updateFollowing = useMutation({
        mutationFn: async () => {
            await agent.post(`/profiles/${id}/follow`);
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile || profile.followersCount === undefined)
                    return profile;

                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: !profile.following
                        ? profile.followersCount + 1
                        : profile.followersCount - 1,
                };
            });
            queryClient.invalidateQueries({
                queryKey: ['followings', id, (predicate = 'followers')],
            });
        },
    });

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        updateProfile,
        updateFollowing,
        followings,
        loadingFollowings,
    };
};
