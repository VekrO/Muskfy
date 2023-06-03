export interface Audio {

    /* author: {
        channel_url: string;
        external_channel_url: string;
        id: string;
        name: string;
        subscriber_count: string;
        thumbnails: [{
            height: number;
            url: string;
            width: number;
        }];
        user: string;
        user_url: string;
        verified: string;
    }
    created_at: string;
    duration: string;
    published_date: string;
    thumbnail: [
        {
            height: number;
            url: string;
            width: number; 
        }
    ];
    title: string;
    videoId: string;
    views: number;
    downloaded: boolean;
    audio_url: string; */

    id: {
        videoId: string;
    }

    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        publishTime: string;
        publishedAt: string;
        thumbnail: [{
            height: number;
            url: string;
            width: number;
        }];
        title: string;
    }

    thumbnail: [{
        height: number;
        url: string;
        width: number;
    }]
    
    downloaded: boolean;
    audio_url: string;

}