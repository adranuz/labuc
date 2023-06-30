import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import { createUserSchema, createRoleSchema, deleteUserSchema, getUserSchema, getRoleSchema, paginationFilterSchema, updateUserSchema, updateRoleSchema, deleteRoleSchema } from './user.schema';

export default (cradle: ICradle) => {
  const router = Router();

  router.get('/profile', cradle.authMiddleware.authenticate, cradle.userController.getMyProfile);
  
  router.get('/users', cradle.userMiddleware.validate(paginationFilterSchema), cradle.userController.listUsers);
  router.post('/users', cradle.userMiddleware.validate(createUserSchema), cradle.userMiddleware.requireEmailDoesNotExist, cradle.userController.createUser);
  router.get('/users/:id', cradle.userMiddleware.validate(getUserSchema), cradle.userController.getUser);
  router.put('/users/:id', cradle.userMiddleware.validate(updateUserSchema), cradle.userController.updateUser);
  router.delete('/users/:id', cradle.userMiddleware.validate(deleteUserSchema), cradle.userController.deleteUser);

  router.get('/roles', cradle.userMiddleware.validate(paginationFilterSchema), cradle.userController.listRoles);
  router.post('/roles', cradle.userMiddleware.validate(createRoleSchema), cradle.userController.createRole);
  router.get('/roles/:id', cradle.userMiddleware.validate(getRoleSchema), cradle.userController.getRole);
  router.put('/roles/:id', cradle.userMiddleware.validate(updateRoleSchema), cradle.userController.updateRole);
  router.delete('/roles/:id', cradle.userMiddleware.validate(deleteRoleSchema), cradle.userController.deleteRole);

  router.get('/permissions', cradle.userMiddleware.validate(paginationFilterSchema), cradle.userController.listPermissions);

  return router;
};
