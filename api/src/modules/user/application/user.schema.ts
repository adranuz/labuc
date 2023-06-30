import { coerce, object, optional, string, TypeOf, z } from 'zod'

const params = {
  params: object({
    id: string().uuid(),
  }),
}

export const paginationFilterSchema = object({
  query: object({
    perPage: optional(coerce.number().positive()),
    page: optional(coerce.number().nonnegative()),
    q: optional(string()),
  })
})

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    email: string({ required_error: 'Email is required' }).email('Email is invalid'),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters'),
    roles: object({
      name: string({ required_error: 'Role name is required' })
    }).array(),
  })
})

export const getUserSchema = object({
  ...params,
})

export const updateUserSchema = object({
  ...params,
  body: object({
    name: string(),
    roles: object({
      name: string({ required_error: 'Role name is required' })
    }).array(),
  }).partial()
})

export const deleteUserSchema = object({
  ...params,
})

export const createRoleSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    permissions: object({
      action: string({ required_error: 'Permission name is required' })
    }).array(),
  })
})

export const getRoleSchema = object({
  ...params,
})

export const updateRoleSchema = object({
  ...params,
  body: object({
    name: string(),
    permissions: object({
      action: string({ required_error: 'Permission name is required' })
    }).array(),
  }).partial()
})

export const deleteRoleSchema = object({
  ...params,
})

export type PaginationInput = TypeOf<typeof paginationFilterSchema>['query']

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
export type GetUserInput = TypeOf<typeof getUserSchema>['params']
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>['params'];

export type CreateRoleInput = TypeOf<typeof createRoleSchema>['body']
export type GetRoleInput = TypeOf<typeof getRoleSchema>['params']
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>
export type DeleteRoleInput = TypeOf<typeof deleteRoleSchema>['params'];