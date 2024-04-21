export interface ConsumerUser {
    user_id : string;
    email: string;
    firstName: string;
    lastName: string;
    subscriptions: Array<string>;
    subscribers?: Array<string>;
    likedVideos : Array<string>;
    dislikedVideos : Array<string>;
    viewHistory : Array<string>;
    type: string;
}