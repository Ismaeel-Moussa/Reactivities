import { useLocalObservable } from 'mobx-react-lite';
import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
} from '@microsoft/signalr';
import { useEffect, useRef } from 'react';
import { runInAction } from 'mobx';
export const useComments = (activityId?: string) => {
    const created = useRef(false);
    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,

        // Create Hub Connection function
        createHubConnection(activityId: string) {
            if (!activityId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(
                    `${
                        import.meta.env.VITE_COMMENTS_URL
                    }?activityId=${activityId}`,
                    {
                        withCredentials: true,
                    }
                )
                .withAutomaticReconnect()
                .build();

            this.hubConnection
                .start()
                .catch((error) =>
                    console.log('Error establishing connection: ', error)
                );

            // Load Comments
            this.hubConnection.on('LoadComments', (comments) => {
                runInAction(() => {
                    this.comments = comments;
                });
            });

            // Receive Comment
            this.hubConnection.on('ReceiveComment', (comment) => {
                runInAction(() => {
                    this.comments.unshift(comment);
                });
            });
        },

        // Stop Hub Connection function
        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected)
                this.hubConnection
                    .stop()
                    .catch((error) =>
                        console.log('Error stopping connection ', error)
                    );
        },
    }));

    useEffect(() => {
        // Start Hub Connection
        if (activityId && !created.current) {
            commentStore.createHubConnection(activityId);
            created.current = true;
        }

        // Stop Hub Connection
        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        };
    }, [activityId, commentStore]);

    return {
        commentStore,
    };
};
