export interface UploaderUser {
    user_id : string;
    username : string;
    email: string;
    firstName: string;
    lastName: string;
    subscribers: Array<string>;
    likedVideos : Array<string>;
    dislikedVideos : Array<string>;
    uploadedVideos: Array<string>;
    type: string;
}