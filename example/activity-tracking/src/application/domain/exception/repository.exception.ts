import { Exception } from './exception'

/**
 * Repository Exception.
 * 
 * @extends {Exception}
 */
export class RepositoryException extends Exception {
    /**
     * Creates an instance of RepositoryException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
    }
}
