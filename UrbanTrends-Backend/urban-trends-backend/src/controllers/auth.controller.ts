import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../enums/permissions.enum';
import {User} from '../models';
import {UserRepository} from '../repositories';

require('dotenv').config();


export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepo: UserRepository,
  ) { }

  // SIGNUP

  @post('/signup', {
    responses: {
      '200': {
        description: 'User signup',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'name', 'password'],
            properties: {
              email: {type: 'string'},
              name: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    data: Omit<User, 'id'>,
  ): Promise<User> {
    const existing = await this.userRepo.findOne({where: {email: data.email}});
    if (existing) throw new HttpErrors.BadRequest('Email already in use');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({...data, password: hashedPassword});
    return user;
  }



  // LOGIN
  @post('/login', {
    responses: {
      '200': {
        description: 'User login with JWT token',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {email: string; password: string},
  ): Promise<{token: string}> {
    const user = await this.userRepo.findOne({
      where: {email: credentials.email},
    });
    if (!user) throw new HttpErrors.Unauthorized('Invalid email or password');

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) throw new HttpErrors.Unauthorized('Invalid email or password');

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {expiresIn: '1h'}
    );


    return {...user, token};
  }



  @authorize({
    permissions: [PermissionKey.AddUser],
  })
  @post('/admin/signup')
  async adminSignup(@requestBody() userData: Omit<User, 'id' | 'role'>) {
    const hashed = await bcrypt.hash(userData.password, 10);
    return this.userRepo.create({
      ...userData,
      password: hashed,
      role: 'admin',
    });
  }

}
