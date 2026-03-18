import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getDiputados(): {
        id: string;
        name: string;
        party: string;
        position: string;
        image: string;
        description: string;
    }[];
}
