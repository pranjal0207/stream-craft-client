export interface VideoInterface {
    message: {
        video_id: string;
        title: string;
        description: string;
        uploadDate: string;
        uploaderId: string;
        views: number;
        likes: number;
        dislikes: number;
        comments: any[];  
        coordinates: any[];  
        moderated: boolean;
    };
    videoUrl: string;
}