/**
 * Base client repository class to define the interface for client repository implementations
 * This class provides method signatures for creating clients, finding clients by ID or slug, and finding/Counting clients based on fliters. Itserves aas a base class for specific database
 * implementations of the client repository
 */

export default class BaseClientRepository {
    constructor(model) {
        this.model = model;
    };

    async create(clientData) {
        throw new Error("Method not implemented")
    };

    async findById(clientId) {
        throw new Error('Method not implemented');
    }

    async findBySlug(slug) {
        throw new Error('Method not implemented');
    }

    async find(filters, options) {
        throw new Error('Method not implemented');
    }

    async count(filters) {
        throw new Error('Method not implemented');
    }
}