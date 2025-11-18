import {Client} from '@loopback/testlab';
import {UrbanThreadsBackendApplication} from '../../application';
import {setupApplication} from '../acceptance/test-helper';

describe('UserController Integration', () => {
  let app: UrbanThreadsBackendApplication;
  let client: Client;
  let token: string;

  before(async () => {
    ({app, client} = await setupApplication());

    const login = await client.post('/login').send({
      email: 'adminUser@sf.com',
      password: 'adminUser'
    });

    token = login.body.token;
  });

  after(async () => {
    await app.stop();
  });

  it('GET /users should return user list', async () => {
    await client
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });


  it('GET /users/1 should return user details', async () => {
    await client
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

});
