export abstract class IntegrationEvent {

    protected constructor(readonly event_name: string, readonly timestamp?: Date) {
    }

}
