import { Role } from '@prisma/client'

export default interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: Pick<Role, 'name'>[];
}
