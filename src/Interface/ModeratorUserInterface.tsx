export interface ModeratorUser {
    user_id : string;
    email: string;
    firstName: string;
    lastName: string;
    moderatedVideos : Array<string>;
    reportedVideos : Array<string>;
    type: string;
    likedVideos?:string;
    dislikedVideos?:string;
}