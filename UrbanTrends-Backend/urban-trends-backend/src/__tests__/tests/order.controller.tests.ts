import {Client, expect} from '@loopback/testlab';
import {UrbanThreadsBackendApplication} from '../../application';
import {setupApplication} from '../acceptance/test-helper';

describe('OrderController Integration', () => {
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



  it('GET /orders should list orders', async () => {
    const res = await client
      .get('/orders/user/3')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(res.body).to.be.Array();
  });


});
