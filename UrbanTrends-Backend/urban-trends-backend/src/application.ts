import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';

// SourceFuse authentication imports
import {AuthenticationComponent, Strategies, STRATEGY} from 'loopback4-authentication';

import {AuthorizationBindings, AuthorizationComponent} from 'loopback4-authorization';
import {JWTVerifierProvider} from './providers/jwt-verifier.provider';
import {MySequence} from './sequence';

export {ApplicationConfig};

require('dotenv').config();


export class UrbanThreadsBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // --- CORS config ---
    this.configure('rest.cors').to({
      origin: 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });

    // --- Authentication setup ---
    this.component(AuthenticationComponent);
    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(JWTVerifierProvider);
    this.bind('sf.auth.strategy').to(STRATEGY.BEARER);


    // --- Authorization setup ---
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer', '/ping', '/login', '/signup', '/products'], // public routes
    });
    this.component(AuthorizationComponent);
    console.log('Authorization component loaded');

    // --- Custom sequence ---
    this.sequence(MySequence);

    // --- Static files ---
    this.static('/', path.join(__dirname, '../public'));


    // --- REST Explorer ---
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // --- Boot options ---
    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js', '.controller.ts'],
        nested: true,
      },
    };
  }
}
