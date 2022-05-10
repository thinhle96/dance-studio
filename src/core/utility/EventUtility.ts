export class EventUtility {

    static getIdFromStreamName(streamName: string): string {
        let split : string[] = streamName.split("/");
        return split[1];
    }

    static getAdminStreamName(adminId: string): string {
        return `core#0/${adminId}`
    }

}