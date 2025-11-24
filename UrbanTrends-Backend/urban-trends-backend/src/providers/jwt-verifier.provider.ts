import {Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import * as jwt from 'jsonwebtoken';
import {VerifyFunction} from 'loopback4-authentication';
import {RolePermissions} from '../enums/role-permissions.enum';
import {RoleKey} from '../enums/role.enum';
require('dotenv').config();


export class JWTVerifierProvider implements Provider<VerifyFunction.BearerFn> {
  value(): VerifyFunction.BearerFn {
    return async (token: string) => {
      if (!token) throw new HttpErrors.Unauthorized('Token not provided');

      try {
        console.log('JWT_SECRET in verifier:', process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          id: number;
          email: string;
          username: string;
          role: RoleKey;
        };
        console.log('decoded: ', decoded);


        const userRole = decoded.role as RoleKey;
        console.log('User role from token:', userRole);

        const permissions = RolePermissions[userRole] || [];
        console.log('Assigned permissions based on role:', permissions);


        return {
          ...decoded,
          permissions, // attach role permissions
        };

      } catch (err) {
        console.error('JWT verification failed:', err);
        throw new HttpErrors.Unauthorized('Invalid or expired token');
      }
    };
  }
}
