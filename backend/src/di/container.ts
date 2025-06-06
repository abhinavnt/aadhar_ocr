import { Container } from 'inversify';
import { IAadhaarRepository } from '../interfaces/IAadhaarRepository';
import { IAadhaarService } from '../interfaces/IAadhaarService';
import { AadhaarRepository } from '../repositories/AadhaarRepository';
import { AadhaarService } from '../services/AadhaarService';
import { AadhaarController } from '../controllers/AadhaarController';

const container = new Container();

container.bind<IAadhaarRepository>('IAadhaarRepository').to(AadhaarRepository);
container.bind<IAadhaarService>('IAadhaarService').to(AadhaarService);
container.bind<AadhaarController>('AadhaarController').to(AadhaarController);

export default container;