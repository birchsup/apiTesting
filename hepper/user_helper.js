const supertest = require('supertest');
const request = supertest('https://gorest.co.in/public/v2/');
const faker = require('faker');
const TOKEN = '2d888fc21ee7e804de82ed30fdf0a00fa523715ea9575230e2c709c86e815a19';
import { expect } from 'chai';

export const createRandomUser = async () => {
  const data = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    status: 'Active',
    gender: 'Male',
  };

  const res = await request
    .post(`users`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);
//console.log(res.body);
  return res.body;
};



export const deleteUser = async () =>{
    const user = await createRandomUser();
    const res = await request
    .delete(`users/${user.id}`)
    .set("Authorization", `Bearer ${TOKEN}` );
//    console.log(res.body)
    expect(204)
    return res.body
}