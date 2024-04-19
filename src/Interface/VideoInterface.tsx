export interface Video {
    video_id: string;
    title: string;
    description: string;
    uploadDate: Date;
    uploaderId: string;
    views: Number;
    likes: Number;
    dislikes: Number;
    comments: Array<string>;
    coordinates: Array<Number>;
    moderated: boolean;
}