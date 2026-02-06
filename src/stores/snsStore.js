import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSnsStore = create(
    persist(
        (set) => ({
            // Instagram 계정 상태
            instagramAccount: {
                connected: false,
                username: "",
                followers: 0,
            },

            // YouTube 계정 상태
            youtubeAccount: {
                connected: false,
                channelName: "",
                subscribers: 0,
            },

            // Instagram 연결
            connectInstagram: (username, followers = 0) =>
                set({
                    instagramAccount: {
                        connected: true,
                        username,
                        followers,
                    },
                }),

            // Instagram 연결 해제
            disconnectInstagram: () =>
                set({
                    instagramAccount: {
                        connected: false,
                        username: "",
                        followers: 0,
                    },
                }),

            // YouTube 연결
            connectYoutube: (channelName, subscribers = 0) =>
                set({
                    youtubeAccount: {
                        connected: true,
                        channelName,
                        subscribers,
                    },
                }),

            // YouTube 연결 해제
            disconnectYoutube: () =>
                set({
                    youtubeAccount: {
                        connected: false,
                        channelName: "",
                        subscribers: 0,
                    },
                }),
        }),
        {
            name: "sns-account-storage",
        }
    )
);

export default useSnsStore;
