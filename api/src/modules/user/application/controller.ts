import { NextFunction, Request, Response } from 'express';
import { AuthenticatedUserDTO } from '../dto/user.dto'
import UserService from '../service/user.service'
import { CreateRoleInput, CreateUserInput, DeleteUserInput, GetUserInput, PaginationInput, UpdateUserInput, DeleteRoleInput, UpdateRoleInput } from './user.schema'

export default class UserController {
  constructor(private userService: UserService) {}

  getMyProfile = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
    try {
      const authenticatedUser = req.requester as AuthenticatedUserDTO
      const user = await this.userService.getUserById(authenticatedUser.id)

      if (!user) {
        return res.status(404).json({
          error: {
            code: 404,
            message: 'Not Found',
            details: 'User not found',
          },
        })
      }

      res.status(200).json(user)
    } catch (err) {
      console.log('Unable to get profile:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get profile',
        },
      })
    }
  }

  createUser = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const createdUser = await this.userService.createUser(req.body)

      res.status(201).json(createdUser)
    } catch (err) {
      console.log('Unable to create user:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to create user',
        },
      })
    }
  }

  getUser = async (
    req: Request<GetUserInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(id)

      res.status(200).json(user)
    } catch (err) {
      console.log('Unable to get user:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get user',
        },
      })
    }
  }
  
  updateUser = async (
    req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const user = await this.userService.updateUser(id, req.body)

      res.status(200).json(user)
    } catch (err) {
      console.log('Unable to update user:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to update user',
        },
      })
    }
  }

  deleteUser = async (
    req: Request<DeleteUserInput, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.userService.deleteUser(id)

      res.status(200).json(user)
    } catch (err) {
      next(err);
    }
  }

  listUsers = async (
    req: Request<{}, {}, {}, PaginationInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const users = await this.userService.listUsers(req.query)

      res.status(200).json(users)
    } catch (err) {
      console.log('Unable to get users:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get users',
        },
      })
    }
  }

  createRole = async (
    req: Request<{}, {}, CreateRoleInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const createdUser = await this.userService.createRole(req.body)

      res.status(201).json(createdUser)
    } catch (err) {
      console.log('Unable to create role:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to create role',
        },
      })
    }
  }

  getRole = async (
    req: Request<GetUserInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const role = await this.userService.getRole(id)

      res.status(200).json(role)
    } catch (err) {
      console.log('Unable to get role:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get role',
        },
      })
    }
  }

  updateRole = async (
    req: Request<UpdateRoleInput['params'], {}, UpdateRoleInput['body']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const role = await this.userService.updateRole(id, req.body)

      res.status(200).json(role)
    } catch (err) {
      console.log('Unable to update role:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to update role',
        },
      })
    }
  }

  deleteRole = async (
    req: Request<DeleteRoleInput, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const role = await this.userService.deleteRole(id)

      res.status(200).json(role)
    } catch (err) {
      next(err);
    }
  }

  listRoles = async (
    req: Request<{}, {}, {}, PaginationInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const roles = await this.userService.listRoles(req.query)

      res.status(200).json(roles)
    } catch (err) {
      console.log('Unable to get roles:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get roles',
        },
      })
    }
  }

  listPermissions = async (
    req: Request<{}, {}, {}, PaginationInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const permissions = await this.userService.listPermissions(req.query)

      res.status(200).json(permissions)
    } catch (err) {
      console.log('Unable to get permissions:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get permissions',
        },
      })
    }
  }
}
