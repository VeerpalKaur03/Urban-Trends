import {inject} from '@loopback/core';
import {
  FindRoute,
  HttpErrors,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {AuthenticateFn, AuthenticationBindings} from 'loopback4-authentication';
import {AuthorizationBindings, AuthorizeFn} from 'loopback4-authorization';
import {UserWithPermissions} from './models/user-with-permissions.model';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) protected send: Send,
    @inject(SequenceActions.REJECT) protected reject: Reject,

    // Authentication and Authorization actions
    @inject(AuthenticationBindings.USER_AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn<UserWithPermissions>,

    @inject(AuthorizationBindings.AUTHORIZE_ACTION)
    protected checkAuthorization: AuthorizeFn,
  ) { }

  async handle(context: RequestContext) {
    const {request, response} = context;

    // --- CORS headers ---
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Credentials', 'true');

    // --- Preflight ---
    if (request.method === 'OPTIONS') {
      response.status(204).end();
      return;
    }

    try {
      const route = this.findRoute(request);

      //  Public routes (no authentication or authorization needed)
      const publicRoutes = [
        '/signup',
        '/login',
        '/explorer',
        '/products',
        '/products/{id}',
        '/images'
      ];
      const isPublic = publicRoutes.some(path => request.path.startsWith(path));


      let user: UserWithPermissions | undefined;

      //  Authenticate and Authorize for protected routes
      if (!isPublic) {
        user = await this.authenticateRequest(request);
        if (!user) throw new HttpErrors.Unauthorized('User not authenticated');

        console.log('Authenticated user:', user);
        console.log(' Route authorize metadata:', route.spec['x-authorize']);


        //  Authorization check
        console.log(' User permissions:', user.permissions);
        const isAllowed = await this.checkAuthorization(user.permissions!, request);
        console.log(' Authorization check result:', isAllowed);

        if (!isAllowed) {
          throw new HttpErrors.Forbidden('User does not have permission to access this route');
        }
      }

      //--- Continue to controller logic ---
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);

    } catch (err) {
      this.reject(context, err);
    }
  }
}
