import { Exception } from './exception'

/**
 * Validation exception.
 * 
 * @extends {Exception}
 */
export class ValidationException extends Exception {
    /**
     * Creates an instance of ValidationException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
    }
}
