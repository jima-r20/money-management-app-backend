import { EntityRepository, Repository } from 'typeorm';
import { Register } from './register.entity';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {}
