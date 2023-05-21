import supertest from 'supertest'
import {expect} from "chai";

const request = supertest('https://gorest.co.in/public/v2/')

const TOKEN = '2d888fc21ee7e804de82ed30fdf0a00fa523715ea9575230e2c709c86e815a19';

function areIdsUnique(ids) {
    const uniqueIds = new Set(ids);
    return uniqueIds.size === ids.length;
}

describe('tests get users method',()=>{
    it('get/users', () =>{

        return request.get(`users?access-token=${TOKEN}`).then((res)=>{
            expect(res.body).to.not.have.property('data');
            expect(res.body).to.be.not.empty;

        })
    })
    it ('/users/1889590',() =>{
        return request.get(`users/1889590?access-token=${TOKEN}`).then ((res)=>{
            expect (res.body.id) .to.be.eq (1889590) ;
        })
    })
    it ('Check that all id have unique value', () =>{
        return request.get(`users?access-token=${TOKEN}`).then ((res)=>{
            const ids = res.body.map((item) => item.id);
            const uniqueIds = areIdsUnique(ids);
            expect(uniqueIds).to.be.true;
        })
    })
    
    it ('check email validation',()=>{
        const data = {
            "email": "lol@gmail.com",
            "name":"Dmitrii",
            "gender": "Male",
            "status":"Active"};
        return request.post('users').set("Authorization", `Bearer ${TOKEN}` ).send(data).then((res)=>{
            expect(res.body).to.be.an('array').that.is.not.empty;
            const error = res.body[0];
            expect(error).to.have.property('field').that.is.equal('email')
            expect(error).to.have.property('message').that.is.equal('has already been taken');
            
        })
    })
    it('validate all errors', () => {
        const data = {
            email: '',
            name: '',
            gender: '',
            status: '',
        };
        return request
    .post('users')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data)
    .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.be.an('array').that.is.not.empty;

        res.body.forEach((error) => {
            expect(error).to.have.property('field');
            expect(error).to.have.property('message');

            // Perform specific assertions based on the error field and message
            switch (error.field) {
                case 'email':
                    expect(error.message).to.equal("can't be blank");
                    break;
                    case 'name':
                        expect(error.message).to.equal("can't be blank");
                        break;
//                        case 'gender':
//                            expect(error.message).to.equal("can't be blank, can be male or female");
//                            break;
                            case 'status':
                                expect(error.message).to.equal("can't be blank");
                                break;
                                default:
                                    // Handle any other error cases as needed
            break;
            }
        });
    });
    });
    
})
