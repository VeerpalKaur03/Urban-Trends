import {Client, expect} from '@loopback/testlab';
import {UrbanThreadsBackendApplication} from '../../application';
import {setupApplication} from '../acceptance/test-helper';

describe('AuthController Integration', () => {
  let app: UrbanThreadsBackendApplication;
  let client: Client;
  let adminToken: string;

  before(async () => {
    ({app, client} = await setupApplication());

    // Login as admin
    const res = await client.post('/login').send({
      email: 'adminUser@sf.com',
      password: 'adminUser',
    }).expect(200);

    adminToken = res.body.token;
  });

  after(async () => {
    await app.stop();
  });

  it('should return JWT token for admin login', async () => {
    expect(adminToken).to.be.String();
  });
});
