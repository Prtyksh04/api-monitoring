import MongoClientRepository from "../repository/ClientRepository.js"
import MongoApiKeyRepository from "../repository/ApiKeyRepository.js"
import MongoUserRepository from "../../auth/repository/UserRepository.js";
import { ClientService } from "../services/clientService.js"
import { ClientController } from "../controller/clientController.js"
import authContainer from "../../auth/Dependencies/dependencies.js"

/**
 * Container class to initalize and manage dependencies for the client service
 * This class is responsible for creating instances of repositories, service and controllers, and ensuring that all dependencies are properly injected. It provides a centralized location for managing the dependencies of the client service, making it easier to maintain and scale the application.
 */
class Container {
    static init() {
        const repositories = {
            clientRepository: MongoClientRepository,
            apiKeyRepository: MongoApiKeyRepository,
            userRepository: MongoUserRepository

        };

        const services = {
            clientServices: new ClientService({
                clientRepository: repositories.clientRepository,
                apiKeyRepository: repositories.apiKeyRepository,
                userRepository: repositories.userRepository
            })
        };

        const controller = {
            clientController: new ClientController(services.clientServices, authContainer.services.authService)
        }

        return { repositories, services, controller };
    }
}

const initialized = Container.init();
export { Container };
export default initialized;