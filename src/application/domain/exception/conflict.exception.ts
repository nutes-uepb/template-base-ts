import { Exception } from './exception'

/**
 * Conflict data exception.
 * 
 * @extends {Exception}
 */
export class ConflictException extends Exception {
    /**
     * Creates an instance of ConflictException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
    }
}
