export interface User {
    user_id : string;
    username : string;
    email: string;
    firstName: string;
    lastName: string;
    subscriptions: Array<string>;
    likedVideos : Array<string>;
    dislikedVideos : Array<string>;
    viewHistory : Array<string>;
}