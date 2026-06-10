const request = require('supertest');
const app = require('../app')
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');


// This runs once before all tests
beforeAll(async () => {
    await connectDB(); // Connect to the test database
}, 10000)

// This runs once after all tests finish
afterAll(async () => {
    await mongoose.connection.collection('users').deleteMany({}); // Clean up the test database
    await mongoose.connection.close(); // Close the connection
}, 10000)

describe('Auth - Register', () => {

    it('should register a new user successfully', async () => {
        // ARRANGE
        const newUser = {
            name: 'Joy Agbo',
            email: 'joy@test.com',
            password: 'password123'
        };

        // ACT
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(newUser);

        // ASSERT
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });


    it('should return an error if email aready exists', async () => {
        // ARRANGE
        const existingUser = {
            name: 'Joy Agbo',
            email: 'joy@test.com',
            password: 'password123'
        };

        //ACT
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(existingUser);
        // ASSERT
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    })
});

describe('Auth - Login', () => {
    it('should login successfully with correct credentials', async () => {
        // ARRANGE
        const credentials = {
            email: 'joy@test.com',
            password: 'password123'
        };

        // ACT
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send(credentials);

        // ASSERT
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });

       it('should return an 401 with wrong password', async () => {
            // ARRANGE
            const wrongCredentials = {
                email: 'joy@test.com',
                password: 'tested123'
            };

            // ACT
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(wrongCredentials);

            // ASSERT
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email or password');
        });

        it('should return 401 email does not exist', async ()=>{
            // ARRANGE
            const userNotExist={
                email:'test@examplemail.com',
                password: 'example123'
            }
            // ACT
            const response = await request(app)
            .post('/api/v1/auth/login')
            .send(userNotExist);

            // ASSERT
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email or password');

        })
});