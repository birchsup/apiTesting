import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import { expect } from 'chai';
import {createRandomUser} from "../hepper/user_helper";
import {deleteUser} from "../hepper/user_helper";

const TOKEN ='2d888fc21ee7e804de82ed30fdf0a00fa523715ea9575230e2c709c86e815a19';

describe.only ('User Posts',  () => {
    let user, postID, delUser;
    before('create new user', async ()=>{
       user = await createRandomUser();
    })
    after('delete user', async ()=>{
        await deleteUser();
     
    })
   
    it ("create new post", async () => {
              const data = {
                  user_id: user.id,
                  title: "My title",
                  body: "my blog post"
          };
const res = await request
.post('posts')
.set("Authorization", `Bearer ${TOKEN}` ).send(data);
expect(200)
expect(res.body).to.include(data);
postID = res.body.id;
})
    it('should get new post', async ()=> {
        await request
        .get(`posts/${postID}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .expect(200)
        
    });
})