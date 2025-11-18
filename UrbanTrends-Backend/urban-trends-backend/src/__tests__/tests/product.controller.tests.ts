import {Client, expect} from '@loopback/testlab';
import {UrbanThreadsBackendApplication} from '../../application';
import {setupApplication} from '../acceptance/test-helper';

describe('ProductController Integration', () => {
  let app: UrbanThreadsBackendApplication;
  let client: Client;
  let adminToken: string;

  before(async () => {
    ({app, client} = await setupApplication());

    const loginRes = await client.post('/login').send({
      email: 'adminUser@sf.com',
      password: 'adminUser',
    }).expect(200);

    adminToken = loginRes.body.token;
  });

  after(async () => {
    await app.stop();
  });

  it('GET /products should return product list', async () => {
    const res = await client
      .get('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(res.body).to.be.Array();
  });
});
